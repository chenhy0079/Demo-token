package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetInstanceListByNodeName
{

	public static void main(String[] args)
	{
		System.out.print("1.10根据集群id和主机名获取实例列表");
		String url="http://192.168.100.103:8080/restapi/cluster/11/nodelist/192.168.100.187";
		ClientUtil.httpGet(url);
	}

}
