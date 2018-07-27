﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("ClusterManageCtr", ["$scope", "$domeCluster",
    function(e, t) {
        e.$emit("pageTitle", {
            title: "集群管理",
            descrition: "在这里您可以查看和管理自己的物理集群，并随时添加主机到集群中。",
            mod: "cluster"
        }),
        e.isLoading = !0;
        var n = t.getInstance("ClusterService"),
        i = t.getInstance("NodeService");
        n.getData().then(function(t) {
            e.clusterList = t.data.result || []
        }).
        finally(function() {
            e.isLoading = !1
        }),
        e.deleteCluster = function(t) {
            i.deleteData(t).then(function() {
                for (var n = 0; n < e.clusterList.length; n++) e.clusterList[n].id === t && e.clusterList.splice(n, 1);
                $state.go("clusterManage")
            })
        }
    }])
} (angular.module("domeApp"));