﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("CreateAlarmTemplateCtr", ["$scope", "$domeAlarm", "dialog", "$state",
    function(e, t, a, n) {
        e.$emit("pageTitle", {
            title: "新建模板",
            descrition: "在这里您可以新建报警模板。",
            mod: "monitor"
        }),
        e.keywords = {
            hostgroup: ""
        },
        e.needValid = {
            valid: !1
        },
        e.isLoading = !1,
        e.alarmTemplateIns = t.getInstance("AlarmTemplate"),
        e.alarmTemplateIns.initHostGroupList(),
        e.alarmTemplateIns.initGroupList(),
        e.alarmTemplateIns.initDeployAndClusterList(),
        e.config = e.alarmTemplateIns.config,
        e.toCreate = function() {
            e.isLoading = !0,
            e.alarmTemplateIns.create().then(function() {
                a.alert("提示", "新建成功"),
                n.go("alarm.templates")
            },
            function(e) {
                a.error("删除失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoading = !1
            })
        }
    }])
} (angular.module("domeApp"));