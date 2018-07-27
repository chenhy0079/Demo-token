﻿"use strict"; !
function(e) {
    e.controller("publicImageDetailCtr", ["$scope", "$state", "api",
    function(e, l, o) {
        o.image.public.detail({
            name: l.params.name
        }).then(function(l) {
            e.image = l
        })
    }]),
    e.controller("publicImageDockerfileCtr", ["$scope", "api",
    function(e, l) {
        e.loading = !0,
        l.network(e.value.url).
        catch(function() {
            return null
        }).then(function(l) {
            e.value.dockerfile = l,
            e.loading = !1
        })
    }]),
    e.controller("publicImageDetailTagsCtr", ["$scope", "$state", "api", "dialog",
    function(e, l, o, n) {
        e.showDockerfile = function(e) {
            n.common({
                title: "查看dockerfile",
                buttons: n.buttons.BUTTON_OK_ONLY,
                value: {
                    url: e
                },
                controller: "publicImageDockerfileCtr",
                template: '\n            <codearea ng-show="!loading && value.dockerfile" language="dockerfile" ng-model="value.dockerfile" readonly="readonly" height="5,20"></codearea>\n            <div ng-show="!loading && !value.dockerfile">暂无相关dockerfile信息</div>\n          ',
                size: 600
            })
        }
    }])
} (angular.module("domeApp"));