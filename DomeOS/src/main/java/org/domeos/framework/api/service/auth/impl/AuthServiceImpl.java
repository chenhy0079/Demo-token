package org.domeos.framework.api.service.auth.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.codec.Base64;
import org.apache.shiro.subject.Subject;
import org.domeos.basemodel.HttpResponseTemp;
import org.domeos.basemodel.ResultStat;
import org.domeos.framework.api.biz.auth.AuthBiz;
import org.domeos.framework.api.biz.global.GlobalBiz;
import org.domeos.framework.api.consolemodel.auth.UserPassword;
import org.domeos.framework.api.controller.exception.ApiException;
import org.domeos.framework.api.mapper.domeos.auth.UserMapper;
import org.domeos.framework.api.model.auth.User;
import org.domeos.framework.api.model.auth.related.LoginType;
import org.domeos.framework.api.model.auth.related.UserState;
import org.domeos.framework.api.model.global.LdapInfo;
import org.domeos.framework.api.service.auth.AuthService;
import org.domeos.framework.shiro.token.MultiAuthenticationToken;
import org.domeos.util.MD5Util;
import org.domeos.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthServiceImpl implements AuthService{

	protected static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	private static final String SALT = "11111111111";
	
	private static final long expTime = 5 * 60 * 1000;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
    AuthBiz authBiz;
	
	@Autowired
    GlobalBiz globalBiz;
	
	@Override
	public String CreateTo(UserPassword up) {
		if(up.getUsername()==null||up.getPassword()==null){
			return "user info must be set";
		}
		if(!StringUtils.isBlank(up.getUsername())&&!StringUtils.isBlank(up.getPassword())){
			User user = userMapper.getUserByName(up.getUsername());
			if(user!=null){
			 Subject subject = SecurityUtils.getSubject();
		        String ldapEmailSuffix = null;
		        if (up.getLoginType() != null && user.getLoginType().equals(LoginType.LDAP)) {
		            LdapInfo ldapInfo = globalBiz.getLdapInfo();
		            if (ldapInfo == null) {
		                return "ldap info must be set";
		            }
		            ldapEmailSuffix = ldapInfo.getEmailSuffix();
		            String userName = up.getUsername();
		            if (ldapEmailSuffix != null && !userName.endsWith(ldapEmailSuffix)) {
		                up.setUsername(userName + ldapEmailSuffix);
		            }
		        }
		        UsernamePasswordToken token = new MultiAuthenticationToken(up.getUsername(), up.getPassword(), user.getLoginType());
		        try {
		            subject.login(token);
		        } catch (Exception e) {
		        	return "create token error";
		        } 

		        if (user.getLoginType() != null && user.getLoginType().equals(LoginType.LDAP)) {
		            User u = new User();
		            u.setUsername(up.getUsername());
		            u.setLoginType(LoginType.LDAP);
		            User existUser = authBiz.getUserByName(user.getUsername());
		            if (existUser == null) {
		                u.setCreateTime(System.currentTimeMillis());
		                u.setState(UserState.NORMAL);
		                u.setPassword("NULL");
		                LdapInfo ldapInfo = globalBiz.getLdapInfo();
		                if (ldapInfo != null) {
		                    String ldapEmailSuffixs = ldapInfo.getEmailSuffix();
		                    if (!StringUtils.isBlank(ldapEmailSuffixs)) {
		                        u.setEmail(u.getUsername());
		                    }
		                }
		                authBiz.addUser(u);
		            } else {
		                existUser.setUpdateTime(System.currentTimeMillis());
		                authBiz.modifyUser(existUser);
		                user.setId(existUser.getId());
		            }
		            logger.info("ldap login success, user=" + up.getUsername());
		        } else {
		            logger.info("jdbc login success, user=" + up.getUsername());
		        }
		        subject.logout();
				return useJwt(up.getUsername());
			}
		}
		return "create token error";
	}
	
	private String useJwt(String username){
		long currentTime = new Date().getTime();
		JwtBuilder jwt = Jwts.builder();
		jwt.setSubject(username);
		HashSet<String> roles = new HashSet<>();
        roles.addAll(authBiz.getRole(username));
        ObjectMapper objectMapper = new ObjectMapper();
        String role = null ;
        try {
			role = objectMapper.writeValueAsString(roles);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
        jwt.claim("role",role);
		jwt.setIssuedAt(new Date(currentTime));
		jwt.setExpiration(new Date(currentTime+expTime));
		jwt.signWith(SignatureAlgorithm.HS256, SALT);
		return jwt.compact();
	}

}
