package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetCluster
{

	public static void main(String[] args)
	{
		System.out.print("1.5查询所有集群信息");
		String url="http://192.168.100.103:8080/restapi/cluster";
		ClientUtil.httpGet(url);

	}

}
