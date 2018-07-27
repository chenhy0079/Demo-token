package org.domeos.framework.restapi.version;

import org.domeos.framework.restapi.util.ClientUtil;

public class EnableVersionById
{
	public static void main(String[] args)
	{
		System.out.print("7.3 还原部署版本");
		// /restapi/version/{deployId}/{versionId}/deprecate
		String url="http://localhost:8080/restapi/version/102/2/enable";
		String parameter="";
		ClientUtil.httpPut(url, parameter);

	}
}
