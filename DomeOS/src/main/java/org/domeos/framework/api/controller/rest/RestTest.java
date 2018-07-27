package org.domeos.framework.api.controller.rest;

import java.io.IOException;

import org.domeos.basemodel.HttpResponseTemp;
import org.domeos.basemodel.ResultStat;
import org.domeos.exception.K8sDriverException;
import org.domeos.framework.api.biz.collection.CollectionBiz;
import org.domeos.framework.api.biz.deployment.DeployCollectionBiz;
import org.domeos.framework.api.biz.deployment.DeploymentBiz;
import org.domeos.framework.api.biz.deployment.VersionBiz;
import org.domeos.framework.api.biz.loadBalancer.LoadBalancerBiz;
import org.domeos.framework.api.model.collection.CollectionResourceMap;
import org.domeos.framework.api.model.collection.related.ResourceType;
import org.domeos.framework.api.model.loadBalancer.LoadBalancer;
import org.domeos.framework.api.service.deployment.DeployCollectionService;
import org.domeos.framework.engine.exception.DaoException;
import org.domeos.framework.engine.k8s.LoadBalancerWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restapi/test")
public class RestTest {

	 @Autowired
	 DeployCollectionService deployCollectionService;
	 
	 @Autowired
	 DeployCollectionBiz deployCollectionBiz;
	 
	 @Autowired
	 CollectionBiz collectionBiz;
	 
	 @Autowired
	 VersionBiz versionBiz;
	 
	 @Autowired
	 DeploymentBiz deploymentBiz;
	 
	 @Autowired
	 LoadBalancerBiz loadBalancerBiz;
	
	 @ResponseBody
	 @RequestMapping(value = "/{deployCollectionId}", method = RequestMethod.DELETE)
	 public HttpResponseTemp<?> deleteDeployCollectionTrue(@PathVariable int deployCollectionId) throws IOException {
	     return deployCollectionService.deleteDeployCollectionTrue(deployCollectionId);
	 }
	 
	 @ResponseBody
	 @RequestMapping(value = "/deploy/{deployCollectionId}", method = RequestMethod.DELETE)
	 public HttpResponseTemp<?> deleteDeployCollection(@PathVariable int deployCollectionId) throws IOException {
	      deployCollectionBiz.deleteDeployCollection(deployCollectionId);
	      return ResultStat.OK.wrap(null);
	 }
	 
	 @ResponseBody
	 @RequestMapping(value = "/addresource", method = RequestMethod.POST)
	 public HttpResponseTemp<?> addCollectionResource(@RequestBody CollectionResourceMap collectionResourceMap) throws IOException {
	     int addResource = collectionBiz.addResource(collectionResourceMap);
	     return ResultStat.OK.wrap(addResource);
	 }
	 
	 @ResponseBody
	 @RequestMapping(value = "/deletedeployandver/{id}", method = RequestMethod.DELETE)
	 public HttpResponseTemp<?> deleteDeployAndVersion(@PathVariable int id) throws IOException {
		 try {
			collectionBiz.deleteResourceByResourceIdAndResourceType(id, ResourceType.DEPLOY);
			deploymentBiz.delete(id);
		} catch (DaoException e) {
			e.printStackTrace();
		}finally{
			versionBiz.deleteAllVersion(id);
		}
	     return ResultStat.OK.wrap(null);
	 }
	 
	 @ResponseBody
	 @RequestMapping(value = "/selectResource/{id}", method = RequestMethod.GET)
	 public HttpResponseTemp<CollectionResourceMap> selectCollectionResource(@PathVariable int id) throws IOException {
	     CollectionResourceMap crm = collectionBiz.getResourceByResourceIdAndResourceType(id,ResourceType.DEPLOY);
	     return ResultStat.OK.wrap(crm);
	 }
	 
	 
	 @ResponseBody
	 @RequestMapping(value = "/deleteService/{clusterId}/{namespace}/{lbname}/{deployId}", method = RequestMethod.DELETE)
	 public HttpResponseTemp<CollectionResourceMap> deleteLb(@PathVariable int clusterId,@PathVariable String namespace,@PathVariable String lbname,@PathVariable int deployId){
		 try {
			LoadBalancerWrapper lbWrapper = new LoadBalancerWrapper().init(clusterId, namespace);
			LoadBalancer loadBalancer = new LoadBalancer();
			loadBalancer.setName(lbname);
			lbWrapper.deleteLoadBalancerService(loadBalancer);
			loadBalancerBiz.deleteLbAndLbMap(deployId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 return ResultStat.OK.wrap(null);
	 }
	 
}
