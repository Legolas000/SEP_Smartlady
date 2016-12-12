
TestTabApp.service('ARTRowEditor', ARTRowEditor);


ARTRowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function ARTRowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row,event) {
        $modal.open({
            templateUrl : 'static/js/partials/articleEditModal.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row','$mdDialog', ARTRowEditCtrl ],
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

