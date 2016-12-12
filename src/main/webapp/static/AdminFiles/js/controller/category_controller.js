


angular.module('influx').controller('CATMainCtrl',['$scope', '$http', '$mdDialog', '$modal','$window', 'CATRowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal,$window, CATRowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = CATRowEditor.editRow;

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
        displayName : 'Category ID',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'catName',
        displayName : 'Category Name',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'catDescription',
        displayName : 'Category Description',
        enableSorting : true,
        enableCellEdit : false
    } ];

    $http.get('http://localhost:1212/admin/categories/').success(function(response) {
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
            "catName" : "",
            "catDescription" : ""
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);


        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);
    };

}]);


TestTabApp.controller('CATRowEditCtrl', CATRowEditCtrl);



function CATRowEditCtrl($http, $modalInstance, grid, row, $mdDialog)
{
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.save = save;
    var REST_SERVICE_URI = 'http://localhost:1212/admin/categories/';
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
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('The category has been successfully added.')
                                .ariaLabel('INFORMATION!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                    },
                    function(errResponse){
                        console.error('Error while creating Category', errResponse);
//                                    deferred.reject(errResponse);
                        if(errResponse.status == '409')
                        {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('ALERT')
                                    .textContent('The category already exist. Please try again')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        }
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
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('INFORMATION')
                                .textContent('The category has been successfully updated!!!')
                                .ariaLabel('WARNING!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
                    },
                    function(errResponse){
                        console.error('Error while updating Category', errResponse);
//                                    deferred.reject(errResponse);
                        $mdDialog.show(
                            $mdDialog.alert()
                            // .parent(angular.element(document.querySelector('#login_page')))
                                .clickOutsideToClose(true)
                                .title('ALERT')
                                .textContent('An error occurred.Please try again!!!')
                                .ariaLabel('WARNING!!!')
                                .ok('OK')
                            //.targetEvent(ev)
                        );
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
                .ariaLabel('TutorialsPoint.com')
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
                                    .textContent('The category has been successfully deleted!!!')
                                    .ariaLabel('WARNING!!!')
                                    .ok('OK')
                                //.targetEvent(ev)
                            );
                        },
                        function(errResponse){
                            console.error('Error while deleting Category');
//                                    deferred.reject(errResponse);
                            $mdDialog.show(
                                $mdDialog.alert()
                                // .parent(angular.element(document.querySelector('#login_page')))
                                    .clickOutsideToClose(true)
                                    .title('ALERT')
                                    .textContent('An error occurred please try again!!!')
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

}