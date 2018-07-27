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

public class MigrateDeployment {

	private int oldDeployCollectionId; 
	private int newDeployCollectionId; 
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
		
		oldDeployCollectionId = create1.body().jsonPath().getInt("result.result.id");
		
		String parameter2 = "{\"name\":\"createdeploy2\",\"creatorId\":\"11\"}";
		
		Response create2 = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter2)
				.post("http://localhost:8080/restapi/deploycollection");
		
		newDeployCollectionId = create2.body().jsonPath().getInt("result.result.id");
		
			deploymentDraft = new DeploymentDraft();
			deploymentDraft.setDeployName("testcreate");
			deploymentDraft.setCreatorId(1);
			deploymentDraft.setNamespace("default");
			deploymentDraft.setClusterId(11);
			deploymentDraft.setHostEnv(HostEnv.TEST);
			deploymentDraft.setDeploymentType(DeploymentType.DEPLOYMENT);
			deploymentDraft.setNetworkMode(NetworkMode.DEFAULT);
			deploymentDraft.setReplicas(1);
			deploymentDraft.setCollectionId(oldDeployCollectionId);
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
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.get("http://localhost:8080/restapi/deploy/migrate/"+deployId+"/"+newDeployCollectionId);
		
		Response deployGet = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.expect()
				.body("result.collectionId", equalTo(newDeployCollectionId))
				.when()
				.get("http://localhost:8080/restapi/test/selectResource/"+deployId);	
		
	}
	
	/**
	 * 接口测试，部署Id不存在测试
	 */
	@Test
	public void testListDeployCollection2(){
		

		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(1210))
				.body("resultMsg", equalTo("DEPLOY_COLLECTION_NOT_EXIST:null"))
				.when()
				.get("http://localhost:8080/restapi/deploy/migrate/"+deployId+"/"+0);
		
	}
	
	/**
	 * 接口测试，迁移后Id原Id相同
	 */
	@Test
	public void testListDeployCollection3(){
		

		Response deploy = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.expect()
				.body("resultCode", equalTo(1211))
				.body("resultMsg", equalTo("DEPLOY_IN_DEPLOY_COLLECTION:null"))
				.when()
				.get("http://localhost:8080/restapi/deploy/migrate/"+deployId+"/"+oldDeployCollectionId);
		
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
				.delete("http://localhost:8080/restapi/test/"+oldDeployCollectionId);
		
		Response deleteNewDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("admin","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+newDeployCollectionId);
	}
}
