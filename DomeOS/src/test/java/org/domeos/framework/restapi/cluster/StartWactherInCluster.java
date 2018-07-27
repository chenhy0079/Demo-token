package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class StartWactherInCluster
{

	public static void main(String[] args)
	{
		System.out.print("4.1创建集群监听器");
		String url="http://192.168.100.103:8080/restapi/cluster/11/watcher/create";
		String parameter="{\"name\":\"187watcht\",\"clusterId\":\"11\",\"namespace\":\"default\",\"creatorId\":\"1\",\"hostEnv\":\"TEST\",\"containerDrafts\":[{\"registry\":\"https://192.168.101.85\",\"image\":\"library/kube_event_watcher\",\"tag\":\"0.9.0\",\"cpu\":0.0,\"mem\":0.0,\"cpuRequest\":0.0,\"memRequest\":0.0,\"imagePullPolicy\":\"Always\",\"autoDeploy\":false}],\"labelSelectors\":[{\"name\":\"aaa\",\"content\":\"USER_LABEL_VALUE\"}]}";

 		//,\"labelSelectors\":[{\"name\":\"\",\"content\":\"\"}]
		ClientUtil.httpPost(url, parameter);
	}

}
