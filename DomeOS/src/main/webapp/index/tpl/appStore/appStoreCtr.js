﻿"use strict"; !
function(t, e) {
    void 0 !== t && t.controller("AppStoreCtr", ["$scope", "$domeAppStore",
    function(t, e) {
        t.$emit("pageTitle", {
            title: "欢迎来到应用商店！",
            descrition: "在这里您可以选择需要的应用并快速部署。部署后请到部署模块查询您的应用。",
            mod: "appStore"
        }),
        e.getStoreApps().then(function(e) {
            t.appList = e.data || []
        })
    }])
} (angular.module("domeApp"));