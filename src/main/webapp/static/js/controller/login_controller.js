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
                                sweetAlert("Error!!", "Invalid user name or password!", "error");
                            }
                        );

                },

                doLogOut : function () {
                    LoginService.doLogOut();
                    $location.path('/login');
                    location.reload();
                }
            });



        }]);

/**
 * Created by Fazeel on 10/15/2016.
 */
