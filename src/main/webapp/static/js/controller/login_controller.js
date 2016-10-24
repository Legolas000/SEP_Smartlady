'use strict';

angular.module('myApp').controller('LoginController',
    ['$rootScope','$scope', 'LoginService','$location','$routeParams','$sce','$cookies',
                    function($rootScope, $scope, LoginService,$location,$routeParams,$sce,$cookies) {
            var self = this;

            angular.extend($scope,{
                doLogin : function (loginForm) {
                    var userData = {
                        email : $scope.email,
                        password : $scope.password
                    };

                    LoginService.doLogin(userData)
                    .then(
                        function (data) {
                            $location.path('/home');
                        },
                        function (errResponse) {
                            console.error('Error: Login fail. ');
                        }
                    );

                },

                doLogOut : function () {
                    LoginService.doLogOut();
                    $location.path('/');
                }
            });



        }]);

/**
 * Created by Fazeel on 10/15/2016.
 */
