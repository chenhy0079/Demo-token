package org.domeos.framework.restapi.deployment;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import io.restassured.response.Response;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;


import org.domeos.framework.restapi.util.ClientUtil;
import org.domeos.framework.api.consolemodel.deployment.ContainerConsole;
import org.domeos.framework.api.consolemodel.deployment.DeploymentDraft;
import org.domeos.framework.api.model.deployment.related.DeploymentType;
import org.domeos.framework.api.model.deployment.related.HostEnv;
import org.domeos.framework.api.model.deployment.related.LabelSelector;
import org.domeos.framework.api.model.deployment.related.LogDraft;
import org.domeos.framework.api.model.deployment.related.NetworkMode;
import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author chenhy
 * 测试部署相关接口
 *
 */
public class TestDeployment {
	
	
	/**
	 * 获取YAML/JSON配置
	 */
	@Test
	public void testGetRCStr(){
		
		String parameter = "{\"deployName\":\"cusman187\",\"createTime\":\"1528339709378\","
				+ "\"creatorId\":\"1\","
				+ "\"namespace\":\"default\","
				+ "\"clusterId\":\"11\","
				+ "\"hostEnv\":\"TEST\","
				+ "\"deploymentType\":\"DEPLOYMENT\","
				+ "\"networkMode\":\"DEFAULT\","
				+ "\"replicas\":\"1\","
				+ "\"collectionId\":\"17\","
				+ "\"VersionType\":\"CUSTOM\""
				+"}";
		
		Response response = given()
				.header("Authorization",ClientUtil.Auth())
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.post("http://localhost:8080/restapi/deploy/deploymentstr");
		
		response.print();
	}
	
	
	/**
	 * 创建部署
	 * @throws Exception 
	 */
	@Test
	public void testCreateDeployment() throws Exception{
		String url = "http://localhost:8080/restapi/deploy/create";
		DeploymentDraft deploymentDraft = new DeploymentDraft();
		deploymentDraft.setDeployName("testdaemonset");
		deploymentDraft.setCreatorId(1);
		deploymentDraft.setNamespace("default");
		deploymentDraft.setClusterId(11);
		deploymentDraft.setHostEnv(HostEnv.TEST);
		deploymentDraft.setDeploymentType(DeploymentType.DAEMONSET);
		deploymentDraft.setNetworkMode(NetworkMode.DEFAULT);
		deploymentDraft.setReplicas(1);
		deploymentDraft.setCollectionId(17);
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
        String parameter = objectMapper.writeValueAsString(deploymentDraft);
		ClientUtil.httpPost(url, parameter);
	}
	
	/**
	 * 修改部署描述
	 */
	@Test
	public void testModifyDeploymentDescription(){
		String url = "http://localhost:8080/restapi/deploy/id/109/description";
		String parameter = "222";
		ClientUtil.httpPut(url, parameter);
	}
	
	
	/**
	 * 迁移部署
	 */
	@Test
	public void testMigrateDeployment(){
		String url = "http://localhost:8080/restapi/deploy/migrate/109/9";
		ClientUtil.httpGet(url);
	}
	
	
	/**
	 * 删除部署
	 */
	@Test
	public void testRemoveDeployment(){
		String url = "http://localhost:8080/restapi/deploy/id/111";
		ClientUtil.httpDelete(url);
	}
	
	
	/**
	 * 查询单个部署信息
	 */
	@Test
	public void testGetDeployment(){
		String url = "http://localhost:8080/restapi/deploy/id/108";
		ClientUtil.httpGet(url);
	}
	
	/**
	 * 查询所有部署信息
	 */
	@Test
	public void testListDeployment(){
		String url = "http://localhost:8080/restapi/deploy/list";
		ClientUtil.httpGet(url);
	}
	
	/**
	 * 启动部署
	 */
	
	@Test
	public void testStartDeployment(){
		String url = "http://localhost:8080/restapi/deploy/action/start";
		HashMap<String, String> parameter = new HashMap<String,String>();
		parameter.put("deployId", "106");
		parameter.put("version", "1");
		parameter.put("replicas", "1");
		ClientUtil.httpPost(url,parameter);
	}
	
