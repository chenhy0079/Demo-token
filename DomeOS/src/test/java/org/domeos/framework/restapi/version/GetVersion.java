package org.domeos.framework.restapi.version;

import org.domeos.framework.restapi.util.ClientUtil;

public class GetVersion
{

	public static void main(String[] args)
	{
		System.out.print("7.4根据部署id和版本id获取部署版本信息");
		///restapi/version/{deployId}/{versionId}
		String url="http://localhost:8080/restapi/version/id/101/1";
		ClientUtil.httpGet(url);
	}

}
