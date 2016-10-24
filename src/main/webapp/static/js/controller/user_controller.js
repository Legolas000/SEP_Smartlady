'use strict';

angular.module('myApp').controller('UserController',
                        ['$scope', 'UserService','LoginService','$location','$routeParams','$sce',
                        '$cookies','$rootScope','filterFilter',
                        function($scope, UserService,LoginService,$location,$routeParams,$sce,$cookies,$rootScope,filterFilter) {
    var self = this;

    $scope.currentDate = new Date();

    self.article = {};
    self.top1stArticle = {};
    self.top2ndArticle = {};
    self.top3rdArticle = {};
    self.top4thArticle = {};
    self.classStyle = 'second-style';
    self.locationPath = $location.path();
    self.modalPath = "/#"+$location.path();
    self.articleT={
        id:null,
        title:'',
        description:'',
        publishedDate:'',
        coverImagePath:'',
        featured:null,
        overallRating:null,
        categoryID:null,
        writerID:null,
        status:'',
        totalLikes:null,
        totalViews:null
    };


    self.records = [
        {
            "Name" : "Alfreds Futterkiste",
            "Country" : "Germany"
        },{
            "Name" : "Berglunds snabbköp",
            "Country" : "Sweden"
        },{
            "Name" : "Centro comercial Moctezuma",
            "Country" : "Mexico"
        },{
            "Name" : "Ernst Handel",
            "Country" : "Austria"
        }
    ];

    if(LoginService.getAuthStatus()){
        $rootScope.userRole = $cookies.getObject("userAuthObj").userrole;
        console.log("If userRole : "+ $rootScope.userRole );
    }else{
        $rootScope.userRole = 0;
        console.log("Else userRole : "+ $rootScope.userRole );
    }


    self.articles = [];


    self.wholeArticles = [];

    self.articlesToAdd = [];

    self.obj = null;

    getFeturedArticle();
    getArticlesSortedByDate();

    self.getReaderArticle = getReaderArticle;


    /*if(self.locationPath === '/home'){
        self.classStyle = 'second-style';
    }else{
        self.classStyle = '';
    }*/

    /*//to render html contents.
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };*/

    function getReaderArticle(id){

        console.log("ID is :>>> "+ id);
        UserService.fetchItemById('readarticles', id)
        .then(
            function (data) {
                self.article = {};
                self.article = data;
                self.article.description = $sce.trustAsHtml(self.article.description );
                console.log("getReaderArticle - self.article :> " + self.article.title);
                $location.url('/readarticles');
            },
            function (errResponse) {
                console.error('Error while fetching Articles');
            }
        );
    }

    /*function getReaderArticle(id) {
        goReaderArticle(id);
        console.log('Article approval confirmed for id:- ', id);
    }*/

    function getFeturedArticle() {
        UserService.getFeturedArticleService()
            .then(
                function (data) {
                    //self.articles = data;
                    angular.forEach(JSON.parse(data), function(value, key){
                            self.articlesToAdd.push({
                                id:value.id,
                                title:value.title,
                                publishedDate:value.publishedDate,
                                description: $sce.trustAsHtml(value.description),
                                coverImagePath:value.coverImagePath,
                                overallRating:value.overallRating,
                                categoryID:value.categoryID,
                                categoryName:value.category.catName,
                                writerID:value.writerID,
                                writerName:value.userAsWriter.fullname,
                                totalLikes:value.totalLikes,
                                totalViews:value.totalViews
                            });
                    });
                    $scope.featuredArticles = self.articlesToAdd;


                    //sortByFeaturedCategory(self.articlesToAdd);
                },
                function (errResponse) {
                    console.error('Error while fetching featured article');
                }
            );
    }

    function getArticlesSortedByDate() {
        UserService.getArticlesSortedByDate()
            .then(
                function (data) {
                    angular.forEach(JSON.parse(data), function(value, key){
                        self.wholeArticles.push({
                            id:value.id,
                            title:value.title,
                            publishedDate:value.publishedDate,
                            description: $sce.trustAsHtml(value.description),
                            coverImagePath:value.coverImagePath,
                            overallRating:value.overallRating,
                            categoryID:value.categoryID,
                            categoryName:value.category.catName,
                            writerID:value.writerID,
                            writerName:value.userAsWriter.fullname,
                            totalLikes:value.totalLikes,
                            totalViews:value.totalViews

                        });
                    });
                },
                function (errResponse) {
                    console.error('Error while fetching featured article');
                }
            );
    }

    /*--------------------------------*/




        $scope.items = [{
            "name": "name 1",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "West"
        }, {
            "name": "name 2",
            "category": [{
                "category": "engineering"
            }],
            "branch": "West"
        }, {
            "name": "name 3",
            "category": [{
                "category": "management"
            }, {
                "category": "engineering"
            }],
            "branch": "West"
        }, {
            "name": "name 4",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "West"
        }, {
            "name": "name 5",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "name 6",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "name 7",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "name 8",
            "category": [{
                "category": "business"
            }],
            "branch": "West"
        }, {
            "name": "name 9",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "name 10",
            "category": [{
                "category": "management"
            }],
            "branch": "East"
        }, {
            "name": "name 11",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "name 12",
            "category": [{
                "category": "engineering"
            }],
            "branch": "West"
        }, {
            "name": "name 13",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "West"
        }, {
            "name": "name 14",
            "category": [{
                "category": "engineering"
            }],
            "branch": "East"
        }, {
            "name": "name 15",
            "category": [{
                "category": "management"
            }, {
                "category": "engineering"
            }],
            "branch": "East"
        }, {
            "name": "name 16",
            "category": [{
                "category": "management"
            }],
            "branch": "West"
        }, {
            "name": "name 17",
            "category": [{
                "category": "management"
            }],
            "branch": "East"
        }, {
            "name": "name 18",
            "category": [{
                "category": "business"
            }],
            "branch": "West"
        }, {
            "name": "name 19",
            "category": [{
                "category": "business"
            }],
            "branch": "West"
        }, {
            "name": "name 20",
            "category": [{
                "category": "engineering"
            }],
            "branch": "East"
        }, {
            "name": "Peter",
            "category": [{
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "Frank",
            "category": [{
                "category": "management"
            }],
            "branch": "East"
        }, {
            "name": "Joe",
            "category": [{
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "Ralph",
            "category": [{
                "category": "management"
            }, {
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "Gina",
            "category": [{
                "category": "business"
            }],
            "branch": "East"
        }, {
            "name": "Sam",
            "category": [{
                "category": "management"
            }, {
                "category": "engineering"
            }],
            "branch": "East"
        }, {
            "name": "Britney",
            "category": [{
                "category": "business"
            }],
            "branch": "West"
        }];

        // create empty search model (object) to trigger $watch on update
        $scope.search = {};

        $scope.resetFilters = function () {
            // needs to be a function or it won't trigger a $watch
            $scope.search = {};
        };

        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.items.length;
        $scope.entryLimit = 10; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

        // $watch search to update pagination
        $scope.$watch('search', function (newVal, oldVal) {
            $scope.filtered = filterFilter($scope.items, newVal);
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }, true);





}]);

