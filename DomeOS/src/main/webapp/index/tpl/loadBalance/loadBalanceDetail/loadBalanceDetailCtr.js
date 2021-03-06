﻿"use strict"; !
function(n) {
    n.controller("KubeLoadBalanceDetailCtr", ["$scope", "$state", "dialog", "api",
    function(n, e, t, o) {
        function a() {
            n.isLoading = !0,
            o.loadBalance.loadBalance.getById(i).then(function(e) {
                n.loadBalanceDraft = e || {},
                n.hasDeletePermission = "MASTER" === n.loadBalanceDraft.role,
                n.hasUpdatePermission = "MASTER" === n.loadBalanceDraft.role || "DEVELOPER" === n.loadBalanceDraft.role
            }).
            catch(function(n) {
                t.error("错误提示", n.response.data.resultMsg)
            }).then(function() {
                n.isLoading = !1,
                s()
            })
        }
        var r = e.params.collectionId,
        i = e.params.loadBalanceId;
        if (n.loadBalanceDraft = {},
        !r || !i) return void e.go("loadBalanceInfo", {});
        n.collectionId = r,
        n.type = "KUBE_PROXY",
        a();
        var s = function() {
            n.isLoadingNodeIP = !0,
            o.cluster.listNodeList(n.loadBalanceDraft.clusterId).then(function(e) {
                n.nodeIPListSelector = (e || []).map(function(n) {
                    return {
                        value: n.ip,
                        text: n.ip,
                        remark: "主机：" + n.name + " 状态：" + n.status
                    }
                })
            }).
            catch(function() {}).then(function() {
                n.isLoadingNodeIP = !1
            })
        };
        n.toggleEdit = function(e) {
            a(),
            n.isEditing = !n.isEditing
        },
        n.addPortSetting = function() {
            n.loadBalanceDraft.serviceDraft.lbPorts.push({
                port: null,
                targetPort: null,
                protocol: "TCP"
            }),
            n.loadBalanceDraft.serviceDraft.lbPorts = n.loadBalanceDraft.serviceDraft.lbPorts.filter(function(n) {
                return void 0 !== n
            })
        },
        n.updateLoadBalance = function() {
            n.isUpdating = !0,
            n.loadBalanceDraft.lbcId = r,
            o.loadBalance.loadBalance.update(n.loadBalanceDraft).then(function(e) {
                a(),
                n.toggleEdit(),
                n.isUpdating = !1
            }).
            catch(function(e) {
                n.isUpdating = !1,
                t.error("修改错误", e.message || "修改负载均衡时出现错误！")
            })
        }
    }]),
    n.controller("NginxLoadBalanceDetailCtr", ["$scope", "$state", "dialog", "api", "$timeout",
    function(n, e, t, o, a) {
        function r() {
            return o.loadBalance.loadBalance.getById(u).then(function(e) {
                return n.loadBalanceDraft = e || {},
                n.hasDeletePermission = "MASTER" === n.loadBalanceDraft.role,
                n.hasUpdatePermission = "MASTER" === n.loadBalanceDraft.role || "DEVELOPER" === n.loadBalanceDraft.role,
                n.loadBalanceDraft
            }).
            catch(function(n) {
                403 === n.response.data.resultCode && e.go("loadBalanceCollection", {})
            })
        }
        function i() {
            r(),
            d && a.cancel(d),
            d = a(i, 4e3)
        }
        function s() {
            n.isLoading = !0,
            r().then(function(e) {
                n.loadBalanceForRule = angular.copy(e)
            }).
            catch(function(n) {
                t.error("错误提示", n.response.data.resultMsg)
            }).then(function() {
                g(),
                n.isLoading = !1
            })
        }
        function c() {
            var e = {
                versionList: [],
                currentVersion: null,
                isLoadingVersionList: !0,
                currentVersions: n.loadBalanceDraft.nginxDraft.currentVersions
            };
            return o.loadBalance.version.listVersion(u).then(function(n) {
                e.versionList = (n || []).map(function(n) {
                    return {
                        value: n.version,
                        text: "version" + n.version
                    }
                }),
                e.isLoadingVersionList = !1
            }).
            catch(function(n) {
                e.isLoadingVersionList = !1,
                t.error("查询失败", n.message)
            }),
            {
                result: e,
                promise: t.common({
                    title: "选择启动版本",
                    buttons: t.buttons.BUTTON_OK_CANCEL,
                    value: e,
                    template: '\n            <form-container left-column-width="60px">\n              <form-config-group>\n                <form-config-item config-title="当前版本">\n                  <form-input-container>\n                    <span ng-if="!value.currentVersions||value.currentVersions.length===0">无</span>\n                    <span ng-repeat="version in value.currentVersions" ng-cloak>version{{version.version}}</span>\n                  </form-input-container>\n                </form-config-item>\n                <form-config-item config-title="选择版本" required="true">\n                  <form-input-container>\n                    <form-select ng-model="value.currentVersion" name="$_versionSelector" options="value.versionList" show-search-input="never" placeholder="请选择版本" is-loading="isLoadingVersionList" loading-text="正在获取版本信息" empty-text="无相关信息" required="true"></form-select>\n                    <form-error-message form="versionDialog" target="$_versionSelector" type="required">请选择版本</form-error-message>\n                  </form-input-container>\n                </form-config-item>\n              </form-config-group>\n            </form-container>\n          ',
                    size: 540,
                    form: "versionDialog"
                })
            }
        }
        var l = e.params.collectionId,
        u = e.params.loadBalanceId;
        if (!l || !u) return void e.go("loadBalanceCollection", {});
        n.collectionId = l,
        n.type = "NGINX";
        var d = null;
        n.logStoragePrompt = {
            HOSTPATH: "该类别会将主机目录挂载到nginx容器内部，nginx实例调度后存在于主机目录的日志文件不会丢失",
            EMPTYDIR: "nginx的日志会打到容器的控制台，nginx实例调度时，日志会丢失"
        },
        n.updateVersionDraft = {},
        i(),
        s(),
        n.$on("$destroy",
        function() {
            d && a.cancel(d)
        });
        var f = null;
        n.currentVersion = null;
        var g = function() {
            n.isLoadingVersionList = !0,
            o.loadBalance.version.listVersion(u).then(function(e) {
                var t = e || [];
                n.versionList = t.map(function(n) {
                    return {
                        value: n.version,
                        text: "version" + n.version
                    }
                }),
                n.isLoadingVersionList = !1,
                n.loadBalanceDraft.nginxDraft.currentVersions && n.loadBalanceDraft.nginxDraft.currentVersions.length > 0 ? (f = n.currentVersion = n.loadBalanceDraft.nginxDraft.currentVersions[0].version, n.nginxVersionDraft = n.loadBalanceDraft.nginxDraft.currentVersions[0], n.updateVersionDraft = angular.copy(n.nginxVersionDraft)) : (n.currentVersion = t[0].version, m())
            }).
            catch(function(e) {
                n.isLoadingVersionList = !1,
                t.error("查询失败", e.message)
            })
        },
        m = function() {
            o.loadBalance.version.getVersionById(u, n.currentVersion).then(function(e) {
                n.nginxVersionDraft = e || {},
                n.updateVersionDraft = angular.copy(n.nginxVersionDraft)
            }).
            catch(function(n) {
                t.error("查询失败", n.messsage)
            })
        };
        n.toggleVersion = function(e) {
            n.currentVersion !== e && (n.currentVersion = e, m())
        },
        n.createVersion = function() {
            var e = {
                newVersionId: ""
            };
            o.loadBalance.version.create(u, n.updateVersionDraft).then(function(a) {
                s(),
                e.newVersionId = a.version,
                "RUNNING" !== n.loadBalanceDraft.state ? t.alert("新建部署版本", "成功新建部署版本：version" + e.newVersionId + ", 当前为" + n.loadBalanceDraft.state + "状态，非运行状态不能升级。") : t.common({
                    title: "升级版本",
                    buttons: [{
                        text: "暂不升级",
                        value: t.button.BUTTON_CANCEL,
                        secondary: !1
                    },
                    {
                        text: "继续升级",
                        value: t.button.BUTTON_OK
                    }],
                    value: e,
                    template: '\n              <form-container left-column-width="60px">\n              <form name="updateRunningNginxDialog">\n                  <form-config-group>\n                      <div>成功新建部署版本: version{{ value.newVersionId }}，是否升级到新版本？</div>\n                  </form-config-group>\n              </form>\n              </form-container>\n              ',
                    size: 400
                }).then(function(a) {
                    if (a == t.button.BUTTON_OK) {
                        if (!e.newVersionId) return void t.alert("错误信息", "版本号错误");
                        t.tip("", "升级中，请查看部署状态！"),
                        o.loadBalance.action.update(u, e.newVersionId).then(function(t) {
                            n.toggleVersion(e.newVersionId)
                        }).
                        catch(function(n) {
                            t.error("升级失败", n.message)
                        })
                    }
                })
            }).
            catch(function(n) {
                t.error("创建版本错误", n.message)
            })
        },
        n.delete = function() {
            t.danger("确认删除", "确认要删除吗？").then(function(n) {
                if (n !== t.button.BUTTON_OK) throw ""
            }).then(function() {
                o.loadBalance.loadBalance.delete(u).then(function(t) {
                    e.go("loadBalanceInfo", {
                        id: l,
                        type: n.type
                    })
                }).
                catch(function(n) {
                    t.error("删除错误", n.message || "删除时出现错误")
                })
            })
        },
        n.start = function() {
            n.isWaitingStart = !0;
            var a = c();
            a.promise.then(function(r) {
                r === t.button.BUTTON_OK ? (n.toggleVersion(a.result.currentVersion), o.loadBalance.action.start(u, a.result.currentVersion).then(function(e) {
                    f = a.result.currentVersion,
                    n.isWaitingStart = !1
                }).
                catch(function(o) {
                    n.isWaitingStart = !1,
                    1007 === o.response.data.resultCode ? t.
                    continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(o) {
                        o === t.buttons.BUTTON_OK_ONLY && (e.go("clusterDetail.watcher", {
                            id: n.loadBalanceDraft.clusterId
                        }), hide())
                    }) : t.error("启动失败", o.message)
                })) : n.isWaitingStart = !1
            })
        },
        n.recover = function() {
            n.isWaitingRecover = !0;
            var a = c();
            a.promise.then(function(r) {
                r === t.button.BUTTON_OK ? (n.toggleVersion(a.result.currentVersion), o.loadBalance.action.rollback(u, a.result.currentVersion).then(function(e) {
                    f = a.result.currentVersion,
                    n.isWaitingRecover = !1
                }).
                catch(function(o) {
                    n.isWaitingRecover = !1,
                    1007 === o.response.data.resultCode ? t.
                    continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(o) {
                        o === t.buttons.BUTTON_OK_ONLY && (e.go("clusterDetail.watcher", {
                            id: n.loadBalanceDraft.clusterId
                        }), hide())
                    }) : t.error("恢复失败", o.message)
                })) : n.isWaitingRecover = !1
            })
        },
        n.stopVersion = function() {
            n.isWaitingStop = !0,
            t.
            continue ("确认停止", "确认要停止吗？").then(function(e) {
                if (e !== t.button.BUTTON_OK) throw n.isWaitingStop = !1,
                ""
            }).then(function() {
                o.loadBalance.action.stop(u).then(function(e) {
                    f = null,
                    n.isWaitingStop = !1
                }).
                catch(function(o) {
                    n.isWaitingStop = !1,
                    1007 === o.response.data.resultCode ? t.
                    continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(o) {
                        o === t.buttons.BUTTON_OK_ONLY && (e.go("clusterDetail.watcher", {
                            id: n.loadBalanceDraft.clusterId
                        }), hide())
                    }) : t.error("停止错误", o.message || "停止时出现错误")
                })
            })
        },
        n.updateVersion = function() {
            n.isWaitingUpVersion = !0;
            var a = c();
            a.promise.then(function(r) {
                if (r === t.button.BUTTON_OK) {
                    if (!f || !a.result.currentVersion) return n.isWaitingUpVersion = !1,
                    void t.tip("参数错误", "版本号为空");
                    n.toggleVersion(a.result.currentVersion),
                    f === a.result.currentVersion ? (n.isWaitingUpVersion = !1, t.alert("升级/回滚", "您不能选择当前版本进行升级/回滚！")) : f > a.result.currentVersion ? (t.tip("回滚提示", "请求已发送，回滚中..."), o.loadBalance.action.rollback(u, a.result.currentVersion).then(function(e) {
                        f = a.result.currentVersion,
                        n.isWaitingUpVersion = !1
                    }).
                    catch(function(o) {
                        n.isWaitingUpVersion = !1,
                        1007 === o.response.data.resultCode ? t.
                        continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(o) {
                            o === t.buttons.BUTTON_OK_ONLY && (e.go("clusterDetail.watcher", {
                                id: n.loadBalanceDraft.clusterId
                            }), hide())
                        }) : t.error("回滚失败", o.message)
                    })) : f < a.result.currentVersion && (t.tip("升级提示", "请求已发送，升级中..."), o.loadBalance.action.update(u, a.result.currentVersion).then(function(e) {
                        f = a.result.currentVersion,
                        n.isWaitingUpVersion = !1
                    }).
                    catch(function(o) {
                        n.isWaitingUpVersion = !1,
                        1007 === o.response.data.resultCode ? t.
                        continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(o) {
                            o === t.buttons.BUTTON_OK_ONLY && (e.go("clusterDetail.watcher", {
                                id: n.loadBalanceDraft.clusterId
                            }), hide())
                        }) : t.error("升级失败", o.message)
                    }))
                } else n.isWaitingUpVersion = !1
            })
        },
        n.scaleVersion = function() {
            var a = {
                nodeDraft: n.loadBalanceDraft.nginxDraft.currentVersions[0].nodeDraft || [],
                clusterId: n.loadBalanceDraft.clusterId,
                hostEnv: n.loadBalanceDraft.nginxDraft.currentVersions[0].hostEnv
            };
            t.common({
                title: "扩容/缩容",
                buttons: t.buttons.BUTTON_OK_CANCEL,
                value: a,
                template: '\n          <form-container left-column-width="60px">\n            <form-config-group>\n              <form-config-item config-title="选择主机" required="true">\n                <form-input-container>\n                  <form-multiple-select-list ng-model="value.nodeDraft" name="scaleNodeList" parameters="{clusterId:value.clusterId,hostEnv:value.hostEnv}" placeholder="请选择主机" loading-text="正在获取主机" empty-text="无相关信息" error-message="主机不能为空" get-list-fn="{{\'nodeByLabels\'}}"></form-multiple-select-list>\n                  <form-error-message form="scaleDialog" target="scaleNodeList" type="required">请选择主机</form-error-message>\n                </form-input-container>\n              </form-config-item>\n            </form-config-group>\n          </form-container>\n        ',
                size: 540,
                form: "scaleDialog"
            }).then(function(r) {
                r === t.button.BUTTON_OK ? (n.isWaitingScale = !0, n.toggleVersion(f), o.loadBalance.action.scale(u, f, a.nodeDraft).then(function(e) {
                    n.isWaitingScale = !1
                }).
                catch(function(o) {
                    n.isWaitingScale = !1,
                    1007 === o.response.data.resultCode ? t.
                    continue ("警告！", "监听器状态异常，请点击确定进入详情页进行配置").then(function(o) {
                        o === t.buttons.BUTTON_OK_ONLY && (e.go("clusterDetail.watcher", {
                            id: n.loadBalanceDraft.clusterId
                        }), hide())
                    }) : t.error("扩容/缩容失败", o.message)
                })) : n.isWaitingScale = !1
            })
        },
        n.toggleEdit = function(e) {
            s(),
            n.isEditingRule = !n.isEditingRule
        },
        n.updateLoadBalanceRule = function() {
            n.isUpdating = !0,
            o.loadBalance.loadBalance.update(n.loadBalanceForRule).then(function(e) {
                s(),
                n.toggleEdit(),
                n.isUpdating = !1
            }).
            catch(function(e) {
                n.isUpdating = !1,
                t.error("修改错误", e.message || "修改负载均衡时出现错误！")
            })
        },
        n.editDescription = {
            text: null
        };
        var p = null;
        n.toggleIsEditDesc = function() {
            p = n.loadBalanceForRule.description,
            n.editDescription.text = n.loadBalanceForRule.description,
            n.isEditDesc = !n.isEditDesc
        },
        n.updateLoadBalanceDesc = function() {
            n.isEditDesc = !1,
            n.loadBalanceForRule.description = n.editDescription.text,
            o.loadBalance.loadBalance.updateDescription(u, n.loadBalanceForRule.description).then(function(n) {
                p = null
            }).
            catch(function(e) {
                n.loadBalanceForRule.description = p,
                t.error("修改失败", e.message)
            }).then(function() {
                n.isEditDesc = !1
            })
        },
        n.userDefinedImage = function() {
            var e = {
                name: "",
                registry: "",
                tag: ""
            };
            t.common({
                title: "修改定制镜像",
                buttons: t.buttons.BUTTON_OK_CANCEL,
                value: {
                    otherImage: e
                },
                template: '\n            <form-container left-column-width="60px">\n              <form-config-group>\n                <form-help-line>\n                  <icon-info></icon-info><span>DomeOS提供了默认镜像，如果有特殊需求，可以根据文档说明，定制自己的nginx镜像。</span>\n                </form-help-line>\n                <form-config-item config-title="仓库地址" required="true">\n                  <form-input-container>\n                      <input type="text" name="registry" ng-model="value.otherImage.registry" required>\n                      <form-error-message form="otherImageDialog" target="registry" type="required">请填写仓库地址</form-error-message>\n                  </form-input-container>\n                </form-config-item>\n                <form-config-item config-title="镜像名称" required="true">\n                  <form-input-container>\n                      <input type="text" name="name" ng-model="value.otherImage.name" required>\n                      <form-error-message form="otherImageDialog" target="name" type="required">请填写镜像名称</form-error-message>\n                  </form-input-container>\n                </form-config-item>\n                <form-config-item config-title="镜像版本" required="true">\n                  <form-input-container>\n                      <input type="text" name="tag" ng-model="value.otherImage.tag" required>\n                      <form-error-message form="otherImageDialog" target="tag" type="required">请填写镜像版本</form-error-message>\n                  </form-input-container>\n                </form-config-item>\n              </form-config-group>\n            </form-container>\n          ',
                size: 540,
                form: "otherImageDialog"
            }).then(function(o) {
                if (o === t.button.BUTTON_OK) {
                    if (!e.name || !e.registry || !e.tag) return;
                    n.updateVersionDraft.registry = e.registry,
                    n.updateVersionDraft.image = e.name,
                    n.updateVersionDraft.tag = e.tag
                }
            })
        }
    }]),
    n.controller("NginxInstanceCtr", ["$scope", "$state", "api", "dialog", "$modal", "$timeout", "$window",
    function(n, e, t, o, a, r, i) {
        function s() {
            n.isLoadingInstance = !0,
            t.loadBalance.loadBalance.listInstance(l).then(function(e) {
                n.instanceList = e || [],
                n.isLoadingInstance = !1
            }).
            catch(function(e) {
                n.isLoadingInstance = !1,
                console.log("list load balance instance list error: ", e)
            })
        }
        function c() {
            s(),
            u && r.cancel(u),
            u = r(c, 4e3)
        }
        var l = (e.params.collectionId, e.params.loadBalanceId),
        u = null;
        t.loadBalance.loadBalance.getById(l).then(function(e) {
            n.loadBalanceDraft = e || {}
        }),
        s(),
        c(),
        n.$on("$destroy",
        function() {
            u && r.cancel(u)
        }),
        n.showLog = function(e) {
            a.open({
                templateUrl: "index/tpl/modal/instanceLogModal/instanceLogModal.html",
                controller: "InstanceLogModalCtr",
                size: "md",
                resolve: {
                    instanceInfo: function() {
                        return {
                            clusterId: n.loadBalanceDraft.clusterId,
                            namespace: n.loadBalanceDraft.namespace,
                            instanceName: e.instanceName,
                            containers: e.containers
                        }
                    }
                }
            })
        },
        n.toConsole = function(e) {
            a.open({
                templateUrl: "index/tpl/modal/selectContainerModal/selectContainerModal.html",
                controller: "SelectContainerModalCtr",
                size: "md",
                resolve: {
                    info: function() {
                        return {
                            containerList: n.instanceList[e].containers,
                            hostIp: n.instanceList[e].hostIp,
                            resourceId: l,
                            type: "LOADBALANCER"
                        }
                    }
                }
            })
        },
        n.restartInstance = function(e) {
            n.isRestartInstance = !0,
            "Terminating" !== e.status && "Pending" !== e.status && "ContainerCreating" !== e.status && n.isRestartInstance && o.
            continue ("重启确认", "您将要对实例" + e.instanceName + "进行重启，重启后原实例将被关闭，确认要重启吗？").then(function(a) {
                a === o.button.BUTTON_OK && t.loadBalance.loadBalance.restartInstance(l, e.instanceName).then(function(n) {}).
                catch(function(n) {
                    o.error("重启实例失败", n.message)
                }).then(function() {
                    n.isRestartInstance = !1
                })
            }).then(function() {
                n.isRestartInstance = !1
            })
        },
        n.showMonitor = function(n) {
            var e = i.open("", "_blank");
            t.loadBalance.version.getVersionById(l, n.versionId).then(function(t) {
                var o = "http://" + n.hostIp + ":" + t.listenPort + "/domeos_nginx_status";
                e.location.href = o
            }).
            catch(function(n) {
                o.error("获取失败", n.message)
            })
        }
    }]),
    n.controller("NginxEventCtr", ["$scope", "$state", "api", "$timeout",
    function(n, e, t, o) {
        function a() {
            t.loadBalance.loadBalance.listEvent(i).then(function(e) {
                n.eventList = e || []
            })
        }
        function r() {
            a(),
            s && o.cancel(s),
            s = o(r, 4e3)
        }
        var i = e.params.loadBalanceId,
        s = null;
        a(),
        n.wrongMessageList = {},
        n.showWrong = function(e) {
            void 0 === n.wrongMessageList[e] ? n.wrongMessageList[e] = !0 : n.wrongMessageList[e] = !n.wrongMessageList[e]
        },
        r(),
        n.$on("$destroy",
        function() {
            s && o.cancel(s)
        })
    }])
} (angular.module("domeApp"));