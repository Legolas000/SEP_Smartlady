/**
 * Created by ARHAM on 9/30/2016.
 * Service for Advertiser
 */
'use strict';

angular.module('myApp').factory('AdvertiserService',
    ['$http', '$q', function($http, $q){

        var REST_SERVICE_URI2 = 'http://localhost:8080/advertisements/';
        var REST_SERVICE_URI = 'http://localhost:8080/assignadvertise/advertise/';
        var uploadUrl = "http://localhost:8080/user/saveUserDataAndFile";
        var factory = {
            fetchAllAdvertise:fetchAllAdvertise,
            createAdvertise:createAdvertise,
            saveImage:saveImage
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


        function fetchAllAdvertise() {
            var deferred = $q.defer();
            $http.get(REST_SERVICE_URI2)
                .then(
                    function (response) {
                        //console.error('No Errors while resolve');
                        deferred.resolve(response.data);
                        //console.error('second, No Errors while resolve');
                    },
                    function(errResponse){
                        console.error('Error while fetching Users');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function createAdvertise(advertise) {
            var deferred = $q.defer();
            $http.post(REST_SERVICE_URI, advertise)
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

        function saveImage(myFile) {
            var deferred = $q.defer();
            $http.post(uploadUrl, myFile)
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



    }]);

