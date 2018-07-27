﻿"use strict";
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0,
        n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
    return Array.from(e)
} !
function(e) {
    var t = function() {
        var e = Date.now(),
        t = function() {
            return Math.random().toString(36)[4] || "0"
        };
        return function() {
            var n = [].concat(_toConsumableArray(Array(8))).map(t).join("").toUpperCase();
            return "AUTO_GENERATED_INDEX_" + ++e + "_" + n
        }
    } ();
    e.component("lbRelatedDeploymentWithPort", {
        template: '\n        <form-input-container>\n          <form-multiple-inline>\n          <form-multiple-inline-item style="flex: 3; margin: 0 6px 0 0;">\n            <form-select-list ng-model="$ctrl.ngModel.deployment" name="_NginxRelatedDeployment{{$ctrl.order}}" on-change="$ctrl.toggleDeployment($ctrl.ngModel.deployment)" form-name="$ctrl.formName"  parameters="$ctrl.parameters" loading-text="正在获取部署信息" empty-text="无相关信息" placeholder="请选择部署" get-list-fn="{{\'loadBalanceDeployment\'}}" error-message="关联部署不能为空" fallback-options="{value:{deployId:$ctrl.ngModel.deployment.deployId,deployName:$ctrl.ngModel.deployment.deployName,deployStatus:$ctrl.ngModel.deployment.deployStatus,innerServiceName:$ctrl.ngModel.serviceName,ports:[$ctrl.ngModel.servicePort]},text:$ctrl.ngModel.deployment.deployName,match:{deployName:$ctrl.ngModel.deployment.deployName}}"></form-select-list>\n          </form-multiple-inline-item>\n          <form-multiple-inline-item" style="flex: 1;margin: 0 6px 0 0;">\n            <form-select ng-model="$ctrl.value" name="_ServicePort{{$ctrl.order}}" options="$ctrl.deploymentPortSelectorList" show-search-input="never" placeholder="请选择服务端口" empty-text="无相关信息" required="true" on-change="$ctrl.togglePort()"></form-select>\n            <form-error-message form="$ctrl.formName" target="_ServicePort{{$ctrl.order}}" type="required">服务端口不能为空</form-error-message>\n          </form-multiple-inline-item>\n          </form-multiple-inline>\n        <form-input-container>\n      ',
        bindings: {
            ngModel: "=",
            parameters: "<?",
            formName: "<?",
            order: "<?"
        },
        controller: ["$scope", "api",
        function(e, n) {
            var o = this;
            o.order = t(),
            o.input = function() {
                if (!o.ngModel || !o.ngModel.deployment) return o.value = null,
                o.deploymentPortSelectorList = [],
                void o.output();
                o.ngModel.deployment.ports && o.ngModel.deployment.ports.length && (o.deploymentPortSelectorList = o.ngModel.deployment.ports.map(function(e) {
                    return {
                        value: e,
                        text: e
                    }
                }), o.deploymentPortSelectorList.some(function(e) {
                    return o.ngModel.servicePort === e.text && (o.value = e.value, !0)
                }) || (o.value = null), o.output())
            },
            o.output = function() {
                angular.equals(o.ngModel.servicePort, o.value) || (o.ngModel.servicePort = o.value)
            },
            o.toggleDeployment = function(e) { (e || e.ports) && (o.deploymentPortSelectorList = (angular.copy(e.ports) || []).map(function(e) {
                    return {
                        value: e,
                        text: e
                    }
                }), o.input())
            },
            o.togglePort = function() {
                o.output()
            },
            e.$watchCollection("$ctrl.ngModel.deployment", o.input)
        }]
    }),
    e.component("lbNginxRule", {
        template: '\n      <div class="form-array-item" style="border: 1px solid #ddd; border-radius: 3px; margin-bottom: 10px; padding-left: 10px;" ng-repeat="rule in $ctrl.ngModel">\n        <div class="form-array-item-delete" ng-click="$ctrl.deleteRule($index)" ng-if="$ctrl.ngModel.length > 0">\n          <icon-close class="form-array-item-delete-icon"></icon-close>\n        </div>\n        <form-config-group>\n          <form-config-item config-title="服务域名">\n            <form-input-container>\n              <input type="text" ng-model="rule.domain" required/>\n            </form-input-container>\n          </form-config-item>\n            <form-config-item config-title="关联部署">\n                <lb-related-deployment-with-port ng-model="rule" order="$index" form-name="$ctrl.formName" parameters="$ctrl.parameters">\n                </lb-related-deployment-with-port>\n            </form-config-item>\n        </form-config-group>\n      </div>\n      <a class="txt-bright"  ng-click="$ctrl.addRule()">\n        <icon-plus></icon-plus>\n        <span>添加新规则</span>\n      </a> \n    ',
        bindings: {
            ngModel: "=",
            parameters: "<?",
            formName: "<?",
            index: "<?"
        },
        controller: ["$scope", "api",
        function(e, t) {
            var n = this;
            n.addRule = function() {
                n.ngModel.push({
                    domain: null,
                    deployment: null,
                    serviceName: null,
                    servicePort: null
                })
            },
            n.deleteRule = function(e) {
                n.ngModel.splice(e, 1)
            }
        }]
    })
} (angular.module("formInputs"));