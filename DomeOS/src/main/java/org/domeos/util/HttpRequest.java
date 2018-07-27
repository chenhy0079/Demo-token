/**
 * 
 */
package org.domeos.util;

import java.io.Closeable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * http
 * @author zbw
 * 2017年8月23日
 */
public class HttpRequest {
	public static int count=0;
	public static String doPost(String url, Map<String,String> map) {
		 
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try{
			
			//HttpPost post = null;
			HttpPost post =null;
			
			// 创建参数列表
			List<NameValuePair> list = new ArrayList<NameValuePair>();
			post = new HttpPost(url);
			for (String key:map.keySet()) {
				list.add(new BasicNameValuePair(key, map.get(key)));
			}
			/*list.add(new BasicNameValuePair("assetType", "all"));
			list.add(new BasicNameValuePair("pageNum", "1"));
			list.add(new BasicNameValuePair("username", "admin"));
			list.add(new BasicNameValuePair("password", "89a996b60fa0e54bf9aa115e5dad32677a6b1220069dc9c7e16605a6"));*/
			//post.setHeader("Authorization", "bb");
			//post.setHeader("Authorization1", "bb");
			// url编码格式
			UrlEncodedFormEntity urlEncodedFormEntity = new UrlEncodedFormEntity(list, "UTF-8");
			post.setEntity(urlEncodedFormEntity);
			
			// 执行请求
			CloseableHttpResponse httpResponse = httpClient.execute(post);
			try{
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity) {
					String result = EntityUtils.toString(entity);
					System.out.println(result);
					if(result.equals("failed")){
						 count++;
						 if(count<5){
						doPost(url, map);
						 }
					}
					return result;
				}
			} finally {
				httpResponse.close();
			}
		} catch (Exception e){
			e.printStackTrace();
		}
		return url; 
	}
	
	
	public static String doGet(String url) {
		
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try{
			
			//HttpPost post = null;
			HttpGet hGet =null;
			
			// 创建参数列表
//			List<NameValuePair> list = new ArrayList<NameValuePair>();
			hGet = new HttpGet(url);
//			for (String key:map.keySet()) {
//				list.add(new BasicNameValuePair(key, map.get(key)));
//			}
			/*list.add(new BasicNameValuePair("assetType", "all"));
			list.add(new BasicNameValuePair("pageNum", "1"));
			list.add(new BasicNameValuePair("username", "admin"));
			list.add(new BasicNameValuePair("password", "89a996b60fa0e54bf9aa115e5dad32677a6b1220069dc9c7e16605a6"));*/
			//post.setHeader("Authorization", "bb");
			//post.setHeader("Authorization1", "bb");
			// url编码格式
			//UrlEncodedFormEntity urlEncodedFormEntity = new UrlEncodedFormEntity( "UTF-8");
			//post.setEntity(urlEncodedFormEntity);
			
			// 执行请求
			//CloseableHttpResponse httpResponse = httpClient.execute(post);
			HttpResponse httpResponse=httpClient.execute(hGet);
			try{
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity) {
					String result = EntityUtils.toString(entity);
					System.out.println(result);
					return result;
				}
			} finally {
				((Closeable) httpResponse).close();
			}
		} catch (Exception e){
			e.printStackTrace();
		}
		return null; 
	}

}
