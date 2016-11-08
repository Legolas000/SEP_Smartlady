/**
 * Created by ARHAM on 9/24/2016.
 */

'use strict';

angular.module('myApp').controller('AdvertiserController',
    ['$scope', 'AdvertiserService','$rootScope','$http','$window','$modal',
        function($scope,AdvertiserService,$rootScope,$http,$window,$modal){

            fetchAllAdvertise();

            var self = this;
            self.submit = submit;
            self.reset = reset;
            self.updateAdvertise = updateAdvertise;
            self.test = test;
            self.viewAdvertises = viewAdvertises;
            self.submitUser = submitUser;
            self.items = [];
            function test() {
                console.log("Test Success");
            }

            self.advertise={
                id:null,
                /*category:'',
                 heading:'',*/
                url:'www.google.com',
                description:'',
                time:'For 2 Weeks',
                publishedDate:'',
                expiryDate:'',
                place:'middle of right Side',
                payment:'2650.0',
                status:'N',
                advertiseimg:'',
                myFile:''
            };

            self.url2 = "www.youtube.com";
            self.extendTime="For 2 Weeks";

            self.values = {
                id:'',
                url:'',
                exdate: '',
                status:''
            };
            self.updateitems = [];
            self.num = [1 , 2 , 3];
            self.remainingDays = '';

            self.urltest = 'www.youtube.com';
            self.testdescription = 'D';
            self.swt = "";
            self.updateUrl = '';

           // self.check = "";
            self.advertises=[];
            self.Categories=[];
            self.selectedAdvertise=[];

            $scope.uploadFile = function(files) {
                console.log("Function is uploadFile!");
                var fd = new FormData();
                //Take the first selected file
                fd.append("file", files[0]);

                var uploadUrl = "http://localhost:8080/user/saveUserDataAndFile";


                $http.post(uploadUrl, fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success().error();

            };

            function submitUser() {
                console.log("Function is submitUser!");
                var file = self.fileModel;
                console.log('file is ' + self.fileModel);
                console.dir(file);
                var uploadUrl = "http://localhost:8080/user/saveUserDataAndFile";
                var fd = new FormData();
                fd.append('file', file);

                var data = {
                    call1:
                        function (value) {
                            return {'file': file};
                        }
                };
                $http.post(uploadUrl, data, {
                    transformRequest : angular.identity,
                    headers : {
                        'Content-Type' : undefined
                    }
                }).success(function() {
                    console.log('success');
                }).error(function(e) {
                    console.log('error' , e);
                });
            };
            function saveImage(advertise) {
                AdvertiserService.saveImage(advertise)
                    .then(
                        fetchAllAdvertise,
                        function(errResponse){
                            console.error('Error while save images');
                        }
                    );
            }

            $scope.openTimeExtend = function (id) {
                $rootScope.advertiseId = id;
                var modalInstance = $modal.open({
                    templateUrl: '/static/js/template/advertiser-template/extendTimeModal.html',
                    controller: 'PopupCont'
                });
            };

            $scope.openUpdateAll = function (id) {
                $rootScope.advertiseId = id;
                var modalInstance = $modal.open({
                    templateUrl: '/static/js/template/advertiser-template/updateAllModal.html',
                    controller: 'PopupCont'
                });
            };


            /*$scope.onFileSelect = function($files) {

             console.log("Function calling");
             console.log($files); // undefined
             //$files: an array of files selected, each file has name, size, and type.
             for (var i = 0; i < $files.length; i++) {
             var file = $files[i];
             $scope.upload = $upload.upload({
             url: '/cards/avatar/save_from_disk', //upload.php script, node.js route, or servlet url
             data: {
             myObj: $scope.myModelObj
             },
             file: file
             }).progress(function(evt) {
             console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
             }).success(function(data, status, headers, config) {
             // file is uploaded successfully
             console.log(data);
             });
             }
             };*/

            function fetchAllAdvertise(){
                console.log("fetch function calling");

                AdvertiserService.fetchAllAdvertise()
                    .then(
                        function(d) {
                            console.log("function(d)  calling");
                            self.advertises = d;
                            self.remainingDays = "2 Months and 10 Days more";

                            var firstDate = new Date();
                            self.advertises.forEach(function (item) {
                                self.values.exdate = item.expiryDate;

                                var secondDate = item.expiryDate;
                                if( (firstDate.getTime() > new Date(secondDate).getTime())) {
                                    $scope.checkExp = "true";
                                    self.values.status = "Expired";
                                }
                                else{

                                    $scope.checkAv = "true";
                                    self.values.status = "Available";
                                    self.values.id = item.id;
                                    self.values.url = item.url;
                                }
                                self.updateitems.push(angular.copy(self.values));

                            });
                        },
                        function(errResponse){
                            console.error('Error while fetching Advertises');
                        }
                    );
            }

            function createAdvertise(advertise){
                console.log("create function calling!")
                AdvertiserService.createAdvertise(advertise)
                    .then(
                        function(Response){

                            sweetAlert("Success!!", "New Advertise successfully inserted!!!!", "success");
                            console.error(' No Error while creating Advertise');
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "New Advertise successfully inserted!!!!", "error");
                            console.error('Error while creating Advertise');
                        }
                    );
            }

            function submit() {
                var someDate = new Date();
                var d = someDate.getDate();
                var m = someDate.getMonth() + 1;
                var y = someDate.getFullYear();

                var publishedDate = m + '/'+ d + '/'+ y;
                var expiryDate = selectDates();
                self.advertise.publishedDate = publishedDate;
                self.advertise.expiryDate = expiryDate;

                if(self.advertise.id===null){
                    console.log('Saving New Advertise', self.advertise);
                    createAdvertise(self.advertise);
                }else{
                    console.log('Error in submit ');
                }
                reset();
            }

            function selectDates() {
                var selectTime = self.advertise.time;
                var currentDate = new Date();
                var numberOfDaysToAdd = null;
                if (selectTime == 'For 2 Weeks') {
                    numberOfDaysToAdd = 14;
                    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
                    var dd = currentDate.getDate();
                    var mm = currentDate.getMonth() + 1;
                    var yyyy = currentDate.getFullYear();

                    var someFormattedDate = mm + '/'+ dd + '/'+ yyyy;

                    return someFormattedDate;
                }
                else if (selectTime == 'For 1 Month') {
                    numberOfDaysToAdd = 1;
                    currentDate.setMonth(currentDate.getMonth() + numberOfDaysToAdd);
                    var dd = currentDate.getDate();
                    var mm = currentDate.getMonth() + 1;
                    var yyyy = currentDate.getFullYear();

                    var someFormattedDate = mm + '/'+ dd + '/'+ yyyy;

                    return someFormattedDate;
                }
                else if (selectTime == 'For 3 Month') {
                    numberOfDaysToAdd = 3;
                    currentDate.setMonth(currentDate.getMonth() + numberOfDaysToAdd);
                    var dd = currentDate.getDate();
                    var mm = currentDate.getMonth() + 1;
                    var yyyy = currentDate.getFullYear();

                    var someFormattedDate = mm + '/'+ dd + '/'+ yyyy;

                    return someFormattedDate;
                }
                else if (selectTime == 'For 6 Month') {
                    numberOfDaysToAdd = 6;
                    currentDate.setMonth(currentDate.getMonth() + numberOfDaysToAdd);
                    var dd = currentDate.getDate();
                    var mm = currentDate.getMonth() + 1;
                    var yyyy = currentDate.getFullYear();

                    var someFormattedDate = mm + '/'+ dd + '/'+ yyyy;

                    return someFormattedDate;
                }
                else if (selectTime == 'For 1 Year') {
                    numberOfDaysToAdd = 1;
                    currentDate.setFullYear(currentDate.getFullYear() + numberOfDaysToAdd);
                    var dd = currentDate.getDate();
                    var mm = currentDate.getMonth() + 1;
                    var yyyy = currentDate.getFullYear();

                    var someFormattedDate = mm + '/'+ dd + '/'+ yyyy;

                    return someFormattedDate;
                }
            }



            function viewAdvertises() {
                console.log("Button clicked !!!");
                fetchAllAdvertise();

            }

            function reset(){
                console.log("Reset button calling");
                self.advertise={
                    id:null,
                    category:'',
                    heading:'',
                    url:'',
                    description:"",
                    time:'For 2 Weeks',
                    place:'middle of right Side',
                    payment:''
                };
                $scope.advertiseForm.$setPristine(); //reset Form
            }

            $scope.getSelectedAdvertise = function(advertiseId){
                console.log("find by id function calling!")
                AdvertiserService.getSelectedAdvertise(advertiseId)
                    .then(
                        function(d) {
                            console.log("function(d) in findbyid  calling");
                            self.selectedAdvertise = d;
                            self.updateUrl = self.selectedAdvertise.url;
                            self.updateDescription = self.selectedAdvertise.description;
                            self.updatePlace = self.selectedAdvertise.place;
                            self.updatePublishedTimePeriod = self.selectedAdvertise.expiryDate;
                            console.log("Selected adv : "+ self.selectedAdvertise + self.selectedAdvertise.place + self.updatePublishedTimePeriod );
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "Error while fetch!!!!", "error");
                            console.error('Error while fetch Advertise');
                        }
                    );
            };

            $scope.findUpdateExtendTime = function() {

                var availableExpiryDate = self.updatePublishedTimePeriod;
                var extendTime = self.extendTime;

                var updateFulDate = new Date(availableExpiryDate);
                var updateDate = new Date(availableExpiryDate).getDate();
                var updateMonth = new Date(availableExpiryDate).getMonth() + 1;
                var updateYear = new Date(availableExpiryDate).getFullYear();
                console.log("times : " + updateDate + " " + " " + updateMonth+ " "+updateYear + " "+ extendTime);

                var numberOfDaysToAdd = null;
                if (extendTime == 'For 2 Weeks') {
                    numberOfDaysToAdd = 14;
                    updateFulDate.setDate(updateFulDate.getDate() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    console.log("new times : "+ dd1+" "+mm1 +" "+yyyy1 +" "+someFormattedDate1);
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 1 Month') {
                    numberOfDaysToAdd = 1;
                    updateFulDate.setMonth(updateFulDate.getMonth() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    console.log("new times : "+ dd1+" "+mm1 +" "+yyyy1 +" "+someFormattedDate1);
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 3 Month') {
                    numberOfDaysToAdd = 3;
                    updateFulDate.setMonth(updateFulDate.getMonth() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    console.log("new times : "+ dd1+" "+mm1 +" "+yyyy1 +" "+someFormattedDate1);
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 6 Month') {
                    numberOfDaysToAdd = 6;
                    updateFulDate.setMonth(updateFulDate.getMonth() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    console.log("new times : "+ dd1+" "+mm1 +" "+yyyy1 +" "+someFormattedDate1);
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 1 Year') {
                    numberOfDaysToAdd = 1;
                    updateFulDate.setFullYear(updateFulDate.getFullYear() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    console.log("new times : "+ dd1+" "+mm1 +" "+yyyy1 +" "+someFormattedDate1);
                    return someFormattedDate1;
                }

            };

            function updateAdvertise(id){
                self.updatedExpiredDate = $scope.findUpdateExtendTime();
                var advertise = {
                    id : id,
                    url : self.updateUrl,
                    description : self.updateDescription,
                    expiryDate : self.updatedExpiredDate,
                    place : self.updatePlace
                };
                AdvertiserService.updateAdvertise(advertise)
                    .then(
                        function(Response){
                            sweetAlert("Success!!", "The Advertise successfully updated!!!!", "success");
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "Error while updating Advertise!!!!", "error");
                            console.error('Error while updating Advertise');
                        }
                    );
            }

            /*$scope.showComplex = function() {

             AdvertiserService.showModal({
             templateUrl: "complex/complex.html",
             controller: "ComplexController",
             inputs: {
             title: "A More Complex Example"
             }
             }).then(function(modal) {
             modal.element.modal();
             modal.close.then(function(result) {
             $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
             });
             });

             };*/
            $scope.fetchAllCategories = function(){
                console.log("fetch category function calling");

                AdvertiserService.fetchAllCategories()
                    .then(
                        function(d) {
                            console.log("function(d)  calling");
                            self.Categories = d;
                            console.log("Categories : " +self.Categories[0].catName);

                        },
                        function(errResponse){
                            console.error('Error while fetching Category');
                        }
                    );
            }


        }]);

angular.module('myApp').controller('PopupCont', ['$scope','$modalInstance',function ($scope, $modalInstance) {
    $scope.title1 = "Test title!!!";

    //$scope.url2 = "www.google.com" ;
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.submit = function() {

    }
}]);