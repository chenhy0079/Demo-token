﻿"use strict"; !
function(e, n) {
    void 0 !== e && e.controller("WatcherDetailCtr", ["$scope", "$domeDeploy", "$domeCluster", "$domePublic", "$state", "$modal", "$timeout", "$util", "$domeData", "$domeUser", "$window", "api", "dialog",
    function(e, n, t, i, o, r, a, s, l, c, u, d, f) {
        function g(e, n) {
            return f.common({
                title: "选择启动版本",
                buttons: f.buttons.BUTTON_OK_CANCEL,
                template: '\n                        <form name="versionDialog">\n                            <form-container left-column-width="100px">\n                            <form-config-group>\n                                <form-config-item config-title="当前版本">\n                                    <form-input-container>\n                                        <span ng-if="!deployInfo.currentVersions||deployInfo.currentVersions.length===0">无</span>\n                                        <span ng-repeat="versionItem in deployInfo.currentVersions" ng-cloak>version{{versionItem.version}}</span>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="选择version" required>\n                                    <form-input-container>\n                                        <form-select ng-model="deployInfo.version" name="versionSelector"     options="versionList" show-search-input="never" placeholder="选择version" is-loading="isLoadingVersionList" loading-text="正在获取版本信息" empty-text="无相关信息" required></form-select>\n                                        <form-error-message form="versionDialog" target="versionSelector" type="required">请选择版本</form-error-message>\n                                    </form-input-container>\n                                </form-config-item>\n                            </form-config-group>\n                            </form-container>\n                        </form>\n                        ',
                size: 540,
                controller: ["$scope",
                function(n) {
                    n.deployInfo = e,
                    n.isLoadingVersionList = !0,
                    d.deployment.version.listVersion(e.id).then(function(e) {
                        n.versionList = (e || []).map(function(e) {
                            return {
                                value: e.version,
                                text: "version" + e.version
                            }
                        }),
                        n.isLoadingVersionList = !1
                    }).
                    catch(function(e) {
                        n.isLoadingVersionList = !1,
                        f.error("查询失败", e.message)
                    }),
                    n.onbeforeclose = function(e) {
                        return e === f.button.BUTTON_OK ? (n.versionDialog.$submitted = !0, n.versionDialog.$valid && n.resolve(n.deployInfo)) : n.resolve(null),
                        !1
                    }
                }]
            })
        }
        function p(e, n) {
            return f.
            continue ("确认停止", "确认要停止吗?").then(function(n) {
                return n !== f.button.BUTTON_OK ? null: e
            })
        }
        function v(e, n) {
            var t = {
                DEPLOYING: "中断启动，部署会处于停止状态，是否继续？",
                UPDATING: "中断升级，部署可能出现两个运行中的版本，是否继续？",
                BACKROLLING: "中断回滚，部署可能出现两个运行中的版本，是否继续？"
            } [n];
            return f.
            continue ("中断操作", t).then(function(n) {
                return n !== f.button.BUTTON_OK ? null: e
            })
        }
        function h(e, n) {
            return g(e, n).then(function(e) {
                if (e && e.currentVersion === e.version) throw "您不能选择当前版本！";
                return e
            })
        }
        e.$emit("pageTitle", {
            title: "集群",
            descrition: "",
            mod: "clusterManage"
        }),
        e.clusterId = o.params.clusterId,
        e.deployId = o.params.deployId,
        e.resourceType = "DEPLOY",
        e.resourceId = o.params.deployId,
        e.watcher = {},
        e.watcher.containerDrafts = [],
        e.watcher.labelSelectors = [],
        e.watcherlabels = [],
        e.parentState = 'clusterDetail.watcher({id:"' + e.clusterId + '"})',
        e.wrongMessageList = {},
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        }];
        var m, L = e.loadingsIns = i.getLoadingInstance(),
        I = t.getInstance("ClusterService"),
        y = t.getInstance("NodeService"),
        b = [];
        e.showWrong = function(n) {
            void 0 === e.wrongMessageList[n] ? e.wrongMessageList[n] = !0 : e.wrongMessageList[n] = !e.wrongMessageList[n]
        },
        I.getData().then(function(e) {
            b = e.data.result || [],
            E()
        }),
        function() {
            L.startLoading("userRole"),
            c.userService.getResourceUserRole(e.resourceType, e.resourceId).then(function(n) {
                var t = n.data.result;
                "MASTER" === t ? (e.isDelete = !0, e.isEdit = !0) : "DEVELOPER" === t ? (e.isDelete = !1, e.isEdit = !0) : (e.isDelete = !1, e.isEdit = !1)
            },
            function() {
                e.isDelete = !1,
                e.isEdit = !1
            }).
            finally(function() {
                L.finishLoading("userRole")
            })
        } ();
        var w = function() {
            L.startLoading("getDeploy"),
            n.deployService.getSingle(e.deployId).then(function(t) {
                var i = t.data.result;
                e.deployName = i.deployName,
                e.$emit("pageTitle", {
                    title: i.deployName,
                    descrition: i.serviceDnsName,
                    mod: "deployManage"
                }),
                e.deployIns = n.getInstance("Deploy", angular.copy(t.data.result)),
                e.config = e.deployIns.config,
                e.deployIns.clusterListIns.init(angular.copy(b)),
                e.deployIns.toggleCluster()
            }).
            finally(function() {
                L.finishLoading("getDeploy")
            })
        },
        D = function() {
            L.startLoading("getDeployInstance"),
            n.deployService.getInstances(e.deployId).then(function(n) {
                e.instanceList = n.data.result
            },
            function(e) {
                f.error("操作失败！", e.data.resultMsg)
            }).
            finally(function() {
                L.finishLoading("getDeployInstance")
            })
        },
        T = function() {
            return n.deployService.getEvents(e.deployId).then(function(n) {
                var t = n.data.result || [];
                if (!e.eventList || 0 === e.eventList.length) return e.eventList = t,
                t = null,
                !0;
                var i = t.length;
                if (i > e.eventList.length) for (var o = 0; o < i; o++) Object.assign(e.eventList[o], t[o]);
                t = null
            },
            function() {
                return ! 0
            }).
            finally(function() {
                L.finishLoading("freshEvents")
            })
        },
        E = function() {
            L.startLoading("freshEvents"),
            T(),
            w(),
            D()
        },
        S = {
            recover: {
                waitingTxt: "isWaitingRecover",
                action: "rollback",
                name: "恢复",
                dialog: g
            },
            start: {
                waitingTxt: "isWaitingStart",
                action: "start",
                name: "启动",
                dialog: g
            },
            update: {
                waitingTxt: "isWaitingUpVersion",
                action: "update",
                name: "升级",
                dialog: h
            },
            stop: {
                waitingTxt: "isWaitingStop",
                action: "stop",
                name: "停止",
                dialog: p
            },
            abort: {
                waitingTxt: "isWaitingOperation",
                action: "abort",
                name: "中断",
                dialog: v
            }
        };
        e.operate = function(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            i = {
                id: e.deployId,
                version: null,
                currentVersions: e.config.currentVersions,
                currentVersion: e.config.currentVersions.length && e.config.currentVersions[0].version || null,
                replicas: 1
            };
            e[S[n].waitingTxt] = !0,
            S[n].dialog(i, t).then(function(t) {
                return null === t ? void(e[S[n].waitingTxt] = !1) : (t.version && e.toggleVersion(t.version), d.deployment.action[S[n].action](t).then(function(e) {
                    E();
                    var t = "已提交，正在" + S[n].name + "。";
                    return e && "tip" in e && (t = e.tip),
                    f.tip(t, "")
                }).
                catch(function(e) {
                    return f.error(S[n].name + "失败", e.message)
                }).then(function() {
                    e[S[n].waitingTxt] = !1
                }))
            }).
            catch(function(t) {
                return e[S[n].waitingTxt] = !1,
                f.error("警告", t)
            })
        },
        e.deleteDeploy = function() {
            f.danger("确认删除", "确认要删除吗？").then(function(e) {
                if (e !== f.button.BUTTON_OK) throw ""
            }).then(function() {
                d.deployment.delete(e.deployId).then(function() {
                    f.tip("提示", "删除成功！");
                    var n = {
                        id: e.clusterId
                    };
                    o.go("clusterDetail.watcher", n)
                }).
                catch(function(e) {
                    f.error("删除失败！", e.message)
                })
            })
        },
        e.toggleVersion = function(n) {
            e.deployIns.toggleVersion(n)
        }; !
        function() {
            L.startLoading("loadingLabels"),
            I.getLabels(e.clusterId).then(function(n) {
                var t = n.data.result || [];
                e.labelsOption = [];
                for (var i in t)"USER_LABEL_VALUE" === t[i] && e.labelsOption.push({
                    text: i,
                    value: i
                });
                L.startLoading("loadingWatcher"),
                I.getWatcher(e.clusterId).then(function(n) {
                    var t = {};
                    n.data.result.versionSelectorInfos ? (t = n.data.result.versionSelectorInfos[0] || {},
                    e.watcher.containerDrafts = angular.copy(t.containerDrafts), e.watcher.versionType = "WATCHER", t.labelSelectors && t.labelSelectors.length && t.labelSelectors.forEach(function(n, t) {
                        e.watcherlabels.push(n.name)
                    }), e.nodeListIns && e.toggleLabels(e.watcherlabels), L.finishLoading("loadingWatcher")) : I.getInitWatcherVersion(e.deployId).then(function(n) {
                        t = n.data.result,
                        e.watcher.containerDrafts = angular.copy(t.containerDrafts),
                        e.watcher.versionType = "WATCHER",
                        t.labelSelectors.forEach(function(n, t) {
                            e.watcherlabels.push(n.name)
                        }),
                        e.nodeListIns && e.toggleLabels(e.watcherlabels),
                        L.finishLoading("loadingWatcher")
                    }).
                    finally(function() {
                        L.finishLoading("loadingWatcher")
                    })
                })
            }).
            finally(function() {
                L.finishLoading("loadingLabels")
            })
        } (); !
        function() {
            L.startLoading("loadingNode"),
            y.getNodeList(e.clusterId).then(function(n) {
                var i = n.data.result || [];
                e.nodeListIns = t.getInstance("NodeList", i),
                e.watcherlabels && e.toggleLabels(e.watcherlabels)
            },
            function() {
                e.nodeListIns = t.getInstance("NodeList")
            }).
            finally(function() {
                L.finishLoading("loadingNode")
            })
        } (),
        e.toggleLabels = function(n) {
            for (var t in e.nodeListIns.labelsInfo) e.nodeListIns.labelsInfo[t].isSelected = !1;
            if (e.nodeListIns.toggleLabelNodes(), e.watcher.labelSelectors = [], n && n.length) for (var i in n) e.nodeListIns.toggleLabel(n[i], !0),
            e.watcher.labelSelectors.push({
                name: n[i],
                content: "USER_LABEL_VALUE"
            })
        },
        e.modifyMirrorInfo = function() {
            r.open({
                animation: !0,
                templateUrl: "modifyMirrorInfo.html",
                controller: "ModifyMirrorInfoCtr",
                size: "md",
                resolve: {
                    mirrorInfo: function() {
                        return e.watcher.containerDrafts[0]
                    }
                }
            }).result.then(function(n) {
                angular.extend(e.watcher.containerDrafts[0], n)
            })
        },
        e.updateWatcherSubmit = function() {
            e.watcher.deployId = parseInt(e.deployId, 10);
            var n = angular.copy(e.watcher);
            e.isWaitingUpdate = !0,
            e.deployIns.createWatcherVersion(n).then(function(n) {
                e.deployIns.freshVersionList(),
                "update" == n && E()
            }).
            finally(function() {
                e.isWaitingUpdate = !1
            })
        },
        e.getEvents = function() {
            e.eventList || T(),
            m && a.cancel(m),
            m = a(function() {
                T().
                finally(function() {
                    "watcherDetail.event" == o.$current.name && e.getEvents()
                })
            },
            4e3)
        };
        var V = o.$current.name;
        V.indexOf("detail") !== -1 ? e.tabActive[0].active = !0 : V.indexOf("update") !== -1 ? e.tabActive[1].active = !0 : V.indexOf("event") !== -1 ? (e.tabActive[2].active = !0, e.getEvents()) : e.tabActive[0].active = !0,
        e.$on("$destroy",
        function() {
            m && a.cancel(m)
        })
    }]).controller("createWatcherVersionModalCtr", ["$scope", "replicas", "$modalInstance",
    function(e, n, t) {
        e.replicas = 1,
        e.submitUpdateVersion = function() {
            t.close(e.replicas)
        },
        e.cancel = function() {
            t.dismiss("cancel")
        }
    }])
} (angular.module("domeApp"));