﻿"use strict"; !
function(t, e) {
    function r(t, e, r, c) {
        var s = this;
        r.projectService.previewDockerfile(e._formartProject()).then(function(t) {
            200 == t.data.resultCode ? s.dockerfileTxt = t.data.result ? c.trustAsHtml(t.data.result.replace(/[\n\r]/g, "<br/>")) : c.trustAsHtml("无数据！") : s.dockerfileTxt = c.trustAsHtml('<h4 class="txt-error">请求失败！</h4><p class="txt-error">错误信息：' + t.data.resultMsg + "</p>")
        },
        function() {
            s.dockerfileTxt = c.trustAsHtml('<p class="txt-error">请求失败！</p>')
        }),
        s.cancel = function() {
            t.dismiss("cancel")
        }
    }
    t.controller("DockerfileModalCtr", r),
    r.$inject = ["$modalInstance", "project", "$domeProject", "$sce"]
} (angular.module("domeApp"));