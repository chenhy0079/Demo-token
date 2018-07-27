package org.domeos.framework.restapi.deploycollection;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.restassured.response.Response;

public class ListDeployCollection {
	
	private List<Integer> list = new ArrayList<Integer>();
	
	@Before
	public void setBefore(){
		for(int i = 1;i<3;i++){
			
			String parameter = "{\"name\":\"createdeploy"+i+"\",\"creatorId\":\"11\"}";
			
			Response create = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.contentType("application/json;charset=UTF-8")
					.body(parameter)
					.post("http://localhost:8080/restapi/deploycollection");
			
			int id = create.body().jsonPath().getInt("result.result.id");
			list.add(id);
		}
	}
	
	@Test
	public void testListDeployCollection(){
		
		Response listDeployColl = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploycollection");
		
		ArrayList<String> listDeploy = (ArrayList<String>)listDeployColl.jsonPath().get("result.id");
		
		if(listDeploy.size()!=list.size()){
			throw new RuntimeException();
		}
		
		
	}
	
	@After
	public void setAfter(){
		
		for (Integer id : list) {
			Response deleteTrue = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.contentType("application/json;charset=UTF-8")
					.delete("http://localhost:8080/restapi/test/"+id);
		}
	}

}
