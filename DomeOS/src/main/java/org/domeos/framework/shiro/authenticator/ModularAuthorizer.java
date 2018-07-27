package org.domeos.framework.shiro.authenticator;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;
import org.apache.shiro.authz.Authorizer;
import org.apache.shiro.authz.ModularRealmAuthorizer;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.PrincipalCollection;
import org.domeos.framework.api.model.auth.related.LoginType;
import org.domeos.framework.api.model.global.SsoToken;
import org.domeos.framework.shiro.token.JwtToken;
import org.domeos.framework.shiro.token.MultiAuthenticationToken;

import java.util.Collection;
import java.util.Set;

/**
 * Created by feiliu206363 on 2015/12/11.
 */

public class ModularAuthorizer extends ModularRealmAuthorizer {

	 public boolean hasRole(PrincipalCollection principals, String roleIdentifier) {
	        assertRealmsConfigured();
	        Set<String> realmNames = principals.getRealmNames();
	        for (Realm realm : getRealms()) {
	            if(realmNames.contains(realm.getName())){
	            	if (!(realm instanceof Authorizer)) continue;
	                if (((Authorizer) realm).hasRole(principals, roleIdentifier)) {
	                    return true;
	                }
	            }
	        }
	        return false;
	 }
   
}