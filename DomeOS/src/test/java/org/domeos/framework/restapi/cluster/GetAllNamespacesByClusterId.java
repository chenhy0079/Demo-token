package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetAllNamespacesByClusterId
{

	public static void main(String[] args)
	{
		System.out.print("2.1查询某个集群的namespace列表");
		String url="http://192.168.100.103:8080/restapi/cluster/11/namespace";
		ClientUtil.httpGet(url);
	}

}
