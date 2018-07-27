package org.domeos.configuration;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xmlpull.v1.XmlPullParserException;

import io.minio.MinioClient;
import io.minio.errors.InvalidEndpointException;
import io.minio.errors.InvalidPortException;

@Configuration
public class MinioConfiguration {
	
	@Bean
	public  MinioClient init() throws InvalidEndpointException, InvalidPortException, InvalidKeyException, NoSuchAlgorithmException, IOException, XmlPullParserException{
		
		String endpoint = "https://192.168.101.93:9000";
		String accessKey = "9HAHISARLVHN3KT93N9F";
		String secreKey = "yhq/3i9fhhXruVfOlrE04jWHC3r3hWyLfCMQdgkf";
		MinioClient minioClient = new MinioClient(endpoint,accessKey,secreKey,false);
		
		return minioClient;
	}
}
