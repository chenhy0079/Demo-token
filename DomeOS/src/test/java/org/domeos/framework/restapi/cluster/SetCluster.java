package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class SetCluster
{

	public static void main(String[] args)
	{
		System.out.print("1.1 创建集群");
		String url="http://192.168.100.103:8080/restapi/cluster";
		String parameter="{\"api\":\"sss\","
				+ "\"buildConfig\":0,"
				+ "\"clusterLog\":{\"imageName\":\"sss\",\"imageTag\":\"dd\",\"kafka\":\"ss\",\"zookeeper\":\"xx\"},"
				+ "\"description\":\"aaas\","
				+ "\"dns\":\"asas\","
				+ "\"domain\":\"asas\","
				+ "\"etcd\":\"sssas\","
				+ "\"logConfig\":1,"
				+ "\"name\":\"121\","
				+ "\"oauthToken\":\"ss\","
				+ "\"ownerName\":\"ss\","
				+ "\"password\":\"ss\","
				+ "\"tag\":\"ss\","
				+ "\"username\":\"aaa\"}";
		ClientUtil.httpPost(url, parameter);
	}

}