	/**
	 * 中断部署
	 */
	@Test
	public void testAbortDeployOperation(){
		String url = "http://localhost:8080/restapi/deploy/action/abort";
		String parameter = "106";
		ClientUtil.httpPost(url,parameter);
	}
	
	/**
	 * 停止部署
	 */
	
	@Test
	public void testStopDeployment(){
		String url = "http://localhost:8080/restapi/deploy/action/stop";
		HashMap<String, String> parameter = new HashMap<String,String>();
		parameter.put("deployId", "108");
		ClientUtil.httpPost(url,parameter);
	}
	
	/**
	 * 升级部署
	 */
	
	@Test
	public void testStartUpdate(){
		String url = "http://localhost:8080/restapi/deploy/action/update?deployId=101&version=2&replicas=1";
		ClientUtil.httpPost(url,"");
	}
	
	
	/**
	 * 回滚部署
	 */
	@Test
	public void testStartRollback(){
		String url = "http://localhost:8080/restapi/deploy/action/rollback?deployId=101&version=2&replicas=1";
		ClientUtil.httpPost(url,"");
	}
	
	/**
	 * 扩容部署
	 */
	
	@Test
	public void testScaleupDeployment(){
		String url = "http://localhost:8080/restapi/deploy/action/scaleup";
		HashMap<String, String> parameter = new HashMap<String,String>();
		parameter.put("deployId", "109");
		parameter.put("version", "1");
		parameter.put("replicas", "2");
		ClientUtil.httpPost(url,parameter);
	}
	
	/**
	 * 缩容部署
	 */
	
	@Test
	public void testScaledownDeployment(){
		String url = "http://localhost:8080/restapi/deploy/action/scaledown";
		HashMap<String, String> parameter = new HashMap<String,String>();
		parameter.put("deployId", "109");
		parameter.put("version", "1");
		parameter.put("replicas", "1");
		ClientUtil.httpPost(url,parameter);
	}
	
	/**??
	 * daemonSet类型部署扩容缩容
	 */
	
	@Test
	public void testScaleDaemonSet(){
		String url = "http://localhost:8080/restapi/deploy/action/daemonset/scales?deployId=114&version=1";
		String parameter = "[{\"name\":\"bbb\",\"content\":\"USER_LABEL_VALUE\"}]";
		ClientUtil.httpPost(url,parameter);
	}
	
	/**
	 * 查询某个部署的事件信息列表（部署事件和k8s事件）
	 */
	
	@Test
	public void testListDeployEvent(){
		String url = "http://localhost:8080/restapi/deploy/event/list?deployId=109";
		ClientUtil.httpGet(url);
	}
	
	/**
	 * 对内服务网络访问设置
	 */
	
	@Test
	public void testModifyInnerService(){
		String url = "http://localhost:8080/restapi/deploy/id/108/loadbalancer";
		String parameter = "{"
				+ "\"loadBalancerPorts\":[{"
				+ "\"port\":\"8888\","
				+ "\"targetPort\":\"8888\","
				+ "\"protocol\":\"TCP\""
				+ "}],"
				+ "\"sessionAffinity\":\"false\""
				+ "}";
		ClientUtil.httpPut(url,parameter);
	}
	
	/**
	 * 查询部署负载均衡
	 */
	
	@Test
	public void testListLoadBalancer(){
		String url = "http://localhost:8080/restapi/deploy/id/108/loadbalancer";
		ClientUtil.httpGet(url);
	}
	
	/**
	 * 根据部署id查询实例列表
	 */
	
	@Test
	public void testListPodsByDeployId(){
		String url = "http://localhost:8080/restapi/deploy/109/instance";
		ClientUtil.httpGet(url);
	}
	
	/**
	 * 根据实例名和部署id删除实例（实例重启）
	 */
	
	@Test
	public void testRemovePodByDeployIdAndPodName(){
		String url = "http://localhost:8080/restapi/deploy/{id}/instance";
		ClientUtil.httpDelete(url);
	}

}
