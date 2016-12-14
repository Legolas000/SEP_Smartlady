


angular.module('influx').controller('USRMainCtrl',['$scope', '$http', '$mdDialog', '$modal','$window', 'USRRowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal,$window, USRRowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = USRRowEditor.editRow;

    vm.serviceGrid = {
        enableRowSelection : true,
        enableRowHeaderSelection : false,
        enablePagination : true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        multiSelect : false,
        enableSorting : true,
        enableFiltering : true,
        enableGridMenu : true,
        rowHeight      : 100,
        rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
    };

    vm.serviceGrid.columnDefs = [ {
        field : 'id',
        displayName : 'User ID',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'fullname',
        displayName : 'Full Name',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'email',
        displayName : 'Email',
        enableSorting : true,
        enableCellEdit : false
    } , {
        field : 'userdescription',
        displayName : 'User Description',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'address',
        displayName : 'Address',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'password',
        displayName : 'Password',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'imagePath',
        displayName : 'Image',
        enableSorting : true,
        enableCellEdit : false,
        cellTemplate:"<img width=\"200px\" height =\"200px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
    }, {
        field : 'userrole',
        displayName : 'User Role',
        enableSorting : true,
        enableCellEdit : false
    }];

    $http.get('http://localhost:1212/admin/users/4').success(function(response) {
        vm.serviceGrid.data = response;
    });

    $scope.$on('$viewContentLoaded', function(event) {
        console.log('This is ViewDidLoad');
        $window.ga.push(['_trackPageView', $location.url()]);
    });

    $scope.addRow = addRow;
    function addRow(event) {
        var newService = {
            "id" : "0",
            "fullname" : "",
            "email" : "",
            "userdescription" : "",
            "address" : "",
            "password" : "",
            "imagePath" : "",
            "userrole" : "4"
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);


        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);
    };

}]);


TestTabApp.controller('USRRowEditCtrl', USRRowEditCtrl);



function USRRowEditCtrl($http, $modalInstance, grid, row, $mdDialog , $scope)
{
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.save = save;
    var REST_SERVICE_URI = 'http://localhost:1212/admin/users/';
    function save() {
        if (row.entity.id == '0') {
            row.entity = angular.extend(row.entity, vm.entity);
            var testEntity = angular.copy(row.entity);
            row.entity.id = Math.floor(100 + Math.random() * 1000);

            $http.post(REST_SERVICE_URI, testEntity)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                        console.log('This has been posted successfully',response);
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#Subs_Page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('User has been successfully added.')
                                .ariaLabel('ALERT')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                        $scope.submitImage();
                    },
                    function(errResponse){
                        console.error('Error while creating user', errResponse);
//                                    deferred.reject(errResponse);
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#Subs_Page')))
                                .clickOutsideToClose(true)
                                .title('ALERT')
                                .textContent('An error occured. Please try again')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                    }
                );

            grid.data.push(row.entity);

        } else {
            row.entity = angular.extend(row.entity, vm.entity);
            $http.put(REST_SERVICE_URI+row.entity.id, row.entity)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                        console.log('This has been posted successfully',response);
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#Subs_Page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('User has been sucessfully added.')
                                .ariaLabel('INFORMATION')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                    },
                    function(errResponse){
                        console.error('Error while updating User', errResponse);
//                                    deferred.reject(errResponse);
                    }
                );

        }
        $modalInstance.close(row.entity);
    }

    vm.remove = remove;
    function remove() {
        console.dir(row);
        if (row.entity.id != '0') {
            row.entity = angular.extend(row.entity, vm.entity);
            var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
            grid.appScope.vm.serviceGrid.data.splice(index, 1);
            var confirm = $mdDialog.confirm()
                .title('Are you sure to delete the record?')
                .textContent('Record will be deleted permanently.')
                .ariaLabel('Smartlady WebApplication.')
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                $http.delete(REST_SERVICE_URI+row.entity.id)
                    .then(
                        function (response) {
//                                    deferred.resolve(response.data);
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('INFORMATION')
                                    .textContent('The user has been successfully removed!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function(errResponse){
                            console.error('Error while deleting User');
//                                    deferred.reject(errResponse);
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('INFORMATION')
                                    .textContent('An error occured please try again!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        }
                    );
            }, function() {
                console.log("No was triggered.");
            });
        }
        $modalInstance.close(row.entity);
    }


    $scope.uploadFile = uploadFile;
    function uploadFile(files) {
        console.log("Function is uploadFile!");
        var fd = new FormData();
        $scope.fd = fd;
        fd.append("file", files[0]);
        //alert("It loads");
        //$scope.submitImage();
    }

    $scope.submitImage = submitImage;
    function submitImage() {
        var uploadUrl = "http://localhost:1212/im/users/saveUserDataAndFile";
        $http.post(uploadUrl, $scope.fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(
        ).error();
    }

}



angular.module('influx').controller('SendSubs', ['$scope','$mdDialog','$http', function($scope,$mdDialog,$http) {
    var self = this;
    self.sendSubs = sendSubs;
    function sendSubs()
    {
        console.log("This Triggered send subscriptions");
        alert("This is workignkjsd");
        $http.get('http://localhost:1212/admin/smail/')
            .then(
                function (response) {
                    console.log('Sucessful sent mail',response);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#Subs_Page')))
                            .clickOutsideToClose(true)
                            .title('ALERT')
                            .textContent('Successfully sent mails..')
                            .ariaLabel('Subscription mails')
                            .ok('OK')
                        //.targetEvent(ev)
                    );
                },
                function(errResponse){
                    console.error('An error occured pls try again');
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#Subs_Page')))
                            .clickOutsideToClose(true)
                            .title('ALERT')
                            .textContent('An error occured. Please try again')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        //.targetEvent(ev)
                    );
                }
            );
    }
}]);