define(['jquery'],
       function() {
           return {"Server": function() {return Server;}};
       });


var Server = function() {

    var host = "http://localhost:7070";


    var call = function(uri, params, method) {
        var url = Server.host;
        params['session_token'] = Ignite.sessionToken;
        if (method === undefined) {
            method = "GET";
        }
        return $.ajax(url, {
            "method": method,,
            "dataType": "json",
            "data": params,
        });
    };

    var uploadPhoto = function(bytes, services) {
        return Server.call("/image", {"image": bytes}, "POST");
    };

    return {"uploadPhoto": uploadPhoto,
            "call": call}
}
