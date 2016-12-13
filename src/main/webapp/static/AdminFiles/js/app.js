'use strict';

var App = angular.module('myApp',['ngMaterial','ngCookies']);

//, 'ngRoute'
// App.config(['$routeProvider', function($routeProvider) {
//     $routeProvider
//         .when('/advertisement', {
//             templateUrl: '/static/AdminFiles/template/AdminAdverstisementViewPartial.html',
//             controller : "AdvertisementController as AdCrtl"
//         })
//         .otherwise({redirectTo:'/advertisement'});
// }]);



var TestTabApp = angular.module('influx', ['ngSanitize','ngMaterial','ngAnimate','ngRoute','ngCookies','ngPassword','ui.grid', 'ui.grid.moveColumns', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.bootstrap', 'ui.grid.edit','ui.grid.pagination' ]);

angular.module('influx').config(['$routeProvider', function($routeProvider){
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider
        .when('/adpview',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminADPaymentsView.html'
            // controller : 'MainCtrl as vm'
        })
        .when('/advview',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminAdvertisementView.html'
            // authenticated : true
            // controller : 'MainCtrl as vm'
        })
        .when('/artview',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminArticleView.html',
            // authenticated  : true
            // controller : 'MainCtrl as vm'
        })
        .when('/catview',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminCategoryView.html',
            // authenticated  : true
            // controller : 'MainCtrl as vm'
        })
        .when('/subcatview',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminSubCategoryView.html',
            // authenticated  :   true
            // controller : 'MainCtrl as vm'
        })
        .when('/usrview',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminUsrMgmView.html',
            // authenticated  :   true
            // controller : 'MainCtrl as vm'
        })
        .when('/404',{
            templateUrl: 'static/AdminFiles/template/Admin/Admin404Page.html',
            // authenticated  :   true
            // controller : 'MainCtrl as vm'
        })
        .when('/adprof',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminProfileView.html',
            // authenticated  :   true
            // controller : 'MainCtrl as vm'
        })
        .when('/SendMail',{
            templateUrl: 'static/AdminFiles/template/Admin/AdminSendUsrSubs.html',
            // authenticated  :   true
            controller : 'SendSubs as vm'
        })
        // .when('/gaview1',{
        //     templateUrl: 'static/AdminFiles/template/Admin/Analytics/AdminGoogleAnalytics_1.html',
        //     // controller : 'MainCtrl as vm'
        // })
        .when('/gaview2',{
            templateUrl: 'static/AdminFiles/template/Admin/Analytics/AdminGoogleAnalytics_2.html',
            // controller : 'MainCtrl as vm'
        })
        // .when('/adboard',{
        //     templateUrl: 'static/AdminFiles/template/Admin/Analytics/AdminDashBoard.html',
        //     // controller : 'MainCtrl as vm'
        // })
        .otherwise({redirectTo:'/'
        });
}])
.run(["$rootScope","$location","$cookies","$window", "LoginService", function($rootScope, $location,$cookies, $window, LoginService) {
    $rootScope.location = $location;
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
       // alert('it is in');
       //  if(error.status === 404) {
       //      $location.path('/404');
       //      alert('this is the detath');
       //  }
        console.log("The auth object", $cookies.getObject("userAuthObj"));
        // if(LoginService.getAuthStatus())
        if($cookies.getObject("userAuthObj") == null)
        {
           // alert('not yet logged in');
            // $rootScope.currentUerLoggedin = true;
            $window.location.href = '/adlog'
        }
        else {
            $rootScope.USId = $cookies.getObject("userAuthObj").id;
            $rootScope.UserName = $cookies.getObject("userAuthObj").fullname;
            $rootScope.ImagePath = $cookies.getObject("userAuthObj").imagePath;
            $rootScope.Address = $cookies.getObject("userAuthObj").address;
            $rootScope.UserDesc = $cookies.getObject("userAuthObj").userdescription;
            $rootScope.EMail = $cookies.getObject("userAuthObj").email;
            // $rootScope.currentUerLoggedin = false;
           // alert('logged in');
        }
    });
}]);

// angular.module('influx').run(["$rootScope","$location","LoginService",function($rootScope, $location, LoginService){
//     alert('This world');
//     $rootScope.$on("$locationChangeStart", function(event, next, current) {
//         alert('insScope');
//         // for(var i in window.routes) {
//         //     alert('inLoop');
//         //     if(next.indexOf(i) != -1) {
//         //         if(window.routes[i].requireLogin && !LoginService.getAuthStatus()) {
//         //             alert("You need to be authenticated to see this page!");
//         //             event.preventDefault();
//         //         }
//         //     }
//         // }
//         // if(next.$$route.authenticated){
//         //     alert('it is authed');
//         //     $rootScope.currentUserSignedIn = true;
//         //     if(!LoginService.getAuthStatus()){
//         //         alert('authNotYet');
//         //         $rootScope.currentUserSignedIn = false;
//         //         $location.path('/');
//         //     }
//         // }
//
//         if(next.$$route.originalPath == '/'){
//             $rootScope.currentUserSignedIn = false;
//             if(LoginService.getAuthStatus()){
//                 $rootScope.currentUserSignedIn = true;
//
//                 $location.path(current.$$route.originalPath);
//             }
//         }
//     });
//
// }]);



