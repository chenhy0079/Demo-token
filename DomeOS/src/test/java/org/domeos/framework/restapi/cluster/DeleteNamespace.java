package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class DeleteNamespace
{

	public static void main(String[] args)
	{
		System.out.print("2.3删除namespace");
		String url="http://192.168.100.103:8080/restapi/cluster/11/namespace/xx";
		ClientUtil.httpDelete(url);

	}

}
