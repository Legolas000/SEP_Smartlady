'use strict';

angular.module('myApp')
    .controller('ArticleController', ['$scope', 'ArticleService','$location','$http','$route','$modal','$sce','$timeout','$rootScope',
        function($scope,ArticleService,$location,$http,$route,$modal,$sce,$timeout,$rootScope) {

            var writerId = $rootScope.user.id;

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
                var fd = new FormData();
                $scope.fd = fd;
                //fd.append("file", files[0]);
                var ext = files[0].name.match(/\.(.+)$/)[1];
                if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
                    self.dimensions = "true";
                    $scope.fileValid = "valid";
                    $scope.fileInValid = "";
                    fd.append("file", files[0]);
                    $scope.imageupl = fd;
                }
                else{
                    $scope.fileInValid = "invalid";
                    sweetAlert("Invalid!!", "Selected file format is wrong!", "error");
                    something_happens();
                }
            }


            function submitImage() {
                var uploadUrl = "http://smartarticle.azurewebsites.net/SEPIISmartLady/uploadImage/";
                $http.post(uploadUrl, $scope.fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                }).success(
                ).error();
            }

            //submit the article
            $scope.articleFormSubmit = function(){

                var v = (''+$scope.title).length;
                if(((''+$scope.title).length == 0) || ((''+$scope.articleBody).length == 0)){
                    sweetAlert("Error", "Article Title or Body Cannot be Empty", "error");

                }else{
                    var e = document.getElementById("categories");
                    var select = e.options[e.selectedIndex].value;
                    if(select==0) {
                        sweetAlert("Error", "Please Select a Category", "error");
                    }
                    else {
                        var article = {
                            'title':$scope.title,
                            'categoryName': $scope.category,
                            'description':$scope.articleBody,
                            'writerID':writerId
                        };
                        JSON.stringify(article);
                        ArticleService.submitArticle(article)
                            .then(
                                function(response){
                                    sweetAlert("Success!!", "Article Created Successfully!!!!", "success");
                                    $location.path('/writer_articles');

                                },
                                function(errResponse){
                                    console.log('Error while create article');
                                }
                            )
                    }
                }
                $timeout(submitImage, 5000);
            };


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

            //fetch a specific type of article(All, approved, pending, rejected)
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
                        //$scope.fetchAllArticles();
                        location.reload();

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
                ArticleService.fetchArticleById(articleId)
                    .then(
                        function(data){
                            $scope.articles = data;
                            document.getElementById("titleID").value = data.title;
                            document.getElementById("categoryID").value = data.catName;
                            document.getElementById("descriptionID").value = $sce.trustAsHtml(data.description);
                        },
                        function(errResponse){
                            console.error('Controller-Error while fetching single article');
                        }
                    )
            };

            $scope.updateArticle = function(articleId){

            };

            $scope.openCommentsModal = function(articleId){
                $rootScope.articleId = articleId;
                var commentsPopup = $modal.open({
                    templateUrl: 'static/js/template/writer-template/commentsModal.html',
                    controller: 'modalController'
                });
            };

            $scope.openUpdateArticleModal = function(articleId){
                $rootScope.articleId = articleId;
                var updatePopup = $modal.open({
                    templateUrl: 'static/js/template/writer-template/updateArticleModal.html',
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


function something_happens() {
    document.getElementById("myFile").value = "";
};
