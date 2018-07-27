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

public class ListPodsByDeployId {
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
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.contentType("application/json;charset=UTF-8")
					.body(parameter)
					.post("http://localhost:8080/restapi/deploy/create");
			
			deployId = addr.body().jsonPath().getInt("result");
			
	}
	

	/**
	 *测试接口，正常测试
	 */
	@Test
	public void test1(){
		Response pod = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploy/"+deployId+"/instance");
		
		ArrayList<Integer> pods = (ArrayList<Integer>)pod.jsonPath().get("result.podIp");
		
		assertEquals(pods.size(), 0);
	}
	
	/**
	 * 接口测试，当前用户没有查看权限或者不是Id不存在
	 */
	@Test
	public void test2(){
		
		Response pod = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.get("http://localhost:8080/restapi/deploy/"+0+"/instance");
		
		String code = pod.jsonPath().getString("resultCode");
		
		assertEquals(code,"403");
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
