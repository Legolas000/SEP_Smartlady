/**
 * Created by ARHAM on 9/24/2016.
 */

'use strict';

angular.module('myApp').controller('AdvertiserController',
    ['$scope', 'AdvertiserService','$rootScope','$http','$window','$modal','$timeout',
        function($scope,AdvertiserService,$rootScope,$http,$window,$modal,$timeout){
            var advertiserId = $rootScope.user.id;
            //fetchAllAdvertise();

            var self = this;
            self.submit = submit;
            self.reset = reset;
            self.updateAdvertise = updateAdvertise;
            self.test = test;
            self.submitUser = submitUser;
            self.items = [];
            function test() {
                console.log("Test Success");
            }

            self.advertise={
                id:null,
                url:'',
                description:'',
                time:'For 2 Weeks',
                publishedDate:'',
                expiryDate:'',
                place:'Middle of right Side',
                payment:'',
                status:0,
                categoryID:'',
                userID:advertiserId
            };

            $scope.myFile = '';

            self.url2 = "www.youtube.com";
            self.extendTime="For 2 Weeks";
            self.updatePayment="";
            self.status = 0;

            self.values = {
                id:'',
                imagePath:'',
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

            //$scope.fileValid = null;
            $scope.imgWidth ="Arham";
            $scope.fileInValid = "";

            // self.check = "";
            self.advertises=[];
            self.Categories=[];
            self.selectedAdvertise=[];
            self.payments=[];
            $scope.AllPaymentPlans=[];

            $scope.uploadFile = function(files) {
                console.log("Function is uploadFile!");
                var fd = new FormData();
                $scope.fd = fd;

                var ext = files[0].name.match(/\.(.+)$/)[1];
                if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
                    self.dimensions = "true";
                    $scope.fileValid = "valid";
                    $scope.fileInValid = "";
                    fd.append("file", files[0]);
                    $scope.imageupl = fd;
                }
                else{
                    $scope.fileInValid = "invalid";
                    sweetAlert("Invalid!!", "Selected file format is wrong!", "error");
                    something_happens();
                }

            };

            var _URL = window.URL || window.webkitURL;

            $("#advertiseImage").change(function(e) {
                var file, img;

                if ((file = this.files[0])) {
                    img = new Image();
                    img.onload = function() {
                        $scope.imgWidth = this.width;
                        $scope.imgHeight = this.height;
                        if($scope.imgWidth != 300 || $scope.imgHeight != 200){
                            sweetAlert("Wrong Image Dimensions!", "Please select an image with Width 300px and Height 200px", "error");
                            //loadFile(event);
                            $scope.fileInValid = "invalid";
                            self.dimensions = "";
                            something_happens();
                        }
                        else
                            self.dimensions = "true";
                    };
                    img.src = _URL.createObjectURL(file);
                }
            });

            function submitUser() {
                var file = self.fileModel;
                var uploadUrl = "http://localhost:1212/user/saveUserDataAndFile";
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

            function fetchAllAdvertise(){
                console.log("fetch function calling");
                AdvertiserService.fetchAllAdvertise()
                    .then(
                        function(d) {
                            self.advertises = d;
                            var firstDate = new Date();
                            self.advertises.forEach(function (item) {
                                self.values.exdate = item.expiryDate;
                                var secondDate = item.expiryDate;
                                if( (firstDate.getTime() > new Date(secondDate).getTime())) {
                                    $scope.checkExp = 'Expired';
                                    self.values.status = "Expired";
                                    self.values.id = item.id;
                                    self.values.imagePath = item.imagePath;
                                    self.values.url = item.url;
                                }
                                else{
                                    if(item.status == 1) {
                                        $scope.checkAv = 2;
                                        self.values.status = "Available";
                                        self.values.id = item.id;
                                        self.values.imagePath = item.imagePath;
                                        self.values.url = item.url;
                                    }
                                    else if(item.status == 2) {
                                        $scope.checkAv = 3;
                                        self.values.status = "Rejected";
                                        self.values.id = item.id;
                                        self.values.imagePath = item.imagePath;
                                        self.values.url = item.url;
                                    }
                                    else {
                                        $scope.checkAv = 2;
                                        self.values.status = "Pending";
                                        self.values.id = item.id;
                                        self.values.imagePath = item.imagePath;
                                        self.values.url = item.url;
                                    }
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
                console.log("create function calling!");
                AdvertiserService.createAdvertise(advertise)
                    .then(
                        function(Response){

                            sweetAlert("Success!!", "New Advertise successfully created!!!!", "success");
                            console.error(' No Error while creating Advertise');
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "Error while creating Advertise!!!!", "error");
                            console.error('Error while creating Advertise');
                        }
                    );
                console.log("Function is uploadFile!");
            }

            function submit() {
                if ($scope.fileInValid){
                }
                else {
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
                    } else{
                        console.log('Error in submit ');
                    }

                    reset();
                    $timeout(submitImage, 5000);
                }
            }

            function submitImage() {
                var uploadUrl = "http://localhost:1212/user/saveUserDataAndFile";
                $http.post(uploadUrl, $scope.fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(
                ).error();
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

            $scope.viewAdvertises = function () {
                console.log("Button clicked !!!");
                fetchAllAdvertise();
            };

            function reset(){
                console.log("Reset button calling");
                self.advertise={
                    id:null,
                    category:'',
                    heading:'',
                    url:'',
                    description:"",
                    time:'For 2 Weeks',
                    place:'Middle of right Side',
                    payment:''
                };
                $scope.advertiseForm.$setPristine(); //reset Form
            }

            $scope.getSelectedAdvertise = function(advertiseId){
                console.log("find by id function calling!")
                AdvertiserService.getSelectedAdvertise(advertiseId)
                    .then(
                        function(d) {
                            self.selectedAdvertise = d;
                            self.updateUrl = self.selectedAdvertise.url;
                            self.updateDescription = self.selectedAdvertise.description;
                            self.updatePlace = self.selectedAdvertise.place;
                            self.updatePublishedTimePeriod = self.selectedAdvertise.expiryDate;
                            self.updateImagePath = self.selectedAdvertise.imagePath;
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "Error while fetch!!!!", "error");
                            console.error('Error while fetch Advertise');
                        }
                    );
            };

            $scope.findUpdateExtendTime = function() {
                var availableExpiryDate = self.updatePublishedTimePeriod;
                var extendTime = self.extendTime;// self.updatePublishedTimePeriod;//self.extendTime;

                var updateFulDate = new Date(availableExpiryDate);
                var updateDate = new Date(availableExpiryDate).getDate();
                var updateMonth = new Date(availableExpiryDate).getMonth() + 1;
                var updateYear = new Date(availableExpiryDate).getFullYear();

                var numberOfDaysToAdd = null;
                if (extendTime == 'For 2 Weeks') {
                    numberOfDaysToAdd = 14;
                    updateFulDate.setDate(updateFulDate.getDate() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 1 Month') {
                    numberOfDaysToAdd = 1;
                    updateFulDate.setMonth(updateFulDate.getMonth() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 3 Month') {
                    numberOfDaysToAdd = 3;
                    updateFulDate.setMonth(updateFulDate.getMonth() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
                    return someFormattedDate1;
                }
                else if (extendTime == 'For 6 Month') {
                    numberOfDaysToAdd = 6;
                    updateFulDate.setMonth(updateFulDate.getMonth() + numberOfDaysToAdd);
                    var dd1 = updateFulDate.getDate();
                    var mm1 = updateFulDate.getMonth() + 1;
                    var yyyy1 = updateFulDate.getFullYear();

                    var someFormattedDate1 = mm1 + '/'+ dd1 + '/'+ yyyy1;
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
                    place : self.updatePlace,
                    payment : self.updatePayment,
                    status : self.status
                };
                AdvertiserService.updateAdvertise(advertise)
                    .then(
                        function(Response){
                            sweetAlert("Success!!", "The Advertise successfully updated!!!!", "success");
                            $timeout(fetchAllAdvertise(), 5000);
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "Error while updating Advertise!!!!", "error");
                            console.error('Error while updating Advertise');
                        }
                    );
            }
            $scope.categoriesName = "Technology";
            $scope.fetchAllCategories = function(){
                console.log("fetch category function calling");

                AdvertiserService.fetchAllCategories()
                    .then(
                        function(d) {
                            console.log("function(d)  calling");
                            self.Categories = d;
                            console.log("Categories : " +self.Categories[0].catName);

                            for(var j = 0; j<self.Categories.length; j++){
                                //console.log("inside of catgry for loop "+j);
                                if($scope.categoriesName == self.Categories[j].catName){
                                    self.advertise.categoryID = self.Categories[j].id;
                                }
                            }
                        },
                        function(errResponse){
                            console.error('Error while fetching Category');
                        }
                    );
            };

            $scope.fetchAllPayments = function(){
                console.log("fetchAllPayments function calling!");
                AdvertiserService.fetchAllPayments()
                    .then(
                        function(d) {
                            self.payments = d;
                            self.paymentPlans = self.payments.paymentPlans;
                            self.pagePlacements = self.payments.pagePlacements;
                            self.amount = self.payments.amount;

                            for(var i = 0; i<self.payments.length; i++){
                                if(self.advertise.time == self.payments[i].paymentPlans && (self.advertise.place == self.payments[i].pagePlacements)){
                                    self.advertise.payment = self.payments[i].amount
                                }
                                if(self.extendTime == self.payments[i].paymentPlans && (self.updatePlace == self.payments[i].pagePlacements)){
                                    self.updatePayment = self.payments[i].amount
                                }
                            }
                        },
                        function(errResponse){
                            sweetAlert("Error!!", "Error while fetch!!!!", "error");
                            console.error('Error while fetch Advertise');
                        }
                    );
            };

            /*$scope.fetchAllPaymentPlans = function () {
             AdvertiserService.fetchAllPaymentPlans()
             .then(
             function (d) {
             $scope.AllPaymentPlans = d;
             $scope.testval = $scope.AllPaymentPlans.paymentPlans;

             console.log("Test payment plane is : " + $scope.testval)

             }
             );


             }*/


        }]);

angular.module('myApp').controller('PopupCont', ['$scope','$modalInstance',function ($scope, $modalInstance) {
    $scope.title1 = "Test title!!!";
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.submit = function() {

    }
}]);


var input = $("#advertiseImage");

function something_happens() {
    document.getElementById("advertiseImage").value = "";
};
