"use strict"; !
function(n, e) {
    void 0 !== n && n.controller("InstanceLogModalCtr", ["$scope", "instanceInfo", "$location", "$modalInstance",
    function(n, e, o, a) {
        var t = location.protocol.replace("http", "ws") + "//" + o.host();
        o.port() && (t += ":" + o.port()),
        e.containers || (e.containers = []);
        for (var c = 0,
        i = e.containers.length; c < i; c++) {
            var r = encodeURIComponent(t + "/api/deploy/instance/log/realtime/websocket?clusterid=" + e.clusterId + "&namespace=" + e.namespace + "&instancename=" + e.instanceName + "&containername=" + e.containers[c].containerName);
            e.containers[c].pageTxt = e.containers[c].containerId.substring(0, 12) + "(" + e.containers[c].imageName + ")",
            e.containers[c].href = "/log/log.html?url=" + r
        }
        n.instanceInfo = e,
        n.cancel = function() {
            a.dismiss("cancel")
        }
    }])
} (angular.module("domeApp"));