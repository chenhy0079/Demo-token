﻿"use strict"; !
function(n) {
    n.controller("ConfigMapCollectionCtr", ["$scope", "$state", "api", "dialog",
    function(n, o, t, i) {
        function c() {
            n.isLoading = !0,
            t.configMap.listConfigMapCollection().then(function(o) {
                n.configMapCollectionList = o
            }).
            catch(function() {}).then(function() {
                n.isLoading = !1
            })
        }
        c(),
        n.delete = function(n) {
            i.danger("确认删除", "确认要删除吗？").then(function(n) {
                if (n !== i.button.BUTTON_OK) throw ""
            }).then(function() {
                t.configMap.deleteConfigMapCollection(n).then(function() {
                    c()
                }).
                catch(function(n) {
                    i.error("删除失败！", n.message || "删除配置集合时发生错误")
                })
            })
        },
        n.saveModify = function(n) {
            t.configMap.updateConfigMapCollection(n).then(function(n) {}).
            catch(function(n) {
                i.error("修改失败", n.message || "修改配置集合时出现错误"),
                c()
            })
        },
        n.cancelModify = function() {
            c()
        }
    }])
} (angular.module("domeApp"));