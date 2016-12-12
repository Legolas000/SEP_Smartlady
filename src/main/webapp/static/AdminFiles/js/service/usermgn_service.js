
TestTabApp.service('USRRowEditor', USRRowEditor);


USRRowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function USRRowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
        $modal.open({
            templateUrl : 'static/js/partials/usrmgmEditModel.html',//Get edit modal set for thiz.
            controller : [ '$http', '$modalInstance', 'grid', 'row', '$mdDialog', '$scope', USRRowEditCtrl ],
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