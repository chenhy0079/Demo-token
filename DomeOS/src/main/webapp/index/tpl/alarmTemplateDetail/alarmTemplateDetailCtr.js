﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("AlarmTemplateDetailCtr", ["$scope", "$http", "$domeAlarm", "$state", "dialog", "$domeUser",
    function(e, t, i, a, n, l) {
        e.isEdit = !1,
        e.needValid = {
            valid: !1
        };
        var r = {},
        o = a.params.id;
        e.varibles = {
            isLoading: !0
        },
        o || a.go("alarm.template");
        var s = i.getInstance("AlarmService");
        e.permission = {};
        var m = function() {
            e.alarmTemplateIns.initHostGroupList(),
            e.alarmTemplateIns.initGroupList(),
            e.alarmTemplateIns.initDeployAndClusterList(),
            e.config = e.alarmTemplateIns.config,
            r = angular.copy(e.config)
        };
        s.getData(o).then(function(t) {
            e.alarmTemplateIns = i.getInstance("AlarmTemplate", t.data.result),
            m(),
            e.$emit("pageTitle", {
                title: r.templateName,
                descrition: "",
                mod: "monitor"
            }),
            e.varibles.isLoading = !1
        },
        function() {
            n.error("警告", "请求错误！"),
            e.varibles.isLoading = !1
        }),
        l.getLoginUser().then(function(i) {
            t.get("/api/user/resource/ALARM/1000").then(function(t) {
                var a = t.data.result;
                e.permission.id = i.id,
                e.permission.role = a
            })
        }),
        e.saveModify = function() {
            e.varibles.isLoading = !0,
            e.alarmTemplateIns.modify().then(function() {
                n.alert("提示", "修改成功"),
                s.getData(o).then(function(t) {
                    e.alarmTemplateIns.init(t.data.result),
                    m(),
                    e.$emit("pageTitle", {
                        title: r.templateName
                    })
                }),
                e.isEdit = !1
            },
            function(e) {
                n.error("修改失败", e.data.resultMsg)
            }).
            finally(function() {
                e.varibles.isLoading = !1
            })
        },
        e.toggleEdit = function() {
            e.isEdit = !e.isEdit,
            e.isEdit || (e.config = e.alarmTemplateIns.config = angular.copy(r))
        }
    }])
} (angular.module("domeApp"));