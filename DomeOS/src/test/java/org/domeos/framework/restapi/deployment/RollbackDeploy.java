package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.restassured.response.Response;

public class RollbackDeploy {
	
private int deployCollectionId;
	
	private int deployId;
	
	@Before
	public void setBefore(){
		String deployCollection = "{\"name\":\"createdeploy\",\"creatorId\":\"11\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(deployCollection)
				.post("http://localhost:8080/restapi/deploycollection");
		
		deployCollectionId = create.body().jsonPath().getInt("result.result.id");
		
		String parameter = "{\"accessType\": \"DIY\","
				+ "\"clusterId\": 11, "
				+ "\"collectionId\": "+deployCollectionId+","
				+ " \"containerConsoles\": [{ "
				+ "\"autoDeploy\": false,"
				+ "\"cpu\": 0,"
				+ "\"cpuRequest\": 0,"
				+ " \"image\": \"library/nginx\","
				+ "\"imagePullPolicy\": \"Always\", "
				+ "\"mem\": 0, "
				+ "\"registry\": "
				+ "\"https://192.168.101.85\","
				+ "\"tag\": \"1.8.0\" "
				+ "}],"
				+ "\"creatorId\": 11, "
				+ "\"deployName\": \"addtest3\","
				+ "\"deploymentType\": \"DEPLOYMENT\","
				+ "\"description\": \"wu\","
				+ "\"hostEnv\": \"TEST\","
				+ "\"labelSelectors\": [{"
				+ "\"content\": \"USER_LABEL_VALUE\","
				+ "\"name\": \"eee\""
				+ "}],"
				+ "\"namespace\": \"default\","
				+ "\"networkMode\":\"DEFAULT\","
				+ "\"replicas\": 1,"
				+ "\"scalable\": false,"
				+ "\"stateful\": false,"
				+ "\"versionType\": \"CUSTOM\""
				+ "}";
		
		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.post("http://localhost:8080/restapi/deploy/create");
		
		deployId = deploy.body().jsonPath().getInt("result");
		
		Response startDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/start?deployId="+deployId+"&version=1&replicas=1");
		
		String status = "";
		
		while(true){
			try {
				Thread.sleep(3000L);
			} catch (InterruptedException e) {
				
			}
			System.out.println(status);
			if("RUNNING".equals(status)) break;
			Response getDeployStatus = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.get("http://localhost:8080/restapi/deploy/id/"+deployId);
			
			status = getDeployStatus.jsonPath().getString("result.deploymentStatus");
			
		}
	}
	
	
	/**
	 * 测试回滚部署，正常测试
	 */
	@Test
	public void testRollbackDeploy(){

		Response upodateDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.post("http://localhost:8080/restapi/deploy/action/rollback?deployId="+deployId+"&version=1&replicas=2");
		
		String status = "";
		
		while(true){
			try {
				Thread.sleep(3000L);
			} catch (InterruptedException e) {
				
			}
			System.out.println(status);
			if("RUNNING".equals(status)) break;
			Response getDeployStatus = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.get("http://localhost:8080/restapi/deploy/id/"+deployId);
			
			status = getDeployStatus.jsonPath().getString("result.deploymentStatus");
			
		}
	
	}
	
	/**
	 * 测试回滚部署，部署不存在
	 */
	@Test
	public void testRollbackDeploy1(){

		Response rollbackDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/rollback?deployId="+0+"&version=1&replicas=1");
		
		int code = rollbackDeploy.body().jsonPath().get("resultCode");
		
		assertEquals(code, 403);	
		
	}
	
	/**
	 * 测试回滚部署，部署版本不存在
	 */
	@Test
	public void testRollbackDeploy2(){

		Response upodateDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(400))
				.when()
				.post("http://localhost:8080/restapi/deploy/action/rollback?deployId="+deployId+"&version=0&replicas=1");
		
	}
	
	
	@After
	public void setAfter(){
		
		String status = "";
		Response stopDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/stop?deployId="+deployId);
		
		while(true){
			try {
				Thread.sleep(3000L);
			} catch (InterruptedException e) {
	
			}
			if("STOP".equals(status)) break;
			Response getDeployStatus = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.get("http://localhost:8080/restapi/deploy/id/"+deployId);
			
			status = getDeployStatus.jsonPath().getString("result.deploymentStatus");
			
		}
		
		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/deploy/id/"+deployId);
		
		
		Response deleteLbService = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deleteService/11/default/adddeploy1/"+deployId);
		
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deletedeployandver/"+deployId);
		
		Response deleteDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);
	}

}
