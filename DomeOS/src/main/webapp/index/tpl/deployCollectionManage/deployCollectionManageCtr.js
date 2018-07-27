﻿"use strict"; !
function(e, o) {
    void 0 !== e && e.controller("DeployCollectionManageCtr", ["$scope", "$domeUser", "$domeDeployCollection", "$domeDeploy", "$state", "api", "dialog",
    function(e, o, i, t, n, l, c) {
        function a() {
            r.getDeployCollection().then(function(o) {
                e.collectionList = o.data.result || [];
                for (var i = 0; i < e.collectionList.length; i++) e.collectionList[i].isEdit = !1
            }).
            finally(function() {
                e.isLoading = !1
            })
        }
        e.$emit("pageTitle", {
            title: "服务管理",
            descrition: "服务管理。",
            mod: "deployCollection"
        }),
        e.resourceType = "DEPLOY_COLLECTION",
        e.baseImageDeleteAuth = !1,
        l.user.whoami().then(function(o) {
            var i = o;
            e.currentUser = {
                email: i.email,
                id: i.id,
                loginType: i.loginType,
                state: loginUser.state,
                username: loginUser.username
            },
            i.isAdmin && (e.baseImageDeleteAuth = !0)
        }),
        e.collectionList = [],
        e.isLoading = !0;
        var r = i.deployCollectionService;
        t.deployService;
        a(),
        e.saveEdit = function(e) {
            var o = {
                id: e.id,
                name: e.name,
                description: e.description,
                creatorId: e.creatorId
            };
            r.updateDeployCollectionDescription(o).then(function() {},
            function(e) {
                c.error("操作失败", e.data.resultMsg)
            }).
            finally(function() {
                n.go("deployCollectionManage")
            })
        },
        e.deleteDeployCollection = function(o) {
            i.deleteDeployCollection(o).then(function() {
                for (var i = 0; i < e.collectionList.length; i++) e.collectionList[i].id === o && e.collectionList.splice(i, 1)
            }).
            finally(function() {
                e.isLoading = !1,
                n.go("deployCollectionManage")
            })
        },
        e.cancelEdit = function() {
            a()
        }
    }])
} (angular.module("domeApp"));