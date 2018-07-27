﻿"use strict"; !
function(e) {
    e.controller("CreateKubeLoadBalanceCtr", ["$scope", "$state", "api", "dialog",
    function(e, n, o, t) {
        var a = n.params.id;
        e.collectionId = a,
        e.type = "KUBE_PROXY",
        e.loadBalanceCollectionId && n.go("loadBalanceInfo", {
            id: a,
            type: "KUBE_PROXY"
        });
        e.loadBalanceDraft = {
            collectionId: a,
            type: "EXTERNAL_SERVICE",
            serviceDraft: {
                sessionAffinity: !1,
                lbPorts: [{
                    port: null,
                    targetPort: null,
                    protocol: "TCP"
                }]
            }
        },
        e.addPortSetting = function() {
            e.loadBalanceDraft.serviceDraft.lbPorts.push({
                port: null,
                targetPort: null,
                protocol: "TCP"
            }),
            e.loadBalanceDraft.serviceDraft.lbPorts = e.loadBalanceDraft.serviceDraft.lbPorts.filter(function(e) {
                return void 0 !== e
            })
        },
        e.cancel = function() {
            n.go("loadBalanceInfo", {
                id: a,
                type: "KUBE_PROXY"
            })
        },
        e.createKubeLoadBalance = function() {
            e.isCreating = !0,
            o.loadBalance.loadBalance.create(e.loadBalanceDraft).then(function() {
                n.go("loadBalanceInfo", {
                    id: a,
                    type: "KUBE_PROXY"
                })
            }).
            catch(function(e) {
                t.error("新建失败", e.message)
            }).then(function() {
                e.isCreating = !1
            })
        }
    }]),
    e.controller("CreateNginxLoadBalanceCtr", ["$scope", "$state", "api", "dialog",
    function(e, n, o, t) {
        var a = n.params.id;
        e.collectionId = a,
        e.type = "NGINX";
        e.loadBalanceCollectionId && n.go("loadBalanceInfo", {
            id: a,
            type: "NGINX"
        }),
        e.loadBalanceDraft = {
            collectionId: a,
            type: "NGINX",
            nginxDraft: {
                registry: "https://pub.domeos.org",
                image: "domeos/nginx-controller",
                tag: "1.0",
                cpu: .5,
                mem: 1024,
                volumeConsole: {
                    volumeType: "EMPTYDIR"
                },
                rules: []
            }
        },
        e.logStoragePrompt = {
            HOSTPATH: "该类别会将主机目录挂载到nginx容器内部，nginx实例调度后存在于主机目录的日志文件不会丢失",
            EMPTYDIR: "nginx的日志会打到容器的控制台，nginx实例调度时，日志会丢失"
        },
        e.userDefinedImage = function() {
            var n = {
                name: "",
                registry: "",
                tag: ""
            };
            t.common({
                title: "修改定制镜像",
                buttons: t.buttons.BUTTON_OK_CANCEL,
                value: {
                    otherImage: n
                },
                template: '\n          <form-container left-column-width="60px">\n            <form-config-group>\n              <form-help-line>\n                <icon-info></icon-info><span>DomeOS提供了默认镜像，如果有特殊需求，可以根据文档说明，定制自己的nginx镜像。</span>\n              </form-help-line>\n              <form-config-item config-title="仓库地址" required="true">\n                <form-input-container>\n                    <input type="text" name="registry" ng-model="value.otherImage.registry" required>\n                    <form-error-message form="otherImageDialog" target="registry" type="required">请填写仓库地址</form-error-message>\n                </form-input-container>\n              </form-config-item>\n              <form-config-item config-title="镜像名称" required="true">\n                <form-input-container>\n                    <input type="text" name="name" ng-model="value.otherImage.name" required>\n                    <form-error-message form="otherImageDialog" target="name" type="required">请填写镜像名称</form-error-message>\n                </form-input-container>\n              </form-config-item>\n              <form-config-item config-title="镜像版本" required="true">\n                <form-input-container>\n                    <input type="text" name="tag" ng-model="value.otherImage.tag" required>\n                    <form-error-message form="otherImageDialog" target="tag" type="required">请填写镜像版本</form-error-message>\n                </form-input-container>\n              </form-config-item>\n            </form-config-group>\n            </form-container>\n          ',
                size: 540,
                form: "otherImageDialog"
            }).then(function(o) {
                if (o === t.button.BUTTON_OK) {
                    if (!n.name || !n.registry || !n.tag) return;
                    e.isUserDefined = !0,
                    e.loadBalanceDraft.nginxDraft.registry = n.registry,
                    e.loadBalanceDraft.nginxDraft.image = n.name,
                    e.loadBalanceDraft.nginxDraft.tag = n.tag
                }
            })
        },
        e.cancel = function() {
            n.go("loadBalanceInfo", {
                id: a,
                type: "NGINX"
            })
        },
        e.createNginxLoadBalance = function() {
            e.isCreating = !0,
            o.loadBalance.loadBalance.create(e.loadBalanceDraft).then(function() {
                n.go("loadBalanceInfo", {
                    id: a,
                    type: "NGINX"
                })
            }).
            catch(function(e) {
                t.error("新建失败", e.message)
            }).then(function() {
                e.isCreating = !1
            })
        }
    }])
} (angular.module("domeApp"));