package org.domeos.framework.restapi.deploycollection;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.domeos.framework.api.consolemodel.deployment.ContainerConsole;
import org.domeos.framework.api.consolemodel.deployment.DeploymentDraft;
import org.domeos.framework.api.model.collection.CollectionResourceMap;
import org.domeos.framework.api.model.collection.related.ResourceType;
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
import com.google.gson.Gson;

import io.restassured.response.Response;

public class ListDeployment {
	
	private int deployCollectionId; 
	private List<Integer> list = new ArrayList<Integer>();
	
	@Before
	public void setBefore(){
		String parameter = "{\"name\":\"createdeploy\",\"creatorId\":\"11\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.post("http://localhost:8080/restapi/deploycollection");
		
		deployCollectionId = create.body().jsonPath().getInt("result.result.id");
		
		for(int i = 1;i<3;i++){
			
			String url = "http://localhost:8080/restapi/deploy/create";
			DeploymentDraft deploymentDraft = new DeploymentDraft();
			deploymentDraft.setDeployName("testcreate"+i);
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
			
			addr.print();
			
			int did = addr.body().jsonPath().getInt("result");
			
			list.add(did);
		}
	}
	
	@Test
	public void testListDeployCollection(){
		Response listDeployColl = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploy/list/"+deployCollectionId);
		
		ArrayList<String> listDeploy = (ArrayList<String>)listDeployColl.jsonPath().get("result.deployId");
		
		if(listDeploy.size()!=list.size()){
			throw new RuntimeException();
		}
		
	}
	
	@After
	public void setAfter(){
		for (Integer did : list) {
			
			Response deleteDeploy = given()
					.header("Authorization",ClientUtil.Auth("admin","admin"))
					.contentType("application/json;charset=UTF-8")
					.delete("http://localhost:8080/restapi/deploy/id/"+did);
			
			Response deleteTrue = given()
					.header("Authorization",ClientUtil.Auth("admin","admin"))
					.contentType("application/json;charset=UTF-8")
					.delete("http://localhost:8080/restapi/test/deletedeployandver/"+did);
		}
		
		Response deleteDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);
	}
	
	

}
