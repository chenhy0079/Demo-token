﻿"use strict"; !
function(e) {
    e.controller("CreateLoadBalanceCollectionCtr", ["$scope", "$state", "api", "dialog",
    function(e, o, n, a) {
        var t = {
            type: "LOADBALANCER_COLLECTION",
            id: null
        };
        e.loadBalanceCollection = {},
        e.chosenUserList = [],
        e.loadBalanceCollectionTypeRadioList = [{
            value: "KUBE_PROXY",
            text: "kube_proxy"
        },
        {
            value: "NGINX",
            text: "nginx"
        }],
        e.createLoadBalanceCollectionSubmit = function() {
            n.loadBalance.collection.create(e.loadBalanceCollection).then(function(e) {
                t.id = e.id
            }).then(function() {
                n.memberCollection.addMany(t, e.chosenUserList).then(function() {
                    o.go("loadBalanceCollection")
                }).
                catch(function(e) {
                    a.error("添加用户失败！", e.message || "添加用户时发生错误")
                })
            }).
            catch(function(e) {
                a.error("新建错误！", e.message || "新建配置集合时发生错误")
            })
        }
    }])
} (angular.module("domeApp"));