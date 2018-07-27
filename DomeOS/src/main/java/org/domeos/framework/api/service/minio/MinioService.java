package org.domeos.framework.api.service.minio;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.xmlpull.v1.XmlPullParserException;

import io.minio.MinioClient;
import io.minio.errors.MinioException;


public interface MinioService {

	public void listBuckets() ;
	
	public List<String> listObjects(String bucketName);

	public void statObject() throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException;

    public String getObjectUrl(String bucketName,String objectName) throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException;

    public void makeBucket() throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException;
}
