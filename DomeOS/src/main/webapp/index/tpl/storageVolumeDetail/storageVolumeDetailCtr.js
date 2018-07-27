﻿"use strict"; !
function(e, t) {
    "undefined" !== e && e.controller("StorageVolumeDetailCtr", ["$scope", "$state", "$domeStorage", "$modal", "dialog",
    function(e, t, o, n, a) {
        function i() {
            s.getStorage(l).then(function(t) {
                e.storageInstance = t.data.result || {}
            })
        }
        function r() {
            e.isVolumeLoading = !0,
            s.getStorageVolume(l).then(function(t) {
                e.volumeList = t.data.result || []
            },
            function(e) {
                a.error("查询失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isVolumeLoading = !1
            })
        }
        e.$emit("pageTitle", {
            title: "存储详情",
            descrition: "",
            mod: "storageManage"
        }),
        t.params.id || t.go("storageManage");
        var l = t.params.id;
        e.resourceType = "STORAGE_CLUSTER",
        e.resourceId = l,
        e.isEditStorage = !1,
        e.hasVolume = !1,
        e.userRole = null,
        e.setRole = function(t) {
            e.userRole = t
        },
        e.mayPost = function() {
            return "MASTER" === e.userRole || "DEVELOPER" === e.userRole
        },
        e.mayDelete = function() {
            return "MASTER" === e.userRole
        },
        e.exitToList = function() {
            t.go("storageManage")
        };
        var s = o.storageBackend;
        i(),
        r(),
        e.deleteVolume = function(t) {
            o.storageBackend.listRelatedDeployInfo(t.id).then(function(t) {
                e.relatedDeployList = t.data.result || []
            }).then(function() {
                0 === e.relatedDeployList.length ? a.danger("确认删除", "确认要删除吗？").then(function(e) {
                    if (e !== a.button.BUTTON_OK) throw ""
                }).then(function() {
                    s.deleteVolume(l, t.id).then(function() {
                        r()
                    },
                    function(e) {
                        a.error("删除失败", e.data.resultMsg)
                    })
                }) : a.error("删除失败", "此数据卷已被部署使用，请先废弃对应部署版本！")
            }).
            catch(function(e) {
                console.log("an error occured: " + e)
            })
        },
        e.deleteStorage = function(o) {
            e.volumeList.length > 0 ? a.error("删除失败", "此存储中存在数据卷，禁止删除！") : a.danger("确认删除", "确认要删除吗？").then(function(e) {
                if (e !== a.button.BUTTON_OK) throw ""
            }).then(function() {
                s.deleteStorage(o).then(function() {
                    t.go("storageManage")
                },
                function(e) {
                    a.error("删除失败", resError.data.resultMsg)
                })
            })
        },
        e.toggleIsEditStorage = function(t) {
            "edit" === t && (i(), e.hasVolume = !1, e.volumeList && e.volumeList.length > 0 ? e.hasVolume = !0 : s.getStorageVolume(l).then(function(t) {
                var o = t.data.result || [];
                o && o.length > 0 && (e.hasVolume = !0)
            },
            function() {
                e.hasVolume = !1
            })),
            e.isEditStorage = !e.isEditStorage
        },
        e.saveEditStorage = function() {
            e.isRunning = !0,
            s.modifyStorage(e.storageInstance).then(function() {
                e.toggleIsEditStorage()
            },
            function(e) {
                a.error("修改失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isRunning = !1
            })
        },
        e.volumeDetail = function(t) {
            n.open({
                animation: !0,
                templateUrl: "volumeDetailModal.html",
                controller: "VolumeDetailModalCtr",
                size: "md",
                resolve: {
                    volumeInstance: function() {
                        return t
                    },
                    storageInstance: function() {
                        return e.storageInstance
                    },
                    formatAccessMode: function() {
                        return e.formatAccessMode
                    },
                    hasPostPermission: function() {
                        return e.mayPost()
                    }
                }
            })
        },
        e.listRelatedDeploy = function(e) {
            n.open({
                animation: !0,
                templateUrl: "relatedDeployModal.html",
                controller: "RelatedDeployModalCtr",
                size: "md",
                resolve: {
                    volume: function() {
                        return e
                    },
                    storageId: function() {
                        return l
                    }
                }
            })
        },
        e.formatAccessMode = {
            READWRITEONCE: "单主机读写",
            READONLYMANY: "多主机只读",
            READWRITEMANY: "多主机读写"
        },
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        }];
        var c = t.current.url;
        "/storage" === c ? e.tabActive[1].active = !0 : "/user" === c ? e.tabActive[2].active = !0 : e.tabActive[0].active = !0
    }]).controller("VolumeDetailModalCtr", ["$scope", "$modalInstance", "volumeInstance", "storageInstance", "formatAccessMode", "hasPostPermission", "$domeStorage",
    function(e, t, o, n, a, i, r) {
        e.isEditAuth = i,
        e.volumeInstance = o.storageVolumeDraft,
        e.volumeInstance.usage = o.storagePathInfo.usage,
        e.storageIns = n,
        e.itemWidth = "GLUSTERFS" === e.storageIns.storageType ? "200px": "150px",
        e.formatAccessMode = a,
        e.isEditDesc = !1,
        e.editDescription = {
            text: null
        };
        var l = null;
        e.bToGb = function(e) {
            return e ? e / 1e6 / 1024 : 0
        },
        e.toggleIsEditDesc = function() {
            l = e.volumeInstance.description,
            e.editDescription.text = e.volumeInstance.description,
            e.isEditDesc = !e.isEditDesc
        },
        e.saveDescription = function() {
            e.isEditDesc = !1,
            e.volumeInstance.description = e.editDescription.text,
            r.storageBackend.modifyVolume(e.volumeInstance).then(function(e) {},
            function(t) {
                e.volumeInstance.description = l,
                dialog.error("修改失败", t.data.resultMsg)
            }).
            finally(function() {
                l = null
            })
        },
        e.cancel = function() {
            t.dismiss("cancel")
        },
        e.formatBoolean = {
            false: "否",
            true: "是"
        }
    }]).controller("RelatedDeployModalCtr", ["$scope", "$state", "$window", "$modalInstance", "$domeStorage", "volume", "storageId",
    function(e, t, o, n, a, i, r) {
        e.volume = i,
        a.storageBackend.listRelatedDeployInfo(i.id).then(function(t) {
            e.relatedDeployList = t.data.result || []
        }),
        e.deployDetail = function(e) {
            n.close(),
            t.go("deployDetail", {
                id: e.deployId,
                collectionId: e.deployCollectionId,
                collectionName: e.deployCollectionName,
                storageId: r
            }),
            o.refreshMenu = Date.now().toString() + Math.random()
        },
        e.cancel = function() {
            n.dismiss("cancel")
        }
    }])
} (angular.module("domeApp"));