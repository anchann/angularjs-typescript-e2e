///<reference path='../components/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='controllers/RootScope.ts'/>

declare var _;

interface AngtsApp extends ng.IModule {}

var angtsApp: AngtsApp = angular.module("angtsApp", [])
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
