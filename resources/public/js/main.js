require({},
	["flickruploadr", "login/facebook"],
	function(module) {
	    app = module.app();
	    console.log(app)
	    app.run();
});
