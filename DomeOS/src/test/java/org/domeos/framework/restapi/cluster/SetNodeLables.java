package org.domeos.framework.restapi.cluster;

import org.domeos.framework.restapi.util.ClientUtil;

public class SetNodeLables
{

	public static void main(String[] args)
	{
		System.out.print("3.2添加主机标签/添加工作场景");
		String url="http://192.168.100.103:8080/restapi/cluster/11/nodelabels/add";
		String parameter="[{\"labels\":{\"test\":\"USER_LABEL_VALUE\" },\"node\": \"192.168.100.187\"}]";
		ClientUtil.httpPost(url, parameter);
	}

}
