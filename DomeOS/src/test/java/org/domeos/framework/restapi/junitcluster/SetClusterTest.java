package org.domeos.framework.restapi.junitcluster;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.Assert;
import org.junit.Test;

import net.sf.json.JSONObject;

public class SetClusterTest
{
    
	@Test
	public void SetCluster()
	{
		System.out.print("1.1 创建集群");
		String url="http://localhost:8080/restapi/cluster";
		String parameter="{\"api\":\"https://192.168.100.103:6443\","
				+ "\"buildConfig\":0,"
				+ "\"clusterLog\":{\"imageName\":\"pub.domeos.org/domeos-flume\",\"imageTag\":\"1.1\",\"kafka\":\"http://192.168.101.88:9092\",\"zookeeper\":\"http://192.168.101.88:3181\"},"
				+ "\"description\":\"测试\","
				+ "\"dns\":\"192.168.100.103\","
				+ "\"domain\":\"cluster.local.\","
				+ "\"etcd\":\"https://192.168.100.103:2379\","
				+ "\"logConfig\":1,"
				+ "\"name\":\"集群test\","
				+ "\"oauthToken\":\"ss\","
				+ "\"ownerName\":\"admin\","
				+ "\"password\":\"test1234\","
				+ "\"tag\":\"1.0\","
				+ "\"username\":\"admin\"}";
	String restul=ClientUtil.httpPost(url, parameter);
	JSONObject json=JSONObject.fromObject(restul);
	
	Assert.assertEquals("200", json.get("resultCode"));
	Assert.assertEquals("OK", json.get("resultMsg"));	
	}

}
