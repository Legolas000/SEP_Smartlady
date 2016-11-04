
TestTabApp.service('RowEditor', RowEditor);


RowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function RowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row,event) {
        $modal.open({
            templateUrl : 'static/js/partials/adPaymentEditModal.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row','$mdDialog', RowEditCtrl ],
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


