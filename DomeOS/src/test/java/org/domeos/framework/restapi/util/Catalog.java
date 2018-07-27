package org.domeos.framework.restapi.util;

import org.domeos.framework.restapi.cluster.AddHost;
import org.domeos.framework.restapi.cluster.DeleteClusterById;
import org.domeos.framework.restapi.cluster.DeleteNamespace;
import org.domeos.framework.restapi.cluster.DeleteNodeLabels;
import org.domeos.framework.restapi.cluster.GetAllNamespacesByClusterId;
import org.domeos.framework.restapi.cluster.GetCluster;
import org.domeos.framework.restapi.cluster.GetClusterById;
import org.domeos.framework.restapi.cluster.GetInstanceListByClusterId;
import org.domeos.framework.restapi.cluster.GetInstanceListByClusterIdAndNamespace;
import org.domeos.framework.restapi.cluster.GetInstanceListByClusterIdWithLabels;
import org.domeos.framework.restapi.cluster.GetInstanceListByNodeName;
import org.domeos.framework.restapi.cluster.GetLabelsByClusterId;
import org.domeos.framework.restapi.cluster.GetNodeByClusterIdAndName;
import org.domeos.framework.restapi.cluster.GetNodeListByClusterId;
import org.domeos.framework.restapi.cluster.GetWatcherStatus;
import org.domeos.framework.restapi.cluster.SetCluster;
import org.domeos.framework.restapi.cluster.SetNodeLables;
import org.domeos.framework.restapi.cluster.StartWactherInCluster;
import org.domeos.framework.restapi.cluster.UpdateCluserById;
import org.domeos.framework.restapi.version.CreateVersion;
import org.domeos.framework.restapi.version.DeprecateVersionById;
import org.domeos.framework.restapi.version.EnableVersionById;
import org.domeos.framework.restapi.version.GetVersion;
import org.domeos.framework.restapi.version.ListVersion;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Catalog
{

	public static void main(String[] args) throws JsonProcessingException{
		 ClientUtil.Auth("testuser","admin"); //创建token
		 SetCluster.main(args);//1.1 创建集群
		 UpdateCluserById.main(args);//1.2 编辑集群
		 DeleteClusterById.main(args);//1.3删除集群
		 GetClusterById.main(args);//1.4查询单个集群信息
		 GetCluster.main(args);//1.5查询所有集群信息
		 GetNodeListByClusterId.main(args);//1.6根据集群id查询集群的主机列表
		 GetInstanceListByClusterId.main(args);//1.7根据集群id查询集群的实例列表
		 GetInstanceListByClusterIdAndNamespace.main(args);//1.8根据集群id和namespace查询集群的实例列表
		 GetInstanceListByClusterIdWithLabels.main(args);//1.9根据集群id和lables查询集群的实例列表
		 GetInstanceListByNodeName.main(args);//1.10根据集群id和主机名获取实例列表
		 
		 GetAllNamespacesByClusterId.main(args);//2.1查询某个集群的namespace列表
		 DeleteNamespace.main(args);//2.3删除namespace
		 
		 AddHost.main(args);//3.1添加主机（生成执行脚本）
		 SetNodeLables.main(args);//3.2添加主机标签/添加工作场景
		 GetLabelsByClusterId.main(args);//3.3根据集群id获取主机标签列表
		 GetNodeByClusterIdAndName.main(args);//3.4根据集群id和主机名获取主机信息
		 DeleteNodeLabels.main(args);//3.5删除主机标签
		 
		 
		 StartWactherInCluster.main(args);//4.1创建集群监听器
		 GetWatcherStatus.main(args);//4.2查询集群监听器状态信息
		 
		 CreateVersion.main(args);//7.1升级部署版本
		 DeprecateVersionById.main(args);//7.2根据部署id和版本id废弃部署版本
		 EnableVersionById.main(args);//7.3根据部署id和版本id还原版本
		 GetVersion.main(args);//7.4根据部署id和版本id获取部署版本信息
		 ListVersion.main(args);//7.5查询部署的版本列表
}

}
