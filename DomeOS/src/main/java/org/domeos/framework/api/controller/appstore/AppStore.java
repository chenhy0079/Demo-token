package org.domeos.framework.api.controller.appstore;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.domeos.framework.api.service.minio.MinioService;
import org.domeos.util.HttpRequest;
import org.domeos.util.YamlToJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.xmlpull.v1.XmlPullParserException;
import org.yaml.snakeyaml.Yaml;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/api")
public class AppStore{
	
	@Autowired
    MinioService minioService;
	 /*	@ResponseBody
	    @RequestMapping(value = "/appstore", method = RequestMethod.GET)
	    public String listAlarmEventInfo() {
		 String appjson="[{\"appName\":\"registry\",\"appIcon\":\"/index/tpl/appStore/chaxun.png\",\"description\":\"dockerregistryv2,与搜狐云存储绑定\",\"deploymentTemplate\":{\"containerDrafts\":[{\"image\":\"library/nginx\",\"registry\":\"https://192.168.101.85\",\"tag\":\"1.8.0\",\"cpu\":1.0,\"mem\":1024,\"envs\":[{\"key\":\"REGISTRY_STORAGE_SCS_ACCESSKEY\",\"value\":\"\",\"description\":\"搜狐云存储AccessKey(必填)\"},{\"key\":\"REGISTRY_STORAGE_SCS_SECRETKEY\",\"value\":\"\",\"description\":\"搜狐云存储SecretKey(必填)\"},{\"key\":\"REGISTRY_STORAGE_SCS_BUCKET\",\"value\":\"\",\"description\":\"搜狐云存储空间名(必填)\"},{\"key\":\"REGISTRY_STORAGE_SCS_REGION\",\"value\":\"\",\"description\":\"搜狐云存储地域，可配置为bjcnc/bjctc/shctc之一(必填)\"},{\"key\":\"REGISTRY_HTTP_SECRET\",\"value\":\"\",\"description\":\"RegistryHttpSecret,用于多实例部署，可设置为随机字符串(必填)\"}],\"envChecker\":{\"REGISTRY_STORAGE_SCS_ACCESSKEY\":\"\",\"REGISTRY_STORAGE_SCS_SECRETKEY\":\"\",\"REGISTRY_STORAGE_SCS_BUCKET\":\"\",\"REGISTRY_STORAGE_SCS_REGION\":\"\",\"REGISTRY_HTTP_SECRET\":\"\"}}],\"logPathList\":[],\"loadBalanceDrafts\":[{\"name\":\"registry\",\"port\":5000,\"targetPort\":5000,\"type\":\"TCP\",\"clusterName\":\"default-cluster\"}],\"volumes\":[],\"scalable\":false,\"stateful\":false,\"replicas\":3}}]";
	        return  appjson;
	    }*/
	 	
	 	@ResponseBody
	    @RequestMapping(value = "/appstore", method = RequestMethod.GET)
	    public String listApps() {
	 		Yaml yaml=new Yaml();
	 	    File file=new File("values.yaml");
	 	    FileInputStream fs = null;
			try {
				fs = new FileInputStream(file);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        JSONObject json = JSONObject.fromObject(yaml.load(fs));
	        JSONObject resJson = new JSONObject();
	        YamlToJson.parseJSON2Map(resJson,json,null);
	        ArrayList<String> objectList = (ArrayList<String>) minioService.listObjects("mybucket");
	        resJson.put("helm chart", objectList);
	        System.out.println("resJson="+resJson.toString());
			return "["+resJson.toString()+"]";
	    }
	 	
	 	@ResponseBody
	    @RequestMapping(value = "/createApp")
	    public String createApp(@RequestParam(value="req")String req) throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException{
	 		
	 		System.out.println(req);
	 		System.out.println(JSONObject.fromObject(req).toString());
	 		
	 		//获取helm包的下载地址
	 		String url = minioService.getObjectUrl("mybucket","hadoop-1.0.7.tgz");
	 		Map<String,String> map = new HashMap<>();
	 		map.put("cmd", "b");
	 		HttpRequest.doPost("http://192.168.101.93:3000/cmd/exec", map);
	 		return "{\"res\":\"success\"}";
	    }
}
