package org.domeos.framework.restapi.deploycollection;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.restassured.response.Response;

public class ModifyDeployCollection {

	private int id;
	
	@Before
	public void setBefore(){
		String parameter = "{\"name\":\"createdeploy\",\"creatorId\":\"11\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.post("http://localhost:8080/restapi/deploycollection");
		
		id = create.body().jsonPath().getInt("result.result.id");	
	}
	
	/**
	 * 正常修改
	 */
	@Test
	public void testModifyDeploy(){
		String parameter = "{\"name\":\"modifydeploy\",\"creatorId\":\"11\"}";
		
		Response modify = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.body("result.name", equalTo("modifydeploy"))
				.when()
				.put("http://localhost:8080/restapi/deploycollection/"+id);
		
	}
	
	/**
	 * 修改 服务名为空
	 */
	@Test
	public void testModifyDeploy2(){
		String parameter = "{\"name\":\"\",\"creatorId\":\"11\"}";
		
		Response modify = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(1209))
				.body("resultMsg", equalTo("DEPLOY_COLLECTION_NOT_LEGAL:deploy collection name is blank"))
				.when()
				.put("http://localhost:8080/restapi/deploycollection/"+id);
		
	}
	
	/**
	 * 修改 服务Id不存在为空
	 */
	@Test
	public void testModifyDeploy3(){
		
		Response delete = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deploy/"+id);
		
		String parameter = "{\"name\":\"modifydeploy\",\"creatorId\":\"11\"}";
		
		Response modify = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(1210))
				.body("resultMsg", equalTo(null))
				.when()
				.put("http://localhost:8080/restapi/deploycollection/"+id);

		
	}
	
	@After
	public void setAfter(){
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+id);
	}
}
