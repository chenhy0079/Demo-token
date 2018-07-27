package org.domeos.framework.api.controller.minio;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import org.domeos.framework.api.service.minio.MinioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.xmlpull.v1.XmlPullParserException;

@RestController
@RequestMapping("/minio")
public class MinioController {

	@Autowired
    MinioService minioService;

    /*
     * 获取bucket中所有object的name
     */
    @ResponseBody
    @RequestMapping(value = "/listObjects", method = RequestMethod.GET)
    public Object listObjects() throws NoSuchAlgorithmException, IOException, XmlPullParserException, Exception {
    	
    	return minioService.listObjects("myBucket");
    }
    
    /*
     * 获取object的下载地址
     */
    @ResponseBody
    @RequestMapping(value = "/getObjectUrl", method = RequestMethod.GET)
    public Object getObjectUrl(@RequestParam(value="objectName")String objectName) throws NoSuchAlgorithmException, IOException, XmlPullParserException, Exception {
    	
    	return minioService.getObjectUrl("mybucket","hadoop-1.0.7.tgz");
    }
	
}
