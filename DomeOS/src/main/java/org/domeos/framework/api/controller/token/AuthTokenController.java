package org.domeos.framework.api.controller.token;

import org.domeos.basemodel.HttpResponseTemp;
import org.domeos.framework.api.consolemodel.auth.UserPassword;
import org.domeos.framework.api.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/token")
public class AuthTokenController {
	
	@Autowired
	private AuthService authService;

	@ResponseBody
	@RequestMapping(value = "/createToken",method = RequestMethod.POST)
	public String createToken(@RequestBody UserPassword up){
		return authService.CreateTo(up);
	}
	
}
