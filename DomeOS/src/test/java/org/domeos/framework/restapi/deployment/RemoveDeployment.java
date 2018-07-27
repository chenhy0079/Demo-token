package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import java.util.Arrays;
import java.util.List;

import org.domeos.framework.api.consolemodel.deployment.ContainerConsole;
import org.domeos.framework.api.consolemodel.deployment.DeploymentDraft;
import org.domeos.framework.api.model.deployment.related.DeploymentType;
import org.domeos.framework.api.model.deployment.related.HostEnv;
import org.domeos.framework.api.model.deployment.related.LabelSelector;
import org.domeos.framework.api.model.deployment.related.LogDraft;
import org.domeos.framework.api.model.deployment.related.NetworkMode;
import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.restassured.response.Response;

public class RemoveDeployment {

	private int deployCollectionId; 
	private int deployId;
	private DeploymentDraft deploymentDraft;
	
	@Before
	public void setBefore(){
		String parameter1 = "{\"name\":\"createdeploy1\",\"creatorId\":\"11\"}";
		
		Response create1 = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter1)
				.post("http://localhost:8080/restapi/deploycollection");
		
		deployCollectionId = create1.body().jsonPath().getInt("result.result.id");
		
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
	       
			Response addr = given()
					.header("Authorization",ClientUtil.Auth("admin","admin"))
					.contentType("application/json;charset=UTF-8")
					.body(parameter)
					.post("http://localhost:8080/restapi/deploy/create");
			
			deployId = addr.body().jsonPath().getInt("result");
			
			
	}
	
	
	/**
	 * 接口测试，正常测试
	 */
	@Test
	public void testListDeployCollection(){
		
		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.delete("http://localhost:8080/restapi/deploy/id/"+deployId);
		
		Response deployGet = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.expect()
				.body("resultCode", equalTo(1201))
				.body("resultMsg", equalTo("DEPLOYMENT_NOT_EXIST:null"))
				.when()
				.get("http://localhost:8080/restapi/deploy/id/"+deployId);	
		
	}
	
	/**
	 * 接口测试，部署Id不存在
	 */
	@Test
	public void testListDeployCollection2(){
		
		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(1201))
				.body("resultMsg", equalTo("DEPLOYMENT_NOT_EXIST:null"))
				.when()
				.delete("http://localhost:8080/restapi/deploy/id/"+0);
	}
	
	
	
	@After
	public void setAfter(){
		
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deletedeployandver/"+deployId);
		
		Response deleteOldDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);
		
	}
}
