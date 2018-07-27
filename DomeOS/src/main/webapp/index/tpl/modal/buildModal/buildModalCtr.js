﻿"use strict"; !
function(n, e) {
    function o(n, e, o, a, t) {
        var c = this;
        c.projectInfo = n,
        c.loadingIns = o.getLoadingInstance(),
        c.buildWay = "Branch",
        c.searchKey = "",
        c.imageTag = "",
        c.selectedBranch = "",
        c.projectInfo.hasCodeInfo && (c.loadingIns.startLoading("branch"), e.projectService.getBranches(c.projectInfo.projectId).then(function(n) {
            c.branches = n.data.result || []
        }).
        finally(function() {
            c.loadingIns.finishLoading("branch")
        }), c.loadingIns.startLoading("tag"), e.projectService.getTags(c.projectInfo.projectId).then(function(n) {
            c.tags = n.data.result || []
        }).
        finally(function() {
            c.loadingIns.finishLoading("tag")
        })),
        c.toggleBuildWay = function(n) {
            c.buildWay = n,
            c.searchKey = "",
            c.selectedBranch = ""
        },
        c.toggleBranch = function(n) {
            c.selectedBranch = n,
            c.searchKey = ""
        },
        c.close = function() {
            t.dismiss("cancel")
        },
        c.toBuild = function() {
            var n = {
                projectId: c.projectInfo.projectId,
                codeInfo: {},
                imageInfo: {}
            };
            c.projectInfo.hasCodeInfo && ("Branch" == c.buildWay ? n.codeInfo.codeBranch = c.selectedBranch: n.codeInfo.codeTag = c.selectedBranch),
            c.imageTag && (n.imageInfo.imageTag = c.imageTag),
            c.loadingIns.startLoading("submit"),
            e.projectService.build(n).then(function(n) {
                200 == n.data.resultCode ? (t.close(), a.alert("提示", "成功，正在构建！")) : (t.close(), a.error("警告", "构建失败！错误信息：" + n.data.resultMsg))
            },
            function() {
                a.error("警告", "构建失败，请重试！")
            }).
            finally(function() {
                c.loadingIns.finishLoading("submit")
            })
        }
    }
    o.$inject = ["projectInfo", "$domeProject", "$domePublic", "dialog", "$modalInstance"],
    n.controller("BuildModalCtr", o)
} (angular.module("domeApp"));