﻿﻿"use strict"; !
function(e, n) {
    void 0 !== e && e.controller("CreateWatcherCtr", ["$scope", "$state", "$domePublic", "$util", "$domeCluster", "$domeDeploy", "$modal", "dialog",
    function(e, n, t, a, o, r, i, s) {
        e.$emit("pageTitle", {
            title: "新建监听器",
            descrition: "新建一个监听器",
            mod: "cluster"
        }),
        n.params.id || n.go("clusterManage");
        var c = e.clusterId = n.params.id,
        l = o.getInstance("NodeService"),
        d = o.getInstance("ClusterService");
        e.loadingsIns = t.getLoadingInstance(),
        e.watcher = {},
        e.watcher.clusterId = c,
        e.watcher.containerDrafts = [],
        e.watcher.containerDrafts[0] = {
            registry: "https://pub.domeos.org",
            image: "kube_event_watcher",
            tag: "v0.1.0",
            mem: 0,
            cpu: 0
        }; !
        function() {
            e.loadingsIns.startLoading("loadingNode"),
            l.getNodeList(c).then(function(n) {
                var t = n.data.result || [];
                e.nodeListIns = o.getInstance("NodeList", t)
            },
            function() {
                e.nodeListIns = o.getInstance("NodeList")
            }).
            finally(function() {
                e.loadingsIns.finishLoading("loadingNode")
            })
        } (); !
        function() {
            e.loadingsIns.startLoading("loadingNamespace"),
            d.getNamespace(c).then(function(n) {
                var t = n.data.result || [];
                if (t instanceof Array) {
                    var a = !0,
                    o = !1,
                    r = void 0;
                    try {
                        for (var i, s = t[Symbol.iterator](); ! (a = (i = s.next()).done); a = !0) {
                            var c = i.value;
                            if ("default" === c.name) {
                                e.watcher.namespace = c.name;
                                break
                            }
                        }
                    } catch(e) {
                        o = !0,
                        r = e
                    } finally {
                        try { ! a && s.
                            return && s.
                            return ()
                        } finally {
                            if (o) throw r
                        }
                    }
                    null == e.watcher.namespace && (e.watcher.namespace = t[0].name)
                }
                e.namespaceOption = [],
                t.map(function(n) {
                    e.namespaceOption.push({
                        text: n.name,
                        value: n.name
                    })
                })
            },
            function() {
                e.namespaceOption = []
            }).
            finally(function() {
                e.loadingsIns.finishLoading("loadingNamespace")
            })
        } (); !
        function() {
            e.loadingsIns.startLoading("loadingLabels"),
            d.getLabels(c).then(function(n) {
                var t = n.data.result || [];
                e.labelsOption = [];
                for (var a in t)"USER_LABEL_VALUE" === t[a] && e.labelsOption.push({
                    text: a,
                    value: {
                        name: a,
                        content: t[a]
                    }
                })
            },
            function() {
                e.labelsOption = []
            }).
            finally(function() {
                e.loadingsIns.finishLoading("loadingLabels")
            })
        } (),
        e.modifyMirrorInfo = function() {
            i.open({
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
        e.toggleLabels = function(n) {
            for (var t in e.nodeListIns.labelsInfo) e.nodeListIns.labelsInfo[t].isSelected = !1;
            e.nodeListIns.toggleLabelNodes();
            for (var a in n) e.nodeListIns.toggleLabel(n[a].name, !0)
        },
        e.cancel = function() {
            n.go("clusterDetail.watcher", {
                id: c
            })
        },
        e.createWatcherSubmit = function() {
            var t = angular.copy(e.watcher);
            d.createWatcher(c, t).then(function(e) {
                var t = e.data.result || [];
                n.go("watcherDetail", {
                    clusterId: t.clusterId,
                    deployId: t.id
                })
            },
            function(e) {
                s.error("操作失败", e.data.resultMsg)
            })
        }
    }]).controller("ModifyMirrorInfoCtr", ["mirrorInfo", "$scope", "$modalInstance",
    function(e, n, t) {
        n.containerDrafts = {
            registry: "https://192.168.101.85",
            image: "library/kube_event_watcher",
            tag: "0.9.0",
            mem: 0,
            cpu: 0
        },
        angular.extend(n.containerDrafts, e),
        n.cancel = function() {
            t.dismiss("cancel")
        },
        n.submit = function() {
            t.close(n.containerDrafts)
        }
    }])
} (angular.module("domeApp"));