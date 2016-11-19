'use strict';

var App = angular.module('myApp',['ngRoute','ngCookies','ngPassword','ui.bootstrap','angulike','ui.tinymce']);

angular.module('myApp').config(['$routeProvider', function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/static/js/template/reader-template/login.html',
            authenticated: false
            // controller : "UserController as userCtrl"
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
            authenticated: false
            // controller : "UserController as userCtrl"
        })
        .when('/advertiser_home', {
            templateUrl: '/static/js/template/advertiser-template/requestAdvertise.jsp',
            authenticated: false
            // controller : "UserController as userCtrl"
        })
        .when('/writer_articles', {
            templateUrl: '/static/js/template/writer-template/writer_articles.html',
            authenticated: false
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

        .otherwise({redirectTo:'/'});
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
                        $location.path('/');
                    }
                }

                if(next.$$route.originalPath == '/'){
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




/*
angular.module('myApp').directive('slideit',function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            slideit: '=',
            bestDealClicked: "=click"
        },
        template:'<ul class="bxslider" >'+
        '<li ng-repeat="slide in bestDeals | limitTo:3" >'+
        '<div class="news-post image-post">'+
        '<img src="/static/upload/news-posts/h2.jpg" alt="">'+
        '<div class="hover-box">'+
        '<div class="inner-hover">'+
        '<a class="category-post world">Business 123</a>'+
        '<h2><a href="single-post.html">Franca do të bashkëpunojë me Kosovën në ekonomi. </a></h2>'+
        '<ul class="post-tags">'+
        '<li><i class="fa fa-clock-o"></i>27 may 2013</li>'+
        '<li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>'+
        '<li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>'+
        '<li><i class="fa fa-eye"></i>872</li>'+
        '</ul>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '</ul>',
        link: function(scope, elm, attrs) {
            elm.ready(function() {
                scope.$apply(function() {
                    scope.bestDeals = scope.slideit;
                });
                elm.bxSlider
                ({
                    captions: true,
                    auto: true,
                    autoControls: true,
                    slideWidth: 110,
                    minSlides: 1,
                    maxSlides: 6,
                    moveSlides: 1,
                    slideMargin: 10,
                    pager: false,
                    autoHover: true
                });
            });
        }
    };
});

 https://gist.github.com/busuttil/6420908491a165c3b993
*/

/*App.directive('slideshow',function() {
    return {
        /!*

         // good explanation
         http://stackoverflow.com/questions/19127725/trying-to-convert-jquery-plugin-to-angular-directive

         The restrict option:
         'A' - only matches attribute name
         'E' - only matches element name
         'C' - only matches class name
         These restrictions can all be combined as needed:
         'AEC' - matches either attribute or element or class name
         *!/
        restrict: 'A',
        replace: true,
        // use new isolated scope
        // if use a child scope that inherits from parent, scope: true
        scope: {
            // same as '=slideshow'
            slideshow: '=',
            bestDealClicked: "=click"
        },
        template: '<ul class="bxslider">' +
        '<li ng-repeat="bestDeal in bestDeals" style="height: 160px;">' +
        '<img style="-moz-border-radius: 10px;  border-radius: 10px;  border-top-left-radius:10px;	border-top-right-radius:10px;	border-bottom-left-radius:10px;	border-bottom-right-radius:10px;" ng-click="bestDealClicked(bestDeal.title)" ng-src="{{bestDeal.src}}" alt="" />' +
        '<h3 style="text-align: center; margin-top: 6px;font-size: 11px;color: grey !important;text-transform: none !important;">{{bestDeal.title}}</h3>' +
        '<h4 style="position: absolute; top: 0px; right: 0px; text-align: right; margin: 0px; padding: 4px; background-color: yellow; font-family: Verdana !important; font-size: 12px !important; font-weight: bold !important; -moz-border-radius: 5px; border-radius: 5px; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">{{bestDeal.price}}</h4>' +
        '</li>' +
        '</ul>',
        link: function(scope, elm, attrs) {
            elm.ready(function() {
                scope.$apply(function() {
                    scope.bestDeals = scope.slideshow;
                });
                elm.bxSlider
                ({
                    captions: true,
                    auto: true,
                    autoControls: true,
                    slideWidth: 110,
                    minSlides: 1,
                    maxSlides: 5,
                    moveSlides: 1,
                    slideMargin: 10,
                    pager: true,
                    autoHover: true
                });
            });
        }
    };
});

App.controller('BestDealsCtrl', function($scope) {
    $scope.title = 'Best Deals!';

    $scope.bestDeals = [
        {src: 'http://placehold.it/110x110&text=Best%20Deal%201', title: 'Best Deal 1', price: '$1.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%202', title: 'Best Deal 2', price: '$2.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%203', title: 'Best Deal 3', price: '$3.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%204', title: 'Best Deal 4', price: '$4.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%205', title: 'Best Deal 5', price: '$5.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%206', title: 'Best Deal 6', price: '$6.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%207', title: 'Best Deal 7', price: '$7.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%208', title: 'Best Deal 8', price: '$8.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%209', title: 'Best Deal 9', price: '$9.00'},
        {src: 'http://placehold.it/110x110&text=Best%20Deal%2010', title: 'Best Deal 10', price: '$10.00'}
    ];

    $scope.bestDealClicked = function(src){
        $scope.title = 'Best Deals! You selected the best deal: ' + src;
    }
});*/

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



