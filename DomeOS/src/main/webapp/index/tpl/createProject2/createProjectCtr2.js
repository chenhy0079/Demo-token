﻿"use strict";
var _slicedToArray = function() {
    function e(e, o) {
        var t = [],
        c = !0,
        i = !1,
        r = void 0;
        try {
            for (var n, l = e[Symbol.iterator](); ! (c = (n = l.next()).done) && (t.push(n.value), !o || t.length !== o); c = !0);
        } catch(e) {
            i = !0,
            r = e
        } finally {
            try { ! c && l.
                return && l.
                return ()
            } finally {
                if (i) throw r
            }
        }
        return t
    }
    return function(o, t) {
        if (Array.isArray(o)) return o;
        if (Symbol.iterator in Object(o)) return e(o, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
} (); !
function(e, o) {
    void 0 !== e && e.controller("CreateProjectCtr2", ["$scope", "$modal", "$domeProject", "$domeImage", "$domeData", "dialog", "$state", "$q", "$util",
    function(e, o, t, c, i, r, n, l, a) {
        e.$emit("pageTitle", {
            title: "新建工程",
            descrition: "在这里把您的代码仓库和DomeOS对接即可创建新项目。此外，您还可以对现有项目进行查询和管理。",
            mod: "projectManage"
        });
        var f = angular.copy(i.getData("projectInfo"));
        if (i.delData("projectInfo"), e.projectCollectionId = n.params.projectCollectionId, e.projectCollectionId || n.go("projectCollectionManage"), !f) return void n.go("createProject1", {
            projectCollectionId: e.projectCollectionId
        });
        e.valid = {
            needValid: !1,
            createdFileStoragePath: !1
        };
        var s = function() {
            e.config = e.project.config,
            e.project.customConfig.buildPath = "/",
            e.project.customConfig.dockerfilePath = "/Dockerfile",
            e.config.authority = 0,
            e.projectCollectionId = n.params.projectCollectionId,
            t.projectService.getProjectCollectionNameById(e.projectCollectionId).then(function(o) {
                e.projectCollectionName = o.data.result || ""
            })
        };
        e.projectTypeLanguage = ["java"],
        e.project = t.getInstance("Project", {
            userDefineDockerfile: "dockerfileincode" === f.projectType,
            exclusiveBuild: e.projectTypeLanguage.indexOf(f.projectType) !== -1 ? {
                customType: f.projectType
            }: null,
            customDockerfile: "dockerfileuserdefined" === f.projectType ? {
                dockerfile: "",
                uploadFileInfos: []
            }: null
        }),
        s();
        var u = function(o) {
            e.project.create(o).then(function() {
                r.alert("提示", "新建成功！"),
                n.go("projectManage", {
                    id: o
                })
            },
            function(e) {
                r.error("新建失败", e.data.resultMsg)
            })
        };
        e.config.userDefineDockerfile || (e.isLoading = !0, l.all([c.imageService.getForBuildImages(), c.imageService.getExclusiveImages("java")]).then(function(o) {
            for (var t = _slicedToArray(o, 2), c = t[0], i = t[1], r = c.data.result || [], n = [], l = 0; l < r.length; l++) {
                var f = r[l];
                f.createDate = a.getPageDate(f.createTime),
                f.imageTxt = f.imageName,
                f.registryUrl = f.registry,
                f.registryType = 0,
                f.imageTag && (f.imageTxt += ":" + f.imageTag),
                n.push(f)
            }
            e.project.projectImagesIns.privateRegistryImageList = n;
            var s = i.data.result || {};
            e.project.projectImagesIns.init(s)
        },
        function() {}).
        finally(function() {
            e.isLoading = !1
        }), c.imageService.getBaseImages().then(function(o) {
            e.imageList = o.data.result
        })),
        e.toggleProjectType = function(o) {
            if (!e.config.userDefineDockerfile) {
                if ("allType" == o && !e.project.isUseCustom && !e.project.isDefDockerfile) return;
                if (e.project.isUseCustom && o === e.project.customConfig.customType) return;
                if (e.project.isDefDockerfile && "defdockerfile" === o) return
            }
            e.project.init(),
            s(),
            "allType" == o ? (e.project.isUseCustom = !1, e.project.isDefDockerfile = !1) : "defdockerfile" === o ? (e.project.isUseCustom = !1, e.project.isDefDockerfile = !0) : (e.project.isUseCustom = !0, e.project.isDefDockerfile = !1, e.project.customConfig.customType = o)
        },
        e.validCreatedFileStoragePath = function() {
            if (!e.project.isUseCustom) return void(e.valid.createdFileStoragePath = !0);
            for (var o = e.project.customConfig.createdFileStoragePath,
            t = 0,
            c = o.length; t < c; t++) if (o[t].name) return void(e.valid.createdFileStoragePath = !0);
            e.valid.createdFileStoragePath = !1
        },
        e.changeDockerfilePath = function(o) {
            e.config.dockerfileInfo.dockerfilePath = "/" == o ? "/Dockerfile": o + "/Dockerfile"
        },
        e.getDockerfile = function() {
            e.config.name = f.info.projectBelong + "/" + f.info.name,
            e.config.codeInfo = f.info.codeInfo,
            e.config.autoBuildInfo = f.info.autoBuildInfo,
            e.project.getDockerfile()
        },
        e.toCopy = function() {
            o.open({
                animation: !0,
                templateUrl: "projectListModal.html",
                controller: "ProjectListModalCtr",
                size: "lg",
                resolve: {
                    projectInfo: {
                        userDefineDockerfile: e.config.userDefineDockerfile,
                        isUseCustom: e.project.isUseCustom,
                        isDefDockerfile: e.project.isDefDockerfile,
                        customType: e.project.customConfig.customType,
                        projectCollectionId: e.projectCollectionId
                    }
                }
            }).result.then(function(o) {
                t.projectService.getData(o).then(function(o) {
                    var t = o.data.result;
                    e.project.customConfig,
                    e.project.init(t.project);
                    var c = t.project; ! c.userDefineDockerfile && c.exclusiveBuild && c.exclusiveBuild.customType && (e.project.projectImagesIns.getForBuildImageAsPrivateImageList("all"), e.project.projectImagesIns.toggleSpecifiedImage("compile", c.exclusiveBuild.compileImage), e.project.projectImagesIns.toggleSpecifiedImage("run", c.exclusiveBuild.runImage)),
                    e.config = e.project.config,
                    e.validCreatedFileStoragePath(),
                    delete e.config.id
                })
            })
        },
        e.toLastPage = function() {
            i.setData("createProjectInfo1", f),
            n.go("createProject1", {
                projectCollectionId: f.info.projectCollectionId,
                projectCollectionName: f.info.projectCollectionName
            })
        },
        e.createProject = function() {
            e.config.name = f.info.projectCollectionName + "/" + f.info.name,
            e.config.codeInfo = f.info.codeInfo,
            e.config.autoBuildInfo = f.info.autoBuildInfo,
            u(f.info.projectCollectionId)
        },
        e.choseBaseImageForCustomDockerfile = function() {
            o.open({
                animation: !0,
                templateUrl: "index/tpl/tplChoseImage/choseImage.html",
                controller: "choseImageCtr",
                size: "lg",
                resolve: {}
            }).result.then(function(o) {
                var t = "From " + o.registry.slice(o.registry.lastIndexOf("/") + 1) + "/" + o.imageName + ":" + o.imageTag;
                e.config.customDockerfile.dockerfile = t + "\n" + (e.config.customDockerfile.dockerfile || "")
            })
        }
    }]).controller("ProjectListModalCtr", ["$scope", "$filter", "$modalInstance", "$domeProject", "$domeProjectCollection", "projectInfo",
    function(e, o, t, c, i, r) {
        e.key = {
            searchKey: ""
        },
        e.selectedCollection = {
            id: r.projectCollectionId
        },
        e.collectionList = [e.selectedCollection],
        i.projectCollectionService.getProjectCollection().then(function(o) {
            e.collectionList = o.data.result,
            e.selectedCollection && (e.selectedCollection = e.collectionList.filter(function(o) {
                return o.id == e.selectedCollection.id
            })[0])
        });
        var n = function(o) {
            e.loading = !0,
            c.projectService.getProject(o).then(function(o) {
                var t = o.data.result || [],
                c = [];
                Object.keys(t).forEach(function(e) {
                    c = c.concat(t[e])
                }),
                e.projectList = c.filter(function(e) {
                    return r.userDefineDockerfile ? "dockerfileincode" === e.projectType: r.isDefDockerfile ? "dockerfileuserdefined" === e.projectType: r.isUseCustom ? "java" === r.customType && "java" === e.projectType: "commonconfig" === e.projectType
                })
            }).
            finally(function() {
                e.loading = !1
            })
        };
        n(e.selectedCollection.id),
        e.selectCollection = function(o) {
            e.selectedCollection = o,
            n(o.id)
        },
        e.cancel = function() {
            t.dismiss("cancel")
        },
        e.copy = function(e) {
            t.close(e)
        }
    }])
} (angular.module("domeApp"));