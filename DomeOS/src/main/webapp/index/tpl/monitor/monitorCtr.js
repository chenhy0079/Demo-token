﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("MonitorCtr", ["$scope", "$http", "$domeCluster", "$domeDeploy", "$domeMonitor", "$domePublic", "dialog", "$modal", "$domeUser", "$q", "$sce", "$filter", "api",
    function(e, t, n, s, o, i, r, a, l, c, d, u, g) {
        e.$emit("pageTitle", {
            title: "监控",
            descrition: "在这里您可以对主机、实例和容器进行多维度的实时监控。",
            mod: "monitor"
        }),
        e.loadingsIns = i.getLoadingInstance();
        var h = n.getInstance("NodeService");
        e.monitorType = "主机",
        e.currentEnv = {
            text: "生产",
            value: "PROD"
        },
        e.labelKey = {
            key: ""
        },
        e.keywords = {
            node: "",
            instance: "",
            deployName: ""
        },
        e.orderBy = {
            node: "",
            pod: "",
            isReverse: !1
        },
        e.alarmPermission = {},
        e.loadingsIns.startLoading("loadingCluster"),
        h.getData().then(function(t) {
            e.clusterListIns = n.getInstance("ClusterList", t.data.result),
            e.clusterListIns.clusterList[0] && e.toggleCluster(0)
        }).
        finally(function() {
            e.loadingsIns.finishLoading("loadingCluster")
        }),
        l.getLoginUser().then(function(e) {
            t.get("/api/user/resource/ALARM/1000").then(function(t) {
                var n = t.data.result;
                vm.permission.id = e.id,
                vm.permission.role = n
            })
        });
        var I = function() {
            e.loadingsIns.startLoading("loadingNode"),
            h.getNodeListWoPods(e.clusterListIns.cluster.id).then(function(t) {
            	 console.log("++++++++++++++++++++++++++++++++");
            	console.log(t);
            	var s = t.data.result || [];
               
                console.log(s);
                if (e.nodeListIns = n.getInstance("NodeList", s), e.toggleEnv("生产"), 0 !== s.length) {
                    var i, r, a = [],
                    l = [];
                    for (i = 0, r = s.length; i < r; i++) a[i] = {
                        node: s[i].name
                    },
                    l.push(s[i].name);
                    o.getMonitorStatistical("node", e.clusterListIns.cluster.id, a, l).then(function(t) {
                        var n = e.nodeListIns.nodeList;
                        for (i = 0, r = n.length; i < r; i++) angular.extend(n[i], t[n[i].name])
                    })
                }
            },
            function() {
                e.nodeListIns = n.getInstance("NodeList")
            }).
            finally(function() {
                e.loadingsIns.finishLoading("loadingNode")
            })
        },
        f = function() {
            var t = e.deployListIns.deployInstanceListIns.instanceList;
            if (t && 0 !== t.length) {
                var n, s, i, r, a = [],
                l = [];
                for (n = 0, i = t.length; n < i; n++) {
                    var c = [];
                    if (t[n].containers) for (s = 0, r = t[n].containers.length; s < r; s++) c.push({
                        hostname: t[n].hostName,
                        containerId: t[n].containers[s].containerId
                    });
                    a.push({
                        pod: {
                            podName: t[n].instanceName,
                            containers: c
                        }
                    }),
                    l.push(t[n].instanceName)
                }
                o.getMonitorStatistical("pod", e.clusterListIns.cluster.id, a, l).then(function(e) {
                    for (n = 0, i = t.length; n < i; n++) angular.extend(t[n], e[t[n].instanceName])
                })
            }
        };
        e.modifyTooltip = function(t, n) {
            if (n) {
                var s = [];
                switch (s.push('<div class="table-detail-wrap"><table class="table-detail">'), s.push("<thead><tr>"), t) {
                case "diskUsed":
                    s.push("<th>设备</th><th>磁盘占用率</th>");
                    break;
                case "diskRead":
                    s.push("<th>设备</th><th>磁盘读取(KB/s)</th>");
                    break;
                case "diskWrite":
                    s.push("<th>设备</th><th>磁盘写入(KB/s)</th>");
                    break;
                case "netIn":
                    s.push("<th>网卡</th><th>流入数据(KB/s)</th>");
                    break;
                case "netOut":
                    s.push("<th>网卡</th><th>流出数据(KB/s)</th>")
                }
                s.push("</tr></thead>"),
                s.push("<tbody>");
                for (var o = 0,
                i = n.length; o < i; o++) s.push("<tr><td>" + n[o].item + "</td><td>" + n[o].value + "</td>");
                s.push("</tbody>"),
                s.push("</table></div>"),
                e.toolTipText = d.trustAsHtml(s.join(""))
            }
        },
        //下拉框选择环境是生产/测试
        e.toggleEnv = function(t) {
            var n = "生产" === t ? "PROD": "TEST";
            e.currentEnv = {
                text: t,
                value: n
            },
            "主机" == e.monitorType ? e.nodeListIns.toggleEnv(n) : e.deployListIns.filterDeploy(e.clusterListIns.cluster.name, n, e.instanceType).
            finally(function() {
                f()
            })
        },
        
        e.calcFilterdNodeListLength = function() {
            var t = 0;
            return e.nodeListIns && e.nodeListIns.nodeList.length && (t = u("filter")(e.nodeListIns.nodeList, {
                labelFilter: !0
            }).length),
            "共 " + t + " 台主机"
        },
        //下拉框选择集群
        e.toggleCluster = function(t) {
            e.clusterListIns.toggleCluster(t),
            "主机" == e.monitorType ? I() : "部署实例" != e.monitorType && "负载均衡" !== e.monitorType || e.deployListIns.filterDeploy(e.clusterListIns.cluster.name, e.currentEnv.value, e.instanceType).
            finally(function() {
                f()
            })
        },
        //部署输入框下拉选择
        e.toggleDeploy = function(t, n, s) {
            e.deployListIns.toggleDeploy(t, n, s, "", e.instanceType).
            finally(function() {
                f()
            }),
            e.keywords.deployName = ""
        },
        e.instanceType = "",
        //监控类型选择
        e.toggleMonitorType = function(t) {
            function n() {
                e.clusterListIns.cluster.name && e.deployListIns.filterDeploy(e.clusterListIns.cluster.name, e.currentEnv.value, e.instanceType).
                finally(function() {
                    f()
                })
            }
            t !== e.monitorType && (e.monitorType = t, "主机" == t ? I() : "部署实例" == t ? (e.loadingsIns.startLoading("deploy"), s.deployService.getList().then(function(t) {
                e.deployListIns = s.getInstance("DeployList", t.data.result),
                n()
            },
            function(e) {
                r.error("请求失败", e.data.resultMsg)
            }).
            finally(function() {
                e.loadingsIns.finishLoading("deploy")
            })) : "负载均衡" == t && (e.instanceType = "loadBalance", g.loadBalance.loadBalance.listAll().then(function(t) {
                e.deployListIns = s.getInstance("DeployList", t),
                n()
            }).
            catch(function(e) {
                r.error("请求失败", e.message)
            })))
        },
        
        
        e.toggleOrderBy = function(t, n) {
            e.orderBy[t] === n ? e.orderBy.isReverse = !e.orderBy.isReverse: (e.orderBy[t] = n, e.orderBy.isReverse = !1)
        },
        e.showContainer = function(t) {
            e.deployListIns.deployInstanceListIns.toggleContainerList(t);
            var n, s, i = [],
            r = [],
            l = t.hostName,
            c = e.deployListIns.deployInstanceListIns.containerList;
            for (n = 0, s = c.length; n < s; n++) i.push({
                container: {
                    hostname: l,
                    containerId: c[n].containerId
                }
            }),
            r.push(c[n].containerId);
            o.getMonitorStatistical("container", e.clusterListIns.cluster.id, i, r).then(function(t) {
                for (n = 0, s = c.length; n < s; n++) angular.extend(c[n], t[c[n].containerId]);
                a.open({
                    templateUrl: "containersModal.html",
                    controller: "ContainersModalCtr",
                    size: "lg",
                    resolve: {
                        monitorParams: function() {
                            return {
                                clusterId: e.clusterListIns.cluster.id,
                                clusterName: e.clusterListIns.cluster.name,
                                hostname: l
                            }
                        },
                        instanceIns: function() {
                            return e.deployListIns.deployInstanceListIns
                        }
                    }
                })
            })
        },
        e.toMonitorDetail = function(t, n) {
            function s(e) {
                for (var t = e.containers || [], n = [], s = 0, o = t.length; s < o; s++) n.push({
                    hostname: e.hostName,
                    containerId: t[s].containerId
                });
                return n
            }
            var i, a, l, c = {
                clusterId: e.clusterListIns.cluster.id,
                targetType: t,
                targetInfos: []
            };
            if ("node" == t) if (void 0 !== n) c.targetInfos.push({
                node: n.name
            });
            else for (i = 0, a = e.nodeListIns.nodeList.length; i < a; i++) e.nodeListIns.nodeList[i].isSelected && c.targetInfos.push({
                node: e.nodeListIns.nodeList[i].name
            });
            else if ("pod" == t) if (void 0 !== n) c.targetInfos.push({
                pod: {
                    podName: n.instanceName,
                    containers: s(n)
                }
            });
            else for (l = e.deployListIns.deployInstanceListIns.instanceList, i = 0, a = l.length; i < a; i++) l[i].isSelected && c.targetInfos.push({
                pod: {
                    podName: l[i].instanceName,
                    containers: s(l[i])
                }
            });
            0 === c.targetInfos.length ? r.error("警告", "请至少选择一项监控") : o.toMonitorPage(e.clusterListIns.cluster.id, e.clusterListIns.cluster.name, c)
        },
        //主机标签框点击选择事件
        e.labelKeyDown = function(t, n, s) {
            var o, i = e.nodeListIns.labelsInfo,
            r = !1;
            13 == t.keyCode && s ? angular.forEach(s,
            function(t, n) {
                r || t.isSelected || (e.nodeListIns.toggleLabel(n, !0), e.labelKey.key = ""),
                r = !0
            }) : n || 8 != t.keyCode || (angular.forEach(i,
            function(e, t) {
                e.isSelected && (o = t)
            }), o && e.nodeListIns.toggleLabel(o, !1))
        }
    }]).controller("ContainersModalCtr", ["$scope", "instanceIns", "monitorParams", "$domeMonitor", "dialog",
    function(e, t, n, s, o) {
        t.checkAllContainer(!0),
        e.instanceIns = t;
        var i, r;
        for (e.orderBy = {
            container: "",
            isReverse: !1
        },
        i = 0, r = t.containerList.length; i < r; i++) {
            var a = t.containerList[i].imageName,
            l = a.lastIndexOf(":");
            t.containerList[i].shortContainerId = t.containerList[i].containerId.substring(0, 12),
            l !== -1 && (t.containerList[i].image = a.substring(0, l), t.containerList[i].imageTag = a.substring(l + 1))
        }
        e.toggleOrderBy = function(t) {
            e.orderBy.container === t ? e.orderBy.isReverse = !e.orderBy.isReverse: (e.orderBy.container = t, e.orderBy.isReverse = !1)
        },
        e.toMonitorDetail = function(e) {
            var i = {
                clusterId: n.clusterId,
                targetType: "container",
                targetInfos: []
            };
            if (e) i.targetInfos.push({
                container: {
                    hostname: n.hostname,
                    containerId: e.containerId
                }
            });
            else for (var r = 0,
            a = t.containerList.length; r < a; r++) t.containerList[r].isSelected && i.targetInfos.push({
                container: {
                    hostname: n.hostname,
                    containerId: t.containerList[r].containerId
                }
            });
            0 === i.targetInfos.length ? o.error("警告", "请至少选择一项监控") : s.toMonitorPage(n.clusterId, n.clusterName, i)
        }
    }])
} (angular.module("domeApp"));