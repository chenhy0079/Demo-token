﻿"use strict"; !
function(o, t) {
    o.controller("ProjectCollectionManageCtr", ["$scope", "$domeUser", "$domeProjectCollection", "$state", "dialog",
    function(o, t, e, i, n) {
        function c() {
            l.getProjectCollection().then(function(t) {
                o.projectCollectionList = t.data.result || [];
                for (var e = 0; e < o.projectCollectionList.length; e++) o.projectCollectionList[e].isEdit = !1
            }).
            finally(function() {
                o.isLoading = !1
            })
        }
        o.$emit("pageTitle", {
            title: "项目管理",
            descrition: "项目管理。",
            mod: "projectCollection"
        }),
        o.projectCollectionList = [],
        o.resourceType = "PROJECT_COLLECTION",
        o.isLoading = !0;
        var l = e.projectCollectionService;
        t.userService;
        c(),
        o.saveEdit = function(o) {
            o.id,
            o.name,
            o.description,
            o.creatorId;
            l.updateProjectCollectionDescription(o).then(function() {},
            function(o) {
                n.error("修改失败", o.data.resultMsg)
            })
        },
        o.deleteProjectCollection = function(t) {
            e.deleteProjectCollection(t).then(function() {
                for (var e = 0; e < o.projectCollectionList.length; e++) o.projectCollectionList[e].id === t && o.projectCollectionList.splice(e, 1)
            }).
            finally(function() {
                o.isLoading = !1,
                i.go("projectCollectionManage")
            })
        },
        o.cancelEdit = function() {
            c()
        }
    }])
} (angular.module("domeApp"));