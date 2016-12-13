angular.module('influx').controller('LoginController',['$rootScope','$scope', 'LoginService','$location','$window', '$sce','$cookies', '$mdDialog',
    function($rootScope, $scope, LoginService,$location,$window, $sce,$cookies, $mdDialog) {
            var self = this;
            console.log('Inside Controller');
            angular.extend($scope,{
                doLogin : function (loginForm) {
                    console.log('Inside DoLogin');
                    var userData = {
                        email : $scope.email,
                        password : $scope.password
                    };

                    LoginService.doLogin(userData)
                    .then(
                        function (data) {
                            //$location.path('/adboard');
                            if(data.userrole != 4)
                            {
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#login_page')))
                                        .clickOutsideToClose(true)
                                        .title('ALERT')
                                        .textContent('The login you have provided does not have the required privileges.Please use an administrator login.')
                                        .ariaLabel('WARNING!!!')
                                        .ok('OK')
                                    //.targetEvent(ev)
                                );
                                this.doLogOut();
                            }
                            else
                            {
                                $window.location.href = 'admin#/gaview2'
                                console.log('You passed',data);
                            }
                        },
                        function (errResponse) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('ALERT')
                                    .textContent('The login details provided do not exist. Please try again')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('OK')
                                    //.targetEvent(ev)
                            );
                            //alert('THis is a test');
                            console.error('Error: Login fail. ');
                        }
                    );

                },

                doLogOut : function () {
                    LoginService.doLogOut();
                    $location.path('adlog');
                }
            });

            $scope.testFunc = testFunc;
            function testFunc()
            {
                console.log('THe test function is being called.');
            }



        }]);