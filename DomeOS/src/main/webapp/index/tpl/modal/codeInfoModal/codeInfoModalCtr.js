"use strict"; !
function(o, c) {
    function n(o, c, n, t) {
        var e = this;
        e.showForm = t,
        e.project = angular.copy(n),
        o.close = function() {
            c.dismiss("cancel")
        },
        o.toModify = function() {
            c.close(e.project)
        }
    }
    void 0 !== o && (o.controller("CodeInfoModalCtr", n), n.$inject = ["$scope", "$modalInstance", "project", "showForm"])
} (angular.module("domeApp"));