package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.HashMap;

import io.restassured.response.Response;

public class AbortDeploymentOperation {
	
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
				.post("http://localhost:8080/restapi/deploy/create");
		
		deployId = deploy.body().jsonPath().getInt("result");
	}
	
	/**
	 * 测试启动部署，中断部署
	 */
	
	@Test
	public void testabortDeploy(){
		
		Response startDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/start?deployId="+deployId+"&version=1&replicas=1");
		
		Response Deploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.post("http://localhost:8080/restapi/deploy/action/abort?deployId="+deployId);
		
		String status = "";
		
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
			
	}
	
	/**
	 * 测试启动服务，部署不存在(当前用户无权限)
	 */
	
	@Test
	public void testabortDeploy2(){
		
		Response abortDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/abort?deployId="+0+"&version=1&replicas=1");
		
		int code = abortDeploy.body().jsonPath().get("resultCode");
		
		assertEquals(code, 403);
		
		abortDeploy.print();
			
	}

	@After
	public void setAfter(){
		
		
		Response stopDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/stop?deployId="+deployId);
		
		String status = "";
		
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
				.delete("http://localhost:8080/restapi/test/deleteService/11/default/addtest3/"+deployId);
		
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
