package org.domeos.framework.restapi.deploycollection;


import org.junit.Test;

import io.restassured.response.Response;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import java.util.ArrayList;

import org.domeos.framework.restapi.util.ClientUtil;

public class TestCreateDeployCollection {

	
	
	
	
	/**
	 * 查询单个服务下所有的部署信息
	 */
	@Test
	public void testListDeployment(){
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploy/list/17");
		
		System.out.println(response.jsonPath().get("resultCode"));
		
	}
	
	/**
	 * 查询服务列表
	 */
	@Test
	public void testListDeployCollection(){
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploycollection");
		
		ArrayList<String> list = (ArrayList<String>)response.jsonPath().get("result.id");
		
		System.out.println(list.size()==3);
		
		response.print();
	}
	
	/**
	 * 编辑服务
	 */
	@Test
	public void testModifyDeployCollection(){
	
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body("{\"name\":\"create1\",\"creatorId\":\"1\"}")
				.post("http://localhost:8080/restapi/deploycollection");
		
		
		Object id = response.body().jsonPath().get("result.result.id");
		
		
		Response modify = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body("{\"name\":\"modify2\",\"creatorId\":\"1\"}")
				.expect()
				.body("result.result.name",equalTo("modify2"))
				.when()
				.put("http://localhost:8080/restapi/deploycollection/"+(int)id);
		
		
		Response delete = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.delete("http://localhost:8080/restapi/deploycollection/"+(int)id);
		
	
	}

}
