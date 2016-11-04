'use strict';

angular.module('myApp').controller('UserController',
    ['$scope', 'UserService','LoginService','$location','$route','$routeParams','$sce',
        '$cookies','$rootScope','filterFilter',
        function($scope, UserService,LoginService,$location,$route,$routeParams,$sce,$cookies,$rootScope,filterFilter) {
            var self = this;

            $scope.currentDate = new Date();
            $scope.likeStaus = false;
            $scope.likeColor = '';
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

            self.topRatedArticles = [];

            self.articlesToAdd = [];

            self.obj = null;

            /*if(self.locationPath === '/home'){
             window.location.reload(true);
             }*/

            //tab switching
            $scope.isPopularTab = 'active';$scope.isRecentTab = '';$scope.isTopReviewsTab = '';
            $scope.showPopularTab = function () {
                $scope.isPopularTab = 'active';$scope.isRecentTab = '';$scope.isTopReviewsTab = '';
            };
            $scope.showRecentTab = function () {
                $scope.isPopularTab = '';$scope.isRecentTab = 'active';$scope.isTopReviewsTab = '';
            };
            $scope.showTopReviewsTab = function () {
                $scope.isPopularTab = '';$scope.isRecentTab = '';$scope.isTopReviewsTab = 'active';
            };


            $scope.initFunction = function(){
                getArticlesSortedByDate();
            };

            getFeturedArticle();
            getArticlesSortedByDate();
            getTopRatedArticles();
            getAllComments();

            if($routeParams.articleId != null){
                getReaderArticle($routeParams.articleId);
            }

            $scope.user1 = {rating:5};
            //$scope.likeStaus = false;
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
            };

            $scope.doLike = function(articleId){
                $scope.likeStaus = !$scope.likeStaus;
                $scope.likeColor = $scope.likeStaus == true ? 'text-danger':'';

                UserService.doLike(articleId,$scope.likeStaus,$rootScope.user.id)
                    .then(
                        function (data) {

                        },
                        function (errResponse) {
                            console.error('Error while fetching Articles');
                        }
                    );
            };

            $scope.doComment = function(articleID){
                var commentsData = {
                    comments : $scope.userComments,
                    userID : $rootScope.user.id,
                    articleID : articleID,
                    dateTime : $scope.currentDate
                };

                UserService.doComment(commentsData)
                    .then(
                        function (data) {
                            getCommentsForArticle(articleID);
                        },
                        function (errResponse) {
                            console.error('Error: Login fail. ');
                        }
                    );
            }

            if(LoginService.getAuthStatus()){
                $rootScope.userRole = $cookies.getObject("userAuthObj").userrole;
            }else{
                $rootScope.userRole = 0;
            }

            function getReaderArticle(id){

                UserService.fetchItemById('readarticles', id)
                    .then(
                        function (data) {
                            self.article = {};
                            self.article = data;
                            self.article.description = $sce.trustAsHtml(self.article.description );
                            getSocialShareModel();
                            getReadesDetails(id);
                            getCommentsForArticle(id);
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
                            statusOfLike(data);

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

            function getCommentsForArticle(id) {
                UserService.getCommentsForArticle(id)
                    .then(
                        function (data) {
                            $scope.comments = JSON.parse(data);
                            var noOfComments = 0;
                            angular.forEach(JSON.parse(data), function(value, key){
                                noOfComments++;
                            });
                            $scope.noOfComments = noOfComments;
                        },
                        function (errResponse) {
                            console.error('Error while fetching Articles');
                        }
                    );
            }

            function getAllComments() {
                UserService.getAllComments()
                    .then(
                        function (data) {
                            $scope.allComments = JSON.parse(data);
                            var noOfAllComments = 0;
                            angular.forEach(JSON.parse(data), function(value, key){
                                noOfAllComments++;
                            });
                            $scope.noOfAllComments = noOfAllComments;
                        },
                        function (errResponse) {
                            console.error('Error while fetching All Comments in user controle');
                        }
                    );
            }


            function getFeturedArticle() {
                UserService.getFeturedArticleService()
                    .then(
                        function (data) {
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
                            $scope.items = [];
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

            function getTopRatedArticles() {

                UserService.getTopRatedArticles()
                    .then(
                        function (data) {
                            angular.forEach(JSON.parse(data), function(value, key){
                                self.topRatedArticles.push({
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

                        },
                        function (errResponse) {
                            console.error('Error while fetching featured article');
                        }
                    );
            }



            function statusOfLike(data) {
                $scope.likeStaus = JSON.stringify(data.like);
                if($scope.likeStaus){
                    $scope.likeColor = 'text-danger';
                }else{
                    $scope.likeColor = '';
                }
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

