define(['jquery'],
       // Ignoring all loaded modules for now
       function() {
	   // function Application() {
	   //     this.init = init();
	   //     initialize_handlers();
	   // };
	   // Application.prototype.run = function() {
	   //     return this.something = this.something * 2;
	   // }

	   return {app: function() {return Application;}};
       });

var Application = function() {

    var sessionToken = null;

    var run = function() {
	$('#login-facebook').click(function () {return Application.facebookLogin();})
	$('#login-flickr').click(function () {return Application.flickrLogin();})
	console.log("awesome");
	this.init();
    };


    var init = function() {
	// console.log("do we even get here?");
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
    };


    var flickrLogin = function() {
	var url = 'http://localhost:8080/api/auth?service_type=flickr&app_key=randomshit';
	var popup = window.open(url, "FlickrUploadr login", "height=800,width=800");
	Application.rpc.register('auth-popup', function(args) {
	    console.log("ME GUSTA");
	    popup.close();
	    console.log(args);
	    if (args["success"] === "True") {
		Application.sessionToken = decodeURIComponent(args["session_token"]);
	    }
	})
    };

    var facebookLogin = function() {};

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
	    rpc: rpc}

}();



var Session = function() {



}

// var somefunc = function() {
//     return 13;
// }

// var initialize_handlers = function() {
//     $('#login-facebook').click(function () {return facebook_login();})
//     $('#login-flickr').click(function () {return flickr_login();})
//     $('#auth_callback').click(function () {return auth_callback();})
// }


// var facebook_login = function() {
//     alert('Not implemented');
// }


// var flickr_login = function() {
// }





// var auth_callback = function() {
//     alert("YAY");
// }
