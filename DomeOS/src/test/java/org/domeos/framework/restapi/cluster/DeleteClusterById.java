package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class DeleteClusterById
{

	public static void main(String[] args)
	{
		System.out.print("1.3删除集群");
		String url="http://192.168.100.103:8080/restapi/cluster/16";
		ClientUtil.httpDelete(url);
	}

}
