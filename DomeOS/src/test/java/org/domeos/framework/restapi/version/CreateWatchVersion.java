package org.domeos.framework.restapi.version;

import java.util.ArrayList;
import java.util.List;

import org.domeos.framework.api.consolemodel.deployment.ContainerDraft;
import org.domeos.framework.api.consolemodel.deployment.VersionDraft;
import org.domeos.framework.api.model.deployment.related.ImagePullPolicy;
import org.domeos.framework.api.model.deployment.related.LabelSelector;
import org.domeos.framework.api.model.deployment.related.VersionType;
import org.domeos.framework.restapi.util.ClientUtil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.sf.json.JSONObject;

 

public class CreateWatchVersion
{

	public static void main(String[] args) throws JsonProcessingException
	{
		System.out.print("7.1.1 升级监听器部署版本");
		String url="http://localhost:8080/restapi/version/create?deployId=112";
		VersionDraft version=new VersionDraft();
		
		//{"ver":1,"fqcn":"org.domeos.framework.api.consolemodel.deployment.VersionDraft","deployId":112,"version":2,"containerDrafts":[{"registry":"https://192.168.101.85","image":"library/kube_event_watcher","tag":"0.9.0","cpu":0.0,"mem":0.0,"cpuRequest":0.0,"memRequest":0.0,"imagePullPolicy":"Always","autoDeploy":false,"args":["--apiserver=https://192.168.100.187:6443","--in-cluster=false","--port=8080","--clusterId=11","--domeosServer=http://192.168.100.103:8080/api/k8sevent/report"]}],"labelSelectors":[{"name":"eee","content":"USER_LABEL_VALUE"}],"versionType":"WATCHER","deprecate":false}		
		List<ContainerDraft> containerDrafts=new ArrayList<ContainerDraft>();
		ContainerDraft containerDraft=new ContainerDraft();
		List<String> arg=new ArrayList<String>();
		arg.add("--apiserver=https://192.168.100.187:6443");
		arg.add("--in-cluster=false");
		arg.add("--port=8080");
		arg.add("--clusterId=11");
		arg.add("--domeosServer=http://192.168.100.103:8080/api/k8sevent/report");
		containerDraft.setArgs(arg);
		containerDraft.setAutoDeploy(false);
		containerDraft.setCpu(0.0);
		containerDraft.setRegistry("https://192.168.101.85");
		containerDraft.setImage("library/kube_event_watcher");
		containerDraft.setMem(0.0);
		containerDraft.setTag("0.9.0");
		containerDraft.setImagePullPolicy(ImagePullPolicy.Always);
		 
		
		containerDrafts.add(containerDraft);
		
		version.setContainerDrafts(containerDrafts);		
		version.setVersionType(VersionType.WATCHER);
		//version.setVer(1);
		//version.setFqcn("org.domeos.framework.api.consolemodel.deployment.VersionDraft");
		version.setDeprecate(false);
		//version.setVersion(3);
		version.setDeployId(112);
		
		List<LabelSelector> labelSelectors=new ArrayList<LabelSelector>();
		LabelSelector lab=new LabelSelector();
		lab.setContent("USER_LABEL_VALUE");
		lab.setName("eee");
		labelSelectors.add(lab);
		version.setLabelSelectors(labelSelectors);
		JSONObject json= JSONObject.fromObject(version) ;
		 
        
	 
		ClientUtil.httpPost(url, json.toString());
	}

}
