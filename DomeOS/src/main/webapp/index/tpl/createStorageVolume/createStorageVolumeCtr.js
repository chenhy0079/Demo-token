﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("CreateStorageVolumeCtr", ["$scope", "$state", "dialog", "$domePublic", "$domeStorage",
    function(e, t, a, n, o) {
        e.$emit("pageTitle", {
            title: "新建数据卷",
            descrition: "新建一个数据卷",
            mod: "storage"
        }),
        t.params.id || t.go("storageManage");
        var r = t.params.id;
        e.parentState = 'storageVolumeDetail({id:"' + r + '"})',
        e.volume = angular.copy(o.volume),
        e.toggleCluster = function(t) {
            e.volume.clusterId = t.id
        },
        e.toggleNamespace = function(t) {
            e.volume.namespace = t.name
        },
        e.isWaitingCreate = !1;
        var i = o.storageBackend; !
        function() {
            i.getStorage(r).then(function(t) {
                e.storageInstance = t.data.result || {},
                e.volume.storageType = e.storageInstance.storageType
            })
        } (),
        function() {
            i.clusterService.getData().then(function(t) {
                var a = t.data.result || [];
                a.length > 0 && (e.volume.clusterId = a[0].id, e.volume.clusterName = a[0].name),
                e.clusterOption = [],
                a.map(function(t) {
                    e.clusterOption.push({
                        text: t.name,
                        value: t.id
                    })
                })
            })
        } (),
        e.initNamespace = function(t) {
            i.clusterService.getNamespace(t).then(function(t) {
                var a = t.data.result || [];
                if (a instanceof Array) {
                    var n = !0,
                    o = !1,
                    r = void 0;
                    try {
                        for (var i, u = a[Symbol.iterator](); ! (n = (i = u.next()).done); n = !0) {
                            var l = i.value;
                            if ("default" === l.name) {
                                e.volume.namespace = l.name;
                                break
                            }
                        }
                    } catch(e) {
                        o = !0,
                        r = e
                    } finally {
                        try { ! n && u.
                            return && u.
                            return ()
                        } finally {
                            if (o) throw r
                        }
                    }
                    null == e.volume.namespace && (e.volume.namespace = a[0].name)
                }
                e.namespaceOption = [],
                a.map(function(t) {
                    e.namespaceOption.push({
                        text: t.name,
                        value: t.name
                    })
                })
            })
        },
        e.createStorageVolumeSubmit = function() {
            e.isWaitingCreate = !0;
            var n = angular.copy(e.volume);
            delete n.accessMode,
            i.createStorageVolume(r, n).then(function(a) {
                e.isWaitingCreate = !1,
                t.go("storageVolumeDetail", {
                    id: r
                })
            },
            function(t) {
                e.isWaitingCreate = !1,
                a.error("操作失败", t.data.resultMsg)
            })
        },
        e.cancel = function() {
            t.go("storageVolumeDetail", {
                id: r
            })
        }
    }])
} (angular.module("domeApp"));