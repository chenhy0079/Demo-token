package org.domeos.framework.restapi.deployment;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

import org.domeos.framework.restapi.util.ClientUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.restassured.response.Response;

public class GetRCStr {
	
	private int deployCollectionId;
	
	@Before
	public void setBefore(){
		String deployCollection = "{\"name\":\"testCreateRCStr\",\"creatorId\":\"11\"}";
		
		Response create = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(deployCollection)
				.post("http://localhost:8080/restapi/deploycollection");
		
		deployCollectionId = create.body().jsonPath().getInt("result.result.id");
	}
	
	/**
	 * 测试接口，正常常见YAML/JSON文件
	 */
	
	@Test
	public void testCreateDeployRCStr(){
		String str = "{\"clusterId\":11,"
				+ "\"collectionId\":"+deployCollectionId+","
				+ "\"deployName\": \"createdeploy\","
				+ "\"deploymentType\": \"DEPLOYMENT\","
				+ "\"hostEnv\": \"TEST\","
				+ "\"networkMode\":\"DEFAULT\","
				+ "\"replicas\": 1,"
				+ "\"versionType\": \"YAML\""
						+ "}";
		
		Response RCStr = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.body(str)
				.expect()
				.body("resultCode", equalTo(200))
				.when()
				.post("http://localhost:8080/restapi/deploy/deploymentstr");
		
	}
	

	@After
	public void setAfter(){
		Response deleteDeployCollection = given()
				.header("Authorization",ClientUtil.Auth("testuser","admin"))
				.contentType("application/json;charset=UTF-8")
				.delete("http://localhost:8080/restapi/test/"+deployCollectionId);
	}

}
