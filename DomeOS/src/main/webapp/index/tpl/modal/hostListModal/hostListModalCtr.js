"use strict"; !
function(t, o) {
    void 0 !== t && t.controller("HostListModalCtr", ["$scope", "hostList", "$modalInstance", "filterFilter",
    function(t, o, i, l) {
        t.hostList = l(o, {
            labelFilter: !0
        }),
        t.cancel = function() {
            i.dismiss("cancel")
        }
    }])
} (angular.module("domeApp"));