
TestTabApp.service('SUBCRowEditor', SUBCRowEditor);


SUBCRowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function SUBCRowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
        $modal.open({
            templateUrl : 'static/js/partials/subCategoryEditModal.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row','$mdDialog', SUBCRowEditCtrl ],
            controllerAs : 'vm',
            //windowTemplateUrl: 'modalWindowTemplte.html',
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