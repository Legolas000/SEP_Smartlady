'use strict';

angular.module('myApp').controller('UserController',
                        ['$scope', 'UserService','LoginService','$location','$route','$routeParams','$sce',
                        '$cookies','$rootScope','filterFilter',
                        function($scope, UserService,LoginService,$location,$route,$routeParams,$sce,$cookies,$rootScope,filterFilter) {
    var self = this;

    $scope.currentDate = new Date();

    self.article = {};
    self.top1stArticle = {};
    self.top2ndArticle = {};
    self.top3rdArticle = {};
    self.top4thArticle = {};
    self.classStyle = 'second-style';
    self.locationPath = $location.path();
    self.modalPath = "/#"+$location.path();
    self.articleT={
        id:null,
        title:'',
        description:'',
        publishedDate:'',
        coverImagePath:'',
        featured:null,
        overallRating:null,
        categoryID:null,
        writerID:null,
        status:'',
        totalLikes:null,
        totalViews:null
    };


    self.articles = [];


    self.wholeArticles = [];

    self.articlesToAdd = [];

    self.obj = null;
    $scope.items = [];
    getFeturedArticle();
    getArticlesSortedByDate();

    if($routeParams.articleId != null){
        getReaderArticle($routeParams.articleId);
    }


    $scope.user1 = {rating:5};
    $scope.averageRating = 0;

    $scope.isReadonly = true;
    $scope.rateFunction = function(rating) {
    };

    $scope.doRating = function(articleId){
        //alert("$scope.user1 : "+ $scope.user1.rating+" & articleId : "+articleId +" & userid : "+$rootScope.user.id);
        UserService.doRatingForArticle(articleId, $scope.user1.rating,$rootScope.user.id)
        .then(
            function (data) {
                getFeturedArticle();
                getArticlesSortedByDate();
            },
            function (errResponse) {
                console.error('Error while fetching Articles');
            }
        );


    }

    if(LoginService.getAuthStatus()){
        $rootScope.userRole = $cookies.getObject("userAuthObj").userrole;
    }else{
        $rootScope.userRole = 0;
    }




    //self.getReaderArticle = getReaderArticle;


    /*if(self.locationPath === '/home'){
        self.classStyle = 'second-style';
    }else{
        self.classStyle = '';
    }*/

    /*//to render html contents.
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };*/

    function getReaderArticle(id){

        UserService.fetchItemById('readarticles', id)
        .then(
            function (data) {
                self.article = {};
                self.article = data;
                self.article.description = $sce.trustAsHtml(self.article.description );
                getSocialShareModel();
                getReadesDetails(id);
                //$location.url('/readarticles');

            },
            function (errResponse) {
                console.error('Error while fetching Articles');
            }
        );
    }

    function getReadesDetails(id) {
        UserService.fetchReadesDetails(id,$rootScope.user.id)
            .then(
                function (data) {
                    $scope.reades = data;
                    if($scope.reades.rate != 0){
                        $scope.user1.rating = $scope.reades.rate;
                    }
                },
                function (errResponse) {
                    console.error('Error while fetching Articles');
                }
            );
    }

    /*function getReaderArticle(id) {
        goReaderArticle(id);
        console.log('Article approval confirmed for id:- ', id);
    }*/

    function getFeturedArticle() {
        UserService.getFeturedArticleService()
            .then(
                function (data) {
                    //self.articles = data;
                    angular.forEach(JSON.parse(data), function(value, key){
                            self.articlesToAdd.push({
                                id:value.id,
                                title:value.title,
                                publishedDate:value.publishedDate,
                                description: $sce.trustAsHtml(value.description),
                                coverImagePath:value.coverImagePath,
                                overallRating:value.overallRating,
                                categoryID:value.categoryID,
                                categoryName:value.category.catName,
                                writerID:value.writerID,
                                writerName:value.userAsWriter.fullname,
                                totalLikes:value.totalLikes,
                                totalViews:value.totalViews
                            });
                    });
                    $scope.featuredArticles = self.articlesToAdd;


                    //sortByFeaturedCategory(self.articlesToAdd);
                },
                function (errResponse) {
                    console.error('Error while fetching featured article');
                }
            );
    }

    function getArticlesSortedByDate() {

        UserService.getArticlesSortedByDate()
            .then(
                function (data) {
                    angular.forEach(JSON.parse(data), function(value, key){
                        self.wholeArticles.push({
                            id:value.id,
                            title:value.title,
                            publishedDate:value.publishedDate,
                            description: $sce.trustAsHtml(value.description),
                            coverImagePath:value.coverImagePath,
                            overallRating:value.overallRating,
                            categoryID:value.categoryID,
                            categoryName:value.category.catName,
                            writerID:value.writerID,
                            writerName:value.userAsWriter.fullname,
                            totalLikes:value.totalLikes,
                            totalViews:value.totalViews

                        });
                    });

                    $scope.items = JSON.parse(data);
                    getPagination();

                },
                function (errResponse) {
                    console.error('Error while fetching featured article');
                }
            );
    }

    function getPagination() {
        // create empty search model (object) to trigger $watch on update
        $scope.search = {};

        $scope.resetFilters = function () {
            // needs to be a function or it won't trigger a $watch
            $scope.search = {};
        };

        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.items.length;
        $scope.entryLimit = 10; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

        // $watch search to update pagination
        $scope.$watch('search', function (newVal, oldVal) {
            $scope.filtered = filterFilter($scope.items, newVal);
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }, true);
    }

    function getSocialShareModel() {
        $scope.myModel = {
            Url: 'http://jasonwatmore.com/post/2014/08/01/AngularJS-directives-for-social-sharing-buttons-Facebook-Like-GooglePlus-Twitter-and-Pinterest.aspx',
            //Url: $location.absUrl(),
            Name: self.article.title,
            ImageUrl: self.article.coverImagePath
        };
    }





}]);

