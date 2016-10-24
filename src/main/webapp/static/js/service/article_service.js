'use strict';

angular.module('myApp').factory('ArticleService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://localhost:8080/articles/';

    var factory = {
        fetchAllArticles: fetchAllArticles,
        /*fetchArticleById: fetchArticleById,*/
        updateStatus: updateStatus
    };

    return factory;

    function fetchAllArticles() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
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
        var deferred = $q.defer();
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
