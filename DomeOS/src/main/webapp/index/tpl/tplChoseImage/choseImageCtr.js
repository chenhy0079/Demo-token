"use strict"; !
function(e, a) {
    void 0 !== e && e.controller("choseImageCtr", ["$scope", "$modalInstance", "$modal", "$domeProject", "$domeImage", "$domeData", "dialog", "$state",
    function(e, a, o, n, t, c, i, s) {
        e.loading = !0,
        e.key = {
            searchKey: ""
        },
        e.imageList = [],
        t.imageService.getBaseImages().then(function(a) {
            e.imageList = a.data.result
        }).
        finally(function() {
            e.loading = !1
        }),
        e.cancel = function() {
            a.dismiss("cancel")
        },
        e.choseImage = function(e) {
            a.close(e)
        }
    }])
} (angular.module("domeApp"));