﻿"use strict"; !
function(e, o) {
    void 0 !== e && e.controller("CreateDeployImageCtr", ["$scope", "$state", "$domeData", "$domeDeploy", "$domePublic", "dialog",
    function(e, o, n, l, t, c) {
        if (e.$emit("pageTitle", {
            title: "新建部署",
            descrition: "在这里您可以选择一个或多个项目镜像同时部署。",
            mod: "deployManage"
        }), e.loadingsIns = t.getLoadingInstance(), e.collectionInfo = {
            collectionId: o.params.collectionId,
            collectionName: o.params.collectionName
        },
        e.deployIns = n.getData("createDeployInfoCommon"), !e.deployIns) return void o.go("createDeployCommon", {
            collectionId: e.collectionInfo.collectionId,
            collectionName: e.collectionInfo.collectionName
        });
        e.deployIns.formartHealthChecker(),
        n.delData("createDeployInfoCommon"),
        e.collectionName = e.collectionInfo.collectionName,
        e.parentState = 'deployManage({id:"' + e.collectionInfo.collectionId + '",name:"' + e.collectionInfo.collectionName + '"})',
        e.config = e.deployIns.config,
        e.needValid = {
            valid: !1
        },
        e.toLastStep = function() {
            var l = {
                collectionId: e.collectionInfo.collectionId,
                collectionName: e.collectionInfo.collectionName
            };
            n.setData("createDeployInfoCommon", e.deployIns),
            o.go("createDeployCommon", l)
        },
        e.deleteImage = function(o) {
            e.deployIns.deleteImage(o),
            e.currentContainerDraft.index > e.config.containerDrafts.length - 1 && (e.currentContainerDraft.index = 0)
        },
        e.currentContainerDraft = {
            index: 0
        },
        e.deleteVolumeDraft = function(o, n) {
            e.deployIns.deleteVolumeDraft(o, n),
            e.currentVolumeDraft.index > e.deployIns.config.volumeDrafts.length - 1 && (e.currentVolumeDraft.index = 0)
        },
        e.addVolumeDraft = function() {
            e.deployIns.addVolumeDraft(),
            e.currentVolumeDraft.index = e.deployIns.config.volumeDrafts.length - 1
        },
        e.currentVolumeDraft = {
            index: 0
        },
        e.toCreate = function() {
            e.loadingsIns.startLoading("create"),
            e.deployIns.setCollectionId(e.collectionInfo.collectionId),
            e.deployIns.create().then(function() {
                c.alert("提示", "创建成功！"),
                o.go("deployManage", {
                    id: e.collectionInfo.collectionId,
                    name: e.collectionInfo.collectionName
                })
            },
            function(e) {
                "namespace" == e.type ? c.error("创建名空间失败", e.msg) : c.error("创建失败", e.msg)
            }).
            finally(function() {
                e.loadingsIns.finishLoading("create")
            })
        }
    }])
} (angular.module("domeApp"));