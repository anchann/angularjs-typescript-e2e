"use strict";

describe("Service: TaskService", function() {
	var $httpBackend,
	    taskService,
	    config;

	beforeEach(function() {
		module("angtsApp");

		inject(function($injector) {
			$httpBackend = $injector.get("$httpBackend");
			taskService  = $injector.get("taskService");
			config       = $injector.get("config");
		});
	});

	it("has the correct number of tasks, with correct titles", function() {
		var tasks = undefined;

		$httpBackend.expectGET(config.BACKEND_SERVER + "/tasks.json")
		.respond([
			{title: "First task"},
			{title: "Second task"},
			{title: "Third task"}
		]);

		runs(function() {
			taskService.get().then(function(value) {
				tasks = value;
			});
			$httpBackend.flush();
		});

		waitsFor(function() { return tasks !== undefined; }, 500);

		runs(function() {
			expect(tasks.length).toBe(3);

			expect(tasks[0].getTitle()).toBe("First task");
			expect(tasks[1].getTitle()).toBe("Second task");
			expect(tasks[2].getTitle()).toBe("Third task");
		});
	});
});
