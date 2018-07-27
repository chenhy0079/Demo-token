package org.domeos.framework.restapi.junitcluster;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.Ignore;
import org.junit.Test;

public class JUnitClusterTest
{

	@Test
	public void SetCluster(){
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
		ClientUtil.httpPost(url, parameter);
		
	}
	
	@Test
	public void UpdateCluserById(){
		System.out.print("1.2 编辑集群");
		String url="http://localhost:8080/restapi/cluster";
		String parameter="{\"id\":\"15\",\"api\":\"sss\",\"buildConfig\":0,\"clusterLog\":{\"imageName\":\"sss\",\"imageTag\":\"dd\",\"kafka\":\"ss\",\"zookeeper\":\"xx\"},\"description\":\"dddas\",\"dns\":\"asas\",\"domain\":\"asas\",\"etcd\":\"sssas\",\"logConfig\":1,\"name\":\"121\",\"oauthToken\":\"ss\",\"ownerName\":\"ss\",\"password\":\"ss\",\"tag\":\"ss\",\"username\":\"aaa\"}";
		ClientUtil.httpPut(url, parameter);
	}
	
	@Test
	public void DeleteClusterById(){
		System.out.print("1.3删除集群");
		String url="http://localhost:8080/restapi/cluster/15";
		ClientUtil.httpDelete(url);
	}
	@Test
	public void GetClusterById(){
		System.out.print("1.4查询单个集群信息");
		String url="http://localhost:8080/restapi/cluster/15";
		ClientUtil.httpGet(url);
	}
	@Test
	public void GetCluster(){
		System.out.print("1.5查询所有集群信息");
		String url="http://localhost:8080/restapi/cluster";
		ClientUtil.httpGet(url);

	}
	@Test
	public void GetNodeListByClusterId(){
		System.out.print("1.6根据集群id查询集群的主机列表");
		String url="http://localhost:8080/restapi/cluster/11/nodelist";
		ClientUtil.httpGet(url);

	}
	@Test
	public void GetInstanceListByClusterId(){
		System.out.print("1.7根据集群id查询集群的实例列表");
		String url="http://localhost:8080/restapi/cluster/11/instancelist";
		ClientUtil.httpGet(url);
	}
	@Test
	public void GetInstanceListByClusterIdAndNamespace(){
		System.out.print("1.8根据集群id和namespace查询集群的实例列表");
		String url="http://localhost:8080/restapi/cluster/11/default/instancelist";
		ClientUtil.httpGet(url);
	}
	
	//忽略
	@Ignore
	public void GetInstanceListByClusterIdWithLabels(){
		System.out.print("1.9根据集群id和lables查询集群的实例列表");
		String url="http://localhost:8080/restapi/cluster/11/instancelistwithlabels/aaa";
		ClientUtil.httpGet(url);
	}
	
	@Test
	public void GetInstanceListByNodeName(){
		System.out.print("1.10根据集群id和主机名获取实例列表");
		String url="http://localhost:8080/restapi/cluster/11/nodelist/192.168.100.187";
		ClientUtil.httpGet(url);
	}
	
	@Test
	public void  GetAllNamespacesByClusterId(){
		System.out.print("2.1查询某个集群的namespace列表");
		String url="http://localhost:8080/restapi/cluster/11/namespace";
		ClientUtil.httpGet(url);
	}
	
	@Test
	public void  PutNamespacesByClusterId(){
		System.out.print("2.2创建某个集群的namespace");
		String parstemt="[\"xx\"]";
		/*List<String> list=new ArrayList<>();
		list.add("aaa");
		list.add("aaass");
		String json=JSONArray.fromObject(list).toString();
		System.out.print(json);*/
		String url="http://localhost:8080/restapi/cluster/11/namespace";
		ClientUtil.httpPost(url,parstemt);
	}
	
	
	@Test
	public void  DeleteNamespace(){
		System.out.print("2.3删除namespace");
		String url="http://localhost:8080/restapi/cluster/11/namespace/xx";
		ClientUtil.httpDelete(url);
	}
	
	@Test
	public void  AddHost(){
		System.out.print("3.1添加主机（生成执行脚本）");
		String url="http://localhost:8080/restapi/cluster/addhost";
		String parameter="{\"clusterId\": 11,\"dnsName\": \"test\",\"hostEnv\":\"PROD\",\"lables\": [ \"aa\",\"sssd\"],\"ostype\": \"centos\"}";
		ClientUtil.httpPost(url, parameter);
	}
	
	@Test
	public void  SetNodeLables(){
		System.out.print("3.2添加主机标签/添加工作场景");
		String url="http://localhost:8080/restapi/cluster/11/nodelabels/add";
		String parameter="[{\"labels\":{\"test\":\"USER_LABEL_VALUE\" },\"node\": \"192.168.100.187\"}]";
		ClientUtil.httpPost(url, parameter);
	}
	
	@Test
	public void  GetLabelsByClusterId(){

		System.out.print("3.3根据集群id获取主机标签列表");
		String url="http://localhost:8080/restapi/cluster/11/labels";
		ClientUtil.httpGet(url);
	}
	
	@Test
	public void  GetNodeByClusterIdAndName(){
		System.out.print("3.4根据集群id和主机名获取主机信息");
		String url="http://localhost:8080/restapi/cluster/11/node/192.168.100.187";
		ClientUtil.httpGet(url);
	}
	
	@Test
	public void  DeleteNodeLabels(){
		System.out.print("3.5删除主机标签");
		String url="http://localhost:8080/restapi/cluster/11/nodelabels/delete";
		String parameter=" [{\"node\":\"192.168.100.187\",\"labels\":{\"test\":\"USER_LABEL_VALUE\"}}]";
		ClientUtil.httpPost(url, parameter);
	}
	
	@Test
	public void  StartWactherInCluster(){
		System.out.print("4.1创建集群监听器");
		String url="http://localhost:8080/restapi/cluster/11/watcher/create";
		String parameter="{\"clusterId\":\"11\",\"namespace\":\"default\",\"creatorId\":\"1\",\"hostEnv\":\"TEST\",\"containerDrafts\":[{\"registry\":\"https://192.168.101.85\",\"image\":\"library/kube_event_watcher\",\"tag\":\"0.9.0\",\"cpu\":0.0,\"mem\":0.0,\"cpuRequest\":0.0,\"memRequest\":0.0,\"imagePullPolicy\":\"Always\",\"autoDeploy\":false}],\"labelSelectors\":[{\"name\":\"aaa\",\"content\":\"USER_LABEL_VALUE\"}]}";
		ClientUtil.httpPost(url, parameter);
	}
	
	@Test
	public void  GetWatcherStatus(){
		System.out.print("4.2查询集群监听器状态信息");
		String url="http://localhost:8080/restapi/cluster/11/watcher/status";
		ClientUtil.httpGet(url);
	}
}
