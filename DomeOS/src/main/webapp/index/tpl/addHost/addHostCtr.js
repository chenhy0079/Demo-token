﻿"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("AddHostCtr", ["$scope", "$state", "$stateParams", "$domeCluster", "$domeMonitor", "$domeGlobal", "dialog",
    function(e, t, s, r, o, n, a) {
        function i() {
            var t = ["curl -o "];
            "centos" == e.selectedOS ? t.push("start_node_centos.sh http://domeos-script.bjctc.scs.sohucs.com/start_node_centos.sh && sudo sh start_node_centos.sh") : t.push("start_node_ubuntu.sh http://domeos-script.bjctc.scs.sohucs.com/start_node_ubuntu.sh && sudo bash start_node_ubuntu.sh"),
            c.api_servers && t.push(" --api-server " + c.api_servers),
            c.cluster_dns && t.push(" --cluster-dns " + c.cluster_dns),
            c.cluster_domain && t.push(" --cluster-domain " + c.cluster_domain),
            c.monitor_transfer && t.push(" --monitor-transfer " + c.monitor_transfer),
            c.heartbeat_addr && t.push(" --heartbeat-addr " + c.heartbeat_addr),
            c.registry_type && t.push(" --registry-type " + c.registry_type),
            c.registry_arg && t.push(" --registry-arg " + c.registry_arg),
            c.insecure_registry_crt && t.push(" --insecure-registry-crt " + c.insecure_registry_crt),
            c.domeos_server && c.insecure_registry_crt && t.push(" --domeos-server " + c.domeos_server),
            c.etcd_server && t.push(" --etcd-server " + c.etcd_server),
            c.node_labels && t.push(" --node-labels " + c.node_labels),
            c.hostname_override && t.push(" --hostname-override " + c.hostname_override),
            e.hostCmd = t.join("")
        }
        e.$emit("pageTitle", {
            title: "添加主机",
            descrition: "请按照步骤操作，将您的主机添加到DomeOS上。",
            mod: "cluster"
        }),
        void 0 !== s.id && "" !== s.id || t.go("clusterManage"),
        e.parentState = 'clusterDetail({"id":' + s.id + "})",
        e.isLoading = !0,
        e.hostInfo = {
            labels: "",
            env: {
                test: !0,
                prod: !1
            }
        },
        e.selectedOS = "centos",
        e.hostname = "";
        var c = {},
        d = n.getGloabalInstance("registry"),
        u = n.getGloabalInstance("server"),
        l = r.getInstance("ClusterService");
        e.getCmdLabels = function() {
            for (var t = e.hostInfo.labels.split(" "), s = [], r = 0, o = t.length; r < o; r++)"" !== t[r] && s.push(t[r] + "=USER_LABEL_VALUE");
            e.hostInfo.env.test && s.push("TESTENV=HOSTENVTYPE"),
            e.hostInfo.env.prod && s.push("PRODENV=HOSTENVTYPE"),
            c.node_labels = s.join(","),
            i()
        },
        e.toggleOS = function(t) {
            e.selectedOS !== t && (e.selectedOS = t, i())
        },
        e.changeHostName = function() {
            c.hostname_override = e.hostname,
            i()
        },
        l.getData(s.id).then(function(t) {
            var s = t.data.result;
            c.api_servers = s.api,
            c.cluster_dns = s.dns,
            c.cluster_domain = s.domain,
            c.etcd_server = s.etcd,
            c.etcd_server && "," == c.etcd_server.slice( - 1) && (c.etcd_server = c.etcd_server.slice(0, -1)),
            e.getCmdLabels(),
            o.getMonitorInfo().then(function(e) {
                var t = e.data.result;
                t && (c.monitor_transfer = t.transfer, c.heartbeat_addr = t.hbs),
                i()
            }),
            d.getData().then(function(e) {
                1 === e.status ? (c.registry_type = "https", e.certification && (c.insecure_registry_crt = !0)) : c.registry_type = "http",
                e.url && (e.url = e.url.replace("http://", ""), e.url = e.url.replace("https://", "")),
                c.registry_arg = e.url,
                i()
            }),
            u.getData().then(function(e) {
                c.domeos_server = e.url,
                i()
            })
        },
        function() {
            a.error("警告", "请求失败！"),
            t.go("clusterManage")
        }).finally(function() {
            e.isLoading = !1
        })
    }])
} (angular.module("domeApp"));