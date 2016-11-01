'use strict';

angular.module('myApp').factory('ArticleService', ['$http', '$q','$rootScope', '$window', function($http, $q,$rootScope,$window){

    var REST_SERVICE_URI = 'http://localhost:8080';

    var writerId = $rootScope.user.id;

    var deferred;

    var factory = {
        fetchAllCategories:fetchAllCategories,
        fetchAllArticles: fetchAllArticles,
        updateStatus: updateStatus,
        articleFormSubmit: articleFormSubmit,
        fetchFilterArticles : fetchFilterArticles
    };

    return factory;

    function fetchAllCategories(){
        deferred = $q.defer();
        $http.get(REST_SERVICE_URI+'/categories/')
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching categories');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function articleFormSubmit(){
        deferred = $q.defer();
        $http.post(REST_SERVICE_URI+'/createArticle/')
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('error while create article');
                    deferred.reject(errResponse);

                }
            );
        return deferred.promise;
    }

    function fetchAllArticles(){
        deferred = $q.defer();
        $http.get(REST_SERVICE_URI+'/getAllArticles/'+writerId)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching All Articles');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }


    function fetchFilterArticles(status) {
        deferred = $q.defer();
        $http.get(REST_SERVICE_URI+'/filterArticles/'+writerId+'/'+status)
            .then(
                function (response) {
                    console.log('new bbbbbb  '+response.data);
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Filter Articles');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    /*function fetchArticleById(id) {
     var deferred = $q.defer();
     $http.get(REST_SERVICE_URI+id)
     .then(
     function (response) {
     deferred.resolve(response.data);
     },
     function(errResponse){
     console.error('Error while fetching Articles');
     deferred.reject(errResponse);
     }
     );
     return deferred.promise;
     }*/

    function updateStatus(id) {
        deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating Article');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);
