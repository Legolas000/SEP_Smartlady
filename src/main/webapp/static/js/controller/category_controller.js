


angular.module('influx').controller('MainCtrl',['$scope', '$http', '$mdDialog', '$modal', 'RowEditor', 'uiGridConstants',function($scope, $http, $mdDialog,$modal, RowEditor, uiGridConstants) {
    var vm = this;

    vm.editRow = RowEditor.editRow;

    vm.serviceGrid = {
        enableRowSelection : true,
        enableRowHeaderSelection : false,
        multiSelect : false,
        enableSorting : true,
        enableFiltering : true,
        enableGridMenu : true,
        rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
    };







    /*
     {
     field : 'publishedDate',
     enableSorting : true,
     enableCellEdit : false
     },
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
        field : 'catName',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'catDescription',
        enableSorting : true,
        enableCellEdit : false
    } ];

//        getData();
//
//        function getData()
//        {
    //$http.get('http://localhost:1212/SmartLady/advertisements/').success(function(response) {
    $http.get('http://localhost:1212/SmartLady/categories/').success(function(response) {
        vm.serviceGrid.data = response;
    });
//        }
//        addRow.$inject = ['$mdDialog'];
    $scope.addRow = addRow;
    function addRow(event) {
        var newService = {
            "id" : "0",
            "catName" : "temp",
            "catDescription" : "temp"
        };
        var rowTmp = {};
        rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);


        console.log('MD Var',$mdDialog);
        console.log('Evebt',event);

        var confirm = $mdDialog.confirm()
            .title('Are you sure to delete the record?')
            .textContent('Record will be deleted permanently.')
            .ariaLabel('TutorialsPoint.com')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
            console.log("Yes was triggered.");
        }, function() {
            console.log("No was triggered.");
        });

    };

}]);


TestTabApp.controller('RowEditCtrl', RowEditCtrl);



function RowEditCtrl($http, $modalInstance, grid, row)
{
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.save = save;
//        vm.getData = getData
    var REST_SERVICE_URI = 'http://localhost:1212/SmartLady/categories/';
    function save() {
        if (row.entity.id == '0') {
            /*
             * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
             */
//                vm.createCategory(row.entity);        //Create Category values;;;;
//
//                console.log('Create category', row.entity);

            row.entity = angular.extend(row.entity, vm.entity);
            //real ID come back from response after the save in DB


            var testEntity = angular.copy(row.entity);

            row.entity.id = Math.floor(100 + Math.random() * 1000);

            $http.post(REST_SERVICE_URI, testEntity)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                        console.log('This has been posted successfully',response);
                    },
                    function(errResponse){
                        console.error('Error while creating Category', errResponse);
//                                    deferred.reject(errResponse);
                    }
                );


//                vm.getData();




            grid.data.push(row.entity);

        } else {
            row.entity = angular.extend(row.entity, vm.entity);
            /*
             * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
             */
//                vm.createCategory(row.entity);        //Update Category values;;;;
//
//                console.log('update vcalue', row.entity);


            $http.put(REST_SERVICE_URI+row.entity.id, row.entity)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                        console.log('This has been posted successfully',response);
                    },
                    function(errResponse){
                        console.error('Error while updating Category', errResponse);
//                                    deferred.reject(errResponse);
                    }
                );

//                vm.getData();
        }
        $modalInstance.close(row.entity);
    }

    vm.remove = remove;
    function remove() {
        console.dir(row)
        if (row.entity.id != '0') {
            row.entity = angular.extend(row.entity, vm.entity);
            var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
            grid.appScope.vm.serviceGrid.data.splice(index, 1);
            /*
             * $http.delete('http://localhost:8080/service/delete/'+row.entity.id).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot delete row (error in console)'); console.dir(response); });
             */

//                vm.deleteCategory(row.entity.id); //Delete category
//                console.log('delete cateogry', row.entity.id);


            $http.delete(REST_SERVICE_URI+row.entity.id)
                .then(
                    function (response) {
//                                    deferred.resolve(response.data);
                    },
                    function(errResponse){
                        console.error('Error while deleting Category');
//                                    deferred.reject(errResponse);
                    }
                );

//                getData();
        }
        $modalInstance.close(row.entity);
    }

}