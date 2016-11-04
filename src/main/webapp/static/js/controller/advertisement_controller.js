


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
        field : 'description',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'url',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'status',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'payment',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'publishedDate',
        enableSorting : true,
        enableCellEdit : false
    }, {
        field : 'expiryDate',
        enableSorting : true,
        enableCellEdit : false
    }];


    $http.get('http://localhost:1212/SmartLady/advertisements/').success(function(response) {
        vm.serviceGrid.data = response;
    });


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
function RowEditCtrl($http, $modalInstance, grid, row, $mdDialog) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.update = update;
    var REST_SERVICE_URI = 'http://localhost:1212/SmartLady/advertisements/';

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
                $http.delete(REST_SERVICE_URI + row.entity.id)
                    .then(
                        function (response) {
//                                    deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while deleting Advertisement',errResponse);
//                                    deferred.reject(errResponse);
                        }
                    );
            }
            // $modalInstance.close(row.entity);

        }, function () {
            console.log("No was triggered.");
        });

    }

// }]);
}