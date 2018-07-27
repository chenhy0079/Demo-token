"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n};!function(n){n.component("pageTitle",{template:"",bindings:{pageTitle:"@"},controller:["$scope","$rootScope",function(n,t){var e=this;n.$watch("$ctrl.pageTitle",function(){t.$emit("pageTitle",{title:e.pageTitle})})}]}),n.component("pageContainer",{template:'\n      <div class="page-container new-layout" ng-transclude></div>\n    ',transclude:!0,bindings:{},controller:[function(){}]}),n.component("pageSummaryBox",{template:'\n      <div class="page-summary-box">\n        <div class="page-summary-box-content" ng-transclude></div>\n      </div>\n    ',transclude:!0,bindings:{},controller:[function(){}]}),n.component("pageSummaryLogo",{template:'\n      <div class="page-summary-logo">\n        <div class="page-summary-logo-wrapper">\n          <img ng-src="{{ $ctrl.fallback }}" ng-if="$ctrl.fallback" />\n          <img ng-src="{{ $ctrl.logo }}" onerror="this.style.display = \'none\'" onload="this.style.display = \'block\'" />\n        </div>\n      </div>\n    ',bindings:{logo:"@",fallback:"@?"},controller:[function(){}]}),n.component("pageSummaryItem",{template:'\n      <div class="page-summary-item">\n        <div class="page-summary-item-title" ng-bind="$ctrl.text"></div>\n        <div class="page-summary-item-content" ng-transclude></div>\n      </div>\n    ',transclude:!0,bindings:{text:"@"},controller:[function(){}]}),n.component("pageSummaryContent",{template:'\n      <div class="page-summary-content-container">\n        <div class="page-summary-content" ng-transclude></div>\n      </div>\n    ',transclude:!0,bindings:{},controller:[function(){}]}),n.directive("pageContentBox",["$parse",function(n){return{template:'\n        <div class="page-content-box">\n          <ul class="page-tab-list" ng-if="_$tabs && _$tabs.length">\n            <li class="page-tab-item" ng-repeat="tab in _$tabs" ng-class="{ \'page-tab-item-active\': _$currentPage().page === tab.page }">\n              <a ui-sref="{ page: tab.page }" ng-click="_$gotoPage(tab); $event.stopPropagation()" ng-bind="tab.text"></a>\n            </li>\n          </ul>\n          <div class="page-content-container" ng-if="!_$tabs || !_$tabs.length" ng-transclude></div>\n          <div class="page-content-tab-container"  ng-if="_$tabs && _$tabs.length">\n            <div class="page-content-container" ng-repeat="tab in _$tabs" ng-if="_$loadedPages.indexOf(tab.page) !== -1" ng-show="_$currentPage().page === tab.page" ng-include="tab.html"></div>\n          </div>\n        </div>\n      ',scope:!0,transclude:!0,link:function(t,e,o){var a=function(){(t._$tabs||[]).forEach(function(n){n.lazy===!1&&t._$loadedPages.indexOf(n.page)===-1&&t._$loadedPages.push(n.page)})},i=n(o.tabs);t._$tabs=i(),t.$watch(i,function(){t._$tabs=i(),a()})},controller:["$state","$scope",function(n,t){t._$loadedPages=[],t._$currentPage=function(){var e=function(){var e=n.params.page,o=(t._$tabs||[]).filter(function(n){return n.page===e});if(o.length)return o[0];var a=(t._$tabs||[]).filter(function(n){return n.default});if(a.length)return a[0];var i=(t._$tabs||[]).filter(function(n){return""===n.page});return i.length?i[0]:t._$tabs[0]}();return t._$loadedPages.indexOf(e.page)===-1&&t._$loadedPages.push(e.page),e},t._$gotoPage=function(t){n.go(n.current.name,{page:t.page},{notify:!1})}}]}}]),n.factory("dialog",["api","$compile","$rootScope","$controller","$timeout","userFriendlyMessage",function(n,t,e,o,a,i){var l={},r=0;l.button={BUTTON_OK:1,BUTTON_YES:2,BUTTON_NO:4,BUTTON_RETRY:8,BUTTON_ABORT:16,BUTTON_IGNORE:32,BUTTON_CANCEL:128},l.secondaryButtons=[l.button.BUTTON_NO,l.button.BUTTON_ABORT,l.button.BUTTON_IGNORE,l.button.BUTTON_CANCEL],l.buttons={BUTTON_EMPTY:0,BUTTON_OK_ONLY:l.button.BUTTON_OK,BUTTON_OK_CANCEL:l.button.BUTTON_OK|l.button.BUTTON_CANCEL,BUTTON_YES_NO:l.button.BUTTON_YES|l.button.BUTTON_NO,BUTTON_YES_NO_CANCEL:l.button.BUTTON_YES|l.button.BUTTON_NO|l.button.BUTTON_CANCEL,BUTTON_RETRY_CANCEL:l.button.BUTTON_RETRY|l.button.BUTTON_CANCEL,BUTTON_ABORT_RETRY_IGNORE:l.button.BUTTON_ABORT|l.button.BUTTON_RETRY|l.button.BUTTON_CANCEL},l.common=function(i){var u=i.title,s=i.buttons,c=i.value,g=i.template,d=i.templateUrl,b=i.controller,p=i.size,T=i.mayEscape,m=void 0===T||T,f=i.autoclose,_=void 0!==f&&f,v=i.warning,O=void 0!==v&&v,N=i.form;"number"==typeof s&&(s=Object.keys(l.button).sort(function(n,t){return l.button[n]-l.button[t]}).filter(function(n){return l.button[n]&s}).map(function(n){return{text:{BUTTON_OK:"确定",BUTTON_YES:"是",BUTTON_NO:"否",BUTTON_RETRY:"重试",BUTTON_ABORT:"中止",BUTTON_IGNORE:"忽略",BUTTON_CANCEL:"取消"}[n],value:l.button[n],secondary:l.secondaryButtons.indexOf(l.button[n])!==-1}}));var y=angular.element('\n        <div class="dialog-container new-layout dialog-hidden" id="{{ id }}">\n          <div class="dialog-cover"></div>\n          <div class="dialog-box" ng-cloak>\n            <div class="dialog-title" ng-bind="title"></div>\n              <div class="dialog-content"></div>\n            <div class="dialog-buttons" ng-if="buttons.length">\n              <form-button-group>\n                <button type="button" ng-repeat="button in buttons"\n                  ng-click="close(button.value)"\n                  ng-bind="button.text"\n                  ng-class="{ \'secondary-button\': button.secondary }"\n                ></button>\n              </form-button-group>\n            </div>\n          </div>\n        </div>\n      ');if(N){angular.element(".dialog-box",y).wrap('<form name="'+N+'"></form>')}var B=angular.element(".dialog-box",y);"number"==typeof p?B.css({width:p+"px"}):"string"==typeof p?B.css({width:p}):B.addClass("dialog-box-with-auto"),O&&B.addClass("dialog-warning");var $=angular.element(".dialog-content",y);g?$.html(g):d&&$.html(angular.element("<div></div>").attr("ng-include",d));var U=null,E=e.$new(!0);b&&(E.$ctrl=b),E.title=u||"",E.buttons=s||[],E.value=c||void 0,E.form=N||void 0,Object.defineProperty(E,"resolve",{enumerable:!0,configurable:!1,writable:!1,value:function(t){n.SimplePromise.resolve(t).then(function(n){n!==!1&&(h(),U(t))})}}),Object.defineProperty(E,"close",{enumerable:!0,configurable:!1,writable:!1,value:function(n){var t=!0;N&&n===l.button.BUTTON_OK&&(E[N].$submitted=!0,!E[N].$valid)||("function"==typeof E.onbeforeclose&&(t=E.onbeforeclose(n)),t!==!1&&E.resolve(n))}}),E.onbeforeclose=function(){},E.id="dialog_"+ ++r,y.appendTo(document.body),b&&o(b,{$scope:E}),t(y)(E);var C=function(){},h=function(){var n=!1;return function(){n||(n=!0,y.addClass("dialog-hidden"),a(function(){y.remove(),E.$destroy(),C()},200))}}();if(m){var R=angular.element(".dialog-cover",y),S=function(n){27===n.keyCode&&E.close(void 0)},w=function(){E.close(void 0)};R.on("click",w),angular.element(document).on("keyup",S),C=function(){R.off("click",w),angular.element(document).off("keyup",S)}}if(_){var x="number"==typeof _?_:2e3;a(E.close,x+200)}return a(function(){y.removeClass("dialog-hidden"),a(function(){(y[0].querySelector("input[autofocuse]")||y[0].querySelector("input")||y[0]).focus()},200)}),new n.SimplePromise(function(n,t){U=n})},l.msgbox=function(n){var t=n.title,e=n.message,o=n.buttons,a=n.autoclose,r=void 0!==a&&a,u=n.warning,s=void 0!==u&&u;return l.common({title:t,buttons:o,autoclose:r,warning:s,value:i(e),template:'<span class="dialog-message" ng-bind-html="value"></span>'})};var u=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=t.autoclose,o=void 0!==e&&e,a=t.warning,i=void 0!==a&&a;return function(t,e){if("object"===(void 0===t?"undefined":_typeof(t))){var a=t;t=a.title,e=a.message}return l.msgbox({title:t,message:e,buttons:n,autoclose:o,warning:i})}};return l.tip=u(l.buttons.BUTTON_EMPTY,{autoclose:!0}),l.alert=u(l.buttons.BUTTON_OK_ONLY),l.continue=u(l.buttons.BUTTON_OK_CANCEL),l.question=u(l.buttons.BUTTON_YES_NO),l.optquestion=u(l.buttons.BUTTON_YES_NO_CANCEL),l.retry=u(l.buttons.BUTTON_RETRY_CANCEL),l.no_one_need_this=u(l.buttons.BUTTON_ABORT_RETRY_IGNORE),l.error=u(l.buttons.BUTTON_OK_ONLY,{warning:!0}),l.danger=u(l.buttons.BUTTON_OK_CANCEL,{warning:!0}),l}])}(angular.module("pageLayout",["backendApi"]));