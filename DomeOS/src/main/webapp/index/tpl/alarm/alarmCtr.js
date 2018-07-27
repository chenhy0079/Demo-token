﻿"use strict"; !
function(t, e) {
    function r(t, e, r, o, n, a) {
        function i() {
            o.getLoginUser().then(function(t) {
                e.get("/api/user/resource/ALARM/1000").then(function(e) {
                    var r = e.data.result;
                    s.permission.id = t.id,
                    s.permission.role = r
                })
            })
        }
        t.$emit("pageTitle", {
            title: "报警",
            descrition: "在这里您可以管理主机组和监控模板，并查看未恢复报警",
            mod: "monitor"
        });
        var s = this;
        s.tabName = "templates",
        t.$on("tabName",
        function(t, e) {
            s.tabName = e
        }),
        s.permission = {
            id: null,
            username: null,
            role: null
        },
        i(),
        t.$on("memberPermisson",
        function(t, e) {
            e || i()
        }),
        "alarm" === n.current.name && n.go("alarm.templates")
    }
    function o(t, e, r) {
        t.$emit("tabName", "templates");
        var o = e.getInstance("AlarmService"),
        n = this;
        n.keywords = "",
        o.getData().then(function(t) {
            for (var e = t.data.result || [], r = 0, o = e.length; r < o; r++) {
                var a = e[r];
                "host" == a.templateType ? a.templateTypeName = "主机": "deploy" == a.templateType && (a.templateTypeName = "容器")
            }
            n.templatesList = e
        },
        function(t) {
            r.error("获取报警模板失败！", t.data.resultMsg)
        }),
        n.deleteTpl = function(t) {
            r.danger("确认删除", "确认要删除吗？").then(function(t) {
                if (t !== r.button.BUTTON_OK) throw ""
            }).then(function() {
                o.deleteData(t).then(function() {
                    for (var e = 0; e < n.templatesList.length; e++) if (n.templatesList[e].id === t) return void n.templatesList.splice(e, 1)
                },
                function(t) {
                    r.error("删除失败", t.data.resultMsg)
                })
            })
        }
    }
    function n(t, r, o, n, a) {
        t.$emit("tabName", "currentAlarms");
        var i = this;
        i.keywords = "",
        i.loading = !0,
        r.alarmEventService.getData().then(function(t) {
            for (var o = t.data.result || [], n = r.keyMaps.metric, a = function(t) {
                return null !== t && t !== e && "" !== t
            },
            s = 0, u = o.length; s < u; s++) {
                var l = o[s];
                "host" == l.templateType ? (l.templateTypeName = "主机", l.alarmObject = l.hostInfo.hostname) : "deploy" == l.templateType && (l.templateTypeName = "部署", l.alarmObject = l.deploymentAlarmInfo.containerId.substring(0, 12));
                var c = function(t, e) {
                    var r = n[t],
                    o = r.text;
                    return e && ("分区" == r.tagName && 0 === e.indexOf("mount") ? o += "  分区：" + e.substring(6) : "设备" == r.tagName && 0 === e.indexOf("device") ? o += "  设备：" + e.substring(7) : "网卡" == r.tagName && 0 === e.indexOf("iface") && (o += "  网卡：" + e.substring(6))),
                    {
                        metricName: o,
                        unit: r.unit
                    }
                } (l.metric, l.tag);
                a(l.leftValue) && a(l.operator) && a(l.rightValue) && (l.alarmNum = l.leftValue + l.operator + l.rightValue, "" !== c.unit && (l.alarmNum += "(" + c.unit + ")")),
                a(l.currentStep) && a(l.maxStep) && (l.alarmTimes = l.currentStep + "/" + l.maxStep),
                l.metricName = c.metricName
            }
            i.alarmsList = o
        },
        function(t) {
            o.error("获取未恢复报警失败！", t.data.resultMsg)
        }).
        finally(function() {
            i.loading = !1
        }),
        i.ignoreAlarm = function(t) {
            o.danger("确认删除", "确认要删除吗？").then(function(t) {
                if (t !== o.button.BUTTON_OK) throw ""
            }).then(function() {
                r.alarmEventService.ignore(t + "").then(function() {
                    for (var e = 0; e < i.alarmsList.length; e++) if (i.alarmsList[e].id === t) return void i.alarmsList.splice(e, 1)
                },
                function(t) {
                    o.error("删除失败", t.data.resultMsg)
                })
            })
        },
        i.changePopover = function(e) {
            var r, o, i = [];
            "host" == e.templateType && e.hostInfo ? (i.push("<div>集群: " + e.hostInfo.cluster + "</div>"), i.push("<div>ip: " + e.hostInfo.ip + "</div>")) : "deploy" == e.templateType && e.deploymentAlarmInfo && (o = e.deploymentAlarmInfo, r = "TEST" == o.hostEnv ? "测试环境": "PROD" == o.hostEnv ? "生产环境": "无", i.push("<div>集群: " + (o.clusterName || "无") + "</div>"), i.push("<div>主机ip: " + (o.instanceHostIp || "无") + "</div>"), i.push("<div>环境: " + r + "</div>"), i.push("<div>namespace: " + (o.namespace || "无") + "</div>"), i.push("<div>部署: " + o.deploymentName || "无</div>"), i.push("<div>实例: " + (o.instanceName || "无") + "</div>"), i.push("<div>启动时间: " + n.getPageDate(o.instanceCreateTime) + "</div>")),
            t.currentAlarmPopoverHtml = a.trustAsHtml(i.join(""))
        }
    }
    function a(t, e, r, o) {
        function n() {
            a.getData().then(function(t) {
                i.hostGroupList = t.data.result || []
            },
            function(t) {
                r.error("获取主机组失败！", t.data.resultMsg)
            })
        }
        t.$emit("tabName", "hostgroups");
        var a = e.getInstance("HostGroupService"),
        i = this;
        i.newHostGroup = "",
        i.hostGroupPopover = {
            ip: "",
            name: ""
        },
        n(),
        i.deleteHostGroup = function(t) {
            r.danger("确认删除", "确认要删除吗？").then(function(t) {
                if (t !== r.button.BUTTON_OK) throw ""
            }).then(function() {
                a.deleteData(t).then(function() {
                    for (var e = 0; e < i.hostGroupList.length; e++) if (i.hostGroupList[e].id === t) return void i.hostGroupList.splice(e, 1)
                },
                function(t) {
                    r.error("删除失败", t.data.resultMsg)
                })
            })
        },
        i.deleteNode = function(t, e) {
            r.danger("确认删除", "确认要删除吗？").then(function(t) {
                if (t !== r.button.BUTTON_OK) throw ""
            }).then(function() {
                a.deleteHost(t.id, t.hostList[e].id).then(function() {
                    t.hostList.splice(e, 1)
                },
                function(t) {
                    r.error("删除失败", t.data.resultMsg)
                })
            })
        },
        i.addHostGroup = function() {
            for (var t = 0,
            e = i.hostGroupList.length; t < e; t++) if (i.hostGroupList[t].hostGroupName === i.newHostGroup) return void r.error("警告", "主机组已存在！");
            a.setData({
                hostGroupName: i.newHostGroup
            }).then(function(t) {
                t.data.result && i.hostGroupList.unshift(t.data.result),
                i.newHostGroup = ""
            },
            function(t) {
                r.error("添加失败", t.data.resultMsg)
            })
        },
        i.rename = function(t) {
            o.open({
                templateUrl: "renameHostGroupModal.html",
                controller: "RenameHostGroupModalCtr as vmRename",
                size: "md",
                resolve: {
                    hostGroupList: function() {
                        return i.hostGroupList
                    },
                    hostGroup: function() {
                        return t
                    },
                    renameFuc: function() {
                        return a.updateData
                    }
                }
            }).result.then(function(t) {
                "success" === t && n()
            })
        }
    }
    function i(t, e) {
        t.$emit("tabName", "group"),
        t.resourceType = "ALARM",
        t.resourceId = 1e3
    }
    function s(t, e, r, o, n) {
        function a() {
            i.getData().then(function(e) {
                t.userGroupList = e.data.result || []
            },
            function(t) {
                n.error("获取用户组失败！", t.data.resultMsg)
            })
        }
        t.$emit("tabName", "usergroup");
        var i = o.getInstance("UserGroupService");
        t.resourceType = "ALARM",
        a(),
        t.createUserGroup = function() {
            for (var e = 0,
            r = t.userGroupList.length; e < r; e++) if (t.userGroupList[e].userGroupName === t.newUserGroupName) return void n.error("警告", "用户组已存在！");
            var o = {
                id: "",
                userGroupName: t.newUserGroupName
            };
            i.createUserGroup(o).then(function(t) {
                t.data.result;
                a()
            },
            function(t) {
                n.error("添加失败", t.data.resultMsg)
            })
        },
        t.deleteUserGroup = function(t) {
            n.danger("确认删除", "确认要删除吗？").then(function(t) {
                if (t !== n.button.BUTTON_OK) throw ""
            }).then(function() {
                i.deleteUserGroup(t).then(function(t) {
                    n.alert("提示", "删除成功！ "),
                    a()
                },
                function(t) {
                    n.error("删除失败！", t.data.resultMsg)
                })
            })
        }
    }
    function u(t, e, r, o, n) {
        var a = this;
        a.hostGroupList = t,
        a.hostGroup = e,
        a.hostGroupName = "",
        a.cancel = function() {
            n.dismiss()
        },
        a.submitName = function() {
            r({
                id: e.id,
                hostGroupName: a.hostGroupName
            }).then(function() {
                o.alert("提示", "修改成功！"),
                n.close("success")
            },
            function(t) {
                o.error("修改失败", t.data.resultMsg)
            })
        }
    }
    void 0 !== t && (t.controller("AlarmCtr", r).controller("TabAlarmTemplatesCtr", o).controller("TabAlarmCurrentAlarmsCtr", n).controller("TabHostGroupsCtr", a).controller("TabUserGroupCtr", s).controller("TabGroupCtr", i).controller("RenameHostGroupModalCtr", u), r.$inject = ["$scope", "$http", "$domeAlarm", "$domeUser", "$state", "dialog"], o.$inject = ["$scope", "$domeAlarm", "dialog"], n.$inject = ["$scope", "$domeAlarm", "dialog", "$util", "$sce"], a.$inject = ["$scope", "$domeAlarm", "dialog", "$modal"], i.$inject = ["$scope", "$state"], s.$inject = ["$scope", "$state", "$domeUser", "$domeAlarm", "dialog"], u.$inject = ["hostGroupList", "hostGroup", "renameFuc", "dialog", "$modalInstance"])
} (angular.module("domeApp"));