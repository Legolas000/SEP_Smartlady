


angular.module('influx').controller('ADVMainCtrl',['$scope', '$http', '$mdDialog', '$modal', 'ADVRowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal, ADVRowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = ADVRowEditor.editRow;

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
        rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
    };

    //For approved list
    vm.serviceGrid1 = {
        enableRowSelection : true,
        enableRowHeaderSelection : false,
        enablePagination : true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        multiSelect : false,
        enableSorting : true,
        enableFiltering : true,
        enableGridMenu : true,
        rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
    };


    //For approved list
    vm.serviceGrid1.columnDefs = [ {
        field : 'id',
        displayName : 'ID',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        width : 60,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'description',
        displayName : 'Description',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'url',
        displayName : 'URL',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'status',
        displayName : 'Status',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'payment',
        displayName : 'Payment',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'publishedDate',
        displayName : 'Published Date',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'expiryDate',
        displayName : 'Expiry Date',
        enableSorting : true,
        enableCellEdit : false
    }];

    vm.serviceGrid.columnDefs = [ {
        field : 'id',
        displayName : 'ID',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        width : 60,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'description',
        displayName : 'Description',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'url',
        displayName : 'URL',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'status',
        displayName : 'Status',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'payment',
        displayName : 'Payment',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'publishedDate',
        displayName : 'Published Date',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'expiryDate',
        displayName : 'Expiry Date',
        enableSorting : true,
        enableCellEdit : false
    }];


    getNADVAppList();
    getADVAppList();


    $scope.getNADVAppList = getNADVAppList;
    function getNADVAppList() {
        $http.get('http://localhost:1212/SmartLady/admin/advertisements/').success(function (response) {
            vm.serviceGrid.data = response;
        });
    }

    $scope.getADVAppList = getADVAppList;
    function getADVAppList() {
        $http.get('http://localhost:1212/SmartLady/admin/advertisements/1').success(function (response) {
            vm.serviceGrid1.data = response;
        });
    }


    $scope.addRow = addRow;
    function addRow(event) {
        var newService = {
            "id" : "0",
            "description" : "",
            "url" : "",
            "status" : "",
            "payment" : "",
            "publishedDate" : "",
            "expiryDate" : ""
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);


        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);


    };

}]);


// TestTabApp.controller('RowEditCtrl', RowEditCtrl);


// TestTabApp.controller('RowEditCtrl',['$scope', '$http', '$mdDialog', '$modalInstance', 'grid', 'row',function($scope, $http, $mdDialog,$modalInstance, grid, row) {
function ADVRowEditCtrl($http, $modalInstance, grid, row, $mdDialog) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.update = update;
    vm.reject = reject;
    var REST_SERVICE_URI = 'http://localhost:1212/SmartLady/admin/advertisements/';

    // addEventListener('update', update, false);
    function update(event) {
        $modalInstance.close(row.entity);

        console.log("this the event,",event);
        // console.log("This is the parentEl",parentEl);

        var confirm = $mdDialog.confirm()
            .title('Are you sure to approve the record?')
            .textContent('Record will be approved.')
            .ariaLabel('TutorialsPoint.com')
            // .parent(parentEl)
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function () {
            console.log("Yes was triggered.");
            console.dir(row);
            if (row.entity.id != '0') {
                row.entity = angular.extend(row.entity, vm.entity);
                var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
                grid.appScope.vm.serviceGrid.data.splice(index, 1);
                $http.delete(REST_SERVICE_URI + 'appr/' + row.entity.id)
                    .then(
                        function (response) {
//                                    deferred.resolve(response.data);
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('INFORMATION')
                                    .textContent('The advertisement has been successfully approved!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function (errResponse) {
                            console.error('Error while deleting Advertisement',errResponse);
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
            }
            // $modalInstance.close(row.entity);

        }, function () {
            console.log("No was triggered.");
        });

        getNADVAppList();
        getADVAppList();

    }

    function reject(event)
    {
        $modalInstance.close(row.entity);

        console.log("this the event,",event);
        // console.log("This is the parentEl",parentEl);

        var confirm = $mdDialog.confirm()
            .title('Are you sure to reject the record?')
            .textContent('Record will be rejected.')
            .ariaLabel('REJECTION')
            // .parent(parentEl)
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function () {
            console.log("Yes was triggered.");
            console.dir(row);
            if (row.entity.id != '0') {
                row.entity = angular.extend(row.entity, vm.entity);
                var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
                grid.appScope.vm.serviceGrid.data.splice(index, 1);
                $http.delete(REST_SERVICE_URI + 'rej/' + row.entity.id)
                    .then(
                        function (response) {
//                                    deferred.resolve(response.data);
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('INFORMATION')
                                    .textContent('The advertisement has been successfully rejected!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function (errResponse) {
                            console.error('Error while deleting Advertisement',errResponse);
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
            }
            // $modalInstance.close(row.entity);

        }, function () {
            console.log("No was triggered.");
        });

        getNADVAppList();
        getADVAppList();
    }

// }]);
}