package org.domeos.framework.restapi.version;

import org.domeos.framework.restapi.util.ClientUtil;

public class ListVersion
{

	public static void main(String[] args)
	{
		System.out.print("7.5查询部署的版本列表");
		String url="http://localhost:8080/restapi/version/list?deployId=101";
		ClientUtil.httpGet(url);
	}

}
