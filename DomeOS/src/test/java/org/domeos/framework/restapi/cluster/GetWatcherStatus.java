package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetWatcherStatus
{

	public static void main(String[] args)
	{
		System.out.print("4.2查询集群监听器状态信息");
		String url="http://192.168.100.103:8080/restapi/cluster/11/watcher/status";
		ClientUtil.httpGet(url);
	}

}
