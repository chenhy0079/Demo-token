﻿"use strict";
var _slicedToArray = function() {
    function e(e, t) {
        var o = [],
        i = !0,
        r = !1,
        n = void 0;
        try {
            for (var c, a = e[Symbol.iterator](); ! (i = (c = a.next()).done) && (o.push(c.value), !t || o.length !== t); i = !0);
        } catch(e) {
            r = !0,
            n = e
        } finally {
            try { ! i && a.
                return && a.
                return ()
            } finally {
                if (r) throw n
            }
        }
        return o
    }
    return function(t, o) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
} (); !
function(e, t) {
    void 0 !== e && e.controller("ProjectDetailCtr", ["$scope", "$state", "$stateParams", "$domeProject", "dialog", "$domeImage", "$timeout", "$location", "$util", "$domeUser", "$modal", "$filter", "$q",
    function(e, t, o, i, r, n, c, a, u, l, s, f, d) {
        if (e.projectId = t.params.project, e.projectCollectionId = t.params.projectCollectionId, i.projectService.getProjectCollectionNameById(e.projectCollectionId).then(function(t) {
            e.projectCollectionName = t.data.result || ""
        }), !e.projectId) return void t.go("projectManage");
        e.parentState = 'projectManage({id:"' + e.projectCollectionId + '"})',
        e.branch = "master",
        e.valid = {
            needValid: !1,
            createdFileStoragePath: !1
        },
        e.edit = !1,
        e.isEditCreator = !1,
        e.isCreator = !1,
        e.selectedCreator = null,
        e.isWaitingForModify = !1,
        e.statusKey = "",
        e.autoBuildKey = "",
        e.resourceType = "PROJECT",
        e.resourceId = e.projectId,
        e.$on("memberPermisson",
        function(o, i) {
            e.hasMemberPermisson = i,
            i || b.indexOf("user") === -1 || (t.go("projectDetail.info"), e.tabActive[0].active = !0)
        }),
        e.isLoading = !0,
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        }],
        e.currentIndex = -1,
        e.dockerfile = "加载中....";
        var g = null;
        i.projectService.getReadMe(e.projectId, e.branch).then(function(t) {
            e.markdown = t.data.result
        });
        var p, m, j = function() {
            var t = e.project.config.dockerfileInfo.buildPath,
            o = e.project.config.dockerfileInfo.dockerfilePath;
            t || (e.project.config.dockerfileInfo.buildPath = "/"),
            o || (e.project.config.dockerfileInfo.dockerfilePath = "/Dockerfile"),
            e.config = e.project.config
        },
        v = function(t) {
            d.all([n.imageService.getForBuildImages(), n.imageService.getExclusiveImages(t)]).then(function(t) {
                for (var o = _slicedToArray(t, 2), i = o[0], r = o[1], n = i.data.result || [], c = [], a = 0; a < n.length; a++) {
                    var l = n[a];
                    l.createDate = u.getPageDate(l.createTime),
                    l.imageTxt = l.imageName,
                    l.registryUrl = l.registry,
                    l.registryType = 0,
                    l.imageTag && (l.imageTxt += ":" + l.imageTag),
                    c.push(l)
                }
                e.project.projectImagesIns.privateRegistryImageList = c,
                e.project.projectImagesIns.init(r.data.result),
                e.project.projectImagesIns.toggleSpecifiedImage("compile", e.project.customConfig.compileImage),
                e.project.projectImagesIns.toggleSpecifiedImage("run", e.project.customConfig.runImage)
            },
            function() {})
        };
        e.$on("memberPermisson",
        function(o, i) {
            e.hasMemberPermisson = i,
            i || b.indexOf("user") === -1 || (t.go("projectDetail.info"), e.tabActive[0].active = !0)
        }); !
        function() {
            l.userService.getCurrentUser().then(function(t) {
                e.loginUser = t.data.result
            })
        } (); !
        function() {
            l.userService.getResourceUserRole(e.resourceType, e.resourceId).then(function(t) {
                var o = t.data.result;
                e.isDeleteProject = "MASTER" === o,
                e.isEditProject = "MASTER" === o || "DEVELOPER" === o
            },
            function() {
                e.isDeleteProject = !1,
                e.isEditProject = !1
            })
        } ();
        var I = function t() {
            if (!e.loginUser) return setTimeout(t, 10);
            var o = d.defer();
            return i.projectService.getData(e.projectId).then(function(t) {
                p = i.getInstance("Project", t.data.result.project),
                e.creatorInfo = t.data.result.creatorInfo,
                e.loginUser.adminPrivilege || e.creatorInfo.name === e.loginUser.username ? e.isCreator = !0 : e.isCreator = !1,
                e.project = angular.copy(p),
                j(),
                e.$emit("pageTitle", {
                    title: e.config.name,
                    description: "更新于" + u.getPageDate(e.config.lastModify),
                    mod: "projectManage"
                }),
                e.hasuploadFileInfos = !0,
                1 == e.project.customConfig.uploadFileInfos.length && "" === e.project.customConfig.uploadFileInfos[0].filename && "" === e.project.customConfig.uploadFileInfos[0].content && (e.hasuploadFileInfos = !1),
                o.resolve("initProjectSuccess")
            },
            function(e) {
                o.reject("initProjectInfoFailed")
            }).
            finally(function() {
                e.isLoading = !1
            }),
            o.promise
        };
        I();
        var h = function(e, t) {
            var o = "";
            e.interval = u.getPageInterval(e.createTime, e.finishTime),
            e.createTime = f("day")(e.createTime),
            o = "Success" === e.state || "Fail" === e.state ? a.protocol() + "://" + t + "/api/ci/build/download/" + e.projectId + "/" + e.id: "Building" === e.state ? location.protocol.replace("http", "ws") + "//" + t + "/api/ci/build/log/realtime/websocket?buildId=" + e.id: "",
            e.logHref = "/log/log.html?url=" + encodeURIComponent(o)
        };
        e.totalItems = 0,
        e.pagination = {
            currentPage: 1
        },
        e.itemsPerPage = 10,
        e.maxSize = 5,
        e.setPage = function(t) {
            e.currentPage = t
        },
        e.pageChanged = function() {
            e.currentIndex = -1,
            y()
        },
        e.togglePerPageCount = function(t) {
            e.itemsPerPage = t,
            e.pagination.currentPage = 1,
            y()
        };
        var y = function() {
            return i.projectService.buildInfoList(e.projectId, e.pagination.currentPage, e.itemsPerPage).then(function(t) {
                e.totalItems = t.data.result.total;
                var o = t.data.result.buildHistories || [],
                i = a.host();
                a.port() && (i += ":" + a.port());
                for (var r = 0; r < o.length; r++) h(o[r], i),
                o[r].isLogin = t.data.result.authRegistryEnabled && t.data.result.registryUrl == o[r].imageInfo.registry,
                r == e.currentIndex ? o[r].active = !0 : o[r].active = !1;
                return e.buildList = o,
                o = null,
                !0
            },
            function() {
                return ! 0
            }).
            finally(function() {
                e.isLoadingBuildInfo = !1
            })
        },
        C = function() {
            e.isWaitingForModify = !0,
            e.project.modify().then(function() {
                r.alert("提示", "修改成功！"),
                e.checkEdit(),
                I(),
                e.valid.needValid = !1
            },
            function(e) {
                r.error("修改失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isWaitingForModify = !1
            })
        };
        n.imageService.getBaseImages().then(function(t) {
            e.imageList = t.data.result
        });
        var D = function() {
            e.selectedCreator = {
                username: e.creatorInfo.name,
                id: e.creatorInfo.creatorId
            },
            l.userService.getUserList().then(function(t) {
                e.creatorUserList = t.data.result || []
            })
        },
        P = function() {
            var t = {
                creatorId: e.selectedCreator.id,
                name: e.selectedCreator.username
            };
            i.projectService.modifyCreator(e.projectId, t).then(function(t) {
                e.isEditCreator = !1,
                I()
            },
            function(e) {
                r.error("修改失败", e.data.resultMsg)
            })
        };
        e.toggleIsEditCreator = function() {
            e.isEditCreator = !e.isEditCreator
        },
        e.modifyCreator = function() {
            e.isEditCreator = !0,
            D()
        },
        e.toggleCreator = function(t) {
            e.selectedCreator = t
        },
        e.saveEditCreator = function() {
            e.loginUser.adminPrivilege ? P() : r.
            continue ("提示", "修改后将无权限再修改，是否继续").then(function(e) {
                if (e !== r.button.BUTTON_OK) throw ""
            }).then(function() {
                P()
            })
        },
        e.modifyCodeInfo = function() {
            s.open({
                templateUrl: "/index/tpl/modal/codeInfoModal/codeInfoModal.html",
                controller: "CodeInfoModalCtr as vmPro",
                size: "md",
                resolve: {
                    project: function() {
                        return e.config.codeInfo
                    },
                    showForm: function() {
                        return "projectDetail"
                    }
                }
            }).result.then(function(t) {
                i.projectService.modifyCodeInfo(e.projectId, t).then(function(e) {
                    I()
                },
                function(e) {
                    r.error("修改失败", e.data.resultMsg)
                })
            })
        },
        e.checkEdit = function() {
            e.edit = !e.edit,
            e.edit ? I().then(function() {
                e.project.customConfig.customType && v(e.project.customConfig.customType)
            }) : (e.project = angular.copy(p), j()),
            e.config = e.project.config
        },
        e.toggleProjectType = function(t) {
            if (!e.config.userDefineDockerfile) {
                if ("allType" == t && !e.project.isUseCustom && !e.project.isDefDockerfile) return;
                if (e.project.isUseCustom && t === e.project.customConfig.customType) return;
                if (e.project.isDefDockerfile && "defdockerfile" === t) return
            } !
            function() {
                if (!p.config.userDefineDockerfile) {
                    if ("allType" == t && !p.isUseCustom && !p.isDefDockerfile) return ! 0;
                    if (p.isUseCustom && t === p.customConfig.customType) return ! 0;
                    if (p.isDefDockerfile && "defdockerfile" === t) return ! 0
                }
                return ! 1
            } () ? e.project.resetConfig() : e.project = angular.copy(p),
            j(),
            "allType" == t ? (e.project.isUseCustom = !1, e.project.isDefDockerfile = !1) : "defdockerfile" === t ? (e.project.isUseCustom = !1, e.project.isDefDockerfile = !0) : (e.project.isUseCustom = !0, e.project.isDefDockerfile = !1, e.project.customConfig.customType = t),
            e.project.isUseCustom && v(e.project.customConfig.customType),
            e.config.userDefineDockerfile = !1
        },
        e.toggleUseDockerfile = function() {
            e.config.userDefineDockerfile || (e.config.userDefineDockerfile = !0, p.config.userDefineDockerfile ? e.project = angular.copy(p) : e.project.resetConfig(), j())
        },
        e.getBuildList = function() {
            e.isLoadingBuildInfo = !0,
            m && c.cancel(m),
            e.buildList || y(),
            m = c(function() {
                y().
                finally(function() {
                    "projectDetail.buildlog" == t.current.name && e.getBuildList()
                })
            },
            4e3)
        },
        e.showDetail = function(t) {
            if (null != g && g.destroy(), g = new Clipboard(".link-copy"), g.on("error",
            function(e) {
                console.error("Action:", e.action),
                console.error("Trigger:", e.trigger)
            }), e.dockerfile = "加载中....", i.projectService.getBuildDockerfile(e.buildList[t].projectId, e.buildList[t].id).then(function(t) {
                var o = t.data.result;
                e.dockerfile = o ? o.replace(/[\n\r]/g, "<br/>") : "无"
            }), t != e.currentIndex) {
                for (var o = 0; o < e.buildList.length; o++) e.buildList[o].active = !1;
                e.currentIndex = t,
                e.buildList[t].active = !0
            } else {
                for (var r = 0; r < e.buildList.length; r++) e.buildList[r].active = !1;
                e.currentIndex = -1
            }
        },
        e.isNull = function(e) {
            var t = e;
            return e || (t = "无"),
            t
        },
        e.stopBuild = function(e) {
            r.
            continue ("提示", "确定要停止构建吗？").then(function(e) {
                if (e !== r.button.BUTTON_OK) throw ""
            }).then(function() {
                i.projectService.stopBulid(e.id).then(function(e) {
                    y()
                },
                function(e) {
                    r.error("操作失败", e.data.resultMsg)
                })
            })
        },
        e.changeDockerfilePath = function(t) {
            e.config.dockerfileInfo.dockerfilePath = "/" == t ? "/Dockerfile": t + "/Dockerfile"
        },
        e.validCreatedFileStoragePath = function() {
            if (!e.project.isUseCustom) return void(e.valid.createdFileStoragePath = !0);
            for (var t = e.project.customConfig.createdFileStoragePath,
            o = 0,
            i = t.length; o < i; o++) if (t[o].name) return void(e.valid.createdFileStoragePath = !0);
            e.valid.createdFileStoragePath = !1
        },
        e.startEdit = function() {
            e.edit = !e.edit
        },
        e.isNoSet = function(e) {
            return e || (e = "未设置"),
            e
        },
        e.submitModify = function() {
            C()
        },
        e.deleteProject = function() {
            e.project.delete().then(function() {
                t.go("projectManage", {
                    id: e.projectCollectionId
                })
            })
        },
        e.toggleStatus = function(t) {
            t === e.statusKey ? e.statusKey = "": e.statusKey = t,
            e.currentIndex = -1;
            for (var o = 0; o < e.buildList.length; o++) e.buildList[o].active = !1
        },
        e.toggleAutoBuild = function(t) {
            t === e.autoBuildKey ? e.autoBuildKey = "": e.autoBuildKey = t,
            e.currentIndex = -1;
            for (var o = 0; o < e.buildList.length; o++) e.buildList[o].active = !1
        },
        e.modifyCI = function() {
            e.isWaitingForModify = !0,
            C()
        },
        e.openBuild = function() {
            i.buildProject(e.config.id, !!e.config.codeInfo).then(function() {
                y()
            })
        },
        e.getDockerfile = function() {
            e.project.getDockerfile()
        },
        e.choseBaseImageForCustomDockerfile = function() {
            s.open({
                animation: !0,
                templateUrl: "index/tpl/tplChoseImage/choseImage.html",
                controller: "choseImageCtr",
                size: "lg",
                resolve: {}
            }).result.then(function(t) {
                var o = "From " + t.registry.slice(t.registry.lastIndexOf("/") + 1) + "/" + t.imageName + ":" + t.imageTag;
                e.project.customConfig.dockerfile = o + "\n" + (e.project.customConfig.dockerfile || "")
            })
        },
        e.$on("$destroy",
        function(e) {
            m && c.cancel(m)
        });
        var b = t.$current.name;
        b.indexOf("config") !== -1 ? e.tabActive[1].active = !0 : b.indexOf("autobuild") !== -1 ? e.tabActive[2].active = !0 : b.indexOf("buildlog") !== -1 ? (e.tabActive[3].active = !0, e.getBuildList()) : b.indexOf("user") !== -1 ? e.tabActive[4].active = !0 : e.tabActive[0].active = !0
    }]).filter("formateDate",
    function() {
        return function(e) {
            if (!e || e <= 0) return "无";
            var t = new Date(e),
            o = t.getFullYear() + "-",
            i = (t.getMonth() < 9 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-",
            r = (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ",
            n = (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":",
            c = (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":",
            a = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
            return "undefined" == typeof summary ? o + i + r + n + c + a: "无"
        }
    })
} (angular.module("domeApp"));