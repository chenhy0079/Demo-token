package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetInstanceListByClusterIdWithLabels
{

	public static void main(String[] args)
	{
		System.out.print("1.9根据集群id和lables查询集群的实例列表");
		String url="http://192.168.100.103:8080/restapi/cluster/11/instancelistwithlabels/aaa";
		ClientUtil.httpGet(url);
	}

}
