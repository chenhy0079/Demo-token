package org.domeos.framework.api.controller.rest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.domeos.basemodel.HttpResponseTemp;
import org.domeos.framework.api.consolemodel.cluster.ClusterInfo;
import org.domeos.framework.api.controller.ApiController;
import org.domeos.framework.api.model.cluster.ClusterWatcherConf;
import org.domeos.framework.api.model.cluster.related.NodeLabel;
import org.domeos.framework.api.model.restApi.HostInfo;
import org.domeos.framework.api.service.cluster.ClusterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by feiliu206363 on 2015/12/15.
 */
@RestController
@RequestMapping("/restapi/cluster")
public class RestClusterController extends ApiController {

    @Autowired
    ClusterService clusterService;
/**
 * 创建集群
 * @author 林世忍
 * @param clusterInfo
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.POST)
    public HttpResponseTemp<?> setCluster(@RequestBody ClusterInfo clusterInfo) {
        return clusterService.setCluster(clusterInfo);
    }
/**
 * 查询集群列表
 * @author 林世忍
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.GET)
    public HttpResponseTemp<?> getClusters() {
        return clusterService.listCluster();
    }
/**
 * 根据集群id查询集群信息
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public HttpResponseTemp<?> getClusterById(@PathVariable int id) {
        return clusterService.getCluster(id);
    }
/**
 * 编辑集群信息
 * @author 林世忍
 * @param clusterInfo
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.PUT)
    public HttpResponseTemp<?> updateClusterById(@RequestBody ClusterInfo clusterInfo) {
        return clusterService.updateCluster(clusterInfo);
    }
/**
 * 根据集群id删除集群
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public HttpResponseTemp<?> deleteClusterById(@PathVariable int id) {
        return clusterService.deleteCluster(id);
    }
/**
 * 根据集群id查询所有的namespace
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/namespace", method = RequestMethod.GET)
    public HttpResponseTemp<?> getAllNamespacesByClusterId(@PathVariable int id) {
        return clusterService.getAllNamespacesByClusterId(id);
    }
   /**
    * 添加namespace
    * @author 林世忍
    * @param id
    * @param namespaces
    * @returnHttpResponseTemp<?>
    */
    @ResponseBody
    @RequestMapping(value = "/{id}/namespace", method = RequestMethod.POST)
    public HttpResponseTemp<?> putNamespacesByClusterId(@PathVariable int id, @RequestBody List<String> namespaces) {
        return clusterService.putNamespacesByClusterId(id, namespaces);
    }
    /**
     * 删除namespace
     * @author 林世忍
     * @param id
     * @param namespace
     * @returnHttpResponseTemp<?>
     */
    @ResponseBody
    @RequestMapping(value = "/{id}/namespace/{namespace}", method = RequestMethod.DELETE)
    public HttpResponseTemp<?> deleteNamespace(@PathVariable int id, @PathVariable String namespace) {
        return clusterService.deleteNamespace(id, namespace);
    }
  /**
   * 根据集群id获取主机信息
   * @author 林世忍
   * @param id
   * @returnHttpResponseTemp<?>
   */
    @ResponseBody
    @RequestMapping(value = "/{id}/nodelist", method = RequestMethod.GET)
    public HttpResponseTemp<?> getNodeListByClusterId(@PathVariable int id) {
        return clusterService.getNodeListByClusterId(id);
    }
/**
 * 
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/nodelistwithoutpods", method = RequestMethod.GET)
    public HttpResponseTemp<?> getNodeListWithoutPodsByClusterId(@PathVariable int id) {
       
    	return clusterService.getNodeListWithoutPodsByClusterId(id);
    }
/**
 * 根据集群id和namespace获取实例
 * @author 林世忍
 * @param id
 * @param namespace
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/{namespace}/instancelist", method = RequestMethod.GET)
    public HttpResponseTemp<?> getInstanceListByClusterId(@PathVariable int id, @PathVariable String namespace) {
        return clusterService.getInstanceListByClusterIdWithNamespace(id, namespace);
    }
/**
 * 根据集群id获取主机实例
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/instancelist", method = RequestMethod.GET)
    public HttpResponseTemp<?> getInstanceListByClusterId(@PathVariable int id) {
        return clusterService.getInstanceListByClusterIdWithNamespace(id, null);
    }
/**
 *根据集群id和主机标签获取实例
 * @author 林世忍
 * @param id
 * @param labels
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/instancelistwithlabels", method = RequestMethod.GET)
    public HttpResponseTemp<?> getInstanceListByClusterIdWithLabels(@PathVariable int id, @RequestParam String labels) {
        return clusterService.getInstanceListByClusterIdWithNamespaceAndLabels(id, null, labels);
    }
/**
 * 根据集群id和主机名获取主机信息
 * @author 林世忍
 * @param id
 * @param name
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/node/{name:.+}", method = RequestMethod.GET)
    public HttpResponseTemp<?> getNodeByClusterIdAndName(@PathVariable int id, @PathVariable String name) {
        return clusterService.getNodeByClusterIdAndName(id, name);
    }
/**
 * 根据集群id和主机名获取主机实例
 * @author 林世忍
 * @param id
 * @param name
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/nodelist/{name:.+}", method = RequestMethod.GET)
    public HttpResponseTemp<?> getInstanceListByNodeName(@PathVariable int id, @PathVariable String name) {
        return clusterService.getInstanceListByNodeName(id, name);
    }
/**
 * 根据集群id获取主机标签列表
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/labels", method = RequestMethod.GET)
    public HttpResponseTemp<?> getLabelsByClusterId(@PathVariable int id) {
        return clusterService.getLabelsByClusterId(id);
    }
/**
 * 根据集群id和主机标签获取主机列表
 * @author 林世忍
 * @param id
 * @param labels
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/nodelistwithlabels/{labels}", method = RequestMethod.GET)
    public HttpResponseTemp<?> getNodeListByClusterIdWithLabels(@PathVariable int id, @PathVariable String labels) {
        return clusterService.getNodeListByClusterIdWithLabels(id, labels);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/nodelabels/delete", method = RequestMethod.POST)
    public HttpResponseTemp<?> deleteNodeLabels(@PathVariable int id, @RequestBody List<NodeLabel> nodeLabels) {
        return clusterService.deleteNodeLabels(id, nodeLabels);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/nodelabels/add", method = RequestMethod.POST)
    public HttpResponseTemp<?> setNodeLables(@PathVariable int id, @RequestBody List<NodeLabel> nodeLabels) {
        return clusterService.setNodeLabels(id, nodeLabels);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/{nodeName}/disk", method = RequestMethod.POST)
    public HttpResponseTemp<?> addDiskForNode(@PathVariable int id, @PathVariable String nodeName, @RequestParam String path) throws Exception {
        return clusterService.addDiskForNode(id, nodeName, path);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/{nodeName}/disk", method = RequestMethod.DELETE)
    public HttpResponseTemp<?> deleteDiskForNode(@PathVariable int id, @PathVariable String nodeName) throws Exception {
        return clusterService.deleteDiskForNode(id, nodeName);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/watcher/create", method = RequestMethod.POST)
    public HttpResponseTemp<?> startWactherInCluster(@PathVariable int id, @RequestBody ClusterWatcherConf watcherConf) {
        return clusterService.createWatcherInCluster(id, watcherConf);
    }
/**
 * 获取监听器信息
 * @author 林世忍
 * @param id
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/{id}/watcher/status", method = RequestMethod.GET)
    public HttpResponseTemp<?> getWatcherStatus(@PathVariable int id) {
        return clusterService.getWatcherStatus(id);
    }
    
   /**
    * 添加主机接口
    * @author 林世忍
    * @param id
    * @returnHttpResponseTemp<?>
    */
    @RequestMapping(value = "/addhost", method = RequestMethod.POST)
    public String addhost(@RequestBody HostInfo hostInfo) {
        return clusterService.addHost(hostInfo);
    }
}
