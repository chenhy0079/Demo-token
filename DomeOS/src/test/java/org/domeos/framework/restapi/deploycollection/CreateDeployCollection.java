package org.domeos.framework.restapi.deploycollection;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.Test;

import io.restassured.response.Response;

public class CreateDeployCollection {
	
	/**
	 * 正常创建服务
	 */
	@Test
	public void testCreateDeployCollection(){
		
		String parameter = "{\"name\":\"createdeploy\",\"creatorId\":\"1\"}";
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.body("result.result.name", equalTo("createdeploy"))
				.body("result.result.creatorId", equalTo(1))
				.when()
				.post("http://localhost:8080/restapi/deploycollection");
		
		int id = response.body().jsonPath().getInt("result.result.id");
		
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.delete("http://localhost:8080/restapi/test/"+id);
		
	}
	
	
	/**
	 * 创建服务,服务信息为空
	 */
	@Test
	public void testCreateDeployCollection2(){
		
		String parameter = "{}";
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(1209))
				.when()
				.post("http://localhost:8080/restapi/deploycollection");
	}
	
	/**
	 * 创建服务,服务名为空
	 */
	@Test
	public void testCreateDeployCollection3(){
		
		String parameter = "{\"name\":\"\",\"creatorId\":\"1\"}";
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(1209))
				.body("resultMsg", equalTo("DEPLOY_COLLECTION_NOT_LEGAL:deploy collection name is blank"))
				.when()
				.post("http://localhost:8080/restapi/deploycollection");
		
	}
	
	/**
	 * 创建服务,服务名已存在
	 */
	@Test
	public void testCreateDeployCollection4(){
		
		String parameter = "{\"name\":\"createdeploy\",\"creatorId\":\"1\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.post("http://localhost:8080/restapi/deploycollection");
		
		int id = create.body().jsonPath().getInt("result.result.id");
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(1213))
				.body("resultMsg", equalTo("DEPLOY_COLLECTION_EXIST:null"))
				.when()
				.post("http://localhost:8080/restapi/deploycollection");
		
		
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+id);
		
		
		
		
	}
	
	/**
	 * 创建服务,创建者Id不存在(系统默认当前创建用户)
	 */
	@Test
	public void testCreateDeployCollection5(){
		
		String parameter = "{\"name\":\"create123\",\"creatorId\":\"100\"}";
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.body("result.result.creatorId", equalTo(1))
				.when()
				.post("http://localhost:8080/restapi/deploycollection");
		
	}
	

}
