"use strict";
module.exports=require("angular").module("wbt",[
	require("angular-ui-router"),
	require("angular-bootstrap"),
	"ngMessages",
	"ngSanitize",
	"ngAria",
	require("./components/rest"),
	require("./components/ui")
	//require("./components/d3")
])
.config(require("./wbt-config"))
.controller("wbtCtrl",require("./wbt-controller"))
.controller("contentCtrl",require("./content/content-controller"))
.controller("unitCtrl",require("./content/unit/unit-controller"))
.controller("topicCtrl",require("./content/unit/topic/topic-controller"))
.controller("downloadCtrl",require("./download/download-controller"))
.controller("userCtrl",require("./user/user-controller"))
.controller("loginCtrl",require("./user/login/login-controller"))
.controller("registerCtrl",require("./user/register/register-controller"))
.name;
/*
.run(["$rootScope",function($rootScope){
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
		console.log(error);
	});
}]);
*/