


angular.module('influx').controller('SUBCMainCtrl',['$scope', '$http', '$mdDialog', '$modal', 'SUBCRowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal, SUBCRowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = SUBCRowEditor.editRow;

    vm.filCats = [];    // For table

    vm.selCategs = '';  // For table

    vm.downloadCtegert = [];

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
        displayName : 'ID',
        enableSorting : true,
        type : 'number',
        enableCellEdit : false,
        sort : {
            direction : uiGridConstants.ASC,
            priority : 1,
        },
    }, {
        field : 'category.catName',
        displayName : 'Category Name',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'subCatName',
        displayName : 'Sub-Category Name',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'subCatDescription',
        displayName : 'Sub-Category Description',
        enableSorting : true,
        enableCellEdit : false
    }  ];

    $http.get('http://localhost:1212/SmartLady/admin/subcategories/').success(function(response) {
        vm.serviceGrid.data = response;
        //vm.entity.downloadCtegert = response;  //for category load
    });


    $http.get('http://localhost:1212/SmartLady/admin/subcategories/exist/').success(function(response) {
        vm.filCats = response;
        console.log('These are the categories', vm.filCats);
    });

    $scope.addRow = addRow;
    function addRow(event) {
        var newService = {
            "id" : "0",
            "catID" : "0",
            "subCatName" : "",
            "subCatDescription" :""
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);

        console.log('Selected value is ', vm.selCategs);
        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);
    };

    $scope.loadSelData = loadSelData;
    function loadSelData()
    {
        console.log(vm.selCategs);
        if(vm.selCategs === '')
            $http.get('http://localhost:1212/SmartLady/admin/subcategories/').success(function(response) {
                vm.serviceGrid.data = response;

            });
        else
            $http.get('http://localhost:1212/SmartLady/admin/subcategories/sub/'+vm.selCategs).success(function(response) {
                console.log('The resp val', response);
                vm.serviceGrid.data = response;
                alert(response);
                if(response == null || !angular.isDefined(response) || response == "")
                {
                    alert('null');
                    vm.serviceGrid.data.length = 0;
                }
            });

    }


}]);


TestTabApp.controller('SUBCRowEditCtrl', SUBCRowEditCtrl);



function SUBCRowEditCtrl($http, $modalInstance, grid, row, $mdDialog)
{
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.selectedItemvalue = "";
    vm.save = save;
//        vm.getData = getData

    $http.get('http://localhost:1212/SmartLady/admin/categories/').success(function(response) {
        //vm.serviceGrid.data = response;
        vm.entity.downloadCtegert = response;  //for category load
    });


    var REST_SERVICE_URI = 'http://localhost:1212/SmartLady/admin/subcategories/';
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
                                .textContent('The sub-category has been sucessfully added.')
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
                                    .textContent('The sub-category already exist. Please try again')
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
                                .textContent('The sub-category has been successfully updated!!!')
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
                                    .textContent('The sub-category has been successfully deleted!!!')
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