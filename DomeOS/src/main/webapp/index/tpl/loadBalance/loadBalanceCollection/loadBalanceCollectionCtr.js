﻿"use strict"; !
function(n) {
    n.controller("LoadBalanceCollectionCtr", ["$scope", "$state", "api", "dialog",
    function(n, o, t, c) {
        function e() {
            n.isLoading = !0,
            t.loadBalance.collection.list().then(function(o) {
                n.loadBalanceCollectionList = o
            }).
            catch(function() {}).then(function() {
                n.isLoading = !1
            })
        }
        e(),
        n.delete = function(n) {
            c.danger("删除", "是否确认删除负载均衡：" + n.name).then(function(o) {
                o === c.button.BUTTON_OK && t.loadBalance.collection.delete(n.id).then(function() {}).
                catch(function(n) {
                    c.error("删除失败！", n.message || "删除负载均衡时发生错误")
                }).then(function() {
                    e()
                })
            })
        },
        n.saveModify = function(n) {
            t.loadBalance.collection.update(n).then(function() {}).
            catch(function(n) {
                c.error("修改失败！", n.message || "修改负载均衡时发生错误")
            }).then(function() {
                e()
            })
        },
        n.cancelModify = function() {
            e()
        }
    }])
} (angular.module("domeApp"));