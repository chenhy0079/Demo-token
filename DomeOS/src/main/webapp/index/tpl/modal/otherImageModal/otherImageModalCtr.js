"use strict"; !
function(n, e) {
    void 0 !== n && n.controller("OtherImageModalCtr", ["$scope", "$modalInstance",
    function(n, e) {
        n.imageInfo = {
            name: "",
            tag: "",
            registry: ""
        },
        n.submitImage = function() {
            e.close(n.imageInfo)
        },
        n.cancel = function() {
            e.dismiss("cancel")
        }
    }])
} (angular.module("domeApp"));