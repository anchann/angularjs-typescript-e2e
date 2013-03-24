var angtsAppDev = angular.module("angtsAppDev", ["angtsApp", "ngMockE2E"]);
angtsAppDev.run(function($httpBackend) {
	// let all views through
	$httpBackend.whenGET(new RegExp("views\/.*")).passThrough();

	$httpBackend.whenGET(TaskService.SERVER + "/tasks.json")
	.respond(mockData.tasks.GET);
});
