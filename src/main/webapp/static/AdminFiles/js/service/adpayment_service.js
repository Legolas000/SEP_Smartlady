
TestTabApp.service('ADRowEditor', ADRowEditor);


ADRowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function ADRowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row,event) {
        console.log('This is executing ADPayments');
        $modal.open({
            templateUrl : 'static/js/partials/adPaymentEditModal.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row','$mdDialog', ADRowEditCtrl ],
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


