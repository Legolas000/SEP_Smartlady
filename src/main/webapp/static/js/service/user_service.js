'use strict';

angular.module('myApp').factory('UserService',
                        ['$http', '$q', function($http, $q){

            var REST_SERVICE_URI = 'http://localhost:8080/';

            var factory = {
                fetchItemById: fetchItemById,
                getFeturedArticleService: getFeturedArticleService,
                getArticlesSortedByDate: getArticlesSortedByDate
            };

            return factory;

            function fetchItemById(category,id) {
                var deferred = $q.defer();
                $http.get(REST_SERVICE_URI+category+'/'+id)
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
                console.log("getFeturedArticleService called");
                var deferred = $q.defer();
                $http.get(REST_SERVICE_URI+"featuredarticle/")
                    .then(
                        function (response) {
                            console.log('response to be edited featuredarticle from service', response.data);
                            deferred.resolve(JSON.stringify(response.data));
                        },
                        function(errResponse){
                            console.error('Error while fetching featuredarticle');
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
                            console.log('response to be edited allarticles from service', response.data);
                            deferred.resolve(JSON.stringify(response.data));
                        },
                        function(errResponse){
                            console.error('Error while fetching allarticles');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }


    }]);

