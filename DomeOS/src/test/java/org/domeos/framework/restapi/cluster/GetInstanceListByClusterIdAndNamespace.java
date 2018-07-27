package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetInstanceListByClusterIdAndNamespace
{

	public static void main(String[] args)
	{
		System.out.print("1.8根据集群id和namespace查询集群的实例列表");
		String url="http://192.168.100.103:8080/restapi/cluster/11/default/instancelist";
		ClientUtil.httpGet(url);
	}

}
