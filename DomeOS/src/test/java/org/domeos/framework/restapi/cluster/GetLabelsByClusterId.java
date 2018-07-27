package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetLabelsByClusterId
{

	public static void main(String[] args)
	{
		System.out.print("3.3根据集群id获取主机标签列表");
		String url="http://192.168.100.103:8080/restapi/cluster/11/labels";
		ClientUtil.httpGet(url);
	}

}
