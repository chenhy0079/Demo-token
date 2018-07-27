package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetNodeByClusterIdAndName
{

	public static void main(String[] args)
	{
		System.out.print("3.4根据集群id和主机名获取主机信息");
		String url="http://192.168.100.103:8080/restapi/cluster/11/node/192.168.100.187";
		ClientUtil.httpGet(url);

	}

}
