mockData = (function(mockData) {
	mockData["tasks"] = {
		"GET": [
			{title: "Task One"},
			{title: "Task Two"},
			{title: "Task Three"},
			{title: "Task Four"}
		]
	};
	return mockData;
})(typeof mockData !== "undefined" ? mockData : {});
