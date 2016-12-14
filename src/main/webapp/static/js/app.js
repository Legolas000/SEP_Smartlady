'use strict';

var App = angular.module('myApp',['ngRoute','ngCookies','ngPassword','ui.bootstrap','angulike','ui.tinymce']);

angular.module('myApp').config(['$routeProvider', function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/static/js/template/reader-template/guest-home.html',
            authenticated: false
        })
        .when('/guest_readarticles/:guest_articleId', {
            templateUrl: '/static/js/template/reader-template/guest-single-post.html',
            controller : "UserController as userCtrl",
            authenticated: false
        })
        .when('/guest_category/:categoryIDforArticle', {
            controller : "UserController as userCtrl",
            templateUrl: '/static/js/template/reader-template/guest-category.html',
            authenticated: false
        })
        .when('/login', {
            templateUrl: '/static/js/template/reader-template/login.html',
            authenticated: false
        })
        .when('/home', {
            resolve: {
                "check":function($location,$rootScope) {
                    if($rootScope.userRole == 2){
                        $location.path('/writer_articles');
                    }else if($rootScope.userRole == 3){
                        $location.path('/advertiser_home');
                    }
                }
            },
            templateUrl: '/static/js/template/reader-template/home.html',
            authenticated: true
           // controller : "UserController as userCtrl"
        })
        .when('/writer_home', {
            templateUrl: '/static/js/template/writer-template/writer_home.html',
            authenticated: true
            // controller : "UserController as userCtrl"
        })
        .when('/advertiser_home', {
            templateUrl: '/static/js/template/advertiser-template/viewUpdateAdvertise.jsp',
            authenticated: true
            // controller : "UserController as userCtrl"
        })
        .when('/writer_articles', {
            templateUrl: '/static/js/template/writer-template/writer_articles.html',
            authenticated: true
            // controller : "UserController as userCtrl"
        })
        .when('/register', {
            templateUrl: '/static/js/template/reader-template/register.html',
            authenticated: false
            // controller : "UserController as userCtrl"
        }).when('/editProfile', {
            templateUrl: '/static/js/template/reader-template/edit_profile.html',
            authenticated: false
            // controller : "UserController as userCtrl"
        })
        .when('/readarticles/:articleId', {
            templateUrl: '/static/js/template/reader-template/single-post.html',
            controller : "UserController as userCtrl",
            authenticated: true
        })
        .when('/category/:categoryIDforArticle', {
            controller : "UserController as userCtrl",
            templateUrl: '/static/js/template/reader-template/category.html',
            authenticated: true
        })
        .when('/logout', {
            templateUrl: '/static/js/template/reader-template/login.html',
            authenticated: false
        })
        .when('/assignadvertise', {
            templateUrl: '/static/js/template/advertiser-template/requestAdvertise.jsp',
            controller : "AdvertiserController as adctrl"
        })

        .when('/viewUpdateAdvertise', {
            templateUrl: '/static/js/template/advertiser-template/viewUpdateAdvertise.jsp',
            controller : "AdvertiserController as adctrl"
        })

        .otherwise({redirectTo:'/login'});
}]);



angular.module('myApp')
        .run(["$rootScope","$location","LoginService",
            function($rootScope, $location, LoginService) {
            $rootScope.location = $location;
            $rootScope.facebookAppId = '756171607855514'; // set your facebook app id here
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if(next.$$route.authenticated){
                    $rootScope.currentUserSignedIn = true;
                    if(!LoginService.getAuthStatus()){
                        $rootScope.currentUserSignedIn = false;
                        $location.path('/login');
                    }
                }

                if(next.$$route.originalPath == '/login'){
                    $rootScope.currentUserSignedIn = false;
                    if(LoginService.getAuthStatus()){
                        $rootScope.currentUserSignedIn = true;

                        $location.path(current.$$route.originalPath);
                    }
                }
            });
        }]);


App.directive("fileModel",function() {
    return {
        restrict: 'EA',
        scope: {
            setFileData: "&"
        },
        link: function(scope, ele, attrs) {
            ele.on('change', function() {
                scope.$apply(function() {
                    var val = ele[0].files[0];
                    scope.setFileData({ value: val });
                });
            });
        }
    }
});


angular.module('myApp')
    .directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

angular.module('myApp')
    .directive('owlCarousel',[function() {
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                owlOptions: '='
            },
            link: function(scope, element, attrs) {
                scope.initCarousel = function() {
                    $(element).owlCarousel(scope.owlOptions);
                };
            }
        };

}])
.directive('owlCarouselItem',[function() {
    return function(scope) {
        if (scope.$last) {
            scope.initCarousel();
        }
    };
}]);


App.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});



