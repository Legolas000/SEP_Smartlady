'use strict';

angular.module('myApp').controller('SubCategoryController', ['$scope', 'SubCategoryService', function($scope, SubCategoryService) {

    var self = this;
    self.subcategory={id:null,subCatName:'',subCatDescription:'',catID:''};
    self.subcategories=[];

    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;

    fetchAllSubCategories();

    function fetchAllSubCategories(){
        SubCategoryService.fetchAllSubCategories()
            .then(
                function(d) {
                    self.subcategories = d;
                },
                function(errResponse){
                    console.error('Error while fetching SubCategories');
                }
            );
    }
    
    function fetchFilSubCategories(){
        SubCategoryService.fetchFilSubCategories()
            .then(
                function(d) {
                    self.subcategories = d;
                },
                function(errResponse){
                    console.error('Error while fetching SubCategories');
                }
            );
    }

    function createSubCategory(subcategory){
        SubCategoryService.createSubCategory(subcategory)
            .then(
                fetchAllSubCategories,
                function(errResponse){
                    console.error('Error while creating Sub Category');
                }
            );
    }


    function updateSubCategory(subcategory, id){
    	SubCategoryService.updateSubCategory(subcategory, id)
            .then(
                fetchAllSubCategories,
                function(errResponse){
                    console.error('Error while updating Sub Category');
                }
            );
    }

    function deleteSubCategory(id){
    	SubCategoryService.deleteSubCategory(id)
            .then(
                fetchAllSubCategories,
                function(errResponse){
                    console.error('Error while deleting Sub Category');
                }
            );
    }

    function submit() {
        if(self.subcategory.id===null){
            console.log('Saving New Sub Category', self.subcategory);
            createSubCategory(self.subcategory);
        }else{
            updateSubCategory(self.subcategory, self.subcategory.id);
            console.log('Sub Category updated with id ', self.subcategory.id);
        }
        reset();
    }


    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.subcategories.length; i++){
            if(self.subcategories[i].id === id) {
                self.subcategory = angular.copy(self.subcategories[i]);
                console.log(self.subcategories[i]);
                break;
            }
        }
    }


    function remove(id){
        console.log('id to be deleted', id);
        if(self.subcategories.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteSubCategory(id);
    }


    function reset(){
        self.subcategory={id:null,subCatName:'',subCatDescription:'',catID:null};
        $scope.myForm.$setPristine(); //reset Form
    }


}]);
