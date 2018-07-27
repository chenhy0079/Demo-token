﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("CreateClusterCtr", ["$scope", "$domeUser", "$domeCluster", "dialog", "$state",
    function(e, t, r, n, s) {
        e.$emit("pageTitle", {
            title: "新建集群",
            descrition: "在这里您可以将一个部署好的Kubernetes集群添加到控制台进行管理。",
            mod: "cluster"
        }),
        e.clusterIns = r.getInstance("Cluster"),
        t.userService.getCurrentUser().then(function(t) {
            var r = t.data.result,
            n = {
                Id: r.id,
                name: r.username
            };
            e.clusterIns.toggleUser(n)
        }),
        e.config = e.clusterIns.config,
        e.createCluster = !0,
        e.valid = {
            needValid: !1
        };
        var a = r.getInstance("ClusterService");
        e.create = function() {
            var t = e.clusterIns.validItem("etcd"),
            r = e.clusterIns.validItem("kafka"),
            a = e.clusterIns.validItem("zookeeper");
            t && r && a && (e.isWaingCreate = !0, e.clusterIns.create().then(function() {
                n.alert("提示", "创建成功！"),
                s.go("clusterManage")
            },
            function(e) {
                n.error("创建失败", e.data.resultMsg)
            }).
            finally(function() {
                e.isWaingCreate = !1
            }))
        },
        a.getData().then(function(t) {
            e.clusterList = t.data.result || []
        })
    }])
} (angular.module("domeApp"));