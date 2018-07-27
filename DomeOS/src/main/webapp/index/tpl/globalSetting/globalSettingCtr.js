﻿"use strict";
function _classCallCheck(t, e) {
    if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value" in o && (o.writable = !0),
            Object.defineProperty(t, o.key, o)
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n),
        o && t(e, o),
        e
    }
} (); !
function(t, e) {
    function n(t, e, n, o) {
        t.needValidGit = !1,
        t.gitInfo = angular.copy(o),
        t.submit = function() {
            n.getGloabalInstance("git").modifyData(t.gitInfo).then(function() {
                e.close("ok")
            }).
            finally(function() {
                t.needValidGit = !1
            })
        },
        t.cancel = function() {
            e.dismiss("cancel")
        }
    }
    void 0 !== t && (t.controller("GitLabInfoModalCtr", n), t.controller("GlobalSettingCtr", ["api", "$state",
    function(t, e) {
        t.user.whoami().then(function(t) {
            t.isAdmin || e.go("overview")
        })
    }]), n.$inject = ["$scope", "$modalInstance", "$domeGlobal", "gitInfoDraft"], t.controller("GlobalSettingUserCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog", "userDialog",
    function(t, e, n, o, i, r, a, s, l, c) {
        var u = t.vm = {};
        u.newUser = {},
        u.needValidUser = {
            valid: !1
        },
        u.key = {
            nodeKey: ""
        },
        u.isShowAdd = !1,
        u.currentUserType = {
            type: "USER"
        },
        u.userList = [],
        u.ldapUserList = [];
        var f = function() {
            o.userService.getUserList().then(function(t) {
                u.userList = t.data.result || []
            })
        };
        f(),
        u.toggleUserType = function(t) {
            t !== u.currentUserType && (u.currentUserType.type = t, u.isShowAdd = !1, u.key.userKey = "")
        },
        u.toggleShowAdd = function() {
            u.isShowAdd = !u.isShowAdd
        },
        u.modifyPw = function(t) {
            c.editPassword(t.username).then(f)
        },
        u.modifyUserInfo = function(t) {
            c.editInfo({
                name: t.username,
                id: t.id,
                email: t.email,
                phone: t.phone
            }).then(f)
        },
        u.deleteUser = function(t) {
            var e = t.id;
            l.danger("删除用户", "确认要删除用户吗？").then(function() {
                o.userService.deleteUser(e).
                catch(function(t) {
                    l.error("删除用户", "删除失败！" + t.data.resultMsg)
                }).then(function() {
                    f()
                })
            })
        },
        u.addUser = function(t) {
            var e = angular.copy(u.newUser);
            delete e.rePassword,
            o.userService.createUser(e).then(function(t) {
                l.alert("创建用户", "创建成功！");
                angular.copy(e);
                f()
            },
            function(t) {
                l.error("创建用户", "创建失败！" + t.data.resultMsg)
            })
        }
    }]), t.controller("GlobalSettingLoginCtr", ["$scope", "api", "dialog",
    function(t, e, n) {
        t.isLoading = !0,
        t.loginConfig = {},
        e.globalSetting.login.getConfig().then(function(e) {
            return t.loginConfig = e
        }).
        catch(function(t) {
            return n.error("获取设置信息失败", t)
        }).then(function() {
            return t.isLoading = !1
        }),
        t.saveLoginConfig = function() {
            t.isLoading || (t.isLoading = !0, e.globalSetting.login.putConfig(t.loginConfig).then(function() {
                return n.tip("配置成功", "登录设置配置成功")
            }).
            catch(function(t) {
                return n.error("配置失败", t)
            }).then(function() {
                return t.isLoading = !1
            }))
        }
    }]), t.controller("GlobalSettingCodeSourceCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l) {
        var c = t.vm = {},
        u = e.getGloabalInstance("git");
        c.gitInfo = {},
        c.getGitInfo = function() {
            u.getData().then(function(t) {
                c.gitInfos = t
            })
        },
        c.operateGitInfo = function(t) {
            var e = {};
            e = t ? t: {
                type: "GITLAB",
                description: "",
                url: ""
            },
            r.open({
                animation: !0,
                templateUrl: "gitLabInfoModal.html",
                controller: "GitLabInfoModalCtr",
                size: "md",
                resolve: {
                    gitInfoDraft: function() {
                        return e
                    }
                }
            }).result.then(function(t) {
                console.log("test: ", t),
                "ok" === t && c.getGitInfo()
            }),
            c.getGitInfo()
        },
        c.deleteGitInfo = function(t) {
            var e = "确认要删除吗？";
            s.globleConfig.hasGitProject(t.id).then(function(n) {
                n && (e = '<p class="warn-container">当前共有<em class="font-big">' + n + "</em>个工程在使用该仓库中的代码，删除后将无法对这些工程进行更新维护，是否继续删除?</p>"),
                l.danger("确认删除", e).then(function(t) {
                    if (t !== l.button.BUTTON_OK) throw ""
                }).then(function() {
                    u.deleteData(t.id).then(function(t) {
                        c.getGitInfo()
                    },
                    function(t) {
                        l.error("删除失败!", t.data.resultMsg)
                    })
                })
            })
        },
        c.saveGit = function(t) {
            t.id || (t.type = "GITLAB"),
            u.modifyData(t).then(function(t) {
                t && c.gitInfos.unshift(t)
            })
        },
        c.getGitInfo()
    }]), t.controller("GlobalSettingRegisteryCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l) {
        var c = t.vm = {},
        u = e.getGloabalInstance("registry");
        c.registryInfo = {},
        c.getRegistryInfo = function() {
            c.registryInfo.id || u.getData().then(function(t) {
                c.registryInfo = t
            })
        },
        c.saveRegistry = function() {
            c.registryInfo.id && (delete c.registryInfo.id, delete c.registryInfo.createTime);
            var t = angular.copy(c.registryInfo);
            0 === t.status && delete t.certification,
            u.modifyData(t).then(function(t) {
                t && (c.registryInfo = t)
            })
        },
        c.getRegistryInfo()
    }]), t.controller("GlobalSettingServerCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l) {
        var c = t.vm = {},
        u = e.getGloabalInstance("server");
        c.serverInfo = {},
        c.getServerInfo = function() {
            c.serverInfo.id || u.getData().then(function(t) {
                c.serverInfo = t
            })
        },
        c.saveServer = function() {
            u.modifyData(c.serverInfo).then(function(t) {
                t && (c.serverInfo = t)
            })
        },
        c.getServerInfo()
    }]), t.controller("GlobalSettingMonitorCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l) {
        var c = t.vm = {},
        u = e.getGloabalInstance("monitor"),
        f = function() {
            function t() {
                _classCallCheck(this, t)
            }
            return _createClass(t, [{
                key: "init",
                value: function(t) {
                    function e(t) {
                        var e = [],
                        n = [];
                        if (!t) return [{
                            text: ""
                        }];
                        n = t.split(",");
                        for (var o = 0,
                        i = n.length; o < i; o++) e.push({
                            text: n[o]
                        });
                        return e.push({
                            text: ""
                        }),
                        e
                    }
                    this.config = t || {},
                    this.config.transfer = e(this.config.transfer),
                    this.config.graph = e(this.config.graph),
                    this.config.judge = e(this.config.judge)
                }
            },
            {
                key: "addItem",
                value: function(t) {
                    this.config[t].push({
                        text: ""
                    })
                }
            },
            {
                key: "deleteArrItem",
                value: function(t, e) {
                    this.config[t].splice(e, 1)
                }
            },
            {
                key: "formartMonitor",
                value: function() {
                    var t = angular.copy(this.config),
                    e = function(t) {
                        for (var e = [], n = 0, o = t.length; n < o; n++) t[n].text && e.push(t[n].text);
                        return e.join(",")
                    };
                    return t.transfer = e(this.config.transfer),
                    t.graph = e(this.config.graph),
                    t.judge = e(this.config.judge),
                    t
                }
            }]),
            t
        } ();
        c.getMonitorInfo = function() {
            function t(t) {
                c.monitorIns = new f,
                c.monitorIns.init(t),
                c.monitorConfig = c.monitorIns.config
            }
            c.monitorConfig || u.getData().then(function(e) {
                t(e)
            },
            t())
        },
        c.saveMonitor = function() {
            u.modifyData(c.monitorIns.formartMonitor()).then(function(t) {
                t && (c.monitorIns.init(t), c.monitorConfig = c.monitorIns.config)
            })
        },
        c.getMonitorInfo()
    }]), t.controller("GlobalSettingWebSSHCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l) {
        var c = t.vm = {},
        u = e.getGloabalInstance("ssh");
        c.sshInfo = {},
        c.getWebSsh = function() {
            c.sshInfo.id || u.getData().then(function(t) {
                c.sshInfo = t
            })
        },
        c.saveSsh = function() {
            u.modifyData(c.sshInfo).then(function(t) {
                t && (c.sshInfo = t)
            })
        },
        c.getWebSsh()
    }]),t.controller("GlobalSettingMinioCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l) {
        var c = t.vm = {},
        u = e.getGloabalInstance("helm");
        c.heamInfo = {},
        c.getHelm = function() {
            c.heamInfo.id || u.getData().then(function(t) {
                c.heamInfo = t
            })
        },
        c.saveHelm = function() {
            u.modifyData(c.heamInfo).then(function(t) {
                t && (c.heamInfo = t)
            })
        },
        c.getHelm()
    }]),
    t.controller("GlobalSettingBuildCtr", ["$scope", "$domeGlobal", "$state", "$domeUser", "$domeCluster", "$domePublic", "$modal", "$q", "api", "dialog",
    function(t, e, n, o, i, r, a, s, l, c) {
        var u = t.vm = {};
        u.key = {
            nodeKey: ""
        };
        var f = e.getGloabalInstance("cluster"),
        d = i.getInstance("NodeService");
        u.clusterInfo = {},
        u.clusterLoadingIns = r.getLoadingInstance();
        var g = function() {
            if (!u.clusterList) return d.getData().then(function(t) {
                return u.clusterList = t.data.result || [],
                u.clusterList
            });
            s.when(u.clusterList)
        };
        u.toggleCluster = function(t, e) {
            u.clusterInfo.clusterId = t.id,
            u.clusterInfo.clusterName = t.name,
            u.clusterInfo.host = t.api,
            u.key.nodeKey = "",
            u.clusterLoadingIns.startLoading("namespace"),
            u.clusterLoadingIns.startLoading("nodeList"),
            d.getNamespace(t.id, t.name).then(function(t) {
                if (u.namespaceList = t.data.result || [], e) u.clusterInfo.namespace = e;
                else {
                    var n = !0,
                    o = !1,
                    i = void 0;
                    try {
                        for (var r, a = u.namespaceList[Symbol.iterator](); ! (n = (r = a.next()).done); n = !0) {
                            if ("default" == r.value.name) return void(u.clusterInfo.namespace = "default")
                        }
                    } catch(t) {
                        o = !0,
                        i = t
                    } finally {
                        try { ! n && a.
                            return && a.
                            return ()
                        } finally {
                            if (o) throw i
                        }
                    }
                    u.clusterInfo.namespace = u.namespaceList[0] && u.namespaceList[0].name
                }
            },
            function() {
                u.namespaceList = [],
                u.clusterInfo.namespace = null
            }).
            finally(function() {
                u.clusterLoadingIns.finishLoading("namespace")
            }),
            d.getNodeList(t.id).then(function(t) {
                var e = t.data.result || [],
                n = !0,
                o = !1,
                i = void 0;
                try {
                    for (var r, a = e[Symbol.iterator](); ! (n = (r = a.next()).done); n = !0) {
                        var s = r.value;
                        s.capacity && (s.capacity.memory = (s.capacity.memory / 1024 / 1024).toFixed(2)),
                        s.labels || (s.labels = {}),
                        s.isUsedByBuild = !!s.labels.BUILDENV
                    }
                } catch(t) {
                    o = !0,
                    i = t
                } finally {
                    try { ! n && a.
                        return && a.
                        return ()
                    } finally {
                        if (o) throw i
                    }
                }
                u.nodeList = e
            }).
            finally(function() {
                u.clusterLoadingIns.finishLoading("nodeList")
            })
        };
        var m = function(t) {
            u.clusterInfo = t || {};
            var e = !0,
            n = !1,
            o = void 0;
            try {
                for (var i, r = u.clusterList[Symbol.iterator](); ! (e = (i = r.next()).done); e = !0) {
                    var a = i.value;
                    if (a.api === u.clusterInfo.host) return void u.toggleCluster(a, u.clusterInfo.namespace)
                }
            } catch(t) {
                n = !0,
                o = t
            } finally {
                try { ! e && r.
                    return && r.
                    return ()
                } finally {
                    if (n) throw o
                }
            }
        };
        u.initClusterInfo = function() {
            u.clusterInfo.id || (u.clusterLoadingIns.startLoading("cluster"), s.all([g(), f.getData()]).then(function(t) {
                m(t[1])
            }).
            finally(function() {
                u.clusterLoadingIns.finishLoading("cluster")
            }))
        },
        u.saveCluster = function() {
            var t = void 0;
            u.nodeList;
            u.clusterLoadingIns.startLoading("submitCluster"),
            f.modifyData(u.clusterInfo).then(function(e) {
                t = e
            },
            function(t) {
                c.danger("修改失败", "修改失败：" + t.data.resultMsg)
            }).
            finally(function() {
                u.clusterList.forEach(function(t) {
                    t.buildConfig = t.id === u.clusterInfo.clusterId
                }),
                m(t),
                u.clusterLoadingIns.finishLoading("submitCluster")
            })
        },
        u.toggleNodeLabel = function(t) {
            t.isUsedByBuild = !t.isUsedByBuild;
            var e = !1;
            if (!t.isUsedByBuild) {
                e = !0;
                var n = !0,
                o = !1,
                i = void 0;
                try {
                    for (var r, a = u.nodeList[Symbol.iterator](); ! (n = (r = a.next()).done); n = !0) {
                        if (r.value.isUsedByBuild) {
                            e = !1;
                            break
                        }
                    }
                } catch(t) {
                    o = !0,
                    i = t
                } finally {
                    try { ! n && a.
                        return && a.
                        return ()
                    } finally {
                        if (o) throw i
                    }
                }
            }
            if (e) return c.danger("警告", "请保证集群内至少有一台用于构建的主机！"),
            void(t.isUsedByBuild = !t.isUsedByBuild);
            var s = [{
                node: t.name,
                labels: {
                    BUILDENV: "HOSTENVTYPE"
                }
            }];
            t.isUsedByBuild ? d.addLabel(u.clusterInfo.clusterId, s).
            catch(function(e) {
                t.isUsedByBuild = !t.isUsedByBuild,
                c.danger("修改失败", "Message:" + e.data.resultMsg)
            }) : d.deleteLabel(u.clusterInfo.clusterId, s).
            catch(function(e) {
                t.isUsedByBuild = !t.isUsedByBuild,
                c.danger("修改失败！", "Message:" + e.data.resultMsg)
            })
        },
        u.initClusterInfo()
    }]))
} (angular.module("domeApp"));