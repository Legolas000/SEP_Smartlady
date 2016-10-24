/**
 * Created by Fazeel on 10/15/2016.
 */
'use strict';

angular.module('myApp').factory('RegisterService',
    ['$http', '$q','$cookies','$rootScope', function($http, $q, $cookies,$rootScope){

        var REST_SERVICE_URI = 'http://localhost:8080/';

        var factory = {
            doRegister : doRegister
        };

        return factory;

        function doRegister(userData) {
            var deferred = $q.defer();
            $http.post(REST_SERVICE_URI+'register',userData)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('Error while Registering'+errResponse.statusText);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

    }]);

