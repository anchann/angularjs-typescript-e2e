"use strict";

describe("Controller: TasksController", function() {
	var scope,
	    tasksController;

	beforeEach(function() {
		module("angtsApp", function($provide) {
			$provide.value("taskService", mocks.taskService);
		});
	});

	beforeEach(inject(function($controller) {
		scope = {};
		tasksController = $controller("TasksController", {
			$scope: scope
		});
	}));

	it("has the correct number of tasks", function() {
		var tasks = undefined;

		runs(function() {
			tasks = scope.tasks;
		});

		waitsFor(function() { return tasks !== undefined; }, 500);

		runs(function() {
			expect(tasks.length).toBe(2);
		});
	});
});
