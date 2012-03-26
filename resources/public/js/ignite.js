define(['jquery'],
       function() {
           return {api: function() {return Ignite;}};
       });


var Ignite = function() {

    var sessionToken = null;
    var defaultRequestTimeout = 15;
    var host = 'http://localhost:8080';
    var version = '/v1';


    var popupCall = function(){};

    var call = function(uri, params) {
        var url = Ignite.host + Ignite.version + uri;
        params['session_token'] = Ignite.sessionToken;
        return $.ajax(url, {
            data: params,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: defaultRequestTimeout
        });
    };

    var getMainService = function() {
    };

    var setMainService = function() {

    };

    var listServices = function() {

    };

    var attachService = function() {
    };

    var authenticate = function() {

    };

    return {'getMainService': getMainService,
            'setMainService': setMainService};

}();
