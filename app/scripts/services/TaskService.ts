///<reference path="../shared/wire.ts"/>

angtsApp.factory("taskService", function($http, config) {
	return new TaskService($http, config);
});

class TaskService {
	constructor(private $http: ng.IHttpService, private config: Config) {
	}

	public get(): ng.IPromise<Task[]> {
		return this.$http.get(this.config.BACKEND_SERVER + "/tasks.json")
		.then((response: ng.IHttpPromiseCallbackArg<Task[]>): Task[] => {
			var rawTasks: wire.Task[] = response.data;
			return _.map(rawTasks, (rawTask: wire.Task): Task => new Task(
				rawTask.title
			));
		});
	}
}
