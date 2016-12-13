


angular.module('influx').controller('ADMainCtrl',['$scope', '$http', '$mdDialog', '$modal', 'ADRowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal, ADRowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = ADRowEditor.editRow;

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
        field : 'paymentPlans',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'pagePlacements',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'amount',
        enableSorting : true,
        enableCellEdit : false
    } ];

    $http.get('http://localhost:1212/admin/adpayments/').success(function(response) {
        vm.serviceGrid.data = response;
    });

    $scope.addRow = addRow;
    function addRow(event) {
        var newService = {
            "id" : "0",
            "paymentPlans" : "",
            "pagePlacements" : "",
            "amount" : ""
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);
    };

}]);


TestTabApp.controller('ADRowEditCtrl', ADRowEditCtrl);



function ADRowEditCtrl($http, $modalInstance, grid, row, $mdDialog)
{
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.save = save;
    var REST_SERVICE_URI = 'http://localhost:1212/admin/adpayments/';

    function save() {
        if (row.entity.id == '0') {

            row.entity = angular.extend(row.entity, vm.entity);
            var testEntity = angular.copy(row.entity);
            row.entity.id = Math.floor(100 + Math.random() * 1000);
            $modalInstance.close(row.entity);
            $http.post(REST_SERVICE_URI, testEntity)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                        $mdDialog.show(
                            $mdDialog.alert()
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('The Advertisement Payment has been successfully added!!!')
                                .ariaLabel('WARNING!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                        console.log('This has been posted successfully',response);
                    },
                    function(errResponse){
                        console.error('Error while creating Category', errResponse);
                        $mdDialog.show(
                            $mdDialog.alert()
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('An error occured Please try again!!!')
                                .ariaLabel('WARNING!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
//                                    deferred.reject(errResponse);
                    }
                );

            grid.data.push(row.entity);

        } else {
            $modalInstance.close(row.entity);

            row.entity = angular.extend(row.entity, vm.entity);
            $http.put(REST_SERVICE_URI+row.entity.id, row.entity)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                        $mdDialog.show(
                            $mdDialog.alert()
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('The data has been sucessfully updated!!!')
                                .ariaLabel('WARNING!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                        console.log('This has been posted successfully',response);
                    },
                    function(errResponse){
                        console.error('Error while updating Category', errResponse);
                        $mdDialog.show(
                            $mdDialog.alert()
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('ERROR!!!')
                                .textContent('An error occured please try again!!!')
                                .ariaLabel('WARNING!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
//                                    deferred.reject(errResponse);
                    }
                );
        }
        // $modalInstance.close(row.entity);
    }

    vm.remove = remove;
    function remove() {
        console.dir(row);
        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);

        $modalInstance.close(row.entity);
        var confirm = $mdDialog.confirm()
            .title('Are you sure to delete the record?')
            .textContent('Record will be deleted permanently.')
            .ariaLabel('TutorialsPoint.com')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
            if (row.entity.id != '0') {
                row.entity = angular.extend(row.entity, vm.entity);
                var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
                grid.appScope.vm.serviceGrid.data.splice(index, 1);

                $http.delete(REST_SERVICE_URI+row.entity.id)
                    .then(
                        function (response) {
//                                    deferred.resolve(response.data);
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('INFORMATION')
                                    .textContent('The Advertisement Payments has been successfully deleted!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function(errResponse){
                            console.error('Error while deleting Category');
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('INFORMATION')
                                    .textContent('An error occured. Please try again!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
//                                    deferred.reject(errResponse);
                        }
                    );
            }
        }, function() {
            console.log("No was triggered.");
        });



    }

}