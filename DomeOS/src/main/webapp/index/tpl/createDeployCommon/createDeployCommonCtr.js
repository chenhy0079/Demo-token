﻿"use strict"; !
function(o, e) {
    void 0 !== o && o.controller("CreateDeployCommonCtr", ["$scope", "$state", "$domeData", "$domeDeploy", "$domePublic", "dialog",
    function(o, e, l, n, c, t) {
        o.$emit("pageTitle", {
            title: "新建部署",
            descrition: "在这里您可以选择一个或多个项目镜像同时部署。",
            mod: "deployManage"
        }),
        e.params.collectionId && e.params.collectionName || e.go("deployCollectionManage"),
        o.collectionInfo = {
            collectionId: e.params.collectionId,
            collectionName: e.params.collectionName
        },
        o.collectionInfo = {
            collectionId: e.params.collectionId,
            collectionName: e.params.collectionName
        },
        o.collectionName = o.collectionInfo.collectionName,
        o.parentState = 'deployManage({id:"' + o.collectionInfo.collectionId + '",name:"' + o.collectionInfo.collectionName + '"})',
        l.getData("createDeployInfoCommon") ? (o.deployIns = l.getData("createDeployInfoCommon"), o.deployIns.formartHealthChecker(), l.delData("createDeployInfoCommon")) : o.deployIns = n.getInstance("Deploy"),
        o.config = o.deployIns.config,
        o.labelKey = {
            key: ""
        },
        o.loadingsIns = c.getLoadingInstance(),
        0 === o.deployIns.clusterListIns.clusterList.length && o.deployIns.initCluster(),
        o.selectFocus = function() {
            o.validHost = !0
        },
        o.labelKeyDown = function(e, l, n) {
            var c, t = o.deployIns.nodeListIns.labelsInfo,
            a = !1;
            13 == e.keyCode && n ? angular.forEach(n,
            function(e, l) {
                a || e.isSelected || (o.deployIns.nodeListIns.toggleLabel(l, !0), o.labelKey.key = ""),
                a = !0
            }) : l || 8 != e.keyCode || (angular.forEach(t,
            function(o, e) {
                o.isSelected && (c = e)
            }), c && o.deployIns.nodeListIns.toggleLabel(c, !1))
        },
        o.cancel = function() {
            e.go("deployManage", {
                id: o.collectionInfo.collectionId,
                name: o.collectionInfo.collectionName
            })
        },
        o.toNext = function() {
            l.setData("createDeployInfoCommon", o.deployIns);
            var n = {
                collectionId: o.collectionInfo.collectionId,
                collectionName: o.collectionInfo.collectionName
            };
            "CUSTOM" === o.config.versionType ? e.go("createDeployImage", n) : e.go("createDeployRaw", n)
        }
    }])
} (angular.module("domeApp"));