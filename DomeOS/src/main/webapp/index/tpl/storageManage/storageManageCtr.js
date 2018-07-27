﻿"use strict"; !
function(t, e) {
    "undefined" !== t && t.controller("StorageManageCtr", ["$scope", "$state", "$domeStorage", "dialog",
    function(t, e, n, o) {
        function a() {
            i.listStorage().then(function(e) {
                t.storageList = e.data.result || []
            }).
            finally(function() {
                t.isLoading = !1
            })
        }
        t.$emit("pageTitle", {
            title: "存储管理",
            descrition: "",
            mod: "storageManage"
        }),
        t.isLoading = !0;
        var i = n.storageBackend;
        a(),
        t.deleteStorage = function(t) {
            t.storageCount > 0 ? o.error("删除失败", "此存储中存在数据卷，禁止删除！") : o.danger("确认删除", "确认要删除吗？").then(function(t) {
                if (t !== o.button.BUTTON_OK) throw ""
            }).then(function() {
                i.deleteStorage(t.id).then(function() {
                    a()
                },
                function(t) {
                    o.error("删除失败", t.data.resultMsg)
                })
            })
        }
    }])
} (angular.module("domeApp"));