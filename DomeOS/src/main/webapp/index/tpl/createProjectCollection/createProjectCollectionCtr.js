﻿"use strict"; !
function(e, s) {
    void 0 !== e && e.controller("CreateProjectCollectionCtr", ["$scope", "$domeUser", "$domeProjectCollection", "dialog", "$state",
    function(e, s, r, t, o) {
        e.$emit("pageTitle", {
            title: "新建项目",
            descrition: "在这里您可以新建一个项目。",
            mod: "user"
        }),
        e.isPublic = !1,
        e.resourceType = "PROJECT_COLLECTION",
        e.selectedUsers = [],
        e.userList = [],
        e.role = "REPORTER",
        e.selectedUsersList = [],
        e.group = {},
        e.projectCollection = {},
        e.userKey = {
            key: ""
        },
        e.isWaitingCreate = !1;
        var l = s.userService,
        c = r.projectCollectionService;
        l.getCurrentUser().then(function(s) {
            var r = s.data.result;
            e.myself = {
                userId: r.id,
                username: r.username,
                role: "MASTER"
            },
            l.getUserList().then(function(s) {
                e.userList = s.data.result || [];
                for (var r = 0; r < e.userList.length; r++) if (e.userList[r].id === e.myself.userId) {
                    e.userList.splice(r, 1);
                    break
                }
            })
        }),
        e.selectUser = function(s, r) {
            var t, o = 0;
            for (o = 0, t = e.selectedUsers.length; o < t; o++) if (e.selectedUsers[o].userId === s) return;
            for (o = 0, t = e.selectedUsersList.length; o < t; o++) if (e.selectedUsersList[o].userId === s) return;
            e.selectedUsers.push({
                userId: s,
                username: r
            }),
            e.userKey.key = ""
        },
        e.cancelUser = function(s) {
            e.selectedUsers.splice(s, 1)
        },
        e.addUser = function() {
            for (var s = 0,
            r = e.selectedUsers.length; s < r; s++) e.selectedUsersList.push({
                userId: e.selectedUsers[s].userId,
                username: e.selectedUsers[s].username,
                role: e.role
            });
            e.selectedUsers = []
        },
        e.deleteUser = function(s) {
            e.selectedUsersList.splice(s, 1)
        },
        e.toggleRole = function(s) {
            e.role = s
        },
        e.userKeyDown = function(s, r, t) {
            13 == s.keyCode && t && e.selectUser(t.id, t.username),
            r || 8 != s.keyCode || e.selectedUsers.pop()
        },
        e.createProjectCollection = function() {
            e.isWaitingCreate = !0;
            var s = [],
            r = {
                creatorId: e.myself.userId,
                name: e.myself.name
            };
            e.projectCollection.creatorInfo = r,
            e.isPublic ? e.projectCollection.projectCollectionState = "PUBLIC": e.projectCollection.projectCollectionState = "PRIVATE",
            c.createProjectCollection(e.projectCollection).then(function(r) {
                for (var c = r.data.result.id,
                i = 0,
                n = e.selectedUsersList.length; i < n; i++) s.push({
                    collectionId: c,
                    userId: e.selectedUsersList[i].userId,
                    role: e.selectedUsersList[i].role,
                    resourceType: e.resourceType
                });
                var u = {
                    collectionId: c,
                    resourceType: e.resourceType,
                    members: s
                };
                l.createCollectionUser(u).then(function() {
                    t.alert("提示", "创建成功！"),
                    o.go("projectCollectionManage")
                },
                function(s) {
                    e.isWaitingCreate = !1,
                    t.error("创建成功，添加用户失败", s.data.resultMsg),
                    o.go("projectCollectionManage")
                })
            },
            function(s) {
                e.isWaitingCreate = !1,
                t.error("创建失败", s.data.resultMsg)
            })
        }
    }])
} (angular.module("domeApp"));