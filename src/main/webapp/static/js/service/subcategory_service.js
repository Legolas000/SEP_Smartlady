'use strict';

angular.module('myApp').factory('SubCategoryService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI_NORM = 'http://localhost:1212/SmartLady/subcategories/';
    var REST_SERVICE_URI_FIL =  'http://localhost:1212/SmartLady/categories/sub/';
    
    var factory = {
    	fetchAllSubCategories: fetchAllSubCategories,
        fetchFilSubCategories : fetchFilSubCategories,
        createSubCategory: createSubCategory,
        updateSubCategory: updateSubCategory,
        deleteSubCategory: deleteSubCategory
    };

    return factory;

    function fetchAllSubCategories() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI_NORM)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching SubCategories');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }
    
    function fetchFilSubCategories(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI_FIL+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching SubCategories');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createSubCategory(subcategory) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_NORM, subcategory)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while creating SubCategory');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function updateSubCategory(subcategory, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI_NORM+id, subcategory)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating SubCategory');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteSubCategory(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI_NORM+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting SubCategory');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);
