'use strict';

angular.module('canaryApp').factory('ApiService', ['$http', '$q', function ($http, $q) {
    var baseApiUrl = 'http://localhost:3000';

    function get(path, params) {
        var q = $q.defer();
        $http.get(baseApiUrl + path, params).then(function (data) {
            q.resolve(data);
        }, function (err) {
            q.reject(err);
        });
        return q.promise;
    }

    /*function post(path, postData) {
        var q = $q.defer();
        $http.post(baseApiUrl + path, postData).then(function (data) {
            q.resolve(data);
        }, function (err) {
            q.reject(err);
        });
        return q.promise;
    }*/

    var pipes = {
        get: function () {
            return get('/api/leaks').then(function(result){
               return result;
            }, function(result){
                
            });
        }
    };

    return {
        pipes: pipes
    };
}]);
