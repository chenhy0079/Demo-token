package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetClusterById
{

	public static void main(String[] args)
	{
		System.out.print("1.4查询单个集群信息");
		String url="http://192.168.100.103:8080/restapi/cluster/15";
		ClientUtil.httpGet(url);

	}

}
