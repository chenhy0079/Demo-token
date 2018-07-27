﻿"use strict"; !
function(o, e) {
    void 0 !== o && o.controller("CreateDeployRawCtr", ["$scope", "$state", "$domeData", "$domeDeploy", "dialog",
    function(o, e, n, t, l) {
        o.$emit("pageTitle", {
            title: "新建部署",
            descrition: "在这里您可以选择一个或多个项目镜像同时部署。",
            mod: "deployManage"
        }),
        o.loadingsIns = $domePublic.getLoadingInstance(),
        e.params.collectionId && e.params.collectionName || e.go("deployCollectionManage"),
        o.collectionInfo = {
            collectionId: e.params.collectionId,
            collectionName: e.params.collectionName
        },
        o.collectionName = o.collectionInfo.collectionName,
        o.parentState = 'deployManage({id:"' + o.collectionInfo.collectionId + '",name:"' + o.collectionInfo.collectionName + '"})';
        var c = n.getData("createDeployInfoCommon");
        if (!c) return void e.go("createDeployCommon");
        o.deployIns = c,
        n.delData("createDeployInfoCommon"),
        o.config = o.deployIns.config,
        o.needValid = {
            valid: !1
        },
        o.loadingsIns.startLoading("deploystr"),
        o.deployIns.getDeployStr().then(function(e) {
            var n = e.data.result;
            o.deploystr = n,
            o.config.versionString = n
        },
        function() {
            o.toLastStep()
        }).
        finally(function() {
            o.loadingsIns.finishLoading("deploystr")
        }),
        o.podStrUndoText = null,
        o.setPodStrToDefault = function() {
            o.podStrUndoText = o.config.versionString.podSpecStr || "",
            o.config.versionString.podSpecStr = o.deployIns.defaultVersionString[o.config.versionType]
        },
        o.clearPodStrUndoText = function() {
            o.podStrUndoText = null
        },
        o.undoPodStrToDefault = function() {
            o.config.versionString.podSpecStr = o.podStrUndoText,
            o.podStrUndoText = null
        },
        o.toCreate = function() {
            o.loadingsIns.startLoading("create"),
            o.deployIns.setCollectionId(o.collectionInfo.collectionId),
            o.deployIns.create().then(function() {
                l.alert("提示", "创建成功！"),
                e.go("deployManage", {
                    id: o.collectionInfo.collectionId,
                    name: o.collectionInfo.collectionName
                })
            },
            function(o) {
                "namespace" == o.type ? l.error("创建名空间失败", o.msg) : l.error("创建失败", o.msg)
            }).
            finally(function() {
                o.loadingsIns.finishLoading("create")
            })
        },
        o.toLastStep = function() {
            var t = {
                collectionId: o.collectionInfo.collectionId,
                collectionName: o.collectionInfo.collectionName
            };
            n.setData("createDeployInfoCommon", o.deployIns),
            e.go("createDeployCommon", t)
        }
    }])
} (angular.module("domeApp"));