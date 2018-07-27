package org.domeos.framework.restapi.deploycollection;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import org.domeos.framework.api.model.collection.CollectionResourceMap;
import org.domeos.framework.api.model.collection.related.ResourceType;
import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import io.restassured.response.Response;

public class DeleteDeployCollection {

	private int id;
	
	@Before
	public void setBefore(){
		String parameter = "{\"name\":\"createdeploy\",\"creatorId\":\"1\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(parameter)
				.post("http://localhost:8080/restapi/deploycollection");
		
		id = create.body().jsonPath().getInt("result.result.id");	
	}
	
	
	/**
	 * 正常删除
	 */
	@Test
	public void testDeleteDeployCollection1() {
		
		
		Response delete = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.delete("http://localhost:8080/restapi/deploycollection/"+id);
		
	}
	
	/**
	 * 删除部署不为空的服务
	 */
	@Test
	public void testDeleteDeployCollection2() {
		
		CollectionResourceMap crm = new CollectionResourceMap();
		crm.setCollectionId(id);
		crm.setResourceId(111111);
		crm.setResourceType(ResourceType.DEPLOY);
		crm.setCreatorId(11);
		
		Gson gson = new Gson();
		String json = gson.toJson(crm);
		
		Response addr = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(json)
				.post("http://localhost:8080/restapi/test/addresource");
		
		int rid = addr.body().jsonPath().getInt("result");
		
		try {
			Response delete = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.expect()
					.body("resultCode", equalTo(1212))
					.body("resultMsg",equalTo("CANNOT_DELETE_DEPLOY_COLLECTION:You cannot delete a deploy collectionwith deploy exists"))
					.when() 
					.delete("http://localhost:8080/restapi/deploycollection/"+id);
		} finally{
			Response delete = given()
					.header("Authorization",ClientUtil.Auth("testuser","admin"))
					.delete("http://localhost:8080/restapi/test/deleteresource/"+rid);
		}
	}
	
	@After
	public void setAfter(){
		Response deleteTrue = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+id);
	}
}
