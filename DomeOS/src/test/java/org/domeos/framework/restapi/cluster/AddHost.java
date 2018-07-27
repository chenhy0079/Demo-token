package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class AddHost
{

	public static void main(String[] args)
	{
		System.out.print("3.1添加主机（生成执行脚本）");
		String url="http://192.168.100.103:8080/restapi/cluster/addhost";
		String parameter="{\"clusterId\": 11,\"dnsName\": \"test\",\"hostEnv\":\"PROD\",\"lables\": [ \"aa\",\"sssd\"],\"ostype\": \"centos\"}";
		ClientUtil.httpPost(url, parameter);
	}

}
