﻿"use strict"; !
function(e, s) {
    void 0 !== e && e.controller("TplAlarmUserGroupDetailCtr", ["$scope", "$http", "$domeUser", "$domeAlarm", "dialog", "$state", "$stateParams",
    function(e, s, t, r, n, i, o) {
        function u() {
            a.getData().then(function(s) {
                for (var t = s.data.result || [], r = 0; r < t.length; r++) if (t[r].id == o.id) {
                    e.userInfos = t[r].userList;
                    break
                }
            })
        }
        e.$emit("pageTitle", {
            title: "新建组",
            descrition: "在这里您可以新建一个组。",
            mod: "user"
        }),
        e.userGroupId = o.id,
        e.selectedUsers = [],
        e.userList = [],
        e.selectedUsersList = [],
        e.userKey = {
            key: ""
        },
        e.isWaitingCreate = !1;
        var a = r.getInstance("UserGroupService");
        e.permission = {
            id: null,
            username: null,
            role: null
        },
        t.userService.getUserList().then(function(s) {
            e.userList = s.data.result || []
        }),
        function() {
            t.getLoginUser().then(function(t) {
                s.get("/api/user/resource/ALARM/1000").then(function(s) {
                    var r = s.data.result;
                    vm.permission.id = t.id,
                    vm.permission.role = r,
                    e.$broadcast("permission", e.permission)
                })
            })
        } (),
        u(),
        e.selectUser = function(s) {
            var t, r = 0;
            for (r = 0, t = e.selectedUsers.length; r < t; r++) if (e.selectedUsers[r].userId === s.id) return;
            e.selectedUsers.push({
                id: s.id,
                username: s.username,
                email: s.email,
                phone: s.phone
            }),
            e.userKey.key = ""
        },
        e.cancelUser = function(s) {
            e.selectedUsers.splice(s, 1)
        },
        e.deleteUser = function(s) {
            n.danger("确认删除", "确认要删除吗？").then(function(e) {
                if (e !== n.button.BUTTON_OK) throw ""
            }).then(function() {
                a.deleteSingleUser(e.userGroupId, s).then(function(e) {
                    e.data.result;
                    n.alert("提示", "删除成功！ "),
                    u()
                },
                function(e) {
                    n.error("删除失败", e.data.resultMsg)
                })
            })
        },
        e.userKeyDown = function(s, t, r) {
            13 == s.keyCode && r && e.selectUser(r.id, r.username),
            t || 8 != s.keyCode || e.selectedUsers.pop()
        },
        e.addUser = function() {
            e.isWaitingCreate = !0,
            a.bindUser(e.userGroupId, e.selectedUsers).then(function(s) {
                n.alert("提示", "添加成功！"),
                e.selectedUsers = [],
                u()
            },
            function(e) {
                n.error("添加失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isWaitingCreate = !1
            })
        }
    }])
} (angular.module("domeApp"));