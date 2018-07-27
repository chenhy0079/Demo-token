package org.domeos.framework.shiro.realm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.domeos.framework.api.service.auth.UserService;
import org.domeos.framework.shiro.token.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


public class JwtRealm extends AuthorizingRealm{
	
	private static final String SALT = "11111111111";
	
	@Autowired
    private UserService userService;
	
	public Class<?> getAuthenticationTokenClass(){
		return JwtToken.class;
	}
	
	@Override
	public boolean supports(AuthenticationToken token){
		return token != null&& getAuthenticationTokenClass().isAssignableFrom(token.getClass());
	}
	
	public JwtRealm(){
        setName("JWT");
    }

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimplePrincipalCollection sprincipals = (SimplePrincipalCollection)principals;
		Set jwts = (Set)sprincipals.fromRealm(getName());
		String test = null;
		String jwt = null;
		for (Object object : jwts) {
			test = (String)object;
			if(test.startsWith("jwt:")){
				jwt = test.substring(4);
			}
		}
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		Claims clamis = Jwts.parser().setSigningKey(SALT).parseClaimsJws(jwt).getBody();
        String roles = (String)clamis.get("role");
			ObjectMapper objectMapper = new ObjectMapper();
			String[] role = null;
			try {
				role = objectMapper.readValue(roles, String[].class);
			} catch (Exception e) {
				e.printStackTrace();
			}
			Set<String> set = new HashSet<String>();
			for (String r : role) {
				set.add(r);
			}
         authorizationInfo.setRoles(set);
         authorizationInfo.setStringPermissions(userService.findPermissions(clamis.getSubject()));

         return authorizationInfo;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		JwtToken jwtToken = (JwtToken)token;
		String jwt = (String)jwtToken.getPrincipal();
		try {
			Claims clamis = Jwts.parser().setSigningKey(SALT).parseClaimsJws(jwt).getBody();
			String subject = clamis.getSubject();
			long expiration = clamis.getExpiration().getTime();
			long currentTime = System.currentTimeMillis();
			if(expiration>currentTime){
				SimplePrincipalCollection principalCollection = new SimplePrincipalCollection();
				Set<String> sub = new LinkedHashSet();
				sub.add(subject);
				sub.add("jwt:"+jwt);
				principalCollection.addAll(sub, getName());
				/*HashSet<String> jwtSet = new HashSet<String>();
				sub.add(jwt);
				principalCollection.addAll(jwtSet, "jwt");*/
				SimpleAuthenticationInfo authInfo = new SimpleAuthenticationInfo(principalCollection,Boolean.TRUE);
				return authInfo;
			}
		} catch (Exception e) {
			return null;
		} 
		return null;
	}

}
