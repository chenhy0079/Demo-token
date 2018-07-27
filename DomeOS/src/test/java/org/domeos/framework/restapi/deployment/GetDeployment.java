package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

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

public class GetDeployment {
	private int deployCollectionId; 
	private int deployId;
	private DeploymentDraft deploymentDraft;
	
	@Before
	public void setBefore(){
		String parameter = "{\"name\":\"createdeploy\",\"creatorId\":\"11\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.post("http://localhost:8080/restapi/deploycollection");
		
		deployCollectionId = create.body().jsonPath().getInt("result.result.id");
		
			deploymentDraft = new DeploymentDraft();
			deploymentDraft.setDeployName("testcreate");
			deploymentDraft.setCreatorId(1);
			deploymentDraft.setNamespace("default");
			deploymentDraft.setClusterId(11);
			deploymentDraft.setHostEnv(HostEnv.TEST);
			deploymentDraft.setDeploymentType(DeploymentType.DEPLOYMENT);
			deploymentDraft.setNetworkMode(NetworkMode.DEFAULT);
			deploymentDraft.setReplicas(1);
			deploymentDraft.setCollectionId(deployCollectionId);
			deploymentDraft.setPodSpecStr("111");
			List<ContainerConsole> asList = Arrays.asList(new ContainerConsole());
			deploymentDraft.setContainerConsoles(asList);
			LabelSelector labelSelector = new LabelSelector();
			labelSelector.setName("bbb");
			labelSelector.setContent("USER_LABEL_VALUE");
			List<LabelSelector> ls = Arrays.asList(labelSelector);
			deploymentDraft.setLabelSelectors(ls);
			deploymentDraft.setLogDraft(new LogDraft());
			deploymentDraft.setExposePortNum(11111);
			ObjectMapper objectMapper = new ObjectMapper();
	       
			String dep = null;
			try {
				dep = objectMapper.writeValueAsString(deploymentDraft);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			Response addr = given()
					.header("Authorization",ClientUtil.Auth("admin","admin"))
					.contentType("application/json;charset=UTF-8")
					.body(dep)
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
				.expect()
				.body("resultCode", equalTo(200))
				.body("result.deployName", equalTo(deploymentDraft.getDeployName()))
				.body("result.clusterId", equalTo(deploymentDraft.getClusterId()))
				.body("result.deploymentStatus", equalTo("STOP"))
				.body("result.defaultReplicas", equalTo(deploymentDraft.getReplicas()))
				.body("result.namespace", equalTo(deploymentDraft.getNamespace()))
				.body("result.networkMode", equalTo(deploymentDraft.getNetworkMode().toString()))
				.body("result.versionType", equalTo(deploymentDraft.getVersionType().toString()))
				.body("result.deploymentType", equalTo(deploymentDraft.getDeploymentType().toString()))
				.body("result.exposePortNum", equalTo(deploymentDraft.getExposePortNum()))
				.when()
				.get("http://localhost:8080/restapi/deploy/id/"+deployId);	
		
	}
	
	/**
	 * 接口测试，部署Id不存在测试
	 */
	@Test
	public void testListDeployCollection2(){
		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.expect()
				.body("resultCode", equalTo(1201))
				.body("resultMsg", equalTo("DEPLOYMENT_NOT_EXIST:null"))
				.when()
				.get("http://localhost:8080/restapi/deploy/id/"+0);	
		
	}
	
	@After
	public void setAfter(){
		
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/deletedeployandver/"+deployId);
		
		Response deleteDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);
	}
}
