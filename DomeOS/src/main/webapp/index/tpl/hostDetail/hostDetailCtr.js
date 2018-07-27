﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("HostDetailCtr", ["$scope", "$stateParams", "$domeCluster", "dialog", "$modal", "$state", "$q",
    function(e, t, n, o, l, a, i) {
        e.loading = !0;
        var s = {
            host: !0,
            instance: !0
        },
        r = n.getInstance("NodeService"),
        d = t.name,
        c = t.clusterId;
        if (!t.name || !t.clusterId) return void a.go("clusterDetail.hostlist", {
            id: c
        });
        var u = {
            testEnv: !1,
            prodEnv: !1
        };
        e.hostSetting = {
            labelTxt: "",
            diskTxt: "",
            isUsedToBuild: !1
        },
        e.$emit("pageTitle", {
            title: d,
            descrition: "",
            mod: "cluster"
        }),
        e.clusterConfig = {},
        e.parentState = 'clusterDetail({id:"' + c + '"})',
        e.clusterId = c,
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        }],
        a.$current.name.indexOf("info") !== -1 ? e.tabActive[1].active = !0 : e.tabActive[0].active = !0,
        e.orderBy = {
            item: "",
            isReverse: !1
        },
        e.toggleOrderBy = function(t) {
            e.orderBy.item === t ? e.orderBy.isReverse = !e.orderBy.isReverse: (e.orderBy.item = t, e.orderBy.isReverse = !1)
        },
        r.getData(c).then(function(t) {
            e.clusterConfig = t.data.result || {}
        }),
        r.getNodeInfo(c, d).then(function(t) {
            var n = t.data.result;
            e.hostSetting.diskTxt = n.diskInfo,
            n.capacity.memory = (n.capacity.memory / 1024 / 1024).toFixed(2),
            n.statusTxt = "Ready" == n.status ? "在线": "离线",
            n.labels && (n.labels.TESTENV && (u.testEnv = !0), n.labels.PRODENV && (u.prodEnv = !0), e.envData = angular.copy(u), Object.keys(n.labels).forEach(function(e) {
                "USER_LABEL_VALUE" !== n.labels[e] && delete n.labels[e]
            }), n.labels.BUILDENV && (e.hostSetting.isUsedToBuild = !0, delete n.labels.BUILDENV), e.labelsList = n.labels),
            n.osVersion && n.osVersion.toLowerCase().indexOf("ubuntu") !== -1 ? e.osType = "ubuntu": (n.osVersion && n.osVersion.toLowerCase().indexOf("red hat"), e.osType = "centos"),
            e.node = n
        },
        function() {
            o.error("警告", "请求失败！"),
            a.go("clusterDetail.hostlist", {
                id: c
            })
        }).
        finally(function() {
            s.host = !1,
            !s.instance && e.loading && (e.loading = !1)
        }),
        r.getHostInstances(c, d).then(function(t) {
            e.instanceList = t.data.result || []
        }).
        finally(function() {
            s.instance = !1,
            !s.host && e.loading && (e.loading = !1)
        }),
        e.showLog = function(e, t, n) {
            l.open({
                templateUrl: "index/tpl/modal/instanceLogModal/instanceLogModal.html",
                controller: "InstanceLogModalCtr",
                size: "md",
                resolve: {
                    instanceInfo: function() {
                        return {
                            clusterId: c,
                            namespace: n,
                            instanceName: e,
                            containers: t
                        }
                    }
                }
            })
        },
        e.toggleBuildEnv = function() {
            var t = [{
                node: d,
                labels: {
                    BUILDENV: "HOSTENVTYPE"
                }
            }];
            e.hostSetting.isUsedToBuild ? r.addLabel(c, t).then(function() {},
            function() {
                o.error("警告", "添加失败！")
            }) : r.getNodeList(c).then(function(e) {
                for (var t = e.data.result || [], n = 0, l = t.length; n < l; n++) if (t[n].name !== d && t[n].labels && t[n].labels.BUILDENV) return ! 0;
                return o.error("警告", "构建集群至少需要一台用于构建的主机！"),
                i.reject()
            }).then(function() {
                r.deleteLabel(c, t).then(function() {},
                function() {
                    o.error("警告", "修改失败！")
                })
            })
        },
        e.modifyEnv = function() {
            var t = [],
            n = [];
            if (!e.envData.testEnv && !e.envData.prodEnv) return void o.error("警告", "请至少选中一个工作场景！");
            e.envData.testEnv ? t.push({
                node: d,
                labels: {
                    TESTENV: "HOSTENVTYPE"
                }
            }) : n.push({
                node: d,
                labels: {
                    TESTENV: "HOSTENVTYPE"
                }
            }),
            e.envData.prodEnv ? t[0] ? t[0].labels.PRODENV = "HOSTENVTYPE": t.push({
                node: d,
                labels: {
                    PRODENV: "HOSTENVTYPE"
                }
            }) : n[0] ? n[0].labels.PRODENV = "HOSTENVTYPE": n.push({
                node: d,
                labels: {
                    PRODENV: "HOSTENVTYPE"
                }
            }),
            0 !== t.length && 0 !== n.length ? r.addLabel(c, t).then(function() {
                return ! 0
            },
            function(e) {
                o.error("修改失败", e.data.resultMsg)
            }).then(function() {
                r.deleteLabel(c, n).then(function() {
                    o.alert("提示", "修改成功！")
                },
                function(e) {
                    o.error("修改失败", e.data.resultMsg)
                })
            }) : 0 !== t.length ? r.addLabel(c, t).then(function() {
                o.alert("提示", "修改成功")
            },
            function(e) {
                o.error("修改失败", e.data.resultMsg)
            }) : r.deleteLabel(c, n).then(function() {
                o.alert("提示", "修改成功")
            },
            function(e) {
                o.error("修改失败", e.data.resultMsg)
            })
        },
        e.addLabel = function() {
            if (e.hostSetting.labelTxt && "" !== e.hostSetting.labelTxt) {
                var t = [{
                    node: d,
                    labels: {}
                }];
                t[0].labels[e.hostSetting.labelTxt] = "USER_LABEL_VALUE",
                r.addLabel(c, t).then(function() {
                    e.labelsList[e.hostSetting.labelTxt] = "USER_LABEL_VALUE",
                    e.hostSetting.labelTxt = ""
                },
                function() {
                    o.error("警告", "添加失败！")
                })
            }
        },
        e.deleteLable = function(t) {
            var n = [{
                node: d,
                labels: {}
            }];
            n[0].labels[t] = null,
            o.
            continue ("提示", "删除主机标签可能会影响部署，是否继续？").then(function(e) {
                if (e !== o.button.BUTTON_OK) throw ""
            }).then(function() {
                r.deleteLabel(c, n).then(function() {
                    delete e.labelsList[t]
                },
                function() {
                    o.error("警告", "删除失败！")
                })
            })
        },
        e.goToDeployInstance = function(e) {
            a.go("deployDetail.instance", {
                id: e.deloyId,
                collectionId: 0,
                collectionName: "all-deploy"
            })
        },
        e.toConsole = function(t) {
            l.open({
                templateUrl: "index/tpl/modal/selectContainerModal/selectContainerModal.html",
                controller: "SelectContainerModalCtr",
                size: "md",
                resolve: {
                    info: function() {
                        return {
                            containerList: e.instanceList[t].containers,
                            hostIp: e.instanceList[t].hostIp,
                            resourceId: c,
                            type: "CLUSTER"
                        }
                    }
                }
            })
        }
    }])
} (angular.module("domeApp"));