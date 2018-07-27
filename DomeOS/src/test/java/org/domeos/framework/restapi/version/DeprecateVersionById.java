package org.domeos.framework.restapi.version;

import org.domeos.framework.restapi.util.ClientUtil;

public class DeprecateVersionById
{

	public static void main(String[] args)
	{
		System.out.print("7.2 废弃部署版本");
		// /restapi/version/{deployId}/{versionId}/deprecate
		String url="http://localhost:8080/restapi/version/112/2/deprecate";
	 
		ClientUtil.httpDelete(url);
	}

}
