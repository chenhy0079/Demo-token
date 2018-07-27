package org.domeos.framework.api.service.auth;

import org.domeos.basemodel.HttpResponseTemp;
import org.domeos.framework.api.consolemodel.auth.UserPassword;

public interface AuthService {
	
	String CreateTo(UserPassword up);

}
