package org.domeos.framework.api.service.minio.impl;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.domeos.framework.api.service.minio.MinioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xmlpull.v1.XmlPullParserException;

import io.minio.MinioClient;
import io.minio.ObjectStat;
import io.minio.Result;
import io.minio.errors.MinioException;
import io.minio.messages.Bucket;
import io.minio.messages.Item;


@Service
public class MinioServiceImpl implements MinioService{

	@Autowired 
	public MinioClient minioClient;
	
	public  void listBuckets() {
		
		List<Bucket> bucketList = new ArrayList<Bucket>();
		try {
			  // List buckets that have read access.
			  
			try {
				bucketList = minioClient.listBuckets();
			} catch (InvalidKeyException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (XmlPullParserException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			  for (Bucket bucket : bucketList) {
			    System.out.println(bucket.creationDate() + ", " + bucket.name());
			  }
			} catch (MinioException e) {
			  System.out.println("Error occurred: " + e);
			}
	}
	
	public  List<String> listObjects(String bucketName){
		try {
			  // Check whether 'mybucket' exists or not.
			  List<String> objectList = new ArrayList<String>();
			  boolean found = false;
			try {
				found = minioClient.bucketExists(bucketName);
			} catch (InvalidKeyException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (XmlPullParserException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			  if (found) {
			    // List objects from 'my-bucketname'
			    Iterable<Result<Item>> myObjects = null;
				try {
					myObjects = minioClient.listObjects(bucketName);
				} catch (XmlPullParserException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			    for (Result<Item> result : myObjects) {
			      Item item = null;
				try {
					item = result.get();
				} catch (InvalidKeyException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (NoSuchAlgorithmException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (XmlPullParserException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			      objectList.add(item.objectName());
			      System.out.println(item.lastModified() + ", " + item.size() + ", " + item.objectName());
			    }
			    return objectList;
			  } else {
			    System.out.println("mybucket does not exist");
			  }
			} catch (MinioException e) {
			  System.out.println("Error occurred: " + e);
			}
		return null;

	}
	public  void statObject() throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException{
		
		try {
			  // Get the metadata of the object.
			  ObjectStat objectStat = minioClient.statObject("mybucket", "index.yaml");
			  System.out.println(objectStat);
			} catch(MinioException e) {
			  System.out.println("Error occurred: " + e);
			}

	}
     public  String getObjectUrl(String bucketName,String objectName) throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException{
    	 try {
    		    String url = minioClient.presignedGetObject("mybucket", "hadoop-1.0.7.tgz", 60 * 60 * 24);
    		    System.out.println(url);
    		} catch(MinioException e) {
    		  System.out.println("Error occurred: " + e);
    		}
		return null;

     }
     public  void makeBucket() throws InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException{
 		try {
 		  // Create bucket if it doesn't exist.
 		  boolean found = minioClient.bucketExists("mybucket");
 		  if (found) {
 		    System.out.println("mybucket already exists");
 		  } else {
 		    // Create bucket 'my-bucketname'.
 		    minioClient.makeBucket("mybucket");
 		    System.out.println("mybucket is created successfully");
 		  }
 		} catch (MinioException e) {
 		  System.out.println("Error occurred: " + e);
 		}
 	}
}
