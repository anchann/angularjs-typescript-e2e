if (typeof (mocks) === 'undefined') mocks = {};

mocks.taskService = new function() {
	var fakeData = [
		{title: "Go for a run"},
		{title: "Turn lights off before leaving the house"}
	];

	this.get = function() {
		return {
			then: function(callback) {
				callback.call(null, fakeData);
			}
		};
	}
};
