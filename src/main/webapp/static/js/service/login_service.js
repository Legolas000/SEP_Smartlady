/**
 * Created by Fazeel on 10/15/2016.
 */
'use strict';

angular.module('myApp').factory('LoginService',
    ['$http', '$q','$cookies','$rootScope', function($http, $q, $cookies,$rootScope){

        var REST_SERVICE_URI = 'http://localhost:8080/';

        var factory = {
            doLogin: doLogin,
            getAuthStatus : getAuthStatus,
            doLogOut : doLogOut

        };

        return factory;

        function doLogin(userData) {
            var deferred = $q.defer();
            $http.post(REST_SERVICE_URI+'login',userData)
                .then(
                    function (response) {
                        $cookies.put('auth',response.data);
                        $cookies.putObject("userAuthObj",response.data);
                        console.log("$cookies.getObject(userAuthObj)) :> ", $cookies.getObject("userAuthObj"));
                        console.log("$cookies.getObject(userAuthObj).fullname) :> ", $cookies.getObject("userAuthObj").fullname);

                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('Error while fetching Advertisements');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function getAuthStatus() {
            console.log("getAuthStatus called");

            var status = $cookies.get('auth');
            if(status){
                $rootScope.userRole = $cookies.getObject("userAuthObj").userrole;
                $rootScope.user = $cookies.getObject("userAuthObj");
                console.log("$rootScope.userRole : " + $rootScope.userRole);
                return true;
            }else{
                $rootScope.userRole = 0;
                $rootScope.user = null;
                console.log("$rootScope.userRole : " + $rootScope.userRole);
                return false;
            }
        }
        
        function doLogOut() {
            $cookies.remove('auth');
            $cookies.remove('userAuthObj');
        }


    }]);

