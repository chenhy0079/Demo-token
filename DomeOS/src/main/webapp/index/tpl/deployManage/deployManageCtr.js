﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("DeployManageCtr", ["$scope", "$domeDeploy", "$domeCluster", "$timeout", "$state", "$modal", "$util", "dialog",
    function(e, t, o, n, l, i, a, c) {
        function r(t) {
            e.deloyList = t;
            for (var o, n, l, i = 0,
            c = e.deloyList.length; i < c; i++) o = e.deloyList[i],
            n = Math.max(0, o.cpuUsed / o.cpuTotal),
            isFinite(n) || (n = 0),
            l = Math.max(0, o.memoryUsed / o.memoryTotal),
            isFinite(l) || (l = 0),
            o.memoryUsed = a.formatMBytesData(o.memoryUsed),
            o.memoryTotal = a.formatMBytesData(o.memoryTotal),
            o.serviceDnsName ? o.dnsName = o.serviceDnsName.split(" ").filter(function(e) {
                return "" !== e
            }) : o.dnsName = "无",
            n > l ? (o.compare = "cpu", o.comparePercentSort = n) : (o.compare = "memory", o.comparePercentSort = l),
            o.comparePercent = (100 * o.comparePercentSort).toFixed(2)
        }
        e.$emit("pageTitle", {
            title: "部署",
            descrition: "在这里您可以把项目镜像部署到运行环境中。此外，您还可以对现有部署进行监控和管理。",
            mod: "deployManage"
        }),
        e.showSelect = !0;
        var s = l.$current.name;
        s.indexOf("deployAllManage") === -1 ? e.showSelect = !1 : e.showSelect = !0,
        e.isLoading = !0,
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        }];
        var s = l.$current.name;
        s.indexOf("user") !== -1 ? e.tabActive[1].active = !0 : e.tabActive[0].active = !0,
        e.resourceType = "DEPLOY_COLLECTION",
        e.collectionName = l.params.name,
        e.resourceId = l.params.id,
        e.collectionId = l.params.id,
        e.deloyList = [];
        var m, u = [],
        d = o.getInstance("ClusterService");
        e.selectOption = {},
        e.selectOption.status = {
            ALL: !0,
            DEPLOYING: !1,
            RUNNING: !1,
            STOP: !1,
            ERROR: !1,
            STOPPING: !1,
            BACKROLLING: !1,
            UPDATING: !1,
            UPSCALING: !1,
            DOWNSCALING: !1,
            ABORTING: !1,
            BACKROLL_ABORTED: !1,
            UPDATE_ABORTED: !1
        },
        e.selectOption.env = {
            ALL: !0,
            PROD: !1,
            TEST: !1
        },
        e.selectOption.namespace = {
            ALL: !0
        },
        e.selectOption.cluster = {
            ALL: !0
        },
        e.selectOption.deployTypeShow = {
            ALL: !0,
            RC: !1,
            Deployment: !1,
            DaemonSet: !1
        },
        e.userRole = null,
        e.setRole = function(t) {
            e.userRole = t
        },
        e.mayCreate = function() {
            return "MASTER" === e.userRole || "DEVELOPER" === e.userRole
        },
        e.mayMigrate = function() {
            return "MASTER" === e.userRole
        },
        e.exitToList = function() {
            l.go("deployCollectionManage")
        },
        e.orderBy = {
            item: "",
            isReverse: !1
        },
        e.toggleOrderBy = function(t) {
            e.orderBy.item === t ? e.orderBy.isReverse = !e.orderBy.isReverse: (e.orderBy.item = t, e.orderBy.isReverse = !1)
        },
        e.deloyList = []; !
        function o() {
            var i = l.params.id;
            l.current.name.indexOf("deployManage") !== -1 ? t.deployService.getListByCollectionId(i).then(function(e) {
                r(e.data.result || [])
            }).
            finally(function() {
                e.isLoading = !1,
                m && n.cancel(m),
                m = n(o, 4e3)
            }) : "deployAllManage" === l.current.name && t.deployService.getList().then(function(e) {
                r(e.data.result || [])
            }).
            finally(function() {
                e.isLoading = !1,
                m && n.cancel(m),
                m = n(o, 4e3)
            })
        } ();
        var p = function(t) {
            d.getNamespace(t).then(function(t) {
                for (var o = t.data.result || [], n = 0, l = o.length; n < l; n++) e.selectOption.namespace[o[n].name] || (e.selectOption.namespace[o[n].name] = !1)
            })
        },
        f = function() {
            var t, o;
            if (e.selectOption.namespace = {
                ALL: !0
            },
            e.selectOption.cluster.ALL) for (t = 0, o = u.length; t < o; t++) p(u[t].id);
            else angular.forEach(e.selectOption.cluster,
            function(e, n) {
                if ("ALL" !== n && e) for (t = 0, o = u.length; t < o; t++) if (u[t].name === n) {
                    p(u[t].id);
                    break
                }
            })
        };
        d.getData().then(function(t) {
            u = t.data.result || [],
            f();
            for (var o = 0,
            n = u.length; o < n; o++) e.selectOption.cluster[u[o].name] = !1
        }),
        e.toggleShowSelect = function() {
            e.showSelect = !e.showSelect
        },
        e.toggleAll = function(t) {
            angular.forEach(e.selectOption[t],
            function(o, n) {
                e.selectOption[t][n] = !1
            }),
            e.selectOption[t].ALL = !0,
            "cluster" === t && f()
        },
        e.toggleSelect = function(t, o) {
            var n = !0;
            e.selectOption[t][o] = !e.selectOption[t][o],
            e.selectOption[t][o] ? e.selectOption[t].ALL && (e.selectOption[t].ALL = !1) : (angular.forEach(e.selectOption[t],
            function(o, l) {
                "ALL" !== l && e.selectOption[t][l] && n && (n = !1)
            }), n && e.toggleAll(t)),
            "cluster" === t && f()
        },
        e.$on("$destroy",
        function(e) {
            m && n.cancel(m)
        }),
        e.openMigrateDeployModal = function(t, o) {
            i.open({
                animation: !0,
                templateUrl: "migrateDeployModal.html",
                controller: "migrateDeployModalCtr",
                size: "md",
                resolve: {
                    deployId: function() {
                        return t
                    },
                    deployName: function() {
                        return o
                    },
                    collectionName: function() {
                        return e.collectionName
                    }
                }
            })
        },
        e.onSuccess = function(e, t) {
            c.tip("复制成功", t),
            e.clearSelection()
        },
        e.onError = function(e) {
            c.alert("复制失败", "")
        }
    }]).controller("migrateDeployModalCtr", ["$scope", "$state", "dialog", "$domeDeployCollection", "deployId", "deployName", "collectionName", "$modalInstance", "$util",
    function(e, t, o, n, l, i, a, c, r) {
        e.migrateDeployName = i,
        e.migrateCollectionName = a,
        e.migrateCollectionId = "",
        e.deployCollectionList = [],
        e.isLoading = !0,
        n.deployCollectionService.getDeployCollection().then(function(t) {
            for (var o = t.data.result || [], n = 0; n < o.length; n++)"MASTER" === o[n].role && e.deployCollectionList.push(o[n])
        }).
        finally(function() {
            e.isLoading = !1
        }),
        e.toggleCollectionName = function(t, o, n) {
            e.migrateCollectionName = o,
            e.migrateCollectionId = n
        },
        e.save = function() {
            n.deployCollectionService.migrateDeploy(l, e.migrateCollectionId).then(function() {
                t.go("deployManage", {
                    id: e.migrateCollectionId,
                    name: e.migrateCollectionName
                })
            },
            function(e) {
                o.error("警告", "迁移失败:" + e.data.resultMsg),
                c.dismiss("cancel")
            }).
            finally(function() {
                c.dismiss("cancel")
            })
        },
        e.cancel = function() {
            c.dismiss("cancel")
        }
    }])
} (angular.module("domeApp"));