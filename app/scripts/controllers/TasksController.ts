angtsApp.controller("TasksController", function($scope, taskService) {
	return new TasksController($scope, taskService);
});

interface TasksControllerScope extends ng.IScope {
	tasks: Task[];
}

class TasksController {
	constructor($scope: TasksControllerScope, taskService: TaskService) {
		taskService.get().then((tasks: Task[]): void => {
			$scope.tasks = tasks;
		});
	}
}
