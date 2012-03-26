define(['jquery'],
       function() {
	   return {app: function() {return Application;}};
       });


var Application = function(ignite) {

    var sessionToken = null;
    var session = null;
    var igniteHost = "http://localhost:8080";
    var services = ["facebook", "flickr", "hyves", "google"];

    var run = function() {
	app = this;
	$('#login-facebook').click(function () {return Application.facebookLogin();})
	$('#login-flickr').click(function () {return Application.flickrLogin();})
	$('#login-twitter').click(function () {return Application.twitterLogin();})
	$('#services').click(function () {return app.listServices();});
	this.init();
    };

    var listServices = function() {
	$.ajax({
	    url: "http://localhost:8080/api/services",
	    dataType: "jsonp",
	    data: {"session_token": this.session.getToken()},
	    crossDomain: true,
	    success: function(data, textStatus, jqXHR) {
		console.log(data);
	    }
	});
    };

    var init = function() {
	console.log(this);
	var hash = window.location.hash;
	if (hash.indexOf("#auth_callback") === 0) {
	    var paramsString = hash.substr(hash.indexOf('?') + 1);
	    var params = {};
	    $.each(paramsString.split('&'), function(key, value) {
		param = value.split('=');
		params[param[0]] = param[1];
	    });
	    console.log(window.opener.Application.rpc);
	    window.opener.Application.rpc.callback("auth-popup", params);
	}

	this.session = new Session();
	this.session.init();
    };

    var flickrLogin = function() {
	loginPopup(this.getAuthURL("flickr"), "FlickrUploadr login");
    };

    var twitterLogin = function() {
	loginPopup(this.getAuthURL("twitter"), "FlickrUploadr login");
    };

    var getAuthURL = function(service) {
	var baseURL = "http://localhost:8080/api/";
	if (this.session.isActive()) {
	    return baseURL + "attach?session_token=" + this.session.getToken() + "&service_type=" + service;
	} else {
	    return baseURL +"auth?app_key=randomshit&service_type=" + service;
	}
    };

    var loginPopup = function(url, title) {
	console.log(url);
	console.log(title);
	var popup = window.open(url, title, "height=800,width=800");
	Application.rpc.register('auth-popup', function(args) {
	    popup.close();
	    if (args["success"] === "True") {
		var sessionToken = decodeURIComponent(args["session_token"]);
		console.log("Session token received: " + sessionToken);
		Application.session.save(sessionToken);
	    } else {
		// handle errors somehow
		console.log("Session token was not created");
	    }
	});
    };

    var facebookLogin = function() {
	loginPopup(this.getAuthURL("facebook"), "FlickrUploadr login");
    };

    var rpc = function() {
    	var callbacks = {};
    	return {
    	    "register": function(name, func) {callbacks[name] = func},
    	    "callback": function(name, args) {
		console.log(callbacks);
    		if (name in callbacks) {
    		    callbacks[name](args);
    		}
    	    }
    	}
    }();

    return {"run": run,
	    "init": init,
	    "flickrLogin": flickrLogin,
	    "twitterLogin": twitterLogin,
	    "facebookLogin": facebookLogin,
	    "getAuthURL": getAuthURL,
	    "listServices": listServices,
	    // "loginPopup": loginPopup,
	    rpc: rpc}

}();


var Session = function() {

    var keyPrefix = "flickruploadr";
    var sessionKey = keyPrefix + "Token";
    var services = null;

    var init = function() {
	this.renewToken();
    };

    var updateServices = function() {
	$.ajax({
	    url: "http://localhost:8080/api/services?session_token=" + this.getToken(),
	    dataType: "jsonp",
	    crossDomain: true,
	    context: this,
	    success: function(response) {
		console.log("yeah bitch");
		console.log(this);
		console.log(response);
	    }
	});
    };

    var save = function(token) {
	console.log("Setting token to: " + token);
	console.log("Setting token to: " + JSON.stringify(token));
	localStorage[sessionKey] = token;
    };

    var getToken = function() {
	var token = localStorage[sessionKey];
	console.log("Got token: " + token);
	return token;
    };

    var del = function() {
	console.log("Deleting token")
	return localStorage.removeItem(sessionKey);
    }

    var getServices = function() {
	var servicesKey = sessionKey + "Services";
	return JSON.parse(localStorage[servicesKey]);
    };

    var isActive = function() {
	var token = this.getToken();
	this.renewToken();
	return token != null;
    };

    var renewToken = function() {
	var token = this.getToken();
	var session = this;
	if (token == null) {
	    console.log("Nothing to renew");
	    return;
	}
	$.ajax({
	    url: "http://localhost:8080/api/session?session_token=" + token,
	    dataType: "jsonp",
	    crossDomain: true,
	    context: this,
	    success: function(response) {
		console.log("wtf");
		console.log(this);
		if (response["active"] === false) {
		    console.log("Current token is not active anymore");
		    this.del();
		} else {
		    console.log("Current token is still active");
		    this.updateServices();
		}
	    }
	});
    };

    return {"init": init,
	    "save": save,
	    "getToken": getToken,
	    "del": del,
	    "isActive": isActive,
	    "renewToken": renewToken,
	    "updateServices": updateServices};
};
