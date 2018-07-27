﻿"use strict"; !
function(t, e) {
    function n(t, n, i, s, o) {
        var r = this,
        a = +s.params.id,
        l = s.params.name,
        d = i.getInstance("HostGroupService"),
        c = n.getInstance("NodeService");
        if (!a || !l) return void s.go("alarm.hostgroups");
        t.$emit("pageTitle", {
            title: "添加主机—" + l,
            descrition: "在这里您可以将主机添加到主机组中。",
            mod: "monitor"
        });
        var u = [];
        r.cluster = {},
        r.variable = {
            nodeKey: "",
            selectedNodeKey: ""
        },
        r.toggleCluster = function(t, e) {
            r.cluster.id = t,
            r.cluster.name = e,
            c.getNodeList(t).then(function(t) {
                r.nodeListIns.init(t.data.result, e)
            },
            function() {
                r.nodeListIns.init([], e)
            })
        },
        r.cancelModify = function() {
            r.nodeListIns.initSelectedList(u)
        },
        r.saveModify = function() {
            var t = [],
            n = !0,
            i = !1,
            l = e;
            try {
                for (var c, u = r.nodeListIns.selectedList[Symbol.iterator](); ! (n = (c = u.next()).done); n = !0) {
                    var m = c.value;
                    t.push({
                        hostname: m.name,
                        ip: m.ip,
                        id: m.id,
                        cluster: m.cluster
                    })
                }
            } catch(t) {
                i = !0,
                l = t
            } finally {
                try { ! n && u.
                    return && u.
                    return ()
                } finally {
                    if (i) throw l
                }
            }
            d.addHost(a, t).then(function() {
                o.alert("提示", "添加成功！"),
                s.go("alarm.hostgroups")
            },
            function(t) {
                o.error("添加失败", t.data.resultMsg)
            })
        },
        c.getData().then(function(t) {
            r.clusterList = t.data.result || [],
            r.nodeListIns = i.getInstance("NodeList"),
            r.clusterList[0] && r.toggleCluster(r.clusterList[0].id, r.clusterList[0].name)
        })
    }
    void 0 !== t && (t.controller("AlarmAddHostsCtr", n), n.$inject = ["$scope", "$domeCluster", "$domeAlarm", "$state", "dialog"])
} (angular.module("domeApp"));