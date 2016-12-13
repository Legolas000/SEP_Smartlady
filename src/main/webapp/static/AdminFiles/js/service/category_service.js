
TestTabApp.service('CATRowEditor', CATRowEditor);


CATRowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function CATRowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
        $modal.open({
            templateUrl : 'static/AdminFiles/js/partials/categoryEditModal.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row', '$mdDialog', CATRowEditCtrl ],
            controllerAs : 'vm',
            resolve : {
                grid : function() {
                    return grid;
                },
                row : function() {
                    return row;
                }
            }
        });
    }

    return service;
}