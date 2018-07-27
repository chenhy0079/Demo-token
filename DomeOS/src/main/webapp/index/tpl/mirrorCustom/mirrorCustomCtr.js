﻿"use strict"; !
function(e, i) {
    void 0 !== e && e.controller("MirrorCustomCtr", ["$scope", "$domeImage", "dialog", "$modal", "$q", "$location", "$state", "$util", "$timeout",
    function(e, i, t, g, a, o, r, m, s) {
        e.$emit("pageTitle", {
            title: "镜像定制",
            descrition: "在这里您可以定制满足个性化需求的镜像。",
            mod: "image"
        });
        var n;
        e.specificImg = {
            language: "java",
            imgType: "compileimage",
            isSelected: !1
        },
        e.customtype = "dockerfile",
        e.mirror = i.getMirrorInstance(),
        e.config = e.mirror.config,
        e.toggleCustomType = function(i) {
            e.customtype = i,
            e.config.autoCustom = "dockerfile" == i ? 0 : 1,
            e.config.envSettings = [{
                key: "",
                value: "",
                description: ""
            }],
            e.config.publish = 1,
            e.config.imageName = "",
            e.config.imageTag = "",
            e.config.description = "",
            e.specificImg = {
                language: "java",
                imgType: "compileimage",
                isSelected: !1
            },
            e.config.dockerfileContent = "",
            e.config.files = [{
                fileName: "",
                filePath: "",
                content: ""
            }]
        },
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        }];
        var c = i.imageService,
        l = function(i) {
            c.buildCustomImage(i).then(function(e) {
                t.alert("提示", "成功，正在构建！")
            },
            function(e) {
                t.error("启动构建失败", e.data.resultMsg),
                c.deleteCustomImage(i)
            }).
            finally(function() {
                e.isLoading = !1
            })
        },
        u = function() {
            c.createCustomImage(e.config).then(function(e) {
                var i = e.data.result || {};
                l(i.id)
            },
            function(e) {
                t.error("创建失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoading = !1
            })
        };
        e.nameTest = function() {
            e.isLoading = !0,
            c.validImageName(e.config.imageName, e.config.imageTag).then(function(e) {
                var i = e.data.result;
                "PROJECT" == i ? t.error("警告", "存在与该镜像同名的项目！") : "BASEIMAGE" == i ? t.error("警告", "存在与该镜像同名的基础镜像！") : "NEITHER" == i ? t.alert("提示", "不存在同名镜像，可继续构建。") : "IMAGE_IN_REGISTRY" == i && t.error("警告", "镜像仓库中存在同名镜像，如继续会覆盖原镜像!")
            },
            function(e) {
                t.error("检测失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoading = !1
            })
        },
        e.creatBuild = function() {
            e.isLoading = !0,
            c.validImageName(e.config.imageName, e.config.imageTag).then(function(e) {
                "NEITHER" == e.data.result ? u() : t.
                continue ("提示", "该镜像名已存在，如继续构建会覆盖原镜像！").then(function(e) {
                    if (e !== t.button.BUTTON_OK) throw ""
                }).then(function() {
                    u()
                })
            },
            function(e) {
                t.error("重名检查失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isLoading = !1
            })
        },
        e.assigImgName = function(i) {
            e.config.imageName = i ? e.specificImg.imgType + "-" + e.specificImg.language: ""
        },
        e.selectMirror = function(i) {
            e.img.mirrorNameList = [],
            e.img.type = i;
            var t, g, a, o = e.img[i],
            r = o.length;
            if ("baseImages" == i || "projectImages" == i) {
                for (e.img.mirror = "baseImages" == i ? "基础镜像": "项目镜像", t = 0; t < r; t++) for (g = t + 1; g < r; g++) o[t].imageName == o[g].imageName && (o.splice(g, 1), r--, g--);
                var m = o.length;
                for (a = 0; a < m; a++) e.img.mirrorNameList.push({
                    imageName: o[a].imageName,
                    registry: o[a].registry
                });
                e.config.sourceImage.imageName = e.img.mirrorNameList[0].imageName,
                e.config.sourceImage.registryUrl = e.img.mirrorNameList[0].registry
            } else if ("otherImages" == i) {
                for (e.img.mirror = "非项目镜像", t = 0; t < r; t++) e.img.mirrorNameList.push({
                    imageName: o[t],
                    registry: ""
                });
                e.config.sourceImage.imageName = e.img.mirrorNameList[0].imageName
            }
        },
        e.selectMirrorName = function(i, t) {
            e.config.sourceImage.imageName = i,
            e.config.sourceImage.registryUrl = t,
            e.img.mirrorTagList = [];
            var g, a = e.img[e.img.type],
            o = a.length,
            r = 0;
            if ("baseImages" == e.img.type) {
                for (g = 0; g < o; g++) a[g].imageName == i && (e.img.mirrorTagList[r++] = a[g].imageTag);
                e.config.sourceImage.imageTag = e.img.mirrorTagList[0] || ""
            } else "projectImages" == e.img.type ? (e.isLoading = !0, c.getImageTags(i, t).then(function(i) {
                for (var t = i.data.result || [], g = t.length, a = 0; a < g; a++) e.img.mirrorTagList.push(t[a].tag);
                e.config.sourceImage.imageTag = e.img.mirrorTagList[0] || ""
            }), e.isLoading = !1) : "otherImages" == e.img.type && (e.isLoading = !0, c.getImageInfo(i).then(function(i) {
                for (var t = i.data.result || [], g = t.length, a = 0; a < g; a++) e.img.mirrorTagList.push(t[a].tag);
                e.config.sourceImage.imageTag = e.img.mirrorTagList[0] || "",
                e.config.sourceImage.registryUrl = t[0].registry
            }), e.isLoading = !1)
        };
        var f = function() {
            e.isLoading = !0,
            c.getAllImages().then(function(i) {
                var t = i.data.result || {};
                e.img = t,
                e.img.baseImages = t.baseImages || [],
                e.img.projectImages = t.projectImages || [],
                e.img.otherImages = t.otherImages || [],
                0 !== e.img.baseImages.length ? (e.img.type = "baseImages", e.img.mirror = "基础镜像", e.selectMirror("baseImages"), e.selectMirrorName(e.img.baseImages[0].imageName, e.img.baseImages[0].registry)) : 0 !== e.img.projectImages.length ? (e.img.type = "projectImages", e.img.mirror = "项目镜像", e.selectMirror("projectImages"), e.selectMirrorName(e.img.projectImages[0].imageName, e.img.projectImages[0].registry)) : 0 !== e.img.otherImages && (e.img.type = "otherImages", e.img.mirror = "其他镜像", e.selectMirror("otherImages"), e.selectMirrorName(e.img.otherImages[0], ""))
            }).
            finally(function() {
                e.isLoading = !1
            })
        };
        f(),
        e.toggleMirrorHub = function(i) {
            e.config.sourceImage.thirdParty = i,
            0 === i ? f() : (e.config.sourceImage.registryUrl = "", e.config.sourceImage.imageName = "", e.config.sourceImage.imageTag = "")
        },
        e.customImgList = [];
        var I = function(e, i) {
            var t = "";
            e.interval = m.getPageInterval(e.createTime, e.finishTime),
            e.createTime = m.getPageDate(e.createTime),
            0 === e.autoCustom ? e.type = "Dockerfile": e.type = "配置文件",
            "Building" == e.state ? t = location.protocol.replace("http", "ws") + "//" + i + "/api/ci/build/log/realtime/websocket?buildId=" + e.id + "&type=baseimage": "Success" !== e.state && "Fail" !== e.state || (t = o.protocol() + "://" + i + "/api/image/custom/download/" + e.id),
            e.logHref = "/log/log.html?url=" + encodeURIComponent(t)
        };
        e.getImgList = function() {
            n && s.cancel(n),
            c.getCustomImages().then(function(i) {
                var t, g, a, m, c = i.data.result || [],
                l = o.host(),
                u = 0;
                if (o.port() && (l += ":" + o.port()), 0 === e.customImgList.length) {
                    for (t = 0; t < c.length; t++) I(c[t], l);
                    e.customImgList = c
                } else for (t = 0; t < c.length; t++) {
                    for (a = !1, m = c[t], I(m, l), g = u; g < e.customImgList.length; g++) if (m.id === e.customImgList[g].id) {
                        e.customImgList[g].imageSize = m.imageSize,
                        e.customImgList[g].type = m.type,
                        e.customImgList[g].state !== m.state && (e.customImgList[g].state = m.state, e.customImgList[g].logHref = m.logHref),
                        e.customImgList[g].interval = m.interval,
                        e.customImgList[g].createTime = m.createTime,
                        a = !0;
                        break
                    }
                    a || (e.customImgList.splice(u, 0, m), u++)
                }
                "mirrorCustom.log" == r.$current.name && (n = s(function() {
                    e.getImgList()
                },
                4e3))
            }).
            finally(function() {
                e.isLoading = !1
            })
        },
        e.selectOption = {
            state: {
                All: !0,
                Preparing: !1,
                Building: !1,
                Success: !1,
                Fail: !1
            },
            builduser: {
                All: !0,
                own: !1
            },
            type: {
                All: !0,
                dockerfile: !1,
                configfile: !1
            }
        },
        e.toggleAll = function(i) {
            angular.forEach(e.selectOption[i],
            function(t, g) {
                e.selectOption[i][g] = !1
            }),
            e.selectOption[i].All = !0
        },
        e.toggleSelect = function(i, t) {
            var g = !0;
            e.selectOption[i][t] = !e.selectOption[i][t],
            e.selectOption[i][t] ? e.selectOption[i].All && (e.selectOption[i].All = !1) : (angular.forEach(e.selectOption[i],
            function(t, a) {
                "All" !== a && e.selectOption[i][a] && g && (g = !1)
            }), g && e.toggleAll(i))
        },
        e.toggleShowDetail = function() {
            e.selectOption.isshowmore = !e.selectOption.isshowmore
        },
        e.$on("$destroy",
        function(e) {
            n && s.cancel(n)
        }),
        r.$current.name.indexOf("log") !== -1 ? (e.tabActive[1].active = !0, e.getImgList()) : e.tabActive[0].active = !0
    }])
} (angular.module("domeApp"));