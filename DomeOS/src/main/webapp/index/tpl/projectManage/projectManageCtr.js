﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("ProjectManageCtr", ["$scope", "$state", "$domeProject", "$timeout", "$domeUser",
    function(e, t, o, c, r) {
        e.$emit("pageTitle", {
            title: "项目管理",
            descrition: "在这里把您的代码仓库和DomeOS对接即可创建新项目。此外，您还可以对现有项目进行查询和管理。",
            mod: "projectManage"
        }),
        t.params.id || t.go("projectCollectionManage"),
        e.resourceType = "PROJECT_COLLECTION",
        e.resourceId = t.params.id,
        e.userRole = null,
        e.setRole = function(t) {
            e.userRole = t
        },
        e.mayCreateProject = function() {
            return "MASTER" === e.userRole || "DEVELOPER" === e.userRole
        },
        e.exitToList = function() {
            t.go("projectCollectionManage")
        },
        e.projectList = [],
        e.isLoading = !0,
        e.tabActive = [{
            active: !1
        },
        {
            active: !1
        },
        {
            active: !1
        }];
        var n;
        o.projectService.getProjectCollectionNameById(e.resourceId).then(function(t) {
            e.projectCollectionName = t.data.result || ""
        }),
        function t() {
            o.projectService.getProject(e.resourceId).then(function(t) {
                e.projectList = t.data.result || []
            }).
            finally(function() {
                e.isLoading = !1,
                n && c.cancel(n),
                n = c(t, 4e3)
            })
        } (),
        e.openBuild = function(e, t) {
            o.buildProject(e, t)
        },
        e.addUser = function(e, t) {
            o.addProjectCollectionUser(e, t)
        },
        e.$on("$destroy",
        function(e) {
            n && c.cancel(n)
        });
        var i = t.$current.name;
        i.indexOf("user") !== -1 ? e.tabActive[1].active = !0 : i.indexOf("project") !== -1 && (e.tabActive[0].active = !0)
    }])
} (angular.module("domeApp"));