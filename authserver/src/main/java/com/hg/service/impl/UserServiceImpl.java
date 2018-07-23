package com.hg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hg.dao.UserMapper;
import com.hg.domain.User;
import com.hg.service.UserService;

/**
 * 
 * @ClassName: BuserServiceImpl   
 * @Description: 鐢ㄦ埛绠＄悊
 * @author: WANG
 * @date 2017骞�4鏈�11鏃� 涓婂崍11:09:16
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	
	public User selectByPrimaryKey(Integer uid) {
		// TODO Auto-generated method stub
		return userMapper.selectByPrimaryKey(uid);
		
	}

	
	public String addString() {
		// TODO Auto-generated method stub
		return "userServiceAddString";
	}

	
}
