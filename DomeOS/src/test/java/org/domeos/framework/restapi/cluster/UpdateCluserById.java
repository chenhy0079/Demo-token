package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class UpdateCluserById
{

	public static void main(String[] args)
	{
		System.out.print("1.2 编辑集群");
		String url="http://192.168.100.103:8080/restapi/cluster";
		String parameter="{\"id\":\"15\",\"api\":\"sss\",\"buildConfig\":0,\"clusterLog\":{\"imageName\":\"sss\",\"imageTag\":\"dd\",\"kafka\":\"ss\",\"zookeeper\":\"xx\"},\"description\":\"dddas\",\"dns\":\"asas\",\"domain\":\"asas\",\"etcd\":\"sssas\",\"logConfig\":1,\"name\":\"121\",\"oauthToken\":\"ss\",\"ownerName\":\"ss\",\"password\":\"ss\",\"tag\":\"ss\",\"username\":\"aaa\"}";
		ClientUtil.httpPut(url, parameter);
	}

}
