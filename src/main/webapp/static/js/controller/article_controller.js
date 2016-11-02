'use strict';

angular.module('myApp')
    .controller('ArticleController', ['$scope', 'ArticleService','$location','$route','$window','$rootScope',
        function($scope,ArticleService,$location,$route,$window,$rootScope) {

            //var self = this;

            $scope.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };

            $scope.categories = [];
            $scope.categoriesName = [];
            $scope.title='';
            $scope.description = '';
            $scope.articles=[];


            $scope.fetchAllCategories = function (){
                ArticleService.fetchAllCategories()
                    .then(
                        function(data){
                            $scope.categories = data;
                            for(var i=0; i<$scope.categories.length; i++){
                                $scope.categoriesName[i] = $scope.categories[i].catName;
                            }
                        },
                        function(errResponse){
                            console.error('Error while fetching Categories');
                        }
                    )
            }

            /*$scope.saveArticle = function(){

             $window.alert(self.article.description);
             }*/

            $scope.articleFormSubmit = function(){
                swal("Here's a message!");
                var v = (''+$scope.article.title).length;
                console.log(v);
                if(((''+$scope.article.title).length == 0) || ((''+$scope.description).length == 0)){
                     sweetAlert("Error", "Article Title or Body Cannot be Empty", "error");
                }

                 var e = document.getElementById("categories");
                 var select = e.options[e.selectedIndex].value;
                 if(select==0) {
                    sweetAlert("Error", "Please Select a Category", "error");
                 }
                 else {
                    ArticleService.articleFormSubmit()
                        .then(
                            function (response) {
                                if (response) {
                                    swal('Article created succussfully');
                                } else {
                                    sweetAlert("Error", "Something went wrong. Article not created", "error");
                                }
                            }
                        )
                 }
            }


            $scope.fetchAllArticles = function(){
                ArticleService.fetchAllArticles()
                    .then(
                        function(response) {
                            $scope.articles = response;
                            $scope.size = response.length;
                            $scope.writerName = $rootScope.user.fullname;
                        },
                        function(errResponse){
                            console.error('controller.Error while fetching all Articles');
                        }
                    );
            }

            $scope.fetchFilterAllArticles = function(status){
                ArticleService.fetchFilterArticles(status)
                    .then(
                        function(data) {
                            $scope.articles = data;
                            $scope.size = data.length;
                        },
                        function(errResponse){
                            console.error('Controller-Error while fetching fillter Articles');
                        }
                    );
            }

            $scope.deleteArticle = function(id){

                swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this Article",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        closeOnConfirm: false
                    },
                    function(){
                        ArticleService.deleteArticle(id);
                        swal("Deleted!", "Your imaginary file has been deleted.", "success");
                        $scope.fetchAllArticles();

                    });


            }


            function updateStatus(id){
                ArticleService.updateStatus(id)
                    .then(
                        fetchAllArticles,
                        function(errResponse){
                            console.error('Error while updating Article');
                        }
                    );
            }

            function approve(id) {
                updateStatus(id);
                console.log('Article approval confirmed for id:- ', id);
            }

        }]);
