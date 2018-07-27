﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("ImagesManageCtr", ["$scope", "$state", "$stateParams", "$domeImage", "dialog", "$domeUser", "$modal", "$cookieStore",
    function(e, a, i, o, n, r, g, l) {
        function s() {
            if (i.args.projectCollectionId !== t) {
                e.projectRegistry = i.args.projectRegistry,
                e.isDelete = i.args.deleteable;
                var a = i.args;
                m = {
                    projectCollectionId: a.projectCollectionId,
                    projectCollectionName: a.projectCollectionName,
                    images: a.images,
                    requestType: a.requestType,
                    registry: a.projectRegistry
                }
            } else {
                var o = l.get("imageParam");
                e.projectRegistry = o.projectRegistry,
                e.isDelete = o.deleteable;
                var a = o;
                m = {
                    projectCollectionId: a.projectCollectionId,
                    projectCollectionName: a.projectCollectionName,
                    images: [],
                    requestType: a.requestType,
                    registry: a.projectRegistry
                }
            }
            e.collectionName = m.projectCollectionName,
            c.getCollectionImages(m).then(function(t) {
                e.imagesInfo = t.data.result || []
            },
            function(e) {
                n.error("查询失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoading = !1
            })
        }
        e.$emit("pageTitle", {
            title: "镜像管理",
            descrition: "在这里您可以查看并管理您的镜像仓库。",
            mod: "image"
        }),
        e.imageDeleteAuth = !1,
        r.userService.getCurrentUser().then(function(t) {
            t.data.result.adminPrivilege && (e.imageDeleteAuth = !0)
        }),
        e.isShowImageDetail = -1,
        e.imagesInfo = [],
        e.isLoading = !0,
        e.needValid = {
            value: !1
        },
        e.isShowAdd = !1,
        e.newImageInfo = {};
        var c = (a.$current.name, o.imageService),
        m = {};
        s(),
        e.getTagDetail = function(t) {
            e.isLoadingTagDetail = !0;
            var a = {
                registry: t.registry,
                name: t.imageName,
                tags: t.tags
            };
            c.getTagDetail(a).then(function(a) {
                for (var i = a.data.result || [], o = 0; o < e.imagesInfo.length; o++) if (e.imagesInfo[o].imageName === t.imageName) {
                    e.imagesInfo[o].tagsDetail = i;
                    break
                }
            },
            function(e) {
                n.error("查询失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoadingTagDetail = !1
            })
        },
        e.deletePrivateImage = function(e, t, a) {
            o.deletePrivateImage(e, t, a).then(function() {
                s()
            },
            function(e) {
                n.error("删除失败", e.data.resultMsg)
            })
        },
        e.toggleShowAdd = function(t) {
            e.isShowAdd = t
        },
        e.openTagModal = function(e) {
            g.open({
                animation: !0,
                templateUrl: "imageTagModal.html",
                controller: "ImageTagModalCtr",
                size: "lg",
                resolve: {
                    imageName: function() {
                        return e
                    }
                }
            })
        },
        e.deleteBaseImage = function(t) {
            o.deleteBaseImage(t).then(function() {
                for (var a = 0; a < e.baseImages.length; a++) if (e.baseImages[a].id === t) {
                    e.baseImages.splice(a, 1);
                    break
                }
            })
        },
        e.createImage = function(t) {
            e.isLoading = !0,
            c.createBaseImage(e.newImageInfo).then(function(a) {
                n.alert("提示", "添加成功！"),
                e.newImageInfo = {},
                a.data.result && e.baseImages.push(a.data.result),
                e.needValid = !1,
                t.$setPristine()
            },
            function() {
                n.error("警告", "添加失败，请重试！")
            }).
            finally(function() {
                e.isLoading = !1
            })
        },
        e.isShowImage = function(t) {
            e.isShowImageDetail === t ? e.isShowImageDetail = -1 : e.isShowImageDetail = t
        }
    }])
} (angular.module("domeApp"));