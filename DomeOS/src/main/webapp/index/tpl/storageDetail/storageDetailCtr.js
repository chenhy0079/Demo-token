﻿"use strict"; !
function(e, t) {
    "undefined" !== e && e.controller("StorageDetailCtr", ["$scope", "$state", "$domeStorage", "$modal", "dialog",
    function(e, t, o, n, a) {
        function r() {
            u.getStorage(i).then(function(t) {
                e.storageInstance = t.data.result || {}
            })
        }
        function l() {
            e.isVolumeLoading = !0,
            u.getStorageVolume(i).then(function(t) {
                e.volumeInfo.volumeList = t.data.result || [],
                e.filterVolumeList()
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
        var i = t.params.id;
        e.resourceType = "STORAGE_CLUSTER",
        e.resourceId = i,
        e.isEditStorage = !1,
        e.hasVolume = !1,
        e.userRole = null,
        e.setRole = function(t) {
            e.userRole = t,
            s()
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
        var u = o.storageBackend;
        r(),
        e.volumeInfo = {
            volumeList: [],
            filteredVolumeList: [],
            searchKeyword: ""
        };
        var s = function() {
            e.noDeleteList = e.mayDelete() ? [] : e.volumeInfo.filteredVolumeList
        };
        e.filterVolumeList = function() {
            e.volumeInfo.filteredVolumeList = e.volumeInfo.volumeList.filter(function(t) {
                return t.storageVolumeDraft.name.indexOf(e.volumeInfo.searchKeyword) !== -1
            }),
            s()
        },
        l(),
        e.deleteVolume = function(t) {
            o.storageBackend.listRelatedDeployInfo(t.storageVolumeDraft.id).then(function(t) {
                e.relatedList = t.data.result || [],
                e.relatedDeployList = e.relatedList.filter(function(e) {
                    return e.loadBalancer === !1
                }),
                e.relatedLoadBalancerList = e.relatedList.filter(function(e) {
                    return e.loadBalancer === !0
                })
            }).then(function() {
                if (0 === e.relatedList.length) a.danger("确认删除", "是否确认删除").then(function(e) {
                    if (e !== a.button.BUTTON_OK) throw ""
                }).then(function() {
                    u.deleteVolume(i, t.storageVolumeDraft.id).then(function() {
                        l()
                    },
                    function(e) {
                        a.error("删除失败！", e.data.resultMsg)
                    })
                });
                else {
                    var o = "";
                    o = e.relatedDeployList.length > 0 && 0 === e.relatedLoadBalancerList.length ? "部署": 0 === e.relatedDeployList.length && e.relatedLoadBalancerList.length > 0 ? "负载均衡": "",
                    a.alert("删除失败", "此数据卷已被" + o + "使用，请先废弃对应版本！进入数据卷可查看已关联" + o + "列表。")
                }
            }).
            catch(function(e) {
                console.log("an error occured: " + e)
            }).then(function() {
                l()
            })
        },
        e.deleteStorage = function(o) {
            e.volumeInfo.volumeList.length > 0 ? a.alert("此存储中存在数据卷，禁止删除！") : a.danger("确认删除", "是否确认删除").then(function(e) {
                if (e !== a.button.BUTTON_OK) throw ""
            }).then(function() {
                u.deleteStorage(o).then(function() {
                    t.go("storageManage")
                },
                function(e) {
                    a.error("删除失败!", e.data.resultMsg)
                })
            })
        },
        e.toggleIsEditStorage = function(t) {
            "edit" === t ? (e.hasVolume = !1, e.volumeInfo.volumeList && e.volumeInfo.volumeList.length > 0 ? e.hasVolume = !0 : u.getStorageVolume(i).then(function(t) {
                var o = t.data.result || [];
                o && o.length > 0 && (e.hasVolume = !0)
            },
            function() {
                e.hasVolume = !1
            })) : r(),
            e.isEditStorage = !e.isEditStorage
        },
        e.saveEditStorage = function() {
            e.isRunning = !0,
            u.modifyStorage(e.storageInstance).then(function() {
                e.toggleIsEditStorage()
            },
            function(e) {
                a.error("修改失败！", e.data.resultMsg)
            }).
            finally(function() {
                e.isRunning = !1
            })
        }
    }])
} (angular.module("domeApp"));