package org.domeos.framework.restapi.util;


import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;

import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class ClientUtil
{
	static Logger logger = Logger.getLogger(Logger.class);

	// get请求的接口调用
	@SuppressWarnings("resource")
	public static String httpGet(String url){
		CloseableHttpClient httpClient = HttpClients.createDefault();
		// 创建httpget
		HttpGet get = new HttpGet(url);
		get.setHeader("Authorization", Auth("testuser","admin"));
		try
		{
			// 执行请求
			CloseableHttpResponse httpResponse = httpClient.execute(get);
			// 获取响应实体
			HttpEntity entity = httpResponse.getEntity();
			System.out.println("-----------------------------");
			// 打印响应状态
			System.out.println(httpResponse.getStatusLine());

			if (null != entity)
			{
				// 获取响应内容
				String result = EntityUtils.toString(entity);
				System.out.println("响应结果:" + result);
				return result;
			}
		} catch (Exception e)
		{
			logger.error(e);
			return "false";
		}

		return null;
	}

	// post请求的接口调用
	@SuppressWarnings("resource")
	public static String httpPost(String url, String parameter){
		CloseableHttpClient httpClient = HttpClients.createDefault();
		// 创建httpget
		HttpPost post = new HttpPost(url);
		post.setHeader("Authorization", Auth("testuser","admin"));
		post.setHeader("Content-Type", "application/json;charset=UTF-8");
		StringEntity se;
		try
		{
			se = new StringEntity(parameter);
			se.setContentType("text/json");
			post.setEntity(se);
			try
			{
				// 执行请求
				CloseableHttpResponse httpResponse = httpClient.execute(post);
				// 获取响应实体
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity)
				{
					// 获取响应内容
					System.out.println("---------------------");
					String result = EntityUtils.toString(entity, "UTF-8");
					System.out.println("响应结果:" + result);
					System.out.println("------------------------");
					return result;
				}
			} catch (Exception e)
			{
				logger.error(e);
				return "false";
			}
		} catch (UnsupportedEncodingException e1)
		{

			e1.printStackTrace();
		}

		return null;

	}
	
	// post请求的接口调用
		@SuppressWarnings("resource")
		public static String httpPost(String url, Map<String,String> parameter){
			CloseableHttpClient httpClient = HttpClients.createDefault();
			// 创建httpget
			HttpPost post = new HttpPost(url);
			post.setHeader("Authorization", Auth("testuser","admin"));
			try
			{
				ArrayList<NameValuePair> nvps = new ArrayList<NameValuePair>();
				Set<String> keys = parameter.keySet();
				for (String key : keys) {
					nvps.add(new BasicNameValuePair(key,parameter.get(key)));
				}
				post.setEntity(new UrlEncodedFormEntity(nvps));
				try
				{
					// 执行请求
					CloseableHttpResponse httpResponse = httpClient.execute(post);
					// 获取响应实体
					HttpEntity entity = httpResponse.getEntity();
					if (null != entity)
					{
						// 获取响应内容
						System.out.println("---------------------");
						String result = EntityUtils.toString(entity, "UTF-8");
						System.out.println("响应结果:" + result);
						System.out.println("------------------------");
						return result;
					}
				} catch (Exception e)
				{
					logger.error(e);
					return "false";
				}
			} catch (UnsupportedEncodingException e1)
			{

				e1.printStackTrace();
			}

			return null;

		}


	// put请求的接口调用
	@SuppressWarnings("resource")
	public static String httpPut(String url, String parameter){
		CloseableHttpClient httpClient = HttpClients.createDefault();
		// 创建httpget
		HttpPut put = new HttpPut(url);
		put.setHeader("Authorization", Auth("testuser","admin"));
		put.setHeader("Content-Type", "application/json;charset=UTF-8");
		StringEntity se;
		try
		{
			se = new StringEntity(parameter);
			se.setContentType("text/json");
			put.setEntity(se);
			try
			{
				// 执行请求
				CloseableHttpResponse httpResponse = httpClient.execute(put);
				// 获取响应实体
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity)
				{
					// 获取响应内容
					System.out.println("---------------------");
					String result = EntityUtils.toString(entity, "UTF-8");
					System.out.println("响应结果:" + result);
					System.out.println("------------------------");
					return result;
				}
			} catch (Exception e)
			{
				logger.error(e);
				return "false";
			}
		} catch (UnsupportedEncodingException e1)
		{

			e1.printStackTrace();
		}

		return null;

	}

	// Delete请求的接口调用
	@SuppressWarnings("resource")
	public static String httpDelete(String url)
	{
		CloseableHttpClient httpClient = HttpClients.createDefault();
		// 创建httpget
		HttpDelete put = new HttpDelete(url);
		put.setHeader("Authorization", Auth("testuser","admin"));
		//put.setHeader("Content-Type", "application/json;charset=UTF-8");
		// StringEntity se;

		// se = new StringEntity(parameter);
		// se.setContentType("text/json");
		// put.setEntity(se);
		try
		{
			// 执行请求
			CloseableHttpResponse httpResponse = httpClient.execute(put);
			// 获取响应实体
			HttpEntity entity = httpResponse.getEntity();
			if (null != entity)
			{
				// 获取响应内容
				System.out.println("---------------------");
				String result = EntityUtils.toString(entity, "UTF-8");
				System.out.println("响应结果:" + result);
				System.out.println("------------------------");
				return result;
			}
		} catch (Exception e)
		{
			logger.error(e);
			return "false";
		}
		return null;

	}

	// 获取认证token
	public static String Auth(String username,String password)
	{
		CloseableHttpClient httpClient = HttpClients.createDefault();

		// 创建httpget
		HttpPost post = new HttpPost("http://localhost:8080/token/createToken");
		post.setHeader("Content-Type", "application/json;charset=UTF-8");

		Gson gson = new Gson();
		String s = "{\"password\": \""+password+"\",\"username\": \""+username+"\"}";
		JsonObject js = new JsonObject();
		js.addProperty("username", "admin");
		js.addProperty("password", "admin");
		// String parameter=gson.toJson(js.toString());
		StringEntity se;
		try
		{
			se = new StringEntity(s);
			se.setContentType("text/json");
			post.setEntity(se);
			try
			{

				// 执行请求
				CloseableHttpResponse httpResponse = httpClient.execute(post);
				// 获取响应实体
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity)
				{
					// 获取响应内容
					System.out.println("---------------------");
					String result = EntityUtils.toString(entity, "UTF-8");
					System.out.println("响应结果:" + result);
					System.out.println("------------------------");
					return result;
				}
			} catch (Exception e)
			{
				logger.error(e);
				return "false";
			}
		} catch (UnsupportedEncodingException e1)
		{

			e1.printStackTrace();
		}

		return null;

	}
	
	// 获取认证token
		public static String Auth()
		{
			CloseableHttpClient httpClient = HttpClients.createDefault();

			// 创建httpget
			HttpPost post = new HttpPost("http://localhost:8080/token/createToken");
			post.setHeader("Content-Type", "application/json;charset=UTF-8");

			Gson gson = new Gson();
			String s = "{\"password\": \"admin\",\"username\": \"admin\"}";
			JsonObject js = new JsonObject();
			js.addProperty("username", "admin");
			js.addProperty("password", "admin");
			// String parameter=gson.toJson(js.toString());
			StringEntity se;
			try
			{
				se = new StringEntity(s);
				se.setContentType("text/json");
				post.setEntity(se);
				try
				{

					// 执行请求
					CloseableHttpResponse httpResponse = httpClient.execute(post);
					// 获取响应实体
					HttpEntity entity = httpResponse.getEntity();
					if (null != entity)
					{
						// 获取响应内容
						System.out.println("---------------------");
						String result = EntityUtils.toString(entity, "UTF-8");
						System.out.println("响应结果:" + result);
						System.out.println("------------------------");
						return result;
					}
				} catch (Exception e)
				{
					logger.error(e);
					return "false";
				}
			} catch (UnsupportedEncodingException e1)
			{

				e1.printStackTrace();
			}

			return null;

		}

}
