class Task {
	public title: string;

	constructor(title: string) {
		this.title = title;
	}

	/**
	 * This method is here as a demostration of the difference between
	 * dumb JSON data coming from the backend (as spec'd by wire.Task)
	 * and a real class instance that is used in the application, with
	 * behaviours and not just data.
	 */
	public getTitle(): string {
		return this.title;
	}
}
