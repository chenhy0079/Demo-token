﻿"use strict"; !
function(e, i) {
    void 0 !== e && (e.controller("ImageCollectionManageCtr", ["$scope", "$state", "$domeImage", "dialog", "$domeUser", "$modal", "$cookieStore", "api",
    function(e, i, a, t, n, o, s, g) {
        e.$emit("pageTitle", {
            title: "镜像管理",
            descrition: "在这里您可以查看并管理您的镜像仓库。",
            mod: "image"
        }),
        e.isShowImageDetail = -1,
        e.otherImagesInfo = [],
        e.isLoading = !0,
        e.isLoadingBaseImage = !0,
        e.needValid = {
            value: !1
        },
        e.isShowAdd = !1,
        e.newImageInfo = {},
        e.projectRegistry = "",
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        }],
        e.baseImageDeleteAuth = !1,
        g.user.whoami().then(function(i) {
            i.isAdmin && (e.baseImageDeleteAuth = !0)
        });
        var l = i.$current.name,
        m = a.imageService;
        l.indexOf("proimages") !== -1 ? e.tabActive[2].active = !0 : l.indexOf("publicimages") !== -1 ? e.tabActive[1].active = !0 : e.tabActive[0].active = !0,
        m.getBaseImages().then(function(i) {
            e.isLoadingBaseImage = !0,
            e.baseImages = i.data.result || [];
            var a, t = 0;
            for (t = 0, a = e.baseImages.length; t < a; t++) e.baseImages[t].description || (e.baseImages[t].description = "无")
        }).
        finally(function() {
            e.isLoadingBaseImage = !1
        }),
        m.getAllImages().then(function(i) {
            e.isLoading = !0;
            var a = i.data.result || {};
            e.imageProjectCollections = a.imageProjectCollections || [],
            e.otherImages = a.otherImages || [],
            e.projectRegistry = a.registry
        }).
        finally(function() {
            e.isLoading = !1
        }),
        e.gotoProjectImageDetail = function(a) {
            var t = {
                projectCollectionId: a.projectCollectionId,
                projectCollectionName: a.projectCollectionName,
                images: [],
                requestType: "PROJECT_COLLECTION",
                projectRegistry: e.projectRegistry,
                deleteable: a.deletable
            };
            s.put("imageParam", t);
            var n = {
                args: {
                    projectCollectionId: a.projectCollectionId,
                    projectCollectionName: a.projectCollectionName,
                    images: a.projectImages,
                    requestType: "PROJECT_COLLECTION",
                    projectRegistry: e.projectRegistry,
                    deleteable: a.deletable
                }
            };
            i.go("projImagesManage", n)
        },
        e.gotoNotProjectImageDetail = function(a) {
            var t = {
                projectCollectionId: 0,
                projectCollectionName: "",
                images: [],
                requestType: "OTHERIMAGE",
                projectRegistry: e.projectRegistry
            };
            s.put("imageParam", t);
            var n = {
                args: {
                    projectCollectionId: 0,
                    projectCollectionName: "",
                    images: a,
                    requestType: "OTHERIMAGE",
                    projectRegistry: e.projectRegistry
                }
            };
            i.go("otherImagesManage", n)
        },
        e.toggleShowAdd = function(i) {
            e.isShowAdd = i
        },
        e.openTagModal = function(e) {
            o.open({
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
        e.deleteBaseImage = function(i) {
            a.deleteBaseImage(i).then(function() {
                for (var a = 0; a < e.baseImages.length; a++) if (e.baseImages[a].id === i) {
                    e.baseImages.splice(a, 1);
                    break
                }
            })
        },
        e.createImage = function(i) {
            e.isLoading = !0,
            m.createBaseImage(e.newImageInfo).then(function(a) {
                t.alert("提示", "添加成功！"),
                e.newImageInfo = {},
                a.data.result && e.baseImages.push(a.data.result),
                e.needValid = !1,
                i.$setPristine()
            },
            function(e) {
                t.error("添加失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoading = !1
            })
        },
        e.isShowImage = function(i) {
            e.isShowImageDetail === i ? e.isShowImageDetail = -1 : e.isShowImageDetail = i
        }
    }]).controller("ImageTagModalCtr", ["$scope", "imageName", "$modalInstance", "$domeImage", "$util",
    function(e, i, a, t, n) {
        e.imageName = i,
        e.tagInfo = [],
        e.isLoading = !0,
        t.imageService.getImageInfo(i).then(function(i) {
            e.tagInfo = i.data.result || []
        }).
        finally(function() {
            e.isLoading = !1
        })
    }]), e.controller("ImageCollectionMangePublicImages", ["$scope", "api", "dialog",
    function(e, i, a) {
        e.loading = !0,
        e.imageInfo = {
            imageList: [],
            filteredImageList: [],
            searchText: ""
        },
        e.filter = function() {
            e.imageInfo.filteredImageList = e.imageInfo.imageList.filter(function(i) {
                return i.name.indexOf(e.imageInfo.searchText) !== -1
            })
        },
        i.image.public.list().then(function(i) {
            e.imageInfo.imageList = i,
            e.filter()
        }).
        catch(function(e) {
            return a.alert("加载失败", "获取官方仓库镜像列表失败")
        }).then(function() {
            e.loading = !1
        })
    }]))
} (angular.module("domeApp")),
function(e) {
    e.component("imageList", {
        template: '\n      <ul class="image-list card-list">\n        <li class="image-list-item card-item-container" ng-repeat="image in $ctrl.imageList track by $index">\n          <div class="image-list-item-icon-container">\n            <img src="index/images/lib/docker-image.png" class="image-list-item-icon" />\n            <img ng-src="{{ image.icon }}" class ="image-list-item-icon" onerror="this.style.display = \'none\'" onload="this.style.display = \'block\'" />\n          </div>\n          <div class="image-list-item-content">\n            <div class="image-list-item-name"><a ui-sref="publicImageDetail({ name: image.name })" ng-bind="image.name"></a></div>\n            <div class="image-list-item-info">\n              <span class="image-list-item-updatetime">更新时间：<span class="image-list-item-updatetime-output" ng-bind="image.updateTime | time"></span></span>\n            </div>\n          </div>\n          <div class="card-right-info-item image-list-item-info-download-count">\n            <icon-download></icon-download><span class="image-list-item-info-download-count-output" ng-bind="image.downloadCount"></span>次\n          </div>\n          <div class="card-right-info-item image-list-item-info-version-count">\n            <a ui-sref="publicImageDetail({ name: image.name, page: \'tags\' })"><span class="image-list-item-info-version-count-output" ng-bind="image.tagList.length"></span>个版本</a>\n          </div>\n        </li>\n      </ul>\n    ',
        bindings: {
            imageList: "<?"
        },
        controller: [function() {}]
    })
} (angular.module("formInputs"));