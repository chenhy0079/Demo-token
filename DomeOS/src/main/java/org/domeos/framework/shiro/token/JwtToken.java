package org.domeos.framework.shiro.token;

import org.apache.shiro.authc.AuthenticationToken;

public class JwtToken implements AuthenticationToken{

	private String jwt;
	
	private String host;
	
	
	public JwtToken(String jwt, String host) {
		super();
		this.jwt = jwt;
		this.host = host;
	}

	@Override
	public Object getPrincipal() {
		return jwt;
	}

	@Override
	public Object getCredentials() {
		// TODO Auto-generated method stub
		return Boolean.TRUE;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}


}
