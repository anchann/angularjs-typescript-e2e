angtsApp.controller("TasksController", function($scope, taskService) {
	return new TasksController($scope, taskService);
});

interface TasksControllerScope extends ng.IScope {
	tasks: ng.IPromise /* of Task[] */;
}

class TasksController {
	constructor($scope: TasksControllerScope, taskService: TaskService) {
		$scope.tasks = taskService.get();
	}
}
