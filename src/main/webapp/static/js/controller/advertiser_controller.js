/**
 * Created by ARHAM on 9/24/2016.
 */

'use strict';

angular.module('myApp').controller('AdvertiserController',
        ['$scope', 'AdvertiserService','$rootScope','$http','$window',
            function($scope,AdvertiserService,$rootScope,$http,$window){

                fetchAllAdvertise();

                var self = this;
                self.submit = submit;
                self.reset = reset;
                self.display = display;
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
                    //place:''
                    payment:'2650.0',
                    status:'N',
                    advertiseimg:'',
                    myFile:''
                };

                self.values = {
                    exdate: '',
                    status:''
                };
                self.updateitems = [];
                self.num = [1 , 2 , 3];
                self.remainingDays = '';

                self.urltest = 'www.youtube.com';
                self.testdescription = 'D';
                self.swt = "";
                self.check = "";
                self.advertises=[];

                $scope.uploadFile = function(files) {
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


                $scope.onFileSelect = function($files) {

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
                };

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
                                    if( (firstDate.getTime() < new Date(secondDate).getTime())) {
                                        self.check = "true";
                                        self.values.status = "Available";
                                    }
                                    else{
                                        self.values.status = "Expired";
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
                            fetchAllAdvertise,
                            function(errResponse){
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
                    self.advertise={id:null,
                        category:'',
                        heading:'',
                        url:'',
                        description:"",
                        time:'',
                        place:'',
                        payment:''};
                    $scope.advertiseForm.$setPristine(); //reset Form
                }


                function display(){
                    //console.log("Reset button calling");
                   /* var tt = 'arham';
                    console.log("View button clicked");
                    if(tt){
                        console.log('Saving New Advertise' );
                        console.log("values are : " + fetchAllAdvertise());
                        //console.log("values are : " + dataObj);
                    }else{
                        console.log('Error in submit ');
                    }*/
                    self.swt = "true";
                    //$window.alert("Your alert working");
                }

                $scope.showComplex = function() {

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

                };


}]);

