angular.module('influx').factory('LoginService',
    ['$http', '$q','$cookies','$window','$rootScope', function($http, $q, $cookies,$window,$rootScope){

        var REST_SERVICE_URI = 'http://localhost:1212/admin/';

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
                        console.error('Given details do not exist.');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function getAuthStatus() {
            var status = $cookies.get('auth');
            if(status){
                $rootScope.userRole = $cookies.getObject("userAuthObj").userrole;
                $rootScope.user = $cookies.getObject("userAuthObj");
                return true;
            }else{
                $rootScope.userRole = 0;
                $rootScope.user = null;
                return false;
            }
        }

        function doLogOut() {
            //alert('This is the loggout working');
            $cookies.remove('auth');
            $cookies.remove('userAuthObj');
            $window.location.href = '/adlog'
        }


    }]);