describe("/tasks route e2e test", function() {
	beforeEach(function() {
		browser().navigateTo("/index-e2e.html#/tasks");
	}); 

	it("should have a title", function() {
		expect(browser().location().url()).toBe("/tasks");
		expect(element("h1").text()).toBe("Daily Tasks");
	}); 

	it("should have the correct number of tasks", function() {
		expect(browser().location().url()).toBe("/tasks");
		expect(repeater("li.task").count()).toBe(4);
	}); 
});
