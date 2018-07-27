"use strict"; !
function(e, t) {
    void 0 !== e && e.controller("CreateAppDeployCtr", ["$scope", "$domeAppStore", "$domeCluster", "$domeUser", "$state", "$stateParams", "dialog","$domeDeployCollection","$http",
    function(e, t, o, a, n, p, r,c,m) {
        p.appName || n.go("appStore"),
        e.$emit("pageTitle", {
            title: p.appName,
            descrition: "",
            mod: "appStore"
        });
         var changeValMap = new Map();
        var data = {"req":"1"};
        var l = void 0,
        
        s = o.getInstance("NodeService");
        var h= c.deployCollectionService;
        e.cname="";
        e.collList=[];
    	h.getDeployCollection().then(function(c){
    		  var j=[];	 
    		j= c.data.result || [];
         for (var r = 0; r < j.length; r++){
        	 if(j.length>0){
        		 e.cname=j[0].name; 
        	 }
        	 e.collList.push({
                 collectionId: j[r].id,
                 name: j[r].name,
                  
             }); 
         }
        	 
        });	
        
        t.getStoreApps().then(function(o) {    
            var a = !1;
            if (o.data) {
                for (var i = 0,
                d = o.data.length; i < d; i++) if (o.data[i].appName === p.appName) {
                    a = !0,
                    l = o.data[i];
                    break
                }
              
                var oobject={};
                var yy=0;
                var showData = o.data[i--];
                e.showValue = showData;
                for(var d in showData){
                	oobject[yy++]=d;
                	/*console.log("key="+d);
                	console.log("value="+showData[d]);*/
                }
                
                e.showData = oobject;
               
               /* if (a) {
                    var g = {
                        logItemDrafts: []
                    };
                    var f = l.deploymentTemplate.logPathList; 
                    f || (f = []);
                    for (var m = 0,
                    c = f.length; m < c; m++) g.logItemDrafts.push({
                        logPath: f[m],
                        autoCollect: !1,
                        autoDelete: !1
                    });
                   
                    l.deploymentTemplate.logPathList = void 0,
                    l.deploymentTemplate.collectionId = e.cname,
                    l.deploymentTemplate.collectionName = "",
                    l.deploymentTemplate.networkMode = "DEFAULT",
                    e.appInfoIns = t.getInstance("AppInfo", l),
                    e.config = e.appInfoIns.config,
                    e.deployIns = e.appInfoIns.deployIns,
                    e.deployConfig = e.deployIns.config,
                    console.log("e.deployConfig");
                    console.log(e.deployConfig);
                    s.getData().then(function(t) {
                    
                    	console.log(t.data.result);
                        e.deployIns.clusterListIns.init(t.data.result),
                        e.deployIns.toggleCluster()
                        
                    })
                } else r.error("警告", "无相关应用数据"),
                n.go("appStore")*/
            } else r.error("警告", "请求失败！"),
            n.go("appStore")
        },
        function() {
            r.error("警告", "请求失败！"),
            n.go("appStore")
        }),
        e.createDeploy = function() {
            e.isLoading = !0,
           
            m.post("/api/createApp",data).then(function(e) {
              
            	
                var t = e.data.result || [];
                /*Array.prototype.push.apply(n.imageList, t)*/
               
                //alert("create success");
                /*n.go("deployManage",{
                    id: e.deployConfig.collectionId,
                    name: e.deployConfig.collectionName
                })*/
              }).
              finally(function() {
                  e.isLoading = !1
              })/*
         
            e.deployIns.create().then(function() {
                r.alert("提示", "创建成功！"),
                n.go("deployManage",{
                    id: e.deployConfig.collectionId,
                    name: e.deployConfig.collectionName
                })
            },
            function(e) {
                "namespace" == e.type ? r.error("创建名空间失败", e.msg) : r.error("创建失败", e.msg)
            }).
            finally(function() {
                e.isLoading = !1
            })*/
          
        },
        e.selectedHelmChart=function(v){
        	//alert(e.replicas);
        	e.selectedChart = v;
        },
        e.getChangeVal=function(c,s){
        	
        	changeValMap.set(c,s);
        	console.log(changeValMap);
        	console.log(angular.toJson(changeValMap));
        	
        }
    }])
} (angular.module("domeApp"));