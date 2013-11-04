///<reference path='../bower_components/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='services/Config.d.ts'/>

declare var _;

interface AngtsApp extends ng.IModule {}

var angtsApp: AngtsApp = angular.module("angtsApp", ["ngRoute", "angtsTemplates"])
.config(($routeProvider: ng.IRouteProvider) => {
	$routeProvider
	.when("/tasks", {
		templateUrl: "views/tasks.html",
		controller: "TasksController"
	})
	.otherwise({
		redirectTo: "/tasks"
	});
});

declare var angtsConfig: Config;
angtsApp.constant("config", angtsConfig);
