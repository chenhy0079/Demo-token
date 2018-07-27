package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
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

public class GetDeploymentEvent {

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
				+ "\"cpu\": 0.5,"
				+ "\"cpuRequest\": 0,"
				+ " \"image\": \"library/nginx\","
				+ "\"imagePullPolicy\": \"Always\", "
				+ "\"mem\": 1024, "
				+ "\"registry\": "
				+ "\"https://192.168.101.85\","
				+ "\"tag\": \"1.8.0\" "
				+ "}],"
				+ "\"creatorId\": 11, "
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
	}
	
	
	/**
	 * 接口测试，正常测试
	 */
	@Test
	public void testListDeployEvent(){
		
		Response startDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/start?deployId="+deployId+"&version=1&replicas=1");
		
		Response getDeployevent = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploy/event/list?deployId="+deployId);
		
		ArrayList<String> listDeploy = (ArrayList<String>)getDeployevent.jsonPath().get("result.eid");
		
		assertEquals(listDeploy.size(), 1);
		
	}
	
	/**
	 * 接口测试，测试不是Id不存在
	 */
	@Test
	public void testListDeployEvent2(){
		
		Response startDeploy = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.post("http://localhost:8080/restapi/deploy/action/start?deployId="+deployId+"&version=1&replicas=1");
		
		Response getDeployevent = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(400))
				.body("resultMsg", equalTo("PARAM_ERROR:no such deploy in database"))
				.when()
				.get("http://localhost:8080/restapi/deploy/event/list?deployId="+0);
		
	}
	
	
	
	@After
	public void setAfter(){

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
