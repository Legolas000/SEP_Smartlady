'use strict';

angular.module('myApp').controller('ArticleController', ['$scope', 'ArticleService','$location','$route',
                        function($scope, ArticleService,$location,$route) {

    var self = this;
    self.article={
        id:null,
        title:'',
        description:'',
        publishedDate:'',
        imagePath:'',
        isFeatured:null,
        overallRating:null,
        categoryID:null,
        writerID:null,
        status:''
    };



    self.articles=[];
    /*if(async!= null){
        self.article={
            id:async.id,
            title:async.title,
            description:async.description,
            publishedDate:async.publishedDate,
            imagePath:async.imagePath,
            isFeatured:async.isFeatured,
            overallRating:async.overallRating,
            categoryID:async.categoryID,
            writerID:async.writerID,
            status:async.status
        };
    }*/

    self.approve = approve;

    fetchAllArticles();

    function fetchAllArticles(){
        ArticleService.fetchAllArticles()
            .then(
                function(d) {
                    self.articles = d;
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
