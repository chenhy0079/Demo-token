﻿"use strict"; !
function(n) {
    n.controller("ConfigMapCollectionDetailCtr", ["$scope", "$state", "api", "dialog",
    function(n, o, e, i) {
        n.configMapCollectionId = o.params.id,
        n.configMapCollectionId || o.go("configMapCollection"),
        n.resourceType = "CONFIGURATION_COLLECTION",
        n.setRole = function(o) {
            n.hasDeletePermission = function() {
                return "MASTER" === o
            },
            n.$broadcast("configMapCurrentRole", {
                role: o
            })
        },
        n.exitToList = function() {
            o.go("configMapCollection")
        },
        function() {
            e.configMap.getConfigMapCollectionById(n.configMapCollectionId).then(function(e) {
                n.configMapCollectionInfo = e,
                null == e && o.go("configMapCollection")
            }).
            catch(function(n) {
                o.go("configMapCollection"),
                console.log("get config map error:", n)
            })
        } (),
        n.delete = function() {
            i.danger("确认删除", "确认要删除吗？").then(function(n) {
                if (n !== i.button.BUTTON_OK) throw ""
            }).then(function() {
                e.configMap.deleteConfigMapCollection(n.configMapCollectionId).then(function() {
                    o.go("configMapCollection")
                }).
                catch(function(n) {
                    i.error("删除失败！", n.message || "删除配置集合时发生错误")
                })
            })
        }
    }]),
    n.controller("ConfigMapListCtr", ["$scope", "$state", "api", "dialog",
    function(n, o, e, i) {
        function t() {
            n.isLoading = !0,
            e.configMap.listConfigMap(n.configMapCollectionId).then(function(o) {
                n.configMapInfo.configMapList = o || [],
                n.filterConfigMapList()
            }).
            catch(function() {}).then(function() {
                n.isLoading = !1
            })
        }
        n.configMapCollectionId = o.params.id,
        n.configMapCollectionId || o.go("configMapCollection");
        var l = function() {
            n.noDeleteList = n.hasDeletePermission() ? [] : n.configMapInfo.filteredConfigMapList
        };
        n.$on("configMapCurrentRole",
        function(o, e) {
            n.currentRole = e.role,
            l()
        }),
        n.hasDeletePermission = function() {
            return "MASTER" === n.currentRole
        },
        n.configMapInfo = {
            configMapList: [],
            filteredConfigMapList: [],
            searchKeyword: ""
        },
        n.filterConfigMapList = function() {
            n.configMapInfo.filteredConfigMapList = n.configMapInfo.configMapList.filter(function(o) {
                return o.name.indexOf(n.configMapInfo.searchKeyword) !== -1
            }),
            l()
        },
        t(),
        n.listRelatedDeploy = function(n) {
            i.common({
                title: "查看关联部署",
                buttons: i.buttons.BUTTON_OK_ONLY,
                value: {
                    configMapId: n.id
                },
                controller: "ListRelatedDeployCtr",
                template: "\n                <form>\n                    <form-container>\n                        <form-table\n                            ng-model=\"configMapRelatedDeployList\"\n                            template=\"relatedDeployListTable\"\n                            columns=\"[\n                                { text: '服务名称', key: 'deployCollectionName', width: '25%' },\n                                { text: '部署名称', key: 'deployName', width: '25%' },\n                                { text: '服务版本', key: 'versionIdInDeploy', width: '25%' },\n                                { text: '创建时间', key: 'deployCreateTime', width: '25%' },\n                            ]\"\n                            empty-text=\"{{ isLoading ? '正在获取配置列表，请稍候' : '无关联部署信息'}}\"\n                            param=\"{ showDeploy: showDeploy }\"\n                        ></form-table>\n                    <form-container>\n                </form>\n                <script type=\"text/ng-template\" id=\"relatedDeployListTable\">\n                    <div ng-if=\"column.key === 'deployCollectionName'\" ng-bind=\"value\"></div>\n                    <div ng-if=\"column.key === 'deployName'\">\n                        <a class=\"ui-table-link\" ng-click=\"param.showDeploy(row)\" ng-bind=\"value\"></a>\n                    </div>\n                    <div ng-if=\"column.key === 'versionIdInDeploy'\" ng-bind=\"'version'+value\"></div>\n                    <div ng-if=\"column.key === 'deployCreateTime'\" ng-bind=\"value | date:'yyyy-MM-dd' \"></div>\n                </script>\n                ",
                size: 600
            })
        },
        n.deleteConfigMap = function(n) {
            i.danger("确认删除", "确认要删除吗？").then(function(n) {
                if (n !== i.button.BUTTON_OK) throw ""
            }).then(function() {
                e.configMap.deleteConfigMap(n.id).then(function() {
                    t()
                }).
                catch(function(n) {
                    i.error("删除失败", n.message || "删除配置文件时出现错误")
                })
            },
            function() {
                t()
            })
        }
    }]),
    n.controller("ListRelatedDeployCtr", ["$scope", "api", "$state", "$window",
    function(n, o, e, i) {
        o.configMap.listRelatedDeploy(n.value.configMapId).then(function(o) {
            n.configMapRelatedDeployList = o || []
        }),
        n.showDeploy = function(o) {
            n.close(),
            e.go("deployDetail", {
                id: o.deployId,
                collectionId: o.deployCollectionId,
                collectionName: o.deployCollectionName
            }),
            i.refreshMenu = Date.now().toString() + Math.random()
        }
    }])
} (angular.module("domeApp"));