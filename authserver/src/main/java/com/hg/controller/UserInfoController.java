package com.hg.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.oltu.oauth2.common.OAuth;
import org.apache.oltu.oauth2.common.error.OAuthError;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;
import org.apache.oltu.oauth2.common.message.OAuthResponse;
import org.apache.oltu.oauth2.common.message.types.ParameterStyle;
import org.apache.oltu.oauth2.common.utils.OAuthUtils;
import org.apache.oltu.oauth2.rs.request.OAuthAccessResourceRequest;
import org.apache.oltu.oauth2.rs.response.OAuthRSResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Constants;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hg.domain.User;
import com.hg.service.UserService;

@Controller
public class UserInfoController {
	
	@Autowired
	private UserService userService;
	
	
	@RequestMapping("/userInfo") 
	public HttpEntity userInfo(HttpServletRequest request) throws OAuthSystemException{
		System.out.println("-----------鏈嶅姟绔�/userInfo-------------------------------------------------------------");
	     
		try {
			//鑾峰彇瀹㈡埛绔紶鏉ョ殑OAuth璧勬簮璇锋眰
			OAuthAccessResourceRequest oauthRequest = new OAuthAccessResourceRequest(request, ParameterStyle.QUERY);
			//鑾峰彇Access Token  
		      String accessToken = oauthRequest.getAccessToken(); 
		      System.out.println(accessToken+"111111111111");
		      //楠岃瘉Access Token  
		      if (accessToken==null||accessToken=="") {  
		        // 濡傛灉涓嶅瓨鍦�/杩囨湡浜嗭紝杩斿洖鏈獙璇侀敊璇紝闇�閲嶆柊楠岃瘉  
		    	  System.out.println(accessToken+"222222222222");
		      OAuthResponse oauthResponse = OAuthRSResponse  
		              .errorResponse(HttpServletResponse.SC_UNAUTHORIZED)  
		              .setError(OAuthError.ResourceResponse.INVALID_TOKEN)  
		              .buildHeaderMessage();  
		  
		        HttpHeaders headers = new HttpHeaders();  
		        headers.add(OAuth.HeaderType.WWW_AUTHENTICATE,   
		          oauthResponse.getHeader(OAuth.HeaderType.WWW_AUTHENTICATE));  
		      return new ResponseEntity(headers, HttpStatus.UNAUTHORIZED);  
		      }  
		      //杩斿洖鐢ㄦ埛鍚�  
		      User user=userService.selectByPrimaryKey(1);
		      String username = accessToken+"---"+Math.random()+"----"+user.getUname(); 
		      System.out.println(username);
		      System.out.println("鏈嶅姟绔�/userInfo::::::ppp");
		      System.out.println("-----------鏈嶅姟绔�/userInfo----------------------------------------------------------");
		      return new ResponseEntity(username, HttpStatus.OK);  
		} catch (OAuthProblemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			//妫�鏌ユ槸鍚﹁缃簡閿欒鐮�  
		      String errorCode = e.getError();  
		      if (OAuthUtils.isEmpty(errorCode)) {  
		        OAuthResponse oauthResponse = OAuthRSResponse  
		               .errorResponse(HttpServletResponse.SC_UNAUTHORIZED)  
		               .buildHeaderMessage();  
		  
		        HttpHeaders headers = new HttpHeaders();  
		        headers.add(OAuth.HeaderType.WWW_AUTHENTICATE,   
		          oauthResponse.getHeader(OAuth.HeaderType.WWW_AUTHENTICATE));  
		        return new ResponseEntity(headers, HttpStatus.UNAUTHORIZED);  
		      }  
		  
		      OAuthResponse oauthResponse = OAuthRSResponse  
		               .errorResponse(HttpServletResponse.SC_UNAUTHORIZED)  
		               .setError(e.getError())  
		               .setErrorDescription(e.getDescription())  
		               .setErrorUri(e.getUri())  
		               .buildHeaderMessage();  
		  
		      HttpHeaders headers = new HttpHeaders();  
		      headers.add(OAuth.HeaderType.WWW_AUTHENTICATE,   
		        oauthResponse.getHeader(OAuth.HeaderType.WWW_AUTHENTICATE));  
		      System.out.println("-----------鏈嶅姟绔�/userInfo------------------------------------------------------------------------------");
		      return new ResponseEntity(HttpStatus.BAD_REQUEST);  
		}  
	      
		
	}

}
