/**
 * Created by ARHAM on 9/30/2016.
 * Service for Advertiser
 */
'use strict';

angular.module('myApp').factory('AdvertiserService',
    ['$http', '$q', function($http, $q){

        var REST_SERVICE_URI = 'http://localhost:1212/';

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

        function fetchAllCategories() {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI+'categories/')
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                        console.error('Success, No Errors while resolve');
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
                        console.error('No Errors while resolve');
                        deferred.resolve(response.data);
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
            $http.post(REST_SERVICE_URI+'assignadvertise/advertise/', advertise)
                .then(
                    function (response) {

                        deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('hey Service error : Error while creating Advertise');
                        deferred.reject(errResponse);
                    }
                );
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

        /*function fetchAllPaymentPlans() {
         var deferred = $q.defer();
         $http.get(REST_SERVICE_URI+'getPaymentPlans/')
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
         }*/



    }]);

