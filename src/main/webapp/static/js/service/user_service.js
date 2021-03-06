    'use strict';

    angular.module('myApp').factory('UserService',
                            ['$http', '$q','$rootScope', function($http, $q, $rootScope){

                var REST_SERVICE_URI = 'http://localhost:1212/';

                var factory = {
                    fetchItemById: fetchItemById,
                    getFeturedArticleService: getFeturedArticleService,
                    getArticlesSortedByDate: getArticlesSortedByDate,
                    getTopRatedArticles : getTopRatedArticles,
                    getArticlesByCategoryID:getArticlesByCategoryID,
                    doRatingForArticle:doRatingForArticle,
                    fetchReadesDetails:fetchReadesDetails,
                    doLike:doLike,
                    getCommentsForArticle:getCommentsForArticle,
                    doComment : doComment,
                    getAllComments:getAllComments,
                    getAllCategories:getAllCategories,
                    getAllAdvertisementOrderByPrice : getAllAdvertisementOrderByPrice,
                    getAllAdvertisementOrderByPriceAndByCategoryID:getAllAdvertisementOrderByPriceAndByCategoryID
                };

                return factory;

                function fetchItemById(category,id) {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+category+'/'+id+'/'+$rootScope.user.id)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching Advertisements');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }


                /*function getFeturedArticle() {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"featuredarticle/")
                        .then(
                            function (response) {
                                console.log('response to be edited', response.data);
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching Advertisements');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }*/

                function getFeturedArticleService() {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"featuredarticle/")
                        .then(
                            function (response) {
                                deferred.resolve(JSON.stringify(response.data));
                            },
                            function(errResponse){
                                console.error('Error while fetching featuredarticle');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getAllAdvertisementOrderByPrice() {
                    console.log("getAllAdvertisementOrderByPrice in controler Called");

                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"advertisementsorderbyprice")
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching advertisements order by price');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getAllAdvertisementOrderByPriceAndByCategoryID(categoryID) {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"advertisementsByCategoryOrderByPrice/"+categoryID)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching advertisements order by price');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }


                function getArticlesSortedByDate() {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"allarticles/")
                        .then(
                            function (response) {
                                deferred.resolve(JSON.stringify(response.data));
                            },
                            function(errResponse){
                                console.error('Error while fetching allarticles');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getTopRatedArticles() {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"topRatedArticles")
                        .then(
                            function (response) {
                                deferred.resolve(JSON.stringify(response.data));
                            },
                            function(errResponse){
                                console.error('Error while fetching allarticles');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getArticlesByCategoryID(categoryID) {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"categoryidforarticle/"+categoryID)
                        .then(
                            function (response) {
                                deferred.resolve(JSON.stringify(response.data));
                            },
                            function(errResponse){
                                console.error('Error while fetching articles by category id');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function doRatingForArticle(articleId,rating,userID) {

                    var reades = {
                        'readerID':userID,
                        'articleID':articleId,
                        'rate':rating
                    };
                    JSON.stringify(reades);

                    var deferred = $q.defer();
                    $http.post(REST_SERVICE_URI,rating,reades)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching rating : '+ errResponse.statusText);
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function doLike(articleId,likeStatus,userID) {
                    var reades = {
                        'readerID':userID,
                        'articleID':articleId,
                        'isLike':likeStatus
                    };
                    JSON.stringify(reades);

                    var deferred = $q.defer();
                    $http.post(REST_SERVICE_URI+"dolike/"+likeStatus,reades)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while updating like : '+ errResponse.statusText);
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function fetchReadesDetails(articleId,userID){
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"reades/"+articleId+"/"+userID)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching reades details.');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getAllComments() {

                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"getAllComments")
                        .then(
                            function (response) {
                                deferred.resolve(JSON.stringify(response.data));
                            },
                            function(errResponse){
                                console.error('Error while fetching All Comments in service.');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getCommentsForArticle(articleId) {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"getComments/"+articleId)
                        .then(
                            function (response) {
                                deferred.resolve(JSON.stringify(response.data));
                            },
                            function(errResponse){
                                console.error('Error while fetching reades details.');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function doComment(commentsData) {
                    var deferred = $q.defer();
                    $http.post(REST_SERVICE_URI+'comment',commentsData)
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while Registering'+errResponse.statusText);
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }

                function getAllCategories() {
                    var deferred = $q.defer();
                    $http.get(REST_SERVICE_URI+"allCategories")
                        .then(
                            function (response) {
                                deferred.resolve(response.data);
                            },
                            function(errResponse){
                                console.error('Error while fetching all categories');
                                deferred.reject(errResponse);
                            }
                        );
                    return deferred.promise;
                }




        }]);

