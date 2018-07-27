﻿"use strict"; !
function(n, e) {
    void 0 !== n && n.controller("DeployDetailCtr", ["$scope", "$domeDeploy", "$domeCluster", "$state", "$modal", "$timeout", "$util", "$domeData", "dialog", "$window", "api",
    function(n, e, t, i, o, r, a, l, c, m, s) {
        function f() {
            N(),
            x && r.cancel(x),
            x = r(f, 4e3)
        }
        function u() {
            L(),
            I = r(u, 4e3)
        }
        function p(n, e) {
            return c.common({
                title: "选择启动版本",
                buttons: c.buttons.BUTTON_OK_CANCEL,
                template: '\n                        <form name="versionDialog">\n                            <form-container left-column-width="100px">\n                            <form-config-group>\n                                <form-config-item config-title="当前版本">\n                                    <form-input-container>\n                                        <span ng-if="!deployInfo.currentVersions||deployInfo.currentVersions.length===0">无</span>\n                                        <span ng-repeat="versionItem in deployInfo.currentVersions" ng-cloak>version{{versionItem.version}}&nbsp;</span>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="选择version" required>\n                                    <form-input-container>\n                                        <form-select ng-model="deployInfo.version" name="versionSelector" options="versionList" show-search-input="never" placeholder="选择version" is-loading="isLoadingVersionList" loading-text="正在获取版本信息" empty-text="无相关信息" required></form-select>\n                                        <form-error-message form="versionDialog" target="versionSelector" type="required">请选择版本</form-error-message>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="启动实例个数" required>\n                                    <form-input-container>\n                                        <input min="1" max="999" ng-model="deployInfo.replicas" type="number" style="width:100%;"/>\n                                    </form-input-container>\n                                </form-config-item>\n                            </form-config-group>\n                            </form-container>\n                        </form>\n                        ',
                size: 540,
                controller: ["$scope",
                function(e) {
                    e.deployInfo = n,
                    e.isLoadingVersionList = !0,
                    s.deployment.version.listVersion(n.id).then(function(n) {
                        e.versionList = (n || []).map(function(n) {
                            return {
                                value: n.version,
                                text: "version" + n.version
                            }
                        })
                    }).
                    catch(function(n) {
                        c.error("查询失败", n.message)
                    }).then(function() {
                        e.isLoadingVersionList = !1
                    }),
                    e.onbeforeclose = function(n) {
                        return n === c.button.BUTTON_OK ? (e.versionDialog.$submitted = !0, e.versionDialog.$valid && e.resolve(e.deployInfo)) : e.resolve(null),
                        !1
                    }
                }]
            })
        }
        function d(n, e) {
            return "DAEMONSET" !== n.deploymentType ? c.common({
                title: "扩容缩容",
                buttons: c.buttons.BUTTON_OK_CANCEL,
                template: '\n                            <form name="scaleDialog">\n                                <form-container left-column-width="100px">\n                                    <form-config-group>\n                                        <form-config-item config-title="当前实例个数">\n                                            <span>{{deployInfo.currentReplicas+\'个\'}}</span>\n                                        </form-config-item>\n                                        <form-config-item config-title="实例个数">\n                                            <form-input-container>\n                                                <input ng-model="deployInfo.replicas" type="number" name="replicasNumber" min=1 max=999 style="width:200px;"/>\n                                                <span>个</span>\n                                            </form-input-container>\n                                        </form-config-item>\n                                    </form-config-group>\n                                </form-container>\n                            </form>\n                            ',
                size: 540,
                controller: ["$scope",
                function(e) {
                    e.deployInfo = n,
                    e.onbeforeclose = function(n) {
                        return n === c.button.BUTTON_OK ? e.scaleDialog.$valid && e.resolve(e.deployInfo) : e.resolve(null),
                        !1
                    }
                }]
            }) : c.common({
                title: "扩容缩容",
                buttons: c.buttons.BUTTON_OK_CANCEL,
                template: '\n                            <form name="scaleDialog">\n                                <form-container left-column-width="80px">\n                                    <form-config-group>\n                                        <form-config-item config-title="主机标签">\n                                            <form-input-container>\n                                                <host-label-selector ng-model="deployInfo.labelSelectors.label" host-env="deployInfo.hostEnv" cluster="deployInfo.cluster"></host-label-selector>\n                                            </form-input-container>\n                                        </form-config-item>\n                                    </form-config-group>\n                                </form-container>\n                            </form>\n                            ',
                size: 600,
                controller: ["$scope",
                function(e) {
                    e.deployInfo = n,
                    e.onbeforeclose = function(n) {
                        if (n === c.button.BUTTON_OK) {
                            if (e.scaleDialog.$valid) {
                                var t = {
                                    TEST: {
                                        name: "TESTENV",
                                        content: "HOSTENVTYPE"
                                    },
                                    PROD: {
                                        name: "PRODENV",
                                        content: "HOSTENVTYPE"
                                    }
                                };
                                e.deployInfo.labels = (e.deployInfo.labelSelectors.label || []).filter(function(n) {
                                    return "HOSTENVTYPE" !== n.content
                                }).concat(t[e.deployInfo.hostEnv]),
                                e.resolve(e.deployInfo)
                            }
                        } else e.resolve(null);
                        return ! 1
                    }
                }]
            })
        }
        function g(n, e) {
            return d(n, e).then(function(e) {
                if ("DAEMONSET" !== n.deploymentType && e && e.currentReplicas === e.replicas) throw "实例个数无变化！";
                return e
            })
        }
        function h(n, e) {
            return p(n, e).then(function(n) {
                if (n && n.currentVersion === n.version) throw "您不能选择当前版本！";
                return n
            })
        }
        function y(n, e) {
            return c.
            continue ("确认停止", "确认要停止吗?").then(function(e) {
                return e !== c.button.BUTTON_OK ? null: n
            })
        }
        function v(n, e) {
            var t = {
                DEPLOYING: "中断启动，部署会处于停止状态，是否继续？",
                UPDATING: "中断升级，部署可能出现两个运行中的版本，是否继续？",
                BACKROLLING: "中断回滚，部署可能出现两个运行中的版本，是否继续？",
                UPSCALING: "中断扩容，部署实例数会处于中断时的个数，是否继续？",
                DOWNSCALING: "中断缩容，部署实例数会处于中断时的个数，是否继续？"
            } [e];
            return c.
            continue ("中断操作", t).then(function(e) {
                return e !== c.button.BUTTON_OK ? null: n
            })
        }
        n.$emit("pageTitle", {
            title: "部署",
            descrition: "",
            mod: "deployManage"
        }),
        n.collectionId = i.params.collectionId,
        n.collectionName = i.params.collectionName,
        n.collectionId && n.collectionName || i.go("deployCollectionManage");
        var D = {
            id: n.collectionId,
            name: n.collectionName
        };
        i.params.id || i.go("deployManage", D);
        var b = i.params.id,
        x = void 0,
        T = void 0,
        I = void 0,
        S = void 0,
        C = b;
        n.storageId = i.params.storageId,
        n.sourceModule = i.params.source,
        n.watcherInfo = {
            clusterId: null
        },
        n.goBackStorage = function() {
            i.go("storageVolumeDetail", {
                id: n.storageId
            }),
            m.refreshMenu = Date.now().toString() + Math.random()
        };
        var $ = "deployCollectionManage";
        "all-deploy" === n.collectionName ? (n.parentState = 'deployAllManage({id:"' + n.collectionId + '",name:"' + n.collectionName + '"})', $ = "deployAllManage") : (n.parentState = 'deployManage({id:"' + n.collectionId + '",name:"' + n.collectionName + '"})', $ = "deployManage"),
        n.valid = {
            needValid: !1
        },
        n.isEditDesc = !1,
        n.wrongMessageList = {},
        n.tabActive = [{
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        }],
        "clusterHostInstance" === n.sourceModule && (n.tabActive[3].active = !0),
        n.labelKey = {
            key: ""
        },
        n.showWrong = function(e) {
            void 0 === n.wrongMessageList[e] ? n.wrongMessageList[e] = !0 : n.wrongMessageList[e] = !n.wrongMessageList[e]
        }; !
        function() {
            var e = {
                type: "DEPLOY",
                id: C
            };
            s.user.myRole(e).then(function(e) {
                n.mayDelete = "MASTER" === e,
                n.mayUpdate = "MASTER" === e || "DEVELOPER" === e
            }).
            catch(function() {
                n.mayDelete = !1,
                n.mayUpdate = !1
            })
        } ();
        var V = s.SimplePromise.resolve([]),
        N = function() {
            n.isLoadingDeploymentInfo = !0,
            V = s.deployment.get(b).then(function(e) {
                return n.config = e || {},
                n.config
            })
        };
        f();
        var E = function() {
            n.isLoadingDetail = !0,
            s.deployment.get(b).then(function(e) {
                return n.config = e || {},
                n.deployName = n.config.deployName,
                n.watcherInfo.clusterId = n.config.clusterId,
                n.config
            }).then(function() {
                w(n.config)
            }).
            catch(function() {}).then(function() {
                var e = n.config;
                s.deployment.version.listVersion(e.deployId).then(function(t) {
                    n.versionList = t || [];
                    var i = null;
                    if (e.currentVersions && e.currentVersions.length > 0) for (var o = -1,
                    r = 0,
                    a = e.currentVersions.length; r < a; r++) e.currentVersions[r].createTime > o && (o = e.currentVersions[r].createTime, n.currentVersionId = e.currentVersions[r].version, i = e.currentVersions[r]);
                    else n.currentVersionId = n.versionList[0].version;
                    return {
                        currentVersion: i,
                        currentVersionId: n.currentVersionId
                    }
                }).then(function(e) {
                    e.currentVersion ? n.deployVersionDraft = e.currentVersion: s.deployment.version.getVersionById(b, e.currentVersionId).then(function(e) {
                        n.deployVersionDraft = e
                    })
                }).
                catch(function(n) {
                    console.error(n)
                }).then(function() {
                    n.isLoadingDetail = !1
                })
            }).
            catch(function(e) {
                console.log(e),
                n.isLoadingDetail = !1,
                n.storageId ? n.goBackStorage() : i.go($, D)
            })
        };
        E(),
        n.toggleVersion = function(e) {
            n.currentVersionId = e,
            s.deployment.version.getVersionById(b, e).then(function(e) {
                n.deployVersionDraft = e
            })
        },
        n.mayDeprecate = function() {
            return ! (n.config && n.config.currentVersions && n.config.currentVersions.length) || !n.config.currentVersions.some(function(e) {
                return e.version === n.currentVersionId
            })
        };
        var k = function() {
            return s.deployment.getEvents(b).then(function(e) {
                var t = e || [];
                if (!n.eventList || 0 === n.eventList.length) return n.eventList = t,
                t = null,
                !0;
                var i = t.length;
                if (i > n.eventList.length) for (var o = 0; o < i; o++) Object.assign(n.eventList[o], t[o]);
                return t = null,
                !0
            }).
            catch(function() {
                return ! 0
            })
        };
        k(),
        n.getEvents = function() {
            n.eventList || k(),
            T && r.cancel(T),
            T = r(function() {
                k().then(function() {
                    "deployDetail.event" === i.$current.name && n.getEvents()
                })
            },
            4e3)
        };
        var L = function() {
            s.deployment.getInstances(b).then(function(e) {
                n.instanceList = e
            })
        };
        u();
        var w = function(e) {
            if (e.lbForDeploys) {
                var t = !0,
                i = !0,
                o = !1,
                r = void 0;
                try {
                    for (var a, l = e.lbForDeploys[Symbol.iterator](); ! (i = (a = l.next()).done); i = !0) {
                        var c = a.value;
                        if ("INNER_SERVICE" === c.lbType) {
                            t = !1;
                            break
                        }
                        if ("EXTERNAL_SERVICE" === c.lbType && c.lbName === e.deployName) {
                            t = !1;
                            break
                        }
                    }
                } catch(n) {
                    o = !0,
                    r = n
                } finally {
                    try { ! i && l.
                        return && l.
                        return ()
                    } finally {
                        if (o) throw r
                    }
                }
                t && e.lbForDeploys.unshift({
                    lbType: "INNER_SERVICE",
                    dnsName: "未设置",
                    serviceDraft: {
                        lbPorts: [],
                        sessionAffinity: "未设置"
                    }
                })
            }
            n.showDeployNet = angular.copy(e)
        },
        O = function() {
            n.isgetingLoadBalance = !0,
            s.deployment.getDeployLoadBalance(b).then(function(e) { (e || []).forEach(function(e) {
                    "INNER_SERVICE" === e.lbType && (n.innerServiceUpdateDraft.sessionAffinity = String(e.serviceDraft.sessionAffinity), n.innerServiceUpdateDraft.loadBalancerPorts = e.serviceDraft.lbPorts)
                })
            }).
            catch(function() {}).then(function() {
                n.isgetingLoadBalance = !1
            })
        };
        n.innerServiceUpdateDraft = {
            sessionAffinity: !1,
            loadBalancerPorts: []
        },
        n.toggleEditLoadBalance = function(e) {
            n.isEditLoadBalance = !n.isEditLoadBalance,
            "cancel" === e ? w(n.config) : "edit" === e && O()
        },
        n.updateLoadBalance = function() {
            var e = !1,
            t = !0,
            i = !1,
            o = void 0;
            try {
                for (var r, a = n.innerServiceUpdateDraft.loadBalancerPorts[Symbol.iterator](); ! (t = (r = a.next()).done); t = !0) {
                    if (void 0 === r.value) {
                        e = !0;
                        break
                    }
                }
            } catch(n) {
                i = !0,
                o = n
            } finally {
                try { ! t && a.
                    return && a.
                    return ()
                } finally {
                    if (i) throw o
                }
            }
            if (e || n.innerServiceUpdateDraft.loadBalancerPorts.some(function(n) {
                return null == n.targetPort || "" === n.targetPort
            })) return void c.alert("提示", "程序服务端口不能为空");
            n.isUpdatingLoadBalance = !0,
            s.deployment.updateLoadBalance(n.showDeployNet.deployId, n.innerServiceUpdateDraft).then(function(e) {
                E(),
                n.isEditLoadBalance = !n.isEditLoadBalance
            }).
            catch(function(n) {
                c.error("修改失败", n.message || "修改访问设置时出现错误")
            }).then(function() {
                n.isUpdatingLoadBalance = !1
            })
        },
        n.showHostByLabels = function() {
            var e = [],
            t = {
                loading: !0
            },
            i = {
                TEST: {
                    name: "TESTENV",
                    content: "HOSTENVTYPE"
                },
                PROD: {
                    name: "PRODENV",
                    content: "HOSTENVTYPE"
                }
            },
            o = angular.copy(n.deployVersionDraft.labelSelectors);
            o = o.filter(function(n) {
                return "HOSTENVTYPE" !== n.content
            }).concat(i[n.deployVersionDraft.hostEnv]),
            s.cluster.listNodeByLabels(n.config.clusterId, o).then(function(n) {
                Array.prototype.push.apply(e, n)
            }).
            catch(function() {}).then(function() {
                t.loading = !1
            }),
            c.common({
                title: "主机列表",
                buttons: c.buttons.BUTTON_OK,
                value: {
                    nodeList: e,
                    isLoadingNode: t
                },
                template: "\n                    <form-container>\n                    <form-table\n                        ng-model=\"value.nodeList\"\n                        template=\"nodeListByLabelsTable\"\n                        columns=\"[\n                            { text: '主机名', key: 'name', width: '30%' },\n                            { text: 'IP地址', key: 'ip', width: '30%' },\n                            { text: '实例个数', key: 'runningPods', width: '20%' },\n                            { text: '状态', key: 'status', width: '20%' },\n                        ]\"\n                        empty-text=\"{{ value.isLoadingNode.loading ? '加载中...' : '无主机信息' }}\"\n                    ></form-table>\n                    </form-container>\n                    <script type=\"text/ng-template\" id=\"nodeListByLabelsTable\">\n                        <div ng-if=\"column.key === 'name'\" ng-bind=\"value\"></div>\n                        <div ng-if=\"column.key === 'ip'\" ng-bind=\"value\"></div>\n                        <div ng-if=\"column.key === 'runningPods'\" ng-bind=\"value\"></div>\n                        <div ng-if=\"column.key === 'status'\" ng-bind=\"value\"></div>\n                    </script>\n                    ",
                size: 600
            })
        },
        n.deprecateVersion = function(e) {
            c.
            continue ("废弃版本", "是否废弃version" + e + "！").then(function(n) {
                if (n !== c.button.BUTTON_OK) throw ""
            }).then(function() {
                n.isWaitingDeprecate = !0,
                s.deployment.version.deprecateVersion(b, e).then(function() {
                    E(),
                    c.tip("提示", "废弃完成！")
                }).
                catch(function(n) {
                    c.error("操作失败！", n.message || "废弃版本时出现错误")
                }).then(function() {
                    n.isWaitingDeprecate = !1
                })
            })
        },
        n.recoverDeprecateVersion = function(e) {
            n.isWaitingDeprecate = !0,
            s.deployment.version.recoverDeprecateVersion(b, e).then(function() {
                E(),
                c.tip("提示", "version" + e + "完成还原！")
            }).
            catch(function(n) {
                c.error("操作失败！", n.message || "还原版本时出现错误")
            }).then(function() {
                n.isWaitingDeprecate = !1
            })
        },
        n.editDescription = {
            text: null
        };
        var P = null;
        n.toggleIsEditDesc = function() {
            P = n.config.description,
            n.editDescription.text = n.config.description,
            n.isEditDesc = !n.isEditDesc
        },
        n.saveDescription = function() {
            n.isEditDesc = !1,
            n.config.description = n.editDescription.text,
            s.deployment.updateDeploymentDescription(b, n.config.description).then(function(n) {
                P = null
            }).
            catch(function(e) {
                n.config.description = P,
                c.error("修改失败", e.message || "修改时出现错误")
            }).then(function() {
                n.isEditDesc = !1
            })
        };
        var U = {
            recover: {
                waitingTxt: "isWaitingRecover",
                action: "rollback",
                name: "恢复",
                dialog: p
            },
            start: {
                waitingTxt: "isWaitingStart",
                action: "start",
                name: "启动",
                dialog: p
            },
            update: {
                waitingTxt: "isWaitingUpVersion",
                action: "update",
                name: "升级",
                dialog: h
            },
            scale: {
                waitingTxt: "isWaitingScale",
                action: "scale",
                name: "扩容/缩容",
                dialog: g
            },
            stop: {
                waitingTxt: "isWaitingStop",
                action: "stop",
                name: "停止",
                dialog: y
            },
            abort: {
                waitingTxt: "isWaitingOperation",
                action: "abort",
                name: "中断",
                dialog: v
            }
        };
        n.operate = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            o = {
                id: n.config.deployId,
                version: null,
                currentVersions: n.config.currentVersions,
                currentVersion: n.config.currentVersions.length && n.config.currentVersions[0].version || null,
                replicas: n.config.defaultReplicas,
                currentReplicas: n.config.currentReplicas,
                labelSelectors: {
                    label: n.config.currentVersions.length && n.config.currentVersions[0].labelSelectors || []
                },
                hostEnv: n.config.currentVersions.length && n.config.currentVersions[0].hostEnv || "",
                labels: [],
                deploymentType: n.config.deploymentType,
                cluster: {
                    id: n.config.clusterId
                }
            };
            n[U[e].waitingTxt] = !0,
            U[e].dialog(o, t).then(function(t) {
                return null === t ? void(n[U[e].waitingTxt] = !1) : (t.version && n.toggleVersion(t.version), s.deployment.action[U[e].action](t).then(function(n) {
                    E();
                    var t = "已提交，正在" + U[e].name + "。";
                    return n && "tip" in n && (t = n.tip),
                    c.tip(t, "")
                }).
                catch(function(t) {
                    return t.response && 1007 === t.response.data.resultCode ? c.
                    continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(e) {
                        e === c.button.BUTTON_OK && i.go("clusterDetail.watcher", {
                            id: n.config.clusterId
                        })
                    }) : c.error(U[e].name + "失败", t.message)
                }).then(function() {
                    n[U[e].waitingTxt] = !1
                }))
            }).
            catch(function(t) {
                return n[U[e].waitingTxt] = !1,
                c.error("警告", t)
            })
        },
        n.restart = function(n) {
            var e = {
                id: b,
                instanceName: n
            };
            c.
            continue ("确认重启实例", "您将要对实例" + n + "进行重启，重启后原实例将被关闭，确认要重启吗？").then(function(n) {
                if (n !== c.button.BUTTON_OK) throw "";
                s.deployment.action.restart(e).then().
                catch(function(n) {
                    c.error("操作失败", n.message)
                })
            })
        },
        n.showLog = function(e, t) {
            o.open({
                templateUrl: "index/tpl/modal/instanceLogModal/instanceLogModal.html",
                controller: "InstanceLogModalCtr",
                size: "md",
                resolve: {
                    instanceInfo: function() {
                        return {
                            clusterId: n.config.clusterId,
                            namespace: n.config.namespace,
                            instanceName: e,
                            containers: t
                        }
                    }
                }
            })
        },
        n.deleteDeploy = function() {
            s.deployment.getDeployLoadBalance(b).then(function(e) {
                var t = (e || []).some(function(n) {
                    return "NGINX" === n.lbType || "EXTERNAL_SERVICE" === n.lbType
                }),
                o = t ? "此部署已关联负载均衡，是否删除？": "确定要删除？";
                c.danger("确认删除", o).then(function(n) {
                    if (n !== c.button.BUTTON_OK) throw ""
                }).then(function() {
                    s.deployment.delete(n.config.deployId).then(function() {
                        c.tip("提示", "删除成功！");
                        var e = {
                            id: n.collectionId,
                            name: n.collectionName
                        };
                        "all-deploy" === n.collectionName ? i.go("deployAllManage", e) : i.go("deployManage", e)
                    }).
                    catch(function(n) {
                        c.error("删除失败！", n.message)
                    })
                })
            }).
            catch(function(n) {
                console.log("delete deploy：", n.message)
            })
        },
        n.toConsole = function(e) {
            o.open({
                templateUrl: "index/tpl/modal/selectContainerModal/selectContainerModal.html",
                controller: "SelectContainerModalCtr",
                size: "md",
                resolve: {
                    info: function() {
                        return {
                            containerList: n.instanceList[e].containers,
                            hostIp: n.instanceList[e].hostIp,
                            resourceId: b,
                            type: "DEPLOY"
                        }
                    }
                }
            })
        },
        n.updateSuccess = function() {
            E()
        },
        S = i.$current.name,
        S.indexOf("update") !== -1 ? n.tabActive[1].active = !0 : S.indexOf("event") !== -1 ? (n.tabActive[2].active = !0, n.getEvents()) : S.indexOf("instance") !== -1 ? n.tabActive[3].active = !0 : S.indexOf("network") !== -1 ? n.tabActive[4].active = !0 : S.indexOf("user") !== -1 ? n.tabActive[5].active = !0 : n.tabActive[0].active = !0,
        n.$on("$destroy",
        function() {
            x && r.cancel(x),
            T && r.cancel(T),
            I && r.cancel(I)
        })
    }])
} (angular.module("domeApp")),
function(n) {
    n.component("updateDeploymentDetail", {
        template: '\n         <style>\n         .form-array-container-deployment .form-array-item-deployment {\n            position: relative;\n            padding-right: 40px;\n            border: 1px solid #ddd;\n            border-radius: 3px;\n            padding: 0 40px 0 0;\n            margin: 0 0 20px 0;\n          }\n         .form-array-item-hide{\n            cursor: pointer;\n            margin: auto;\n            bottom: 0;\n            height: 22px;\n            width: 56px;\n            text-align: center;\n            border-radius: 3px 3px 0 0;\n            border: 1px solid #ddd;\n            border-bottom: 0;\n            line-height: 20px;\n         }\n         .form-container-outer{\n            border: 1px solid #ddd;\n            border-radius: 3px;\n            padding: 0 10px;\n            margin: 3px 0;\n            }\n         </style>\n         <form-container left-column-width="120px">\n          <form name="$ctrl.updateDeploymentForm">\n          \n            <form-config-group ng-if="$ctrl.versionType === \'YAML\' || $ctrl.versionType === \'JSON\'">\n              <form-config-item config-title="{{ ({\'YAML\': \'YAML配置\', \'JSON\' : \'JSON配置\'}[$ctrl.deploymentVersionDraft.versionType]) }}">\n                <form-input-container>\n                    <div class="info-content" style="margin-top: 10px">\n                        <div class="config-input-group-label">\n                          <div class="config-input-group">\n                            <div class="config-input-group-top code-area" style="line-height: 20px" ng-bind="$ctrl.deploymentVersionDraft.versionString.deploymentStrHead"></div>\n                            <div class="config-input-group-textarea-tip" style="text-align: right;margin-top: -20px">\n                                <a ng-click="$ctrl.setPodStrToDefault()" href="javascript:void 0;" ng-if="$ctrl.podStrUndoText === null &amp;&amp; $ctrl.deploymentVersionDraft.versionType === \'YAML\'">YAML配置样例</a>\n                                <a ng-click="$ctrl.setPodStrToDefault()" href="javascript:void 0;" ng-if="$ctrl.podStrUndoText === null &amp;&amp; $ctrl.deploymentVersionDraft.versionType === \'JSON\'">JSON配置样例</a>\n                                <a ng-click="$ctrl.undoPodStrToDefault()" href="javascript:void 0;" ng-if="$ctrl.podStrUndoText !== null">撤销</a>\n                            </div>\n                            <codearea ng-model="$ctrl.deploymentVersionDraft.versionString.podSpecStr" language="{{ ($ctrl.deploymentVersionDraft.versionType).toLowerCase() }}" name="dockerFileConfig" ng-change="$ctrl.clearPodStrUndoText()" height="20,50"></codearea>\n                            <div class="config-input-group-bottom code-area" ng-bind="$ctrl.deploymentVersionDraft.versionString.deploymentStrTail"></div>\n                          </div>\n                        </div>\n                    </div>\n                   </form-input-container>\n              </form-config-item>\n            </form-config-group>\n           <div ng-if="$ctrl.versionType === \'CUSTOM\'">\n            <div style="display: flex; margin: 20px 0;">\n              <span style="padding: 0 10px; font-weight: bold;">镜像设置</span>\n              <form-with-button width="80px" style="flex-grow: 1">\n                <content-area>\n                    <form-select ng-model="$ctrl.addingImage" name="addingImage" options="$ctrl.imageSelectorList" on-change="$ctrl.addImage()" placeholder="请选择镜像，可多次选择添加多个镜像" empty-text="无相关信息"></form-select>\n                </content-area>\n                <button-area>\n                     <button type="button" ng-click="$ctrl.addOtherImage()">其他镜像</button>\n                </button-area>\n              </form-with-button>\n            </div>\n            \n           <div class="form-array-container-deployment">\n            <div class="form-array-item-deployment" ng-repeat="imageDraft in $ctrl.deploymentVersionDraft.containerConsoles track by $index" ng-init="innerForm=\'form\' + $index">\n            \n              <ng-form role="form" name="{{ innerForm }}">\n                <div class="form-array-item-delete" ng-click="$ctrl.deleteImageDraft($index)" ng-if="$ctrl.deploymentVersionDraft.containerConsoles.length > 0">\n                    <icon-close class="form-array-item-delete-icon"></icon-close>\n                </div>\n                <form-config-group>\n                <div>\n                  <form-config-item config-title="镜像仓库">\n                    <form-input-container><span ng-bind="imageDraft.registry"></span></form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="镜像名称">\n                    <form-input-container><span ng-bind="imageDraft.name"></span></form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="镜像版本" required="required">\n                    <form-input-container>\n                      <image-tag-selector ng-model="imageDraft.tag" form="updateDeployment[innerForm]" name="{{ innerForm + \'tag\' }}" image="imageDraft" required></image-tag-selector>\n                    </form-input-container>\n                  </form-config-item>\n                </div>\n                <div ng-hide="!imageDraft.isCollapse">\n                  <form-config-item config-title="自动部署">\n                    <form-input-container>\n                      <form-multiple-inline>\n                        <form-multiple-inline-item style="flex: 0.2">\n                          <form-input-checkbox ng-model="imageDraft.autoDeploy" name="{{ innerForm + \'autoDeploy\' }}" value="true" value-false="false" appearance="switch"></form-input-checkbox>\n                        </form-multiple-inline-item>\n                        <form-multiple-inline-item><div style="display: inline-block;" class="form-help-text">开启后，通过项目构建产生该镜像的新版本时，会自动触发该部署升级。该功能只对运行中的部署有效。</div></form-multiple-inline-item>\n                      </form-multiple-inline>\n                    </form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="镜像拉取策略">\n                    <form-input-container>\n                      <form-input-radio-group ng-model="imageDraft.imagePullPolicy" name="{{ innerForm + \'pullPolicyType\' }}" fallback-value="\'Always\'" options="$ctrl.imagePullPolicyRadioList" required="required"></form-input-radio-group>\n                    </form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="挂载存储">\n                    <form-input-container>\n                      <volume-mount-storage ng-model="imageDraft.volumeMountConsoles" name="{{ innerForm + \'volumeMount\' }}" cluster="$ctrl.cluster" namespace="$ctrl.namespace" container-consoles="$ctrl.deploymentVersionDraft.containerConsoles" container-index="{{ $index }}" image-name="{{ imageDraft.name }}"></volume-mount-storage>\n                    </form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="配置管理">\n                    <form-input-container>\n                      <volume-mount-configmap ng-model="imageDraft.configConsoles" name="{{ innerForm + \'configMap\'}}" cluster="$ctrl.cluster" namespace="$ctrl.namespace"></volume-mount-configmap>\n                      <form-error-message form="updateDeployment[innerForm]" target="{{ innerForm + \'configMap\'}}">配置不能为空，请选择配置</form-error-message>\n                    </form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="启动命令">\n                     <form-input-container>\n                        <input ng-model="imageDraft.commands" type="text" name="{{ innerForm + \'commands\'}}" cluster="deploymentDraft.cluster" placeholder="启动命令不能包含启动参数，示例/sbin/dumb-init、docker-entrypoint.sh" />\n                    </form-input-container>\n                 </form-config-item>                \n                <form-config-item config-title="启动参数">\n                    <form-input-container>\n                        <form-array-container ng-model="imageDraft.args" template="envInputargs" max-length="100" min-length="0" type="simple">\n                        </form-array-container>\n                    </form-input-container>\n                </form-config-item>\n                 <script type="text/ng-template" id="envInputargs">\n                    <form-multiple-inline>\n                        <form-multiple-inline-item>\n                            <input ng-model="$ctrl.ngModel[$index]" type="text" name="argsValue{{$index}}"  required max-length="100" min-length="0" placeholder="用于设置启动命令所需的参数，一个输入框中仅能添加一个启动参数"/>\n                        </form-multiple-inline-item>\n                    </form-multiple-inline>\n                 </script>\n                  <form-config-item config-title="运行过程环境变量">\n                    <form-input-container>\n                      <form-table ng-if="imageDraft.oldEnv && imageDraft.oldEnv.length > 0" ng-model="imageDraft.oldEnv" template="existentEnvTable" columns="[\n                        { text: \'环境变量名\', key: \'key\' },\n                        { text: \'环境变量值\', key: \'value\' },\n                        { text: \'描述\', key: \'description\'},\n                        ]">\n                      </form-table>\n                      <script type="text/ng-template" id="existentEnvTable">\n                        <div ng-if="column.key === \'key\'" ng-bind="value"></div>\n                        <div ng-if="column.key === \'value\'">\n                          <input type="text" ng-model="value"/>\n                        </div>\n                        <div ng-if="column.key === \'description\'" ng-bind="value"></div>\n                      </script>\n                      <form-array-container ng-model="imageDraft.newEnv" template="envInput" max-length="100" min-length="0" type="simple"></form-array-container>\n                      <script type="text/ng-template" id="envInput">\n                        <form-multiple-inline>\n                          <form-multiple-inline-item>\n                            <input ng-model="$ctrl.ngModel[$index].key" type="text" name="envKey{{$index}}" required="required" ng-pattern="/^[A-Za-z_][A-Za-z0-9_]*$/" placeholder="环境变量名"/>\n                          </form-multiple-inline-item>\n                          <form-multiple-inline-item style="margin-left: 6px">\n                            <input ng-model="$ctrl.ngModel[$index].value" type="text" name="envValue{{$index}}" required="required" placeholder="环境变量值"/>\n                          </form-multiple-inline-item>\n                          <form-multiple-inline-item style="margin-left: 6px">\n                            <input ng-model="$ctrl.ngModel[$index].description" type="text" name="envDescription{{$index}}" placeholder="描述信息" />\n                          </form-multiple-inline-item>\n                        </form-multiple-inline>\n                      </script>\n                    </form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="容器大小" required="required">\n                    <form-input-container><span style="margin-right: 20px"><span>CPU(个)</span>\n                        <input ng-model="imageDraft.cpu" type="number" step="0.1" min="0" name="{{ innerForm + \'imageCpu\' }}" required="required" ng-pattern="/^(([0-9]+.[0-9]*[0-9][0-9]*)|([0-9]*[0-9][0-9]*.[0-9]+)|([0-9]*[0-9][0-9]*))$/"/></span><span style="margin-right: 20px"><span>内存(MB)</span>\n                        <input ng-model="imageDraft.mem" type="number" min="0" name="{{ innerForm + \'imageMemory\' }}" required="required" ng-pattern="/^[0-9]\\d*$/"/></span></form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="健康检查">\n                    <form-input-container help-text="根据配置的检查规则来判定部署实例是否健康，如果不健康就重启该部署实例。">\n                      <form-input-radio-group ng-model="imageDraft.healthChecker.type" name="{{ innerForm + \'healthCheckerType\' }}" fallback-value="\'NONE\'" options="$ctrl.imageHealthCheckerRadioList" required="required"></form-input-radio-group>\n                      <sub-form-container left-column-width="105px" ng-if="$ctrl.isDisplayChecker(imageDraft,\'healthChecker\')">\n                        <form-config-group>\n                          <form-config-item config-title="检查端口">\n                            <form-input-container>\n                              <input ng-model="imageDraft.healthChecker.port" type="number" min="1" max="65535" style="width:100%;" name="{{ innerForm + \'healthCheckerPort\' }}" placeholder="请输入端口号" required="required"/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="超时时间(s)">\n                            <form-input-container>\n                              <input ng-model="imageDraft.healthChecker.timeout" type="number" min="1" name="{{ innerForm + \'healthCheckerTimeout\' }}" placeholder="超过时间达到规定阈值，则健康检查判定为异常" required="required" style="width:100%" ng-pattern="/^[1-9]\\d*$/"/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="首次检测延迟(s)">\n                            <form-input-container>\n                              <input ng-model="imageDraft.healthChecker.delay" type="number" min="1" name="{{ innerForm + \'healthCheckerDelay\' }}" placeholder="容器启动后延迟规定秒数，再开始健康检查" required="required" style="width:100%" ng-pattern="/^[1-9]\\d*$/"/>\n                            </form-input-container>\n                          </form-config-item>\n                           <form-config-item config-title="检查周期(s)">\n                            <form-input-container>\n                              <input  placeholder=\'健康检查的时间间隔\' ng-model="imageDraft.healthChecker.periodSeconds" type="number" min="1" name="{{ innerForm + \'healthCheckerPeriodSeconds\' }}"  required="required" style="width:100%"/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="检查次数">\n                            <form-input-container help-text="健康检查连续失败次数达到阈值，健康检查判断为异常；健康检查连续成功次数达到阈值，健康检查判断为正常" help-text-position="bottom">\n                                 <form-multiple-inline>\n                                         <form-multiple-inline-item style="flex:1")>\n                                            <span style="margin-right: 1ch;">失败次数</span>\n                                            <input ng-model="imageDraft.healthChecker.failureThreshold" type="number" min="1" name="{{innerForm + \'healthCheckerFailureThreshold\' }}" style="width: 48%;" required/>                                       \n                                         </form-multiple-inline-item>\n                                         <form-multiple-inline-item style="flex:1")>\n                                            <span>成功次数：1</span>\n                                         </form-multiple-inline-item>\n                                 </form-multiple-inline>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="检测URL" ng-if="$ctrl.isDisplayCheckerUrl(imageDraft, \'healthChecker\')">\n                            <form-input-container>\n                              <input ng-model="imageDraft.healthChecker.url" type="text" name="{{ innerForm + \'healthCheckerUrl\' }}" placeholder="请输入URL" required="required"/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="允许返回值" ng-if="$ctrl.isDisplayCheckerStatusCode(imageDraft, \'healthChecker\')">\n                            <form-input-container><span>200-400(不包含400)</span></form-input-container>\n                          </form-config-item>\n                        </form-config-group>\n                      </sub-form-container>\n                    </form-input-container>\n                  </form-config-item>\n                  <form-config-item config-title="就绪性检查">\n                    <form-input-container help-text="根据配置的规则来检查实例能否访问；配置该项时，通过对内服务或对外服务访问部署时，请求只被转发到就绪状态的实例；非就绪状态的实例不会被重启。">\n                      <form-input-radio-group ng-model="imageDraft.readinessChecker.type" name="{{ innerForm + \'readinessCheckerType\' }}" fallback-value="\'NONE\'" options="$ctrl.imageReadinessCheckerRadioList" required></form-input-radio-group>\n                      <sub-form-container left-column-width="105px" ng-if="$ctrl.isDisplayChecker(imageDraft,\'readinessChecker\')">\n                        <form-config-group>\n                          <form-config-item config-title="检查端口">\n                            <form-input-container>\n                              <input ng-model="imageDraft.readinessChecker.port" type="number" min="1" max="65535" style="width:100%;" name="{{ innerForm + \'readinessCheckerPort\' }}" placeholder="请输入端口号" required/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="超时时间(s)">\n                            <form-input-container>\n                              <input ng-model="imageDraft.readinessChecker.timeout" type="number" min="1" name="{{ innerForm + \'readinessCheckerTimeout\' }}" placeholder="超过时间达到规定阈值，则就绪性检查判定为异常" required style="width:100%"/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="首次检测延迟(s)">\n                            <form-input-container>\n                              <input ng-model="imageDraft.readinessChecker.delay" type="number" min="1" name="{{ innerForm + \'readinessCheckerDelay\' }}" placeholder="容器启动后延迟规定秒数，再开始就绪性检查" required style="width:100%" />\n                            </form-input-container>\n                          </form-config-item>\n                           <form-config-item config-title="检查周期(s)">\n                            <form-input-container>\n                              <input  placeholder=\'就绪性检查的时间间隔\' ng-model="imageDraft.readinessChecker.periodSeconds" type="number" min="1" name="{{ innerForm + \'readinessCheckerPeriodSeconds\' }}"  required style="width:100%"/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="检查次数">\n                            <form-input-container help-text="就绪性检查连续失败次数达到阈值，就绪性检查判断为异常；就绪性检查连续成功次数达到阈值，就绪性检查判断为正常" help-text-position="bottom">\n                                 <form-multiple-inline>\n                                         <form-multiple-inline-item style="flex:1")>\n                                            <span style="margin-right: 1ch;">失败次数</span>\n                                            <input ng-model="imageDraft.readinessChecker.failureThreshold" type="number" min="1" name="{{innerForm + \'readinessCheckerFailureThreshold\' }}" style="width: 48%;" required/>                                       \n                                         </form-multiple-inline-item>\n                                         <form-multiple-inline-item style="flex:1")>\n                                            <span style="margin-right: 1ch;">成功次数</span>\n                                            <input ng-model="imageDraft.readinessChecker.successThreshold" type="number" min="1" name="{{innerForm + \'readinessCheckerFailureThreshold\' }}" style="width: 48%;" required/>\n                                         </form-multiple-inline-item>\n                                 </form-multiple-inline>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="检测URL" ng-if="$ctrl.isDisplayCheckerUrl(imageDraft,\'readinessChecker\')">\n                            <form-input-container>\n                              <input ng-model="imageDraft.readinessChecker.url" type="text" name="{{ innerForm + \'readinessCheckerUrl\' }}" placeholder="请输入URL" required/>\n                            </form-input-container>\n                          </form-config-item>\n                          <form-config-item config-title="允许返回值" ng-if="$ctrl.isDisplayCheckerStatusCode(imageDraft,\'readinessChecker\')">\n                            <form-input-container><span>200-400(不包含400)</span></form-input-container>\n                          </form-config-item>\n                        </form-config-group>\n                      </sub-form-container>\n                    </form-input-container>\n                  </form-config-item>\n\n                  <form-config-item config-title="日志">\n                    <form-input-container>\n                      <container-log ng-model="imageDraft.logItemDrafts" name="{{ innerForm + \'logItem\' }}" cluster="$ctrl.cluster"></container-log>\n                    </form-input-container>\n                  </form-config-item>\n                </div>  \n                </form-config-group>\n                <div class="form-array-item-hide" ng-click="$ctrl.toggleCollapseItem(imageDraft)">\n                    <i class="icon-down-double" ng-class="{\'up\': imageDraft.isCollapse}"></i>\n                </div>\n              </ng-form>\n              \n             </div>\n            </div>\n                \n              <div>\n                <div style="padding: 0 10px; font-weight: bold;">部署设置</div>\n                <div class="form-container-outer">\n                    <form-config-group>\n                        <form-config-item config-title="筛选主机">\n                            <form-input-container>\n                                <form-multiple-inline>\n                                    <form-multiple-inline-item>\n                                        <span>集群：</span><span ng-bind="$ctrl.deploymentVersionDraft.clusterName"></span>\n                                    </form-multiple-inline-item>\n                                    <form-multiple-inline-item>\n                                        <span>工作场景：</span><span ng-bind="$ctrl.deploymentAppEnv[$ctrl.deploymentVersionDraft.hostEnv]"></span>\n                                    </form-multiple-inline-item>\n                                </form-multiple-inline>\n                               <host-label-selector ng-model="$ctrl.deploymentVersionDraft.labelSelectors" host-env="$ctrl.deploymentVersionDraft.hostEnv" cluster="$ctrl.cluster"></host-label-selector>\n                            </form-input-container>\n                        </form-config-item>\n                        <form-config-item config-title="网络模式">\n                            <form-input-container>\n                                <span ng-bind="$ctrl.deploymentVersionDraft.networkMode === \'HOST\' ? \'HOST\' : \'Overlay\'"></span>\n                            </form-input-container>\n                        </form-config-item>\n                    </form-config-group>\n                </div>\n              </div>\n            </div>\n            <form-config-group ng-if="$ctrl.hasUpdatePermission">\n                <form-config-item>\n                <form-input-container>\n                    <form-submit-button form="$ctrl.updateDeploymentForm" on-submit="$ctrl.updateDeployment()">提交升级设置</form-submit-button>\n                </form-input-container>\n            </form-config-group>    \n          </form>\n        </form-container>\n        ',
        bindings: {
            clusterId: "<?",
            namespace: "<?",
            deploymentId: "<?",
            versionId: "<?",
            deploymentStatus: "<?",
            defaultReplicas: "<?",
            onUpdateSuccess: "&?",
            versionType: "<?",
            clusterLog: "<?",
            hasUpdatePermission: "<?"
        },
        controller: ["$scope", "$timeout", "api", "dialog",
        function(n, e, t, i) {
            var o = this;
            o.addingImage = null,
            o.deploymentAppEnv = {
                TEST: "测试环境",
                PROD: "生产环境"
            },
            o.imagePullPolicyRadioList = [{
                value: "Always",
                text: "Always"
            },
            {
                value: "Never",
                text: "Never"
            },
            {
                value: "IfNotPresent",
                text: "If Not Present"
            }],
            o.imageHealthCheckerRadioList = o.imageReadinessCheckerRadioList = [{
                value: "NONE",
                text: "NONE"
            },
            {
                value: "TCP",
                text: "TCP检查"
            },
            {
                value: "HTTP",
                text: "HTTP检查"
            }],
            o.isDisplayChecker = function(n, e) {
                return "NONE" !== n[e].type
            },
            o.isDisplayCheckerUrl = function(n, e) {
                return "HTTP" === n[e].type
            },
            o.isDisplayCheckerStatusCode = function(n, e) {
                return "HTTP" === n[e].type
            },
            o.toggleCollapseItem = function(n) {
                n.isCollapse = !n.isCollapse
            },
            function() {
                t.image.privateRegistry.list().then(function(n) {
                    o.imageSelectorList = (n || []).map(function(n) {
                        return {
                            text: n.name,
                            value: {
                                name: n.name,
                                registry: n.registry,
                                envSettings: n.envSettings
                            },
                            remark: n.registry
                        }
                    })
                })
            } ();
            var r = function(n) {
                n && (o.deploymentVersionDraft.containerConsoles.push(angular.copy({
                    name: n.name,
                    registry: n.registry,
                    cpu: .5,
                    mem: 1024,
                    tag: n.tag ? n.tag: null,
                    oldEnv: n.envSettings || [],
                    newEnv: [],
                    healthChecker: {
                        type: "NONE",
                        failureThreshold: 3
                    },
                    readinessChecker: {
                        type: "NONE",
                        failureThreshold: 3,
                        successThreshold: 1
                    },
                    imagePullPolicy: "Always",
                    autoDeploy: !1,
                    logItemDrafts: [],
                    volumeMountConsoles: [],
                    configConsoles: []
                })), o.addingImage = null)
            };
            o.addImage = function() {
                e(function() {
                    var n = o.addingImage;
                    r(n)
                },
                0)
            },
            o.deleteImageDraft = function(n) {
                o.deploymentVersionDraft.containerConsoles.splice(n, 1)
            };
            var a = function() {
                o.onUpdateSuccess()
            };
            o.updateDeployment = function() {
                if (console.log("update deploy:", o.deploymentVersionDraft), 0 === o.deploymentVersionDraft.containerConsoles.length) return void i.alert(" 警告", "请至少选择一个镜像");
                var n = o.deploymentVersionDraft.deployId,
                e = null,
                r = {
                    replicas: o.defaultReplicas,
                    newVersionId: ""
                },
                l = t.deployment.version.createVersion(n, o.deploymentVersionDraft).then(function(n) {
                    e = n,
                    r.newVersionId = n
                });
                l.
                catch(function(n) {
                    i.error("创建新版本失败", n.message)
                }),
                l.then(function() {
                    a(),
                    o.updateDeploymentForm.$submitted = !1,
                    "RUNNING" !== o.deploymentStatus ? i.alert("新建部署版本", "成功新建部署版本：version" + r.newVersionId + ", 当前为" + o.deploymentStatus + "状态，非运行状态不能升级。") : i.common({
                        title: "升级版本",
                        buttons: [{
                            text: "暂不升级",
                            value: i.button.BUTTON_CANCEL,
                            secondary: !1
                        },
                        {
                            text: "继续升级",
                            value: i.button.BUTTON_OK
                        }],
                        value: r,
                        template: '\n                            <form-container left-column-width="60px">\n                            <form name="replicasDialog" ng-class="{\'need-valid\':replicasDialog.$submitted}">\n                                <form-config-group>\n                                    <div>成功新建部署版本: version{{ value.newVersionId }}，是否升级到新版本？</div>\n                                    <form-config-item config-title="实例个数" required>\n                                        <form-input-container>\n                                            <input style="width: 150px;" type="number" min="1" name="replicas" ng-model="value.replicas" required ng-pattern="/^[1-9]\\d*$/">\n                                        </form-input-container>\n                                    </form-config-item>\n                                </form-config-group>\n                            </form>\n                            </form-container>\n                            ',
                        size: 400
                    }).then(function(o) {
                        if (o == i.button.BUTTON_OK) {
                            if (!r.replicas || !angular.isNumber(r.replicas)) return void i.alert("错误信息", "实例个数输入格式错误");
                            i.tip("提示", "升级中，请查看部署状态！"),
                            t.deployment.action.updateDeployment(n, e, r.replicas).then(function(n) {
                                a()
                            }).
                            catch(function(n) {
                                i.error("升级失败", n.message)
                            })
                        }
                    })
                })
            };
            var l = function() {
                o.deploymentId && o.versionId && t.deployment.version.getVersionById(o.deploymentId, o.versionId).then(function(n) {
                    o.deploymentVersionDraft = n
                })
            },
            c = function() {
                o.clusterId && (o.cluster = {
                    id: o.clusterId,
                    clusterLog: o.clusterLog
                })
            };
            n.$watch("$ctrl.clusterId", c),
            n.$watch("$ctrl.deploymentId", l),
            n.$watch("$ctrl.versionId", l),
            o.addOtherImage = function() {
                var n = {
                    name: "",
                    registry: "",
                    tag: ""
                };
                i.common({
                    title: "添加其他镜像",
                    buttons: i.buttons.BUTTON_OK_CANCEL,
                    value: {
                        otherImage: n
                    },
                    template: '\n                    <form name="otherImageDialog" ng-class="{\'need-valid\':otherImageDialog.$submitted}">\n                        <form-container left-column-width="60px">\n                            <form-config-group>\n                                <form-config-item config-title="仓库地址" required>\n                                    <form-input-container>\n                                        <input type="text" name="registry" ng-model="value.otherImage.registry" required>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="镜像名称" required>\n                                    <form-input-container>\n                                        <input type="text" name="name" ng-model="value.otherImage.name" required>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="镜像版本" required>\n                                    <form-input-container>\n                                        <input type="text" name="tag" ng-model="value.otherImage.tag" required>\n                                    </form-input-container>\n                                </form-config-item>\n                            </form-config-group>\n                        </form-container>\n                    </form>\n                    ',
                    size: 540
                }).then(function(e) {
                    if (e === i.button.BUTTON_OK) {
                        if (!n.name || !n.registry || !n.tag) return;
                        r(n)
                    }
                })
            },
            o.podStrUndoText = null;
            var m = {
                YAML: 'containers:\n- image: "pub.domeos.org/registry:2.3"\n  name: "test-container"\n  volumeMounts:\n  - mountPath: "/test-hostpath"\n    name: "test-volume"\nvolumes:\n- hostPath:\n    path: "/opt/scs"\n  name: "test-volume"\n',
                JSON: '{\n  "containers": [{\n    "image": "pub.domeos.org/registry:2.3",\n    "name": "test-container",\n    "volumeMounts": [{\n      "mountPath": "/test-hostpath",\n      "name": "test-volume"\n    }]\n  }],\n  "volumes": [{\n    "hostPath": {\n      "path": "/opt/scs"\n    },\n    "name": "test-volume"\n  }]\n}\n'
            };
            o.setPodStrToDefault = function() {
                o.podStrUndoText = o.deploymentVersionDraft.versionString.podSpecStr || "",
                o.deploymentVersionDraft.versionString.podSpecStr = m[o.deploymentVersionDraft.versionType]
            },
            o.clearPodStrUndoText = function() {
                o.podStrUndoText = null
            },
            o.undoPodStrToDefault = function() {
                o.deploymentVersionDraft.versionString.podSpecStr = o.podStrUndoText,
                o.podStrUndoText = null
            }
        }]
    })
} (angular.module("formInputs"));