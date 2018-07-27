package org.domeos.framework.shiro.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.codec.Base64;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.domeos.framework.api.mapper.domeos.auth.UserMapper;
import org.domeos.framework.api.model.auth.User;
import org.domeos.framework.shiro.token.JwtToken;
import org.domeos.framework.shiro.token.MultiAuthenticationToken;
import org.domeos.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;


public class JwtAuthcFilter extends AccessControlFilter{
	
	private static final String SALT = "11111111111";
	
	private static final long expTime = 5 * 60 * 1000;
	
	@Override
	protected boolean isAccessAllowed(ServletRequest req, ServletResponse res, Object mappedValue)
			throws Exception {
		HttpServletRequest request = (HttpServletRequest)req;
		String jwt = request.getHeader("Authorization");
    	if(jwt.equals("error")||jwt==null){
    		return false;
    	}
    	String host = req.getRemoteHost();
    	JwtToken jwtToken = new JwtToken(jwt,host);
    	try {
			getSubject(req,res).login(jwtToken);
		} catch (Exception e) {
			onLoginFail(res);
			return false;
		}
		return true;
	}

	@Override
	protected boolean onAccessDenied(ServletRequest req, ServletResponse res) throws Exception {
		return false;
	}

	private void onLoginFail(ServletResponse res) throws IOException {
		HttpServletResponse response = (HttpServletResponse)res;
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		PrintWriter out = res.getWriter();
		out.write("Authorization failed or Authorization is timeout");
		out.close();
	}

}
