"use strict"; !
function(e, c) {
    function t(e, c, t, n) {
        var a = this;
        a.check = "Branch",
        a.branchKey = "",
        n ? (c.projectService.getBranches(n).then(function(e) {
            a.branches = e.data.result || []
        }), c.projectService.getTags(n).then(function(e) {
            a.tags = e.data.result || []
        })) : (c.projectService.getBranchesWithoutId(t.codeId, t.codeManagerUserId, t.codeManager).then(function(e) {
            a.branches = e.data.result || []
        }), c.projectService.getTagsWithoutId(t.codeId, t.codeManagerUserId, t.codeManager).then(function(e) {
            a.tags = e.data.result || []
        })),
        a.toggle = function(e) {
            a.check = e,
            a.branchKey = "",
            a.selectedBranch = ""
        },
        a.cancel = function() {
            e.dismiss("cancel")
        },
        a.submitBranch = function() {
            e.close({
                type: a.check.toLowerCase(),
                value: a.selectedBranch
            })
        },
        a.toggleBranch = function(e) {
            a.branchKey = "",
            a.selectedBranch = e
        }
    }
    void 0 !== e && (e.controller("BranchCheckModalCtr", t), t.$inject = ["$modalInstance", "$domeProject", "codeInfo", "projectId"])
} (angular.module("domeApp"));