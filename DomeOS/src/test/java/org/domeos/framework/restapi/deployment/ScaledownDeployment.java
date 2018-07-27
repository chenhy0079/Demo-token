package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.restassured.response.Response;

public class ScaledownDeployment {
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
				.post("http://localhost:8080/restapi/deploy/action/start?deployId="+deployId+"&version=1&replicas=3");
		
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
	 * 测试部署，正常测试缩容部署
	 */
	@Test
	public void testScaledownDeploy(){

		Response upodateDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.post("http://localhost:8080/restapi/deploy/action/scaledown?deployId="+deployId+"&version=1&replicas=2");
		
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
	 * 测试部署，部署Id不存在或者用户没有操作当前部署的权限
	 */
	@Test
	public void testScaledownDeploy2(){

		Response scaleupDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/scaledown?deployId="+0+"&version=1&replicas=2");
		
		int code = scaleupDeploy.body().jsonPath().get("resultCode");
		
		assertEquals(code, 403);
		
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
	 * 测试部署，部署实例个数为-1(使用默认的实例个数为1)
	 */
	@Test
	public void testScaledownDeploy3(){

		Response scaleupDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/scaledown?deployId="+deployId+"&version=1&replicas=-1");
		
		int code = scaleupDeploy.body().jsonPath().get("resultCode");
		
		assertEquals(code, 500);
		
		
		String status = "";
		
		while(true){
			try {
				Thread.sleep(3000L);
			} catch (InterruptedException e) {
				
			}
			System.out.println(status);
			if("ERROR".equals(status)) break;
			Response getDeployStatus = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.get("http://localhost:8080/restapi/deploy/id/"+deployId);
			
			status = getDeployStatus.jsonPath().getString("result.deploymentStatus");
			
		}
	
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
