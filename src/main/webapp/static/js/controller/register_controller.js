/**
 * Created by Fazeel on 10/16/2016.
 */

'use strict';

angular.module('myApp').controller('RegisterController',
    ['$rootScope','$scope', 'RegisterService','$location','$routeParams','$sce','$cookies',
        function($rootScope, $scope, RegisterService,$location,$routeParams,$sce,$cookies) {
            var self = this;
            //slef.userRoles = '';

            angular.extend($scope,{

                doRegister : function (registerForm) {
                    var userData = {
                        fullname : $scope.fullname,
                        email : $scope.email,
                        userrole : $scope.userrole,
                        userdescription : $scope.userdescription,
                        address : $scope.address,
                        password : $scope.password,
                        conformPassword : $scope.conformPassword
                    };

                    RegisterService.doRegister(userData)
                        .then(
                            function (data) {
                                console.log("MSG : "+ data);
                                $location.path('/');
                            },
                            function (errResponse) {
                                console.error('Error: Login fail. ');
                            }
                        );
                }
            });
        }]);

/**
 * Created by Fazeel on 10/15/2016.
 */

