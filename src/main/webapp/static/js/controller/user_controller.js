'use strict';

angular.module('myApp').controller('UserController',
    ['$scope', 'UserService','LoginService','$location','$route','$routeParams','$sce',
        '$cookies','$rootScope','filterFilter','$interval',
        function($scope, UserService,LoginService,$location,$route,$routeParams,$sce,$cookies,$rootScope,filterFilter,$interval) {
            var self = this;

            $scope.currentDate = new Date();
            //$scope.isLike = false;
            //$scope.likeColor = '';
            self.article = {};
            self.top1stArticle = {};
            self.top2ndArticle = {};
            self.top3rdArticle = {};
            self.top4thArticle = {};
            self.commentsForArticle = {};
            self.classStyle = 'second-style';
            self.locationPath = $location.path();
            self.modalPath = "/#"+$location.path();
            $scope.BottomOfPage=[];
            $scope.MiddleOfPage=[];
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

            $scope.allCategoriesMore = [];

            self.topRatedArticles = [];

            self.articlesByCategoryID = [];

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
            getAllCategories();
            getAllAdvertisementOrderByPrice();

            if($routeParams.articleId != null){
                getReaderArticle($routeParams.articleId);

            }

            if($routeParams.categoryIDforArticle != null){
                getArticlesByCategoryID($routeParams.categoryIDforArticle);
                getAllAdvertisementOrderByPriceAndByCategoryID($routeParams.categoryIDforArticle);
            }

            $scope.user1 = {rating:1};
            $scope.averageRating = 0;

            $scope.isReadonly = true;
            $scope.rateFunction = function(rating) {
            };

            $scope.doRating = function(articleId){
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
                $scope.isLike = !$scope.isLike;
                if($scope.isLike === true){
                    $scope.likeColor = 'text-danger';
                    $scope.likeStatus ='Liked';
                    $scope.likeSize = 'fa-3x';
                }else{
                    $scope.likeColor = '';
                    $scope.likeStatus = 'Like';
                    $scope.likeSize = 'fa-2x';
                }

                UserService.doLike(articleId,$scope.isLike,$rootScope.user.id)
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
                            $scope.userComments = '';
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
                            self.article.publishedDate = mysqlTimeStampToDate(self.article.publishedDate);

                            self.article.description = $sce.trustAsHtml(self.article.description );
                            console.log("CatID : "+ self.article.categoryID);
                            getAllAdvertisementOrderByPriceAndByCategoryID(self.article.categoryID);
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
                            angular.forEach($scope.comments, function(value, key){
                                $scope.comments[noOfComments].dateTime = mysqlTimeStampToDate(value.dateTime);
                                noOfComments++;
                            });
                            $scope.noOfComments = noOfComments;
                            //console.log("self.commentsForArticle = "+ JSON.stringify(self.commentsForArticle) );
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
                                $scope.allComments[noOfAllComments].dateTime = mysqlTimeStampToDate(value.dateTime);
                                noOfAllComments++;
                            });
                            $scope.noOfAllComments = noOfAllComments;
                        },
                        function (errResponse) {
                            console.error('Error while fetching All Comments in user controle');
                        }
                    );
            }

            function getAllCategories() {
                UserService.getAllCategories()
                    .then(
                        function (data) {
                            $scope.allCategories = data;
                            var categoryCount = 0;
                            angular.forEach(data, function(value, key){
                                if(categoryCount > 7){
                                    $scope.allCategoriesMore.push(value);
                                }
                                categoryCount++;
                            });
                        },
                        function (errResponse) {
                            console.error('Error while fetching All Categories in user controle');
                        }
                    );
            }

            function getAllAdvertisementOrderByPrice(){
                console.log("getAllAdvertisementOrderByPrice in controler Called");
                UserService.getAllAdvertisementOrderByPrice()
                    .then(
                        function (data) {
                            $scope.Advertisements = data;

                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.Advertisements.length-1) );
                                $scope.adSideTopRendom = $scope.Advertisements[randomIndex];
                            }, 1000*5);

                                $interval(function() {
                                    var randomIndex = Math.round( Math.random() * ($scope.Advertisements.length-1) );
                                    $scope.adSideBottomRendom = $scope.Advertisements[randomIndex];
                                }, 1000*4);

                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.Advertisements.length-1) );
                                $scope.adMiddlePageRendom1 = $scope.Advertisements[randomIndex];
                            }, 1000*5);

                                $interval(function() {
                                    var randomIndex = Math.round( Math.random() * ($scope.Advertisements.length-1) );
                                    $scope.adMiddlePageRendom2 = $scope.Advertisements[randomIndex];
                                }, 1000*4);

                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.Advertisements.length-1) );
                                    $scope.adMiddleBottomPageRendom1 = $scope.Advertisements[randomIndex];
                            }, 1000*5);

                                $interval(function() {
                                    var randomIndex = Math.round( Math.random() * ($scope.Advertisements.length-1) );
                                    $scope.adMiddleBottomPageRendom2 = $scope.Advertisements[randomIndex];
                                }, 1000*4);

                        },
                        function (errResponse) {
                            console.error('Error while fetching featured article');
                        }
                    );
            }

            function getAllAdvertisementOrderByPriceAndByCategoryID(categoryID){
                UserService.getAllAdvertisementOrderByPriceAndByCategoryID(categoryID)
                    .then(
                        function (data) {
                            $scope.Advertisements = data;


                            for(var a=0;a<data.length;a++){
                                if(data[a].place = "Bottom of Page"){
                                    $scope.BottomOfPage.push(data[a]);
                                }
                            }
                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.BottomOfPage.length-1) );
                                $scope.adRendomForBottomOfPageByCategoryID1 = $scope.BottomOfPage[randomIndex];
                            }, 1000*5);

                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.BottomOfPage.length-1) );
                                $scope.adRendomForBottomOfPageByCategoryID2 = $scope.BottomOfPage[randomIndex];
                            }, 1000*4);

                            for(var a=0;a<data.length;a++){
                                if(data[a].place = "Middle of Page"){
                                    $scope.MiddleOfPage.push(data[a]);
                                }
                            }
                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.MiddleOfPage.length-1) );
                                $scope.adRendomForMiddleOfPageSideByCategoryID1 = $scope.MiddleOfPage[randomIndex];
                            }, 1000*5);

                            $interval(function() {
                                var randomIndex = Math.round( Math.random() * ($scope.MiddleOfPage.length-1) );
                                $scope.adRendomForMiddleOfPageSideByCategoryID2 = $scope.MiddleOfPage[randomIndex];
                            }, 1000*4);









                            /*angular.forEach(JSON.parse(data), function(value, key){
                               /!* if(value.place = "Middle of Page"){
                                    $scope.adMiddleOfPage.push(value);
                                }*!/
                                alert(" Addver"+value.place);

                            });*/


                        },
                        function (errResponse) {
                            console.error('Error while fetching featured article');
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
                                    publishedDate:mysqlTimeStampToDate(value.publishedDate),
                                    description: $sce.trustAsHtml(value.description),
                                    coverImagePath:value.coverImagePath,
                                    overallRating:value.overallRating,
                                    categoryID:value.categoryID,
                                    categoryName:value.category.catName,
                                    writerID:value.writerID,
                                    writerName:value.userAsWriter.fullname,
                                    totalLikes:value.totalLikes,
                                    totalViews:value.totalViews,
                                    noOfComments:value.noOfComments

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
                                    publishedDate:mysqlTimeStampToDate(value.publishedDate),
                                    description: $sce.trustAsHtml(value.description),
                                    coverImagePath:value.coverImagePath,
                                    overallRating:value.overallRating,
                                    categoryID:value.categoryID,
                                    categoryName:value.category.catName,
                                    writerID:value.writerID,
                                    writerName:value.userAsWriter.fullname,
                                    totalLikes:value.totalLikes,
                                    totalViews:value.totalViews,
                                    noOfComments:value.noOfComments
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
                                    publishedDate:mysqlTimeStampToDate(value.publishedDate),
                                    description: $sce.trustAsHtml(value.description),
                                    coverImagePath:value.coverImagePath,
                                    overallRating:value.overallRating,
                                    categoryID:value.categoryID,
                                    categoryName:value.category.catName,
                                    writerID:value.writerID,
                                    writerName:value.userAsWriter.fullname,
                                    totalLikes:value.totalLikes,
                                    totalViews:value.totalViews,
                                    noOfComments:value.noOfComments
                                });
                            });

                        },
                        function (errResponse) {
                            console.error('Error while fetching top rated article');
                        }
                    );
            }

            function getArticlesByCategoryID(categoryID) {

                UserService.getArticlesByCategoryID(categoryID)
                    .then(
                        function (data) {
                            angular.forEach(JSON.parse(data), function(value, key){
                                self.articlesByCategoryID.push({
                                    id:value.id,
                                    title:value.title,
                                    publishedDate:mysqlTimeStampToDate(value.publishedDate),
                                    description: $sce.trustAsHtml(value.description),
                                    coverImagePath:value.coverImagePath,
                                    overallRating:value.overallRating,
                                    categoryID:value.categoryID,
                                    categoryName:value.category.catName,
                                    writerID:value.writerID,
                                    writerName:value.userAsWriter.fullname,
                                    totalLikes:value.totalLikes,
                                    totalViews:value.totalViews,
                                    noOfComments:value.noOfComments
                                });
                            });
                            $scope.articleSize = self.articlesByCategoryID.length;
                            $scope.articlesByCategoryID = self.articlesByCategoryID;
                            getPaginationForCategory();

                        },
                        function (errResponse) {
                            console.error('Error while fetching article by categpry id');
                        }
                    );
            }



            function statusOfLike(data) {
                $scope.isLike = JSON.stringify(data.like);
                if($scope.isLike === true){
                    $scope.likeColor = 'text-danger';
                    $scope.likeStatus ='Liked';
                    $scope.likeSize = 'fa-3x';
                }else{
                    $scope.likeColor = '';
                    $scope.likeStatus = 'Like';
                    $scope.likeSize = 'fa-2x';
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

            function getPaginationForCategory() {
                // create empty search model (object) to trigger $watch on update
                $scope.searchCat = {};

                $scope.resetFiltersCat = function () {
                    // needs to be a function or it won't trigger a $watch
                    $scope.searchCat = {};
                };

                // pagination controls
                $scope.currentPageCat = 1;
                $scope.totalItemsCat = $scope.articlesByCategoryID.length;
                $scope.entryLimitCat = 10; // items per page
                $scope.noOfPagesCat = Math.ceil($scope.totalItemsCat / $scope.entryLimitCat);

                // $watch search to update pagination
                $scope.$watch('search', function (newVal, oldVal) {
                    $scope.filteredCat = filterFilter($scope.articlesByCategoryID, newVal);
                    $scope.totalItemsCat = $scope.filteredCat.length;
                    $scope.noOfPagesCat = Math.ceil($scope.totalItemsCat / $scope.entryLimitCat);
                    $scope.currentPageCat = 1;
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

            function mysqlTimeStampToDate(timestamp) {
                timestamp = timestamp.substring(0, timestamp.length - 1);
                timestamp = timestamp.substring(0, timestamp.length - 1);
                //function parses mysql datetime string and returns javascript Date object
                //input has to be in this format: 2007-06-05 15:26:02
                var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
                var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
                return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
            }


        }]);

