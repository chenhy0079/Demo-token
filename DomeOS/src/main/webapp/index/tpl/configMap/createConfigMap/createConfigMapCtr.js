﻿"use strict"; !
function(n) {
    n.controller("CreateConfigMapCtr", ["$scope", "$state", "api", "dialog",
    function(n, e, i, t) {
        var a = e.params.id;
        a || e.go("configMapCollection"),
        n.configMap = {},
        function() {
            n.isLoadingCluster = !0,
            i.cluster.listCluster().then(function(e) {
                var i = e || [];
                i.length > 0 && (n.configMap.clusterId = i[0].id),
                n.clusterOption = [],
                i.map(function(e) {
                    n.clusterOption.push({
                        text: e.name,
                        value: e.id
                    })
                })
            }).
            catch(function() {}).then(function() {
                n.isLoadingCluster = !1
            })
        } (),
        n.initNamespace = function(e) {
            n.configMap.namespace = null,
            i.cluster.getNamespace(e).then(function(e) {
                var i = e || [];
                n.namespaceOption = [],
                i.map(function(e) {
                    "default" === e.name && (n.configMap.namespace = e.name),
                    n.namespaceOption.push({
                        text: e.name,
                        value: e.name
                    })
                }),
                null == n.configMap.namespace && (n.configMap.namespace = i[0].name)
            })
        },
        n.cancel = function() {
            e.go("configMapCollectionDetail", {
                id: a
            })
        },
        n.createConfigMapSubmit = function() {
            i.configMap.createConfigMap(a, n.configMap).then(function() {
                e.go("configMapCollectionDetail", {
                    id: a
                })
            }).
            catch(function(n) {
                t.error("新建错误！", n.message || "新建配置时发生错误")
            })
        }
    }]),
    n.directive("isConfigmapUnique", ["api",
    function(n) {
        return {
            require: "ngModel",
            scope: [],
            link: function(e, i, t, a) {
                var o = [];
                e.$watch(function(n) {
                    return n
                },
                function(e) {
                    n.configMap.listConfigMapAll().then(function(n) {
                        o = n || []
                    })
                }),
                a.$parsers.unshift(function(n) {
                    var e = o.every(function(e) {
                        return e.name !== n
                    });
                    return a.$setValidity("isConfigmapUnique", e),
                    n
                })
            }
        }
    }])
} (angular.module("domeApp")),
function(n) {
    n.component("multipleConfigFiles", {
        template: '\n            <form-array-container\n                type="complex" \n                ng-model="$ctrl.configFileList" \n                max-length="100" \n                min-length="1" \n                template="configFile.html"\n            ></form-array-container>\n            <script type="text/ng-template" id="configFile.html">\n                <form-multiple-inline>\n                    <form-multiple-inline-item class="config-file-container config-file-id-container">\n                        <span ng-bind="$index + 1"></span>\n                    </form-multiple-inline-item>\n                    <form-multiple-inline-item class="config-file-container">\n                        <div>\n                            <span>文件名称</span>\n                            <input type="text" name="fileName{{$index}}" ng-model="$ctrl.ngModel[$index].name" placeholder="请输入文件名" required/>\n                        </div>\n                        <div>\n                            <span>文件内容</span>\n                            <codearea ng-model="$ctrl.ngModel[$index].content" height="10,50" required></codearea>\n                        </div>\n                    </form-multiple-inline-item>\n                </form-multiple-inline>\n            </script>\n        ',
        bindings: {
            configFileList: "="
        }
    })
} (angular.module("formInputs"));