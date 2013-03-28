var angtsAppDev = angular.module("angtsAppDev", ["angtsApp", "ngMockE2E"]);
angtsAppDev.run(function($httpBackend, config) {
	// let all views through
	$httpBackend.whenGET(new RegExp("views\/.*")).passThrough();

	$httpBackend.whenGET(config.BACKEND_SERVER + "/tasks.json")
	.respond(mockData.tasks.GET);
});
