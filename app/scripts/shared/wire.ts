/**
 * Definitions for stuff traveling across the wire
 */
module wire {
	export interface TasksGetResponse extends ng.IHttpPromiseCallbackArg {
		data: Task[];
	}

	export interface Task {
		title: string;
	}
}
