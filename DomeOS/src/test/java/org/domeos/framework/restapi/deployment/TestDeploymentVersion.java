package org.domeos.framework.restapi.deployment;

import java.util.HashMap;

import org.domeos.framework.api.consolemodel.deployment.VersionDraft;
import org.domeos.framework.api.model.cluster.related.ClusterLog;
import org.domeos.framework.api.model.deployment.related.HostEnv;
import org.domeos.framework.api.model.deployment.related.NetworkMode;
import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;


/**
 * 
 * @author chenhy
 * 测试部署版本
 *
 */
public class TestDeploymentVersion {

	/**
	 * 升级部署版本
	 * @throws Exception 
	 */
	@Test
	public void testCreateVersion() throws Exception{
		String url = "http://localhost:8080/restapi/version/create?deployId=110";
		VersionDraft versionDraft = new VersionDraft();
		versionDraft.setDeployId(110);
		Gson gson = new Gson();
		String parameter = gson.toJson(versionDraft);
		ClientUtil.httpPost(url, parameter);
	}
	
	/**
	 * 废弃部署版本
	 */
	
	@Test
	public void testDeprecateVersionById(){
		String url = "http://localhost:8080/restapi/version/110/1/deprecate";
		ClientUtil.httpDelete(url);
	}
	
	/**
	 * 还原部署版本
	 */
	@Test
	public void testEnableVersionById(){
		String url = "http://localhost:8080/restapi/version/110/1/enable";
		ClientUtil.httpPut(url,"");
	}
	
	/**
	 * 根据部署id和版本id获取部署版本信息
	 */
	@Test
	public void testGetVersion(){
		String url = "http://localhost:8080/restapi/version/id/110/1";
		ClientUtil.httpGet(url);
	}
	
	/**？？
	 * 根据部署id和版本id获取部署版本信息
	 */
	@Test
	public void testListVersion(){
		String url = "http://localhost:8080/restapi/version/list?deployId=110";
		ClientUtil.httpGet(url);
	}
}
