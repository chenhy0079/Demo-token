package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;

import org.domeos.framework.api.model.deployment.related.LoadBalancerForDeployDraft;
import org.domeos.framework.api.model.loadBalancer.related.LoadBalancerPort;
import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import io.restassured.response.Response;

public class ModifyInnerService {

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
				+ "\"deployName\": \"tt33createdeploy\","
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
			addr.print();
			
			deployId = addr.body().jsonPath().getInt("result");
			
	}
	
	/**
	 * 测试接口，正常测试，
	 */
	
	@Test
	public void test1(){
		LoadBalancerForDeployDraft lb = new LoadBalancerForDeployDraft();
		lb.setSessionAffinity(false);
		LoadBalancerPort lbp = new LoadBalancerPort();
		lb.setLoadBalancerPorts(Arrays.asList(lbp));
		lbp.setPort(11111);
		lbp.setTargetPort(22222);
		
		Gson gson = new Gson();
		
		String parameter = gson.toJson(lb);
		
		Response deployLb = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.put("http://localhost:8080/restapi/deploy/id/"+deployId+"/loadbalancer");
		
		Response getDeployLa = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.get("http://localhost:8080/restapi/deploy/id/"+deployId+"/loadbalancer");
	
		ArrayList<Integer> list = (ArrayList<Integer>)getDeployLa.body().jsonPath().get("result.lbId");
		
		assertEquals(list.size(), 1);
	}
	
	
	@After
	public void setAfter(){
		
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
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);
	}
}
