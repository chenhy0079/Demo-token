"use strict"; !
function(n, t) {
    void 0 !== n && n.controller("SelectContainerModalCtr", ["$scope", "info", "$modalInstance",
    function(n, t, e) {
        n.containerList = t.containerList || [],
        n.hostIp = t.hostIp,
        n.resourceId = t.resourceId,
        n.type = t.type;
        for (var o = 0,
        i = n.containerList.length; o < i; o++) n.containerList[o].shortContainerId = n.containerList[o].containerId.substring(0, 12),
        n.containerList[o].pageContainer = n.containerList[o].shortContainerId + " (" + n.containerList[o].imageName + ")";
        n.toggleCurrentContainer = function(t) {
            n.currentContainer = n.containerList[t]
        },
        n.containerList[0] && n.toggleCurrentContainer(0),
        n.cancel = function() {
            e.dismiss("")
        }
    }])
} (angular.module("domeApp"));