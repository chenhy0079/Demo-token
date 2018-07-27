package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import io.restassured.response.Response;

public class CreateDeployment {
	
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
	}
	
	/**
	 * 测试创建，正常创建部署
	 */
	
	@Test
	public void testCreateDeploy(){
	
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
					+ "\"creatorId\": 1, "
					+ "\"deployName\": \"createdeploy\","
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
				
				deploy.print();
	}
	
	/**
	 * 测试创建部署，部署名已存在
	 */
	@Test
	public void testCreateDeploy2(){
	
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
					+ "\"creatorId\": 1, "
					+ "\"deployName\": \"createdeploy\","
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
				
				Response deploy2 = given()
						.header("Authorization",ClientUtil.Auth("testuser","admin"))
						.contentType("application/json;charset=UTF-8")
						.body(parameter)
						.expect()
						.body("resultCode", equalTo(1203))
						.body("resultMsg", equalTo("DEPLOYMENT_EXIST:null"))
						.when()
						.post("http://localhost:8080/restapi/deploy/create");
				
	}
	
	/**
	 * 测试创建部署，当前用户没有权限操作当前部署
	 */
	@Test
	public void testCreateDeploy3(){
	
			String parameter = "{\"accessType\": \"DIY\","
					+ "\"clusterId\": 11, "
					+ "\"collectionId\": "+0+","
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
					+ "\"creatorId\": 1, "
					+ "\"deployName\": \"createdeploy\","
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
				
				Response deploy2 = given()
						.header("Authorization",ClientUtil.Auth("testuser","admin"))
						.contentType("application/json;charset=UTF-8")
						.body(parameter)
						.post("http://localhost:8080/restapi/deploy/create");
				
				int code = deploy2.body().jsonPath().get("resultCode");
				
				assertEquals(code, 403);
		
	}
	
	
	

	@After
	public void setAfter(){
		
		/*Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/deploy/id/"+deployId);
		
		Response deleteLbService = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deleteService/11/default/tt33createdeploy/"+deployId);
		
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deletedeployandver/"+deployId);
		
		Response deleteDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);*/
				
				
	}
}
