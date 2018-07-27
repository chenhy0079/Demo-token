﻿"use strict"; !
function(n) {
    n.controller("ConfigMapDetailCtr", ["$scope", "$state", "api", "dialog",
    function(n, i, e, t) {
        var o = i.params.id,
        l = i.params.configMapId;
        o ? l || i.go("configMapCollectionDetail", {
            id: o
        }) : i.go("configMapCollection");
        var a = {
            id: o,
            type: "CONFIGURATION_COLLECTION"
        };
        e.user.myRole(a).then(function(i) {
            n.hasDeletePermission = function() {
                return "MASTER" === i
            },
            n.$broadcast("configMapCurrentRole", {
                role: i
            })
        }),
        function() {
            e.configMap.getConfigMapCollectionById(o).then(function(i) {
                n.configMapCollectionInfo = i
            })
        } (),
        n.delete = function() {
            t.danger("确认删除", "确认要删除吗？").then(function(n) {
                if (n !== t.button.BUTTON_OK) throw ""
            }).then(function() {
                e.configMap.deleteConfigMapCollection(o).then(function() {
                    i.go("configMapCollection")
                }).
                catch(function(n) {
                    t.error("删除失败！", n.message || "删除配置集合时发生错误")
                })
            })
        }
    }]),
    n.controller("ConfigMapDetailInfoCtr", ["$scope", "$state", "api", "dialog",
    function(n, i, e, t) {
        function o() {
            n.isLoading = !0,
            e.configMap.getConfigMap(a).then(function(i) {
                n.configMapDetailInfo = i || {}
            },
            function(n) {
                console.error(n.message)
            }).then(function() {
                n.isLoading = !1
            })
        }
        n.$on("configMapCurrentRole",
        function(i, e) {
            n.currentRole = e.role
        });
        var l = i.params.id,
        a = i.params.configMapId;
        n.isEditConfigMap = !1,
        n.configMapDetailInfo = {},
        n.$on("configMapCurrentRole",
        function(i, e) {
            n.currentRole = e.role
        }),
        n.hasDeletePermission = function() {
            return "MASTER" === n.currentRole
        },
        n.hasPostPermission = function() {
            return "MASTER" === n.currentRole || "DEVELOPER" === n.currentRole
        },
        o(),
        n.updateConfigMap = function() {
            n.configMapDetailInfo.configFileList.every(function(n) {
                return n && n.name && n.content
            }) ? (n.isUpdating = !0, e.configMap.updateConfigMap(l, n.configMapDetailInfo).then(function() {
                n.toggleEdit(),
                o()
            }).
            catch(function(n) {
                t.error("修改失败！", n.message || "修改配置信息时出现错误")
            }).then(function() {
                n.isUpdating = !1
            })) : t.error("", "请填写文件名称和文件内容，并检查填写内容的格式")
        },
        n.toggleEdit = function(i) {
            n.isEditConfigMap = !n.isEditConfigMap,
            "cancel" === i && (n.isEditConfigMap = !1),
            n.isEditConfigMap && o()
        }
    }])
} (angular.module("domeApp")),
function(n) {
    n.component("multipleConfigFileRead", {
        template: '\n            <form-array-container\n                type="complex"\n                ng-model="$ctrl.configFileList"\n                max-length="$ctrl.configFileList.length"\n                min-length="$ctrl.configFileList.length"\n                template="configFileRead.html"\n            ></form-array-container>\n            <script type="text/ng-template" id="configFileRead.html">\n                <form-multiple-inline>\n                    <form-multiple-inline-item class="config-file-container config-file-id-container">\n                        <span ng-bind="$index + 1"></span>\n                    </form-multiple-inline-item>\n                    <form-multiple-inline-item class="config-file-container">\n                        <div>\n                            <span>文件名称</span>\n                            <input type="text" name="fileName{{$index}}" ng-model="$ctrl.ngModel[$index].name" readonly/>\n                        </div>\n                        <div>\n                            <span>文件内容</span>\n                            <codearea ng-model="$ctrl.ngModel[$index].content" height="10,50" readonly="true"></codearea>\n                        </div>\n                    </form-multiple-inline-item>\n                </form-multiple-inline>\n            </script>\n        ',
        bindings: {
            configFileList: "="
        },
        controller: function() {}
    }),
    n.component("multipleConfigFileWrite", {
        template: '\n            <form-array-container\n                type="complex" \n                ng-model="$ctrl.configFileList" \n                max-length="100" \n                min-length="1" \n                template="configFileWrite.html"\n            ></form-array-container>\n            <script type="text/ng-template" id="configFileWrite.html">\n                <form-multiple-inline>\n                    <form-multiple-inline-item class="config-file-container config-file-id-container">\n                        <span ng-bind="$index + 1"></span>\n                    </form-multiple-inline-item>\n                    <form-multiple-inline-item class="config-file-container">\n                        <div>\n                            <span>文件名称</span>\n                            <input type="text" name="fileName{{$index}}" ng-model="$ctrl.ngModel[$index].name" placeholder="请输入文件名" required/>\n                        </div>\n                        <div>\n                            <span>文件内容</span>\n                            <codearea ng-model="$ctrl.ngModel[$index].content" height="10,50" required></codearea>\n                        </div>\n                    </form-multiple-inline-item>\n                </form-multiple-inline>\n            </script>\n        ',
        bindings: {
            configFileList: "="
        }
    })
} (angular.module("formInputs"));