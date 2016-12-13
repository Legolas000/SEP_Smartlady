angular.module('influx').controller('ARTMainCtrl',['$scope', '$http', '$mdDialog', '$modal', 'ARTRowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal, ARTRowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = ARTRowEditor.editRow;

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
    //Removed Status column from both
    /*
         , {
         field : 'status',
         enableSorting : true,
         enableCellEdit : false
         }
     */
    vm.serviceGrid.columnDefs = [ {
        field : 'id',
        displayName : 'id',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        width : 60,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'title',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'description',
        enableSorting : true,
        enableCellEdit : false
    }];

    vm.serviceGrid1.columnDefs = [ {
        field : 'id',
        displayName : 'id',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        width : 60,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'title',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'description',
        enableSorting : true,
        enableCellEdit : false
    }];

    getNAPList();
    getAPList();

    $scope.getNAPList = getNAPList;
    function getNAPList()
    {
        //For non-approved list.
        $http.get('http://localhost:1212/admin/articles/0').success(function(response) {
            vm.serviceGrid.data = response;
        });
    }

    $scope.getAPList = getAPList;
    function getAPList()
    {
        //For approved list.
        $http.get('http://localhost:1212/admin/articles/1').success(function(response) {
            vm.serviceGrid1.data = response;
        });
    }
    $scope.addRow = addRow;
    function addRow(event) {
        var newService = {
            "id" : "0",
            "title" : "",
            "description" : "",
            "status" : ""
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);


        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);


    };

}]);

function ARTRowEditCtrl($http, $modalInstance, grid, row, $mdDialog, $scope) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.update = update;
    vm.reject = reject;
    var REST_SERVICE_URI = 'http://localhost:1212/admin/articles/';

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
                                    .textContent('The article has been successfully approved!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function (errResponse) {
                            console.error('Error while approving Article',errResponse);
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
                $scope.getAPList();
                $scope.getNAPList();
            }
            // $modalInstance.close(row.entity);

        }, function () {
            console.log("No was triggered.");
        });

    }

    function reject(event) {
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
                                    .textContent('The article has been successfully rejected!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function (errResponse) {
                            console.error('Error while approving Article',errResponse);
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
                $scope.getAPList();
                $scope.getNAPList();
            }
            // $modalInstance.close(row.entity);

        }, function () {
            console.log("No was triggered.");
        });

    }

// }]);
}