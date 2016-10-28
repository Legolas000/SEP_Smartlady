'use strict';

angular.module('myApp')
    .controller('ArticleController', ['$scope', 'ArticleService','$location','$route','$window',
        function($scope,ArticleService,$location,$route,$window) {

            var self = this;

            $scope.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };


            self.category = {
                id:null,
                catName:'',
                catDescription:''
            };

            self.categories = [];
            $scope.categoriesName = [];

            $scope.title='';
            $scope.description = '';

            self.article={
                id:null,
                title:'',
                description:'',
                category:''
            };

            self.articles=[];


            fetchAllCategories();

            function fetchAllCategories(){
                ArticleService.fetchAllCategories()
                    .then(
                        function(data){
                            self.categories = data;
                            for(var i=0; i<self.categories.length; i++){
                                $scope.categoriesName[i] = self.categories[i].catName;
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
                var v = (''+self.article.title).length;
                console.log(v);
                if(((''+self.article.title).length == 0) || ((''+$scope.description).length == 0)){
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





            function fetchAllArticles(){
                ArticleService.fetchAllArticles()
                    .then(
                        function(data) {
                            self.articles = data;
                        },
                        function(errResponse){
                            console.error('Error while fetching Articles');
                        }
                    );
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
