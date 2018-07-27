package org.domeos.framework.api.controller.alarm;

import org.domeos.basemodel.HttpResponseTemp;
import org.domeos.framework.api.controller.ApiController;
import org.domeos.framework.api.service.alarm.AlarmEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by baokangwang on 2016/4/14.
 */
@Controller
@RequestMapping("/api")
public class AlarmEventController extends ApiController {

    @Autowired
    AlarmEventService alarmEventService;
/**
 * 获取未恢复报警信息
 * @author 
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/alarm/event", method = RequestMethod.GET)
    public HttpResponseTemp<?> listAlarmEventInfo() {
        return alarmEventService.listAlarmEventInfo();
    }
/**
 * 忽略报警(删除未恢复报警调用)
 * @author  
 * @param alarmString
 * @returnHttpResponseTemp<?>
 */
    @ResponseBody
    @RequestMapping(value = "/alarm/event/ignore", method = RequestMethod.POST)
    public HttpResponseTemp<?> ignoreAlarms(@RequestBody String alarmString) {
        return alarmEventService.ignoreAlarms(alarmString);
    }
}
