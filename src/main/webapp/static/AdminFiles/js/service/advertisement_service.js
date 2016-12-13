
TestTabApp.service('ADVRowEditor', ADVRowEditor);


ADVRowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function ADVRowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row,event) {
        $modal.open({
            templateUrl : 'static/AdminFiles/js/partials/advertisementEditModal.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row','$mdDialog', ADVRowEditCtrl ],
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


