﻿"use strict"; !
function(a) {
    a.controller("LoadBalanceInfoCtr", ["$scope", "$state", "api", "dialog", "$timeout",
    function(a, e, n, o, l) {
        a.loadBalanceCollectionId = e.params.id;
        var t = e.params.type;
        if (!a.loadBalanceCollectionId) return void e.go("loadBalanceCollection");
        var c = {
            KUBE_PROXY: [{
                text: "列表",
                page: "",
                html: "loadBalanceKubeProxyList.html"
            },
            {
                text: "成员",
                page: "users",
                lazy: !1,
                html: "loadBalanceCollectionUsers.html"
            }],
            NGINX: [{
                text: "列表",
                page: "",
                html: "loadBalanceNginxList.html"
            },
            {
                text: "成员",
                page: "users",
                lazy: !1,
                html: "loadBalanceCollectionUsers.html"
            }]
        };
        a.pageTabs = c[t],
        a.resourceType = "LOADBALANCER_COLLECTION",
        a.setRole = function(e) {
            a.$broadcast("loadBalanceCurrentRole", {
                role: e
            })
        },
        a.exitToList = function() {
            e.go("loadBalanceCollection")
        }
    }]),
    a.controller("LoadBalanceListCtr", ["$scope", "$state", "api", "$domePublic", "dialog",
    function(a, e, n, o, l) {
        function t() {
            a.isLoading = !0,
            n.loadBalance.loadBalance.list(a.loadBalanceCollectionId).then(function(e) {
                a.loadBalanceInfo.loadBalanceList = e || [],
                a.filterLoadBalanceList()
            }).
            catch(function() {}).then(function() {
                a.isLoading = !1
            })
        }
        a.loadBalanceCollectionId = e.params.id,
        a.loadBalanceCollectionId || e.go("loadBalanceCollection");
        var c = function() {
            a.noDeleteList = a.hasDeletePermission() ? [] : a.loadBalanceInfo.filteredLoadBalanceList,
            a.noEditList = a.hasUpdatePermission() ? [] : a.loadBalanceInfo.filteredLoadBalanceList
        };
        a.$on("loadBalanceCurrentRole",
        function(e, n) {
            a.currentRole = n.role,
            c()
        }),
        a.hasDeletePermission = function() {
            return "MASTER" === a.currentRole
        },
        a.hasUpdatePermission = function() {
            return "MASTER" === a.currentRole || "DEVELOPER" === a.currentRole
        },
        a.loadBalanceInfo = {
            loadBalanceList: [],
            filteredLoadBalanceList: [],
            searchKeyword: ""
        },
        a.filterLoadBalanceList = function() {
            a.loadBalanceInfo.filteredLoadBalanceList = a.loadBalanceInfo.loadBalanceList.filter(function(e) {
                return e.name.indexOf(a.loadBalanceInfo.searchKeyword) !== -1
            }),
            c()
        },
        t(),
        a.deleteLoadBalance = function(a) {
            l.danger("确认删除", "确认要删除吗？").then(function(a) {
                if (a !== l.button.BUTTON_OK) throw t(),
                ""
            }).then(function() {
                n.loadBalance.loadBalance.delete(a.id).then(function(a) {}).
                catch(function(a) {
                    l.error("删除错误", a.message || "删除时出现错误")
                }).then(function() {
                    t()
                })
            })
        },
        a.onSuccess = function(a, e) {
            l.tip("复制成功", e),
            a.clearSelection()
        },
        a.onError = function(a) {
            l.alert("复制失败", "")
        }
    }])
} (angular.module("domeApp"));