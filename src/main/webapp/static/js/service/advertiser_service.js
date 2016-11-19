/**
 * Created by ARHAM on 9/30/2016.
 * Service for Advertiser
 */
'use strict';

angular.module('myApp').factory('AdvertiserService',
    ['$http', '$q', function($http, $q){

        var REST_SERVICE_URI = 'http://localhost:8080/';
        /*var REST_SERVICE_URI2 = 'http://localhost:8080/advertisements/';
        var REST_SERVICE_URI = 'http://localhost:8080/assignadvertise/advertise/';
        var REST_SERVICE_URI3 = 'http://localhost:8080/updateAdvertise/';
        var uploadUrl = "http://localhost:8080/user/saveUserDataAndFile";
        var REST_SERVICE_Category_URL = 'http://localhost:8080/categories/';*/
        var factory = {
            fetchAllAdvertise:fetchAllAdvertise,
            createAdvertise:createAdvertise,
            saveImage:saveImage,
            fetchAllCategories:fetchAllCategories,
            updateAdvertise:updateAdvertise,
            getSelectedAdvertise:getSelectedAdvertise,
            fetchAllPayments:fetchAllPayments
        };

        return factory;

        /*function fetchItemById(category,id) {
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
         }*/
        function fetchAllCategories() {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI+'categories/')
                .then(
                    function (response) {
                        console.log('Respons bbbbbbb' + response);
                        deferred.resolve(response.data);
                        //console.error('second, No Errors while resolve');
                    },
                    function(errResponse){
                        console.error('Error while fetching Categories');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function fetchAllAdvertise() {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI+'advertisements/')
                .then(
                    function (response) {
                        //console.error('No Errors while resolve');
                        deferred.resolve(response.data);
                        //console.error('second, No Errors while resolve');
                    },
                    function(errResponse){
                        console.error('Error while fetching Advertise');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function createAdvertise(advertise) {
            var deferred = $q.defer();
            console.log(advertise);
            $http.post(REST_SERVICE_URI+'assignadvertise/advertise/', advertise)  //,advertise.advertiseimg
                .then(
                    function (response) {

                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('hey Service error : Error while creating Advertise');
                        deferred.reject(errResponse);
                    }
                );
            // /$http.post(REST_SERVICE_URI+'assignadvertise/advertise/', advertise)  //,advertise.advertiseimg
            //     .then(
            //         function (response) {
            //
            //             deferred.resolve(response.data);
            //         },
            //         function(errResponse){
            //             console.error('hey Service error : Error while creating Advertise');
            //             deferred.reject(errResponse);
            //         }
            //     );
            return deferred.promise;
        }



        function getSelectedAdvertise(id) {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI+'getSelectedAdvertise/'+id)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('Error while updating advertise');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function updateAdvertise(advertise) {
            var deferred = $q.defer();
            $http.put(REST_SERVICE_URI+'updateAdvertise/', advertise)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('Error while updating advertise');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function saveImage(myFile) {
            var deferred = $q.defer();
            console.log("Function is saveImage service!");
            $http.post(REST_SERVICE_URI+'user/saveUserDataAndFile', myFile)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('hey Service error : Error while saving image');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;

            /*, {
             transformRequest : angular.identity,
             headers : {
             'Content-Type' : undefined
             }
             }).success(function() {
             console.log('success');
             }).error(function() {
             console.log('error');
             });*/
        }
        function fetchAllPayments() {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI+'getPayments/')
                .then(
                    function (response) {
                        console.error('No Errors while fetch payments');
                        deferred.resolve(response.data);
                        //console.error('second, No Errors while resolve');
                    },
                    function(errResponse){
                        console.error('Error while fetching payments');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

    }]);

