///<reference path="../shared/wire.ts"/>

angtsApp.factory("taskService", function($http) {
	return new TaskService($http);
});

class TaskService {
	public static SERVER: string = "http://localhost:3000";

	constructor(private $http: ng.IHttpService) {
	}

	public get(): ng.IPromise /* of Task[] */ {
		return this.$http.get(TaskService.SERVER + "/tasks.json")
		.then((response: wire.TasksGetResponse): Task[] => {
			var rawTasks: wire.Task[] = response.data;
			return _.map(rawTasks, (rawTask: wire.Task): Task => new Task(
				rawTask.title
			));
		});
	}
}
