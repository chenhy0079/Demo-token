"use strict";!function(e,t){void 0!==e&&e.directive("isOver",function(){return{restrict:"A",require:"ngModel",link:function(e,t,i,r){e.$watch(function(){return{max:i.max,min:i.min,model:r.$modelValue}},function(e){var t=e.max,i=e.min,n=!1,s=!1;(isNaN(t)||!isNaN(t)&&parseFloat(e.model)<=parseFloat(t))&&(n=!0),(isNaN(i)||!isNaN(i)&&parseFloat(e.model)>=parseFloat(i))&&(s=!0),n&&s?r.$setValidity("isOver",!0):r.$setValidity("isOver",!1)},!0)}}}).directive("isProjectExist",["$domeProject",function(e){return{require:"ngModel",scope:{collection:"="},link:function(t,i,r,n){var s={};e.projectService.getProject(t.collection).then(function(e){function i(e){return 1===s[o+"/"+e]?n.$setValidity("isProjectExist",!1):n.$setValidity("isProjectExist",!0),e}for(var a=e.data.result||[],o=r.groupName,u=0,l=a.length;u<l;u++)s[a[u].name]=1;t.$watch(function(){return r.groupName},function(e){e&&(o=e),i(n.$modelValue)}),n.$parsers.unshift(i)})}}}]).directive("isUserExist",function(){return{require:"ngModel",scope:{userList:"=isUserExist"},link:function(e,t,i,r){r.$parsers.unshift(function(t){if(e.userList)for(var i=0,n=e.userList.length;i<n;i++)if(e.userList[i].username===t)return void r.$setValidity("isUserExist",!1);return r.$setValidity("isUserExist",!0),t})}}}).directive("isClusterExist",function(){return{require:"ngModel",scope:{clusterList:"="},link:function(e,t,i,r){r.$parsers.unshift(function(t){if(e.clusterList)for(var i=0,n=e.clusterList.length;i<n;i++)if(e.clusterList[i].name===t)return void r.$setValidity("isClusterExist",!1);return r.$setValidity("isClusterExist",!0),t})}}}).directive("isApiServerExist",function(){return{require:"ngModel",scope:{clusterList:"=",currentCluster:"@"},link:function(e,t,i,r){r.$parsers.unshift(function(t){if(e.clusterList)for(var i=0,n=e.clusterList.length;i<n;i++)if(e.currentCluster!==e.clusterList[i].name&&e.clusterList[i].api===t)return void r.$setValidity("isApiServerExist",!1);return r.$setValidity("isApiServerExist",!0),t})}}}).directive("isDeployExist",["$domeDeploy",function(e){return{require:"ngModel",scope:{collection:"="},link:function(t,i,r,n){function s(e){for(var t=0,i=a.length;t<i;t++)if(a[t].clusterName===u&&a[t].namespace===o&&a[t].deployName===e)return n.$setValidity("isDeployExist",!1),e;return n.$setValidity("isDeployExist",!0),e}var a=[],o=r.namespace,u=r.clustername;e.deployService.getListByCollectionId(t.collection).then(function(e){a=e.data.result||[]}),t.$watch(function(){return{namespace:r.namespace,clustername:r.clustername}},function(e){o=e.namespace,u=e.clustername,s(n.$modelValue)},!0),n.$parsers.unshift(s)}}}]).directive("isDeployNameExist",["$domeCluster",function(e){return{require:"ngModel",link:function(t,i,r,n){var s=[];e.getInstance("ClusterService").getDeployList().then(function(e){s=e.data.result||[]}),n.$parsers.unshift(function(e){for(var t=0,i=s.length;t<i;t++)if(s[t].deployName===e)return n.$setValidity("isDeployNameExist",!1),e;return n.$setValidity("isDeployNameExist",!0),e})}}}]).directive("isNamespaceExist",["$domeCluster",function(e){return{require:"ngModel",link:function(t,i,r,n){var s=[],a=e.getInstance("ClusterService").getNamespace;t.$watch(function(){return r.clusterid},function(e){a(e).then(function(e){s=e.data.result||[]})}),n.$parsers.unshift(function(e){for(var t=0,i=s.length;t<i;t++)if(s[t].name===e)return n.$setValidity("isNamespaceExist",!1),e;return n.$setValidity("isNamespaceExist",!0),e})}}}]).directive("isGroupExist",["$domeUser",function(e){return{require:"ngModel",link:function(t,i,r,n){var s={};e.userService.getGroup().then(function(e){for(var t=e.data.result||[],i=0,r=t.length;i<r;i++)s[t[i].name]=1}),n.$parsers.unshift(function(e){return s[e]?n.$setValidity("isGroupExist",!1):n.$setValidity("isGroupExist",!0),e})}}}]).directive("isAlarmTemplateExist",["$domeAlarm",function(e){return{require:"ngModel",scope:{selfName:"@"},link:function(t,i,r,n){var s={};e.getInstance("AlarmService").getData().then(function(e){for(var t=e.data.result||[],i=0,r=t.length;i<r;i++)s[t[i].templateName]=1}),n.$parsers.unshift(function(e){return t.selfName&&t.selfName===e?n.$setValidity("isAlarmTemplateExist",!0):s[e]?n.$setValidity("isAlarmTemplateExist",!1):n.$setValidity("isAlarmTemplateExist",!0),e})}}}]).directive("isTagExist",function(){return{require:"ngModel",scope:{baseImages:"=baseimages",imageName:"=imagename"},link:function(e,t,i,r){function n(t){var i=!1;if(e.imageName&&e.baseImages)for(var n=0,s=e.baseImages.length;n<s;n++)if(e.baseImages[n].imageName===e.imageName&&e.baseImages[n].imageTag===t){i=!0;break}return r.$setValidity("isTagExist",!i),t}e.$watch(function(){return e.imageName},function(){n(r.$modelValue)}),r.$parsers.unshift(n)}}}).directive("isHostgroupExist",function(){return{require:"ngModel",scope:{hostgroupList:"="},link:function(e,t,i,r){r.$parsers.unshift(function(t){for(var i=0,n=e.hostgroupList.length;i<n;i++)if(t===e.hostgroupList[i].hostGroupName)return r.$setValidity("isHostgroupExist",!1),t;return r.$setValidity("isHostgroupExist",!0),t})}}}).directive("diyPattern",function(){return{restrict:"A",require:"ngModel",scope:{pattern:"=diyPattern"},link:function(e,t,i,r){function n(t){if(t=t||"",e.pattern){var i=new RegExp(e.pattern);return r.$setValidity("diyPattern",i.test(t)),t}return r.$setValidity("diyPattern",!0),t}r.$parsers.unshift(n),e.$watch(function(){return e.pattern},function(){n(r.$modelValue)})}}}).directive("isRequired",[function(){return{restrict:"A",require:"ngModel",link:function(e,t,i,r){var n=[],s=!1;angular.forEach(i,function(e,t){t.indexOf("param")!==-1&&n.push(t)}),e.$watch(function(){for(var e={},t=0,s=n.length;t<s;t++)e[n[t]]=i[n[t]];return{watchParams:e,model:r.$modelValue}},function(e){s=!1,angular.forEach(e.watchParams,function(e){e&&"false"!==e&&(s=!0)}),!s||s&&e.model?r.$setValidity("isRequired",!0):r.$setValidity("isRequired",!1)},!0)}}}]).directive("isProjectCollectionExist",["$domeProjectCollection",function(e){return{require:"ngModel",link:function(t,i,r,n){var s={};e.projectCollectionService.getProjectCollection().then(function(e){for(var t=e.data.result||[],i=0,r=t.length;i<r;i++)s[t[i].name]=1}),n.$parsers.unshift(function(e){return s[e]?n.$setValidity("isProjectCollectionExist",!1):n.$setValidity("isProjectCollectionExist",!0),e})}}}]).directive("isDeployCollectionExist",["$domeDeployCollection",function(e){return{require:"ngModel",link:function(t,i,r,n){var s={};e.deployCollectionService.getDeployCollection().then(function(e){for(var t=e.data.result||[],i=0,r=t.length;i<r;i++)s[t[i].name]=1}),n.$parsers.unshift(function(e){return s[e]?n.$setValidity("isDeployCollectionExist",!1):n.$setValidity("isDeployCollectionExist",!0),e})}}}])}(window.domeApp);