﻿"use strict"; !
function(e) {
    e.controller("CreateDeploymentCtr", ["$scope", "$state", "api", "dialog",
    function(e, t, n, o) {
        function a() {
            var t = {
                TEST: {
                    name: "TESTENV",
                    content: "HOSTENVTYPE"
                },
                PROD: {
                    name: "PRODENV",
                    content: "HOSTENVTYPE"
                }
            },
            o = angular.copy(e.deploymentDraft.labelSelectors || []);
            return o = o.filter(function(e) {
                return "HOSTENVTYPE" !== e.content
            }).concat(t[e.deploymentDraft.hostEnv]),
            "CUSTOM" !== e.deploymentDraft.versionType && (o = o.filter(function(e) {
                return "USER_LABEL_VALUE" !== e.content
            })),
            n.cluster.hasNodeByLabels(e.deploymentDraft.cluster.id, o)
        }
        function r() {
            "CUSTOM" === e.deploymentDraft.versionType ? e.createDeploymentStep = "image": ["YAML", "JSON"].some(function(t) {
                return t === e.deploymentDraft.versionType
            }) ? (e.podStrUndoText = null, e.createDeploymentStep = "raw") : e.createDeploymentStep = "image"
        }
        function i() {
            n.image.privateRegistry.list().then(function(t) {
                e.imageSelectorList = (t || []).map(function(e) {
                    return {
                        text: e.name,
                        value: {
                            name: e.name,
                            registry: e.registry,
                            envSettings: e.envSettings
                        },
                        remark: e.registry
                    }
                })
            })
        }
        function l(t) {
            e.deploymentDraft.containerConsoles.push(angular.copy({
                name: t.name,
                registry: t.registry,
                cpu: .5,
                mem: 1024,
                tag: t.tag ? t.tag: null,
                oldEnv: t.envSettings || [],
                newEnv: [],
                healthChecker: {
                    type: "NONE",
                    failureThreshold: 3
                },
                readinessChecker: {
                    type: "NONE",
                    failureThreshold: 3,
                    successThreshold: 1
                },
                imagePullPolicy: "Always",
                autoDeploy: !1,
                logItemDrafts: [],
                volumeMountConsoles: [],
                configConsoles: [],
                args: [],
                commands: ""
            })),
            e.deploymentDraft.image = null
        }
        function s(t) {
            if (e.isLoadingDeployString = !0, !e.deploymentDraft.versionString.deploymentStrHead) {
                var o = {
                    YAML: '---\napiVersion: "v1"\nkind: ""\nmetadata:\n  labels: {}\n  name: "dmo-"\n  namespace: ""\nspec:\n  replicas: 0\n  template:\n    metadata:\n      annotations:\n        deployName: ""\n      deletionGracePeriodSeconds: 0\n      labels: {}\n    spec:\n',
                    JSON: '{\n  "apiVersion" : "v1",\n  "kind" : "",\n  "metadata" : {\n    "labels" : { },\n    "name" : "dmo-",\n    "namespace" : ""\n  },\n  "spec" : {\n    "replicas" : 0,\n    "template" : {\n      "metadata" : {\n        "annotations" : {\n          "deployName" : ""\n        },\n        "deletionGracePeriodSeconds" : 0,\n        "labels" : { }\n      }\n      "spec" : '
                };
                e.deploymentDraft.versionString.deploymentStrHead = o[e.deploymentDraft.versionType]
            }
            n.deployment.getDeploymentStr(t).then(function(t) {
                e.deploymentDraft.versionString = t || {}
            }).
            catch(function(e) {
                console.log("get deployment string exception: ", e)
            }).then(function() {
                e.isLoadingDeployString = !1
            })
        }
        var c = t.params.collectionId,
        m = t.params.collectionName;
        c && m || t.go("deployCollectionManage"),
        e.collectionName = m,
        e.collectionId = c,
        e.parentState = 'deployManage({id:"' + c + '",name:"' + m + '"})',
        e.createDeploymentStep = "common",
        e.deploymentDraft = {
            collectionId: c,
            creatorId: null,
            replicas: 3,
            loadBalanceDraft: {
                loadBalancerPorts: [{
                    targetPort: "",
                    port: ""
                }],
                sessionAffinity: !1,
                externalIPs: []
            },
            containerConsoles: [],
            versionString: {}
        },
        e.deploymentDefaultVisitMode = "noAccess",
        n.user.whoami().then(function(t) {
            e.deploymentDraft.creatorId = t.id
        }),
        e.cluster = {},
        e.deploymentAppEnvRadioList = [{
            value: "TEST",
            text: "测试环境"
        },
        {
            value: "PROD",
            text: "生产环境"
        }],
        e.deploymentTypeHelpText = function(e) {
            return {
                REPLICATIONCONTROLLER: "以replicas的形式保证pod的实例个数，部署的升级/回滚/扩容/缩容由DomeOS负责维护处理。",
                DAEMONSET: "DaemonSet保证所选的每个节点上且只有一个pod运行，部署的升级/回滚/扩容/缩容由k8s维护处理，这些操作不能中断，只能停止当前部署。",
                DEPLOYMENT: "Deployment是升级版的Replication Controller，它以replica set的形式维护pod的个数，部署的升级/回滚/扩容/缩容由k8s负责维护处理。"
            } [e]
        },
        e.deploymentTypeRadioList = [{
            value: "DEPLOYMENT",
            text: "Deployment（默认）"
        },
        {
            value: "REPLICATIONCONTROLLER",
            text: "ReplicationController"
        },
        {
            value: "DAEMONSET",
            text: "DaemonSet"
        }],
        e.deploymentVersionTypeRadioList = [{
            value: "CUSTOM",
            text: "默认类型"
        },
        {
            value: "YAML",
            text: "YAML"
        },
        {
            value: "JSON",
            text: "JSON"
        }],
        e.deploymentNetworkModeRadioList = [{
            value: "DEFAULT",
            text: "Overlay"
        },
        {
            value: "HOST",
            text: "Host"
        }],
        e.deploymentAccessTypeRadioList = [{
            value: "noAccess",
            text: "禁止访问"
        },
        {
            value: "internal",
            text: "对内服务"
        }],
        e.visitModeHelpText = {
            noAccess: "该部署不需要被其他应用发现时请选择禁止访问。",
            internal: "创建集群内可访问的虚拟IP实现多个实例的负载均衡。",
            foreign: "利用主机IP创建集群外访问的负载均衡。"
        },
        e.deploymentSessionAffinityRadioList = [{
            value: "false",
            text: "关闭(默认)"
        },
        {
            value: "true",
            text: "开启"
        }],
        e.updateDeploymentAccessType = function() {
            var t = e.deploymentDraft.networkMode;
            "DEFAULT" === t ? (e.deploymentVisitMode = "noAccess", e.deploymentAccessTypeRadioList = [{
                value: "noAccess",
                text: "禁止访问"
            },
            {
                value: "internal",
                text: "对内服务"
            }]) : "HOST" === t ? (e.deploymentVisitMode = "noAccess", e.deploymentAccessTypeRadioList = [{
                value: "noAccess",
                text: "禁止访问"
            },
            {
                value: "access",
                text: "允许访问"
            }]) : (e.deploymentVisitMode = "noAccess", e.deploymentAccessTypeRadioList = [{
                value: "noAccess",
                text: "禁止访问"
            },
            {
                value: "internal",
                text: "对内服务"
            }])
        },
        e.toggleVisitMode = function() {
            e.deploymentDraft.loadBalanceDraft = {
                loadBalancerPorts: [{
                    targetPort: "",
                    port: ""
                }],
                sessionAffinity: !1,
                externalIPs: []
            },
            e.listForeignServiceIP()
        },
        e.nodeIPListSelector = [],
        e.listForeignServiceIP = function() {
            "foreign" === e.deploymentDraft.visitMode && (e.deploymentDraft.loadBalanceDraft.externalIPs = null, e.isLoadingNodeIP = !0, n.cluster.listNodeList(e.deploymentDraft.cluster.id).then(function(t) {
                e.nodeIPListSelector = (t || []).filter(function(e) {
                    return "Ready" === e.status
                }).map(function(e) {
                    return {
                        value: e.ip,
                        text: e.ip,
                        remark: "主机：" + e.name + " 状态：" + e.status
                    }
                })
            }).
            catch(function() {}).then(function() {
                e.isLoadingNodeIP = !1
            }))
        },
        e.isDisplayInternalService = function() {
            return "internal" === e.deploymentVisitMode
        },
        e.isDisplayForeignService = function() {
            return "foreign" === e.deploymentVisitMode
        },
        e.isDisplayReplicas = function() {
            return "DAEMONSET" !== e.deploymentDraft.deploymentType
        },
        e.isDisplayLabelSelectors = function() {
            return "CUSTOM" === e.deploymentDraft.versionType
        },
        e.isDisplayNetworkMode = function() {
            return "CUSTOM" === e.deploymentDraft.versionType
        },
        e.cancel = function() {
            t.go("deployManage", {
                id: c,
                name: m
            })
        },
        e.commonNextStep = function() {
            a().then(function(t) {
                if (t) r();
                else {
                    var n = {
                        TEST: "测试环境",
                        PROD: "生产环境"
                    },
                    a = "",
                    i = "";
                    "CUSTOM" === e.deploymentDraft.versionType && (a = e.deploymentDraft.labelSelectors && 0 !== e.deploymentDraft.labelSelectors.length ? angular.copy(e.deploymentDraft.labelSelectors).map(function(e) {
                        return e.name
                    }) : "", i = e.deploymentDraft.labelSelectors && 0 !== e.deploymentDraft.labelSelectors.length ? "所选标签": "");
                    var l = '集群<span class="dome-heighten-text">' + e.deploymentDraft.cluster.name + '</span>在<span class="dome-heighten-text">' + n[e.deploymentDraft.hostEnv] + "</span>" + i + '<span class="dome-heighten-text">' + a + "</span>下没有主机，部署将无法正常启动，是否继续创建？";
                    o.
                    continue ("提示", l).then(function(e) {
                        e === o.button.BUTTON_OK && r()
                    })
                }
            }),
            "CUSTOM" === e.deploymentDraft.versionType ? i() : s(e.deploymentDraft)
        },
        e.copyFrom = {},
        e.doCopyFrom = function() {
            if (e.copyFrom.version) {
                e.copyFrom.isLoading = !0;
                n.deployment.version.getVersionById(e.copyFrom.version.deploy.id, e.copyFrom.version.id).then(function(t) {
                    e.deploymentDraft.containerConsoles = angular.copy(t.containerConsoles)
                }).
                catch(function() {}).then(function() {
                    return e.copyFrom.isLoading = !1
                })
            }
        },
        e.imagePullPolicyRadioList = [{
            value: "Always",
            text: "Always"
        },
        {
            value: "Never",
            text: "Never"
        },
        {
            value: "IfNotPresent",
            text: "If Not Present"
        }],
        e.imageHealthCheckerRadioList = e.imageReadinessCheckerRadioList = [{
            value: "NONE",
            text: "NONE"
        },
        {
            value: "TCP",
            text: "TCP检查"
        },
        {
            value: "HTTP",
            text: "HTTP检查"
        }],
        e.isDisplayChecker = function(e, t) {
            return "NONE" !== e[t].type
        },
        e.isDisplayCheckerUrl = function(e, t) {
            return "HTTP" === e[t].type
        },
        e.isDisplayCheckerStatusCode = function(e, t) {
            return "HTTP" === e[t].type
        },
        e.currentContainerDraft = {
            index: 0
        },
        e.addImage = function(e) {
            e && l(e)
        },
        e.addOtherImage = function() {
            var e = {
                name: "",
                registry: "",
                tag: ""
            };
            o.common({
                title: "添加其他镜像",
                buttons: o.buttons.BUTTON_OK_CANCEL,
                value: {
                    otherImage: e
                },
                template: '\n                    <form name="otherImageDialog" ng-class="{\'need-valid\':otherImageDialog.$submitted}">\n                        <form-container left-column-width="60px">\n                            <form-config-group>\n                                <form-config-item config-title="仓库地址" required="true">\n                                    <form-input-container>\n                                        <input type="text" name="registry" ng-model="value.otherImage.registry" required>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="镜像名称" required="true">\n                                    <form-input-container>\n                                        <input type="text" name="name" ng-model="value.otherImage.name" required>\n                                    </form-input-container>\n                                </form-config-item>\n                                <form-config-item config-title="镜像版本" required="true">\n                                    <form-input-container>\n                                        <input type="text" name="tag" ng-model="value.otherImage.tag" required>\n                                    </form-input-container>\n                                </form-config-item>\n                            </form-config-group>\n                        </form-container>\n                    </form>\n                    ',
                size: 540
            }).then(function(t) {
                if (t === o.button.BUTTON_OK) {
                    if (!e.name || !e.registry || !e.tag) return;
                    l(e)
                }
            })
        },
        e.versionTypeName = {
            YAML: "YAML配置",
            JSON: "JSON配置"
        },
        e.deploymentDraft.versionString = {},
        e.podStrUndoText = null;
        var p = {
            YAML: 'containers:\n- image: "pub.domeos.org/registry:2.3"\n  name: "test-container"\n  volumeMounts:\n  - mountPath: "/test-hostpath"\n    name: "test-volume"\nvolumes:\n- hostPath:\n    path: "/opt/scs"\n  name: "test-volume"\n',
            JSON: '{\n  "containers": [{\n    "image": "pub.domeos.org/registry:2.3",\n    "name": "test-container",\n    "volumeMounts": [{\n      "mountPath": "/test-hostpath",\n      "name": "test-volume"\n    }]\n  }],\n  "volumes": [{\n    "hostPath": {\n      "path": "/opt/scs"\n    },\n    "name": "test-volume"\n  }]\n}\n'
        };
        e.setPodStrToDefault = function() {
            e.podStrUndoText = e.deploymentDraft.versionString.podSpecStr || "",
            e.deploymentDraft.versionString.podSpecStr = p[e.deploymentDraft.versionType]
        },
        e.clearPodStrUndoText = function() {
            e.podStrUndoText = null
        },
        e.undoPodStrToDefault = function() {
            e.deploymentDraft.versionString.podSpecStr = e.podStrUndoText,
            e.podStrUndoText = null
        },
        e.imageLastStep = function() {
            e.createDeploymentStep = "common"
        },
        e.createDeployment = function() {
            e.isCreating = !0,
            n.deployment.create(e.deploymentDraft).then(function(n) {
                e.isCreating = !1,
                t.go("deployManage", {
                    id: c,
                    name: m
                })
            }).
            catch(function(t) {
                e.isCreating = !1,
                o.error("新建部署错误", t.message)
            }).then(function() {
                e.isCreating = !1
            })
        }
    }]),
    e.directive("isDeploymentUnique", ["api",
    function(e) {
        return {
            require: "ngModel",
            scope: {},
            link: function(t, n, o, a) {
                var r = [],
                i = o.namespace,
                l = o.clustername;
                e.deployment.list().then(function(e) {
                    r = e || []
                }).then(function() {
                    function e(e) {
                        var t = r.some(function(t) {
                            return t.clusterName === l && t.namespace === i && t.deployName === e
                        });
                        return a.$setValidity("isDeploymentUnique", !t),
                        e
                    }
                    t.$watch(function() {
                        return {
                            namespace: o.namespace,
                            clustername: o.clustername
                        }
                    },
                    function(t) {
                        i = t.namespace,
                        l = t.clustername,
                        e(a.$modelValue)
                    },
                    !0),
                    a.$parsers.unshift(e)
                })
            }
        }
    }]).directive("isNamespaceUnique", ["api",
    function(e) {
        return {
            require: "ngModel",
            scope: [],
            link: function(t, n, o, a) {
                var r = [];
                t.$watch(function() {
                    return o.clusterid
                },
                function(t) {
                    e.cluster.getNamespace(t).then(function(e) {
                        r = e || []
                    })
                }),
                a.$parsers.unshift(function(e) {
                    var t = r.every(function(t) {
                        return t.name !== e
                    });
                    return a.$setValidity("isNamespaceUnique", t),
                    e
                })
            }
        }
    }])
} (angular.module("domeApp"));