'use strict';

(function () {
    angular.module('canaryApp').factory('ApiService', ApiService);

    ApiService.$inject = ['$http', '$q'];

    function ApiService ($http, $q) {
        var baseApiUrl = 'http://google.com/';

        function get(path, params) {
            var q = $q.defer();
            $http.get(baseApiUrl + path, params).then(function(data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }

        function post(path, postData) {
            var q = $q.defer();
            $http.post(baseApiUrl + path, postData).then(function(data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }

        var score = {
            get: function() {
                return get('');
            }
        };

        return {
            score: score
        };
    }
}());