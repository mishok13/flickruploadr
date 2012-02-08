require(["js/jquery.js",
	 "js/mustache.js",
	 "js/flickruploadr.js",
	 "js/bootstrap.js"],
	function() {
	    $(document).ready(function() {
		$('#test').append("<p>hooray!</p>");
		var view = {
		    title: "Joe",
		    calc: function () {
			return 2 + 4;
		    }};
		var output = Mustache.render("{{title}} spends {{calc}}", view);
		$('#test').append('<p>' + output + '</p>')
	    });
	});
