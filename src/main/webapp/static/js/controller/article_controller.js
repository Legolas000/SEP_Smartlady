'use strict';

angular.module('myApp')
    .controller('ArticleController', ['$scope', 'ArticleService','$location','$http','$route','$modal','$rootScope',
        function($scope,ArticleService,$location,$http,$route,$modal,$rootScope) {

            //var self = this;

            $scope.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            };

            $scope.categories = [];
            $scope.categoriesName = [];

            $scope.title='';
            $scope.category='';
            $scope.articleBody = '';

            /*var article = {
                title:'',
                catName: '',
                description:''
            };*/
            $scope.articles = [];
            $scope.comments = [];

            var fd;

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

             $window.alert(self.article.articleBody);
             }*/

            $scope.getImageDetails = function(files){
                fd = new FormData();
                fd.append("file", files[0]);
            }

            //submit the article
            $scope.articleFormSubmit = function(){

                var v = (''+$scope.title).length;
                if(((''+$scope.title).length == 0) || ((''+$scope.articleBody).length == 0)){
                     sweetAlert("Error", "Article Title or Body Cannot be Empty", "error");
                }

                 var e = document.getElementById("categories");
                 var select = e.options[e.selectedIndex].value;
                 if(select==0) {
                    sweetAlert("Error", "Please Select a Category", "error");
                 }
                 else {
                    var file = document.getElementById("myFile");
                    /*ArticleService.articleFormSubmit($scope.title,$scope.category,$scope.articleBody,file)
                        .then(
                            function (response) {
                                if (response) {
                                    swal('Article created succussfully');
                                } else {
                                    sweetAlert("Error", "Something went wrong. Article not created", "error");
                                }
                            }
                        )*/
                     var article = {
                         'title':$scope.title,
                         'catName': $scope.category,
                         'description':$scope.articleBody
                     };
                     JSON.stringify(article);
                     /*var fd = new FormData();
                      fd.append("file", file[0]);*/

                     $http.post('http://localhost:8080/createArticle/',fd, article, {
                         withCredentials: true,
                         headers: {'Content-Type': undefined},
                         transformRequest: angular.identity
                     })
                         /*.then(
                             function (response) {
                                console.log('article created successfully');
                             },
                             function(errResponse){
                                console.error('Error create article');
                             }
                         )*/
                         .success().error();
                 }
            };

            //fetch a specific type of article(All, approved, pending, rejected)
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

            $scope.viewComments = function(articleId){
                ArticleService.fetchCommentsByArticleId(articleId)
                    .then(
                        function(data){
                            $scope.comments = data;
                            $scope.commentsCount = data.length;
                        },
                        function(errResponse){
                            console.error('Controller-Error while fetching comments');
                        }

                    )
            };

            //display the selected article details for update
            $scope.fetchArticleForUpdate = function(articleId){

            };

            $scope.updateArticle = function(articleId){

            };

            $scope.openCommentsModal = function(articleId){
                $rootScope.articleId = articleId;
                var commentsPopup = $modal.open({
                    templateUrl: '/static/js/template/writer-template/commentsModal.html',
                    controller: 'modalController'
                });
            };

            $scope.openUpdateArticleModal = function(articleId){
                $rootScope.articleId = articleId;
                var updatePopup = $modal.open({
                    templateUrl: '/static/js/template/writer-template/updateArticleModal.html',
                    controller: 'modalController'
                });
            };

        }]);

angular.module('myApp').controller('modalController', ['$scope','$modalInstance',function ($scope, $modalInstance) {

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.submit = function() {
        //submit......
    }
}]);
