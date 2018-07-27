﻿"use strict"; !
function(n) {
    n.controller("CreateConfigMapCollectionCtr", ["$scope", "api", "dialog", "$state",
    function(n, i, o, e) {
        var t = {
            type: "CONFIGURATION_COLLECTION",
            id: null
        };
        n.chosenUserList = [],
        n.configMapCollection = {},
        n.createConfigMapSubmit = function() {
            i.configMap.createConfigMapCollection(n.configMapCollection).then(function(n) {
                t.id = n.id
            }).then(function() {
                i.memberCollection.addMany(t, n.chosenUserList).then(function() {
                    e.go("configMapCollection")
                },
                function(n) {
                    o.error("添加用户失败！", n.message || "添加用户时发生错误")
                })
            }).
            catch(function(n) {
                o.error("新建错误！", n.message || "新建配置集合时发生错误")
            })
        }
    }]),
    n.directive("isConfigCollectionUnique", ["api",
    function(n) {
        return {
            require: "ngModel",
            scope: [],
            link: function(i, o, e, t) {
                var c = [];
                i.$watch(function(n) {
                    return n
                },
                function(i) {
                    n.configMap.listConfigMapCollection().then(function(n) {
                        c = n || []
                    })
                }),
                t.$parsers.unshift(function(n) {
                    var i = c.every(function(i) {
                        return i.name !== n
                    });
                    return t.$setValidity("isConfigCollectionUnique", i),
                    n
                })
            }
        }
    }])
} (angular.module("domeApp"));