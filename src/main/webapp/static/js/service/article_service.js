'use strict';

angular.module('myApp').factory('ArticleService', ['$http', '$q','$rootScope', '$window', function($http, $q,$rootScope,$window){

    var REST_SERVICE_URI = 'http://localhost:1212';

    var writerId = $rootScope.user.id;

    var deferred;

    var factory = {
        fetchAllCategories:fetchAllCategories,
        fetchAllArticles: fetchAllArticles,
        updateStatus: updateStatus,
       /* articleFormSubmit: articleFormSubmit,*/
        fetchFilterArticles : fetchFilterArticles,
        deleteArticle : deleteArticle,
        fetchCommentsByArticleId : fetchCommentsByArticleId,
        fetchArticleById : fetchArticleById,
        submitArticle : submitArticle
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


    function submitArticle(article){
        deferred = $q.defer();
        $http.post(REST_SERVICE_URI+'/createArticle/',article)
            .then(
                function (response) {
                    console.log('response');
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while create article');
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
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Filter Articles');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteArticle(id){
        deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+'/deleteArticle/'+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.log('error while delete article id '+id);
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchCommentsByArticleId(articleId){
        deferred = $q.defer();
        $http.get(REST_SERVICE_URI+'/getCommentsWriter/'+articleId)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching comments');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchArticleById(articleId){
        deferred = $q.defer();
        $http.get(REST_SERVICE_URI+'/fetchArticleById/'+articleId)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching single article');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

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
