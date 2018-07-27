package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class DeleteNodeLabels
{

	public static void main(String[] args)
	{
		System.out.print("3.5删除主机标签");
		String url="http://192.168.100.103:8080/restapi/cluster/11/nodelabels/delete";
		String parameter=" [{\"node\":\"192.168.100.187\",\"labels\":{\"test\":\"USER_LABEL_VALUE\"}}]";
		ClientUtil.httpPost(url, parameter);
	}

}
