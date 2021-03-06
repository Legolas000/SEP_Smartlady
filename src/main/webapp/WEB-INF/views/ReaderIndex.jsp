<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
		 pageEncoding="ISO-8859-1"%>
<html lang="en" >

<!-- Mirrored from nunforest.com/hotmagazine/default/home2.html by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 03 Sep 2016 22:27:21 GMT -->
<head >
	<title>Smart Article</title>

	<meta charset="utf-8">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900,400italic' rel='stylesheet' type='text/css'>
	<link href="/static/css/magazine-css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/static/css/magazine-css/jquery.bxslider.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/static/css/magazine-css/fonts/font-awesome.min.css" rel="stylesheet" type="text/css"media="screen">
	<link href="/static/css/magazine-css/magnific-popup.css" rel="stylesheet" type="text/css" media="screen">
	<link href="/static/css/magazine-css/owl.carousel.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/static/css/magazine-css/owl.theme.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/static/css/magazine-css/ticker-style.css" rel="stylesheet" type="text/css"/>
	<link href="/static/css/magazine-css/style.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/static/css/magazine-css/rating.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="/static/css/magazine-css/fonts/fontawesome-webfontba72.woff" rel="stylesheet" type="text/css" media="screen"/>

	<%--writer page css--%>

	<link href="/static/css/writer-css/bootstrap.min.css" rel="stylesheet">
	<%--<link href="/static/css/writer-css/logo-nav.css" rel="stylesheet">--%>
	<link href="/static/css/writer-css/sweetAlert/sweetalert.css" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<%--End writer css--%>

	<%--<link href="/static/css/magazine-css/sign-style.css" rel="stylesheet" type="text/css" media="screen"/>
    <link href="/static/css/magazine-css/sign-form-elements.css" rel="stylesheet" type="text/css" media="screen"/>--%>

<style>
		.advSidenav-head{
			text-align: center;
			color: white;

		}

		.advSidebar{

			height: 1000px;
			float: left;
			background-color: #4d4d4d;

		}
</style>



	<style type="text/css">
		body.boxed {
			background: url('/static/images/pattern.png');
		}

		@font-face {
			font-family: 'FontAwesome';
			src: url('/static/css/magazine-css/fonts/fontawesome-webfontd41d.eot');
			src: url('/static/css/magazine-css/fonts/fontawesome-webfontd41d.eot') format('embedded-opentype'),
			url('/static/css/magazine-css/fonts/fontawesome-webfontba72.woff') format('woff'),
			url('/static/css/magazine-css/fonts/fontawesome-webfontba72.ttf') format('truetype'),
			url('/static/css/magazine-css/fonts/fontawesome-webfontba72.svg') format('svg');
			font-weight: normal;
			font-style: normal
		}

		.bx-wrapper .bx-loading {
			min-height: 50px;
			background: url(/static/images/bx_loader.gif) center center no-repeat #fff;
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2000;
		}
	</style>


</head>
<body class="boxed" ng-app="myApp" >

<!-- Container -->
<div id="container" ng-controller="UserController as userCtrl" data-ng-init="initFunction()">
	<header class="clearfix {{userCtrl.classStyle}}">
		<!-- Bootstrap navbar -->
		<nav class="navbar navbar-default navbar-static-top" role="navigation">

			<!-- Top line -->
			<div class="top-line">
				<div class="container">
					<div class="row">
						<div class="col-md-9">
							<ul class="top-line-list">
								<%--<li>
									<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="24px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
												<path fill="#777777" d="M208,64c8.833,0,16-7.167,16-16V16c0-8.833-7.167-16-16-16s-16,7.167-16,16v32
													C192,56.833,199.167,64,208,64z M332.438,106.167l22.625-22.625c6.249-6.25,6.249-16.375,0-22.625
													c-6.25-6.25-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625
													C316.062,112.417,326.188,112.417,332.438,106.167z M16,224h32c8.833,0,16-7.167,16-16s-7.167-16-16-16H16
													c-8.833,0-16,7.167-16,16S7.167,224,16,224z M352,208c0,8.833,7.167,16,16,16h32c8.833,0,16-7.167,16-16s-7.167-16-16-16h-32
													C359.167,192,352,199.167,352,208z M83.541,106.167c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625
													L83.541,60.917c-6.25-6.25-16.374-6.25-22.625,0c-6.25,6.25-6.25,16.375,0,22.625L83.541,106.167z M400,256
													c-5.312,0-10.562,0.375-15.792,1.125c-16.771-22.875-39.124-40.333-64.458-51.5C318.459,145,268.938,96,208,96
													c-61.75,0-112,50.25-112,112c0,17.438,4.334,33.75,11.5,48.438C47.875,258.875,0,307.812,0,368c0,61.75,50.25,112,112,112
													c13.688,0,27.084-2.5,39.709-7.333C180.666,497.917,217.5,512,256,512c38.542,0,75.333-14.083,104.291-39.333
													C372.916,477.5,386.312,480,400,480c61.75,0,112-50.25,112-112S461.75,256,400,256z M208,128c39.812,0,72.562,29.167,78.708,67.25
													c-10.021-2-20.249-3.25-30.708-3.25c-45.938,0-88.5,19.812-118.375,53.25C131.688,234.083,128,221.542,128,208
													C128,163.812,163.812,128,208,128z M400,448c-17.125,0-32.916-5.5-45.938-14.667C330.584,461.625,295.624,480,256,480
													c-39.625,0-74.584-18.375-98.062-46.667C144.938,442.5,129.125,448,112,448c-44.188,0-80-35.812-80-80s35.812-80,80-80
													c7.75,0,15.062,1.458,22.125,3.541c2.812,0.792,5.667,1.417,8.312,2.521c4.375-8.562,9.875-16.396,15.979-23.75
													C181.792,242.188,216.562,224,256,224c10.125,0,19.834,1.458,29.25,3.709c10.562,2.499,20.542,6.291,29.834,11.291
													c23.291,12.375,42.416,31.542,54.457,55.063C378.938,290.188,389.209,288,400,288c44.188,0,80,35.812,80,80S444.188,448,400,448z"
												/>
											</svg>
									<span class="cel-temperature">+7</span>
								</li>--%>
								<li><span class="time-now">{{currentDate | date:'medium'}}</span></li>
								<li ng-if="!currentUserSignedIn"><a href="/#/login">Log In</a></li>
								<li ng-if="!currentUserSignedIn"><a href="/#/register">Sign Up</a></li>
								<li ng-if="currentUserSignedIn" ng-controller="LoginController"><a href="/#/editProfile">Your Profile</a></li>
								<li ng-if="currentUserSignedIn" ng-controller="LoginController"><a href="/#/logout" ng-click="doLogOut()">Log Out</a></li>


							</ul>
						</div>
						<div class="col-md-3">
							<ul class="social-icons">
								<li><a target="_blank" class="facebook" href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a></li>
								<li><a target="_blank" class="twitter" href="https://twitter.com/search?q=%23login"><i class="fa fa-twitter"></i></a></li>
								<li><a target="_blank" class="rss" href="https://www.rssinclude.com/login"><i class="fa fa-rss"></i></a></li>
								<li><a target="_blank" class="google" href="https://plus.google.com/collections/featured"><i class="fa fa-google-plus"></i></a></li>
								<li><a target="_blank" class="linkedin" href="https://www.linkedin.com/uas/login"><i class="fa fa-linkedin"></i></a></li>
								<li><a target="_blank" class="pinterest" href="https://www.pinterest.com/login/"><i class="fa fa-pinterest"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- End Top line -->

			<!-- Logo & advertisement -->
			<div class="logo-advertisement">
				<div class="container">

					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" ng-href="/#/home"><img src="/static/images/logosa1.png" alt=""></a>
					</div>

					<div class="advertisement">
						<div class="desktop-advert">
							<br><br><br><br>
						</div>
						<div class="tablet-advert">
							<br><br><br><br>
						</div>
					</div>
				</div>
			</div>
			<!-- End Logo & advertisement -->

			<!-- navbar list container -->
			<div class="nav-list-container">
				<div class="container">
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-left">

							<li ng-if="userRole === 1" class=""><a class="" href="/#/home">Home</a></li>

							<li ng-if="userRole === 1" ng-repeat="category in allCategories | limitTo:7">
								<a class="" href="/#/category/{{category.id}}">{{category.catName}}</a>
							</li>

							<li ng-if="userRole === 1" class="drop"><a class="features" href="">More</a>
								<ul class="dropdown features-dropdown">
									<li  class="" ng-repeat="category in allCategoriesMore">
										<a href="/#/category/{{category.id}}">{{category.catName}}</a>
									</li>
								</ul>
							</li>

						</ul>
						<%--<form class="navbar-form navbar-right" role="search">--%>
							<%--<input type="text" id="search" name="search" placeholder="Search here">--%>
							<%--<button type="submit" id="search-submit"><i class="fa fa-search"></i></button>--%>
						<%--</form>--%>
					</div>
					<!-- /.navbar-collapse -->
				</div>
			</div>
			<!-- End navbar list container -->

		</nav>
		<!-- End Bootstrap navbar -->

	</header>
	<!-- End Header -->


	<!-- ================================================== -->
	<section ng-show="location.path() === '/home'" class="heading-news4">
		<div class="container">

			<div class="ticker-news-box">
				<span class="breaking-news">breaking news</span>
				<ul id="js-news">
					<li class="news-item"><span class="time-news">11:36 pm</span>  <a href="#">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</a> Donec odio. Quisque volutpat mattis eros... </li>
					<li class="news-item"><span class="time-news">12:40 pm</span>  <a href="#">D�shmitarja Abrashi: E kam par� Oliverin n� turm�,</a> nd�rsa neve na shp�toi ?�ika Mille? </li>
					<li class="news-item"><span class="time-news">11:36 pm</span>  <a href="#">Franca do t� bashk�punoj� me Kosov�n n� fush�n e sh�ndet�sis�. </a></li>
					<li class="news-item"><span class="time-news">01:00 am</span>  <a href="#">DioGuardi, k�shtu e mbrojti Kosov�n n� Washington, </a> para serbit Vejvoda </li>
				</ul>
			</div>
		</div>

		<div class="heading-news-box">
			<owl-carousel owl-options="owlOptions">
				<div class="owl-wrapper">
					<div class="owl-carousel" data-num="4">

						<div owl-carousel-item ng-repeat="articleNo in [0,1,2,3,4,5]" class="item">
							<div class="news-post image-post4">
								<div class="post-gallery">
									<img src="{{userCtrl.articlesToAdd[articleNo].coverImagePath}}" alt="">
									<a class="category-post {{userCtrl.articlesToAdd[articleNo].categoryName | lowercase}}" href="/#/readarticles/{{userCtrl.articlesToAdd[articleNo].id}}">{{userCtrl.articlesToAdd[articleNo].categoryName}}</a>
								</div>
								<div class="post-content">
									<h2><a href="/#/readarticles/{{userCtrl.articlesToAdd[articleNo].id}}">{{userCtrl.articlesToAdd[articleNo].title}}</a></h2>
									<ul class="post-tags">
										<li><i class="fa fa-clock-o"></i>{{userCtrl.articlesToAdd[articleNo].publishedDate | date:'medium'}}</li>
										<li><i class="fa fa-user"></i>by <a href="#">{{userCtrl.articlesToAdd[articleNo].writerName}}</a></li>
										<li><a href="#"><i class="fa fa-comments-o"></i><span>{{userCtrl.articlesToAdd[articleNo].noOfComments}}</span></a></li>
										<li><i class="fa fa-eye"></i>{{userCtrl.articlesToAdd[articleNo].totalViews}}</li>
									</ul>

								</div>

							</div>
						</div>
					</div>
				</div>
			</owl-carousel>
		</div>

	</section>
	<!-- End heading-news4-section -->

	<!-- features-today-section
        ================================================== -->
	<section ng-show="location.path() === '/home'" class="features-today second-style">
		<div class="container">

			<div class="title-section">
				<h1><span>Today's Featured</span></h1>
			</div>

			<owl-carousel owl-options="owlOptions">
				<div class="features-today-box owl-wrapper">
					<div class="owl-carousel" data-num="4">

						<div class="item news-post standard-post" owl-carousel-item ng-repeat="articleNo in [0,1,2,3,4,5,6,7]">
							<div class="post-gallery">
								<img src="{{userCtrl.articlesToAdd[articleNo].coverImagePath}}" alt="">
								<a class="category-post {{userCtrl.articlesToAdd[articleNo].categoryName | lowercase}}" href="/#/readarticles/{{userCtrl.articlesToAdd[articleNo].id}}">{{userCtrl.articlesToAdd[articleNo].categoryName}}</a>
							</div>
							<div class="post-content">
								<h2><a href="/#/readarticles/{{userCtrl.articlesToAdd[articleNo].id}}">{{userCtrl.articlesToAdd[articleNo].title}} </a></h2>
								<ul class="post-tags">
									<li><i class="fa fa-clock-o"></i>{{userCtrl.articlesToAdd[articleNo].publishedDate | date:'medium'}}</li>
									<li><i class="fa fa-user"></i>by <a href="#">{{userCtrl.articlesToAdd[articleNo].writerName}}</a></li>
									<li><a href=""><i class="fa fa-comments-o"></i><span>23</span></a></li>
								</ul>

							</div>

						</div>

					</div>
				</div>
			</owl-carousel>

		</div>
	</section>
	<!-- End features-today-section -->

	<!-- block-wrapper-section
        ================================================== -->
	<section ng-show="location.path() === '/home'" class="block-wrapper">
		<div class="container">

			<!-- block content -->
			<div class="block-content non-sidebar">

				<%--<!-- google addsense -->
				<div class="advertisement">
					<div class="desktop-advert">
						<span>Advertisement</span>
						<img src="/static/upload/addsense/728x90-white.jpg" alt="">
					</div>
					<div class="tablet-advert">
						<span>Advertisement</span>
						<img src="/static/upload/addsense/468x60-white.jpg" alt="">
					</div>
					<div class="mobile-advert">
						<span>Advertisement</span>
						<img src="/static/upload/addsense/300x250.jpg" alt="">
					</div>
				</div>
				<!-- End google addsense -->--%>

				<%--<!-- grid box -->
                <div class="grid-box">

                    <div class="row">

                        <div class="col-md-6">
                            <div class="title-section">
                                <h1><span class="world">Lifestyle</span></h1>
                            </div>

                            <div class="news-post image-post2">
                                <div class="post-gallery">
                                    <img src="upload/news-posts/hm1.jpg" alt="">
                                    <div class="hover-box">
                                        <div class="inner-hover">
                                            <h2><a href="single-post.html">Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. </a></h2>
                                            <ul class="post-tags">
                                                <li><i class="fa fa-clock-o"></i>27 may 2013</li>
                                                <li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>
                                                <li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>
                                                <li><i class="fa fa-eye"></i>872</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">

                                    <div class="item news-post standard-post">
                                        <div class="post-gallery">
                                            <img src="upload/news-posts/st7.jpg" alt="">
                                        </div>
                                        <div class="post-content">
                                            <h2><a href="single-post.html">Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. </a></h2>
                                            <ul class="post-tags">
                                                <li><i class="fa fa-clock-o"></i>27 may 2013</li>
                                                <li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>
                                                <li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">

                                    <div class="item news-post standard-post">
                                        <div class="post-gallery">
                                            <img src="upload/news-posts/st8.jpg" alt="">
                                        </div>
                                        <div class="post-content">
                                            <h2><a href="single-post.html">Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</a></h2>
                                            <ul class="post-tags">
                                                <li><i class="fa fa-clock-o"></i>27 may 2013</li>
                                                <li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>
                                                <li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="title-section">
                                <h1><span class="travel">Travel</span></h1>
                            </div>

                            <div class="news-post image-post2">
                                <div class="post-gallery">
                                    <img src="upload/news-posts/hm2.jpg" alt="">
                                    <div class="hover-box">
                                        <div class="inner-hover">
                                            <h2><a href="single-post.html">Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. </a></h2>
                                            <ul class="post-tags">
                                                <li><i class="fa fa-clock-o"></i>27 may 2013</li>
                                                <li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>
                                                <li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>
                                                <li><i class="fa fa-eye"></i>872</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">

                                    <div class="item news-post standard-post">
                                        <div class="post-gallery">
                                            <img src="upload/news-posts/st9.jpg" alt="">
                                        </div>
                                        <div class="post-content">
                                            <h2><a href="single-post.html">Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. </a></h2>
                                            <ul class="post-tags">
                                                <li><i class="fa fa-clock-o"></i>27 may 2013</li>
                                                <li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>
                                                <li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">

                                    <div class="item news-post standard-post">
                                        <div class="post-gallery">
                                            <img src="upload/news-posts/st3.jpg" alt="">
                                        </div>
                                        <div class="post-content">
                                            <h2><a href="single-post.html">Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</a></h2>
                                            <ul class="post-tags">
                                                <li><i class="fa fa-clock-o"></i>27 may 2013</li>
                                                <li><i class="fa fa-user"></i>by <a href="#">John Doe</a></li>
                                                <li><a href="#"><i class="fa fa-comments-o"></i><span>23</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <!-- End grid box -->--%>

			</div>
			<!-- End block content -->
		</div>
	</section>
	<!-- End block-wrapper-section -->

	<section class="block-wrapper">
		<div class="container">
			<div class="row">
				<!-- --- Arham's page side nav bar ------->
				<div class="col-sm-3 advSidebar" ng-if="userRole === 3">
					<div class="container-fluid">
						<h3 class="advSidenav-head"><b>Advertiser's Self Blog</b></h3><br/><br/>
						<ul class="nav nav-pills nav-stacked">
							<%--<li><a href="/#/advertiserprofile" class="glyphicon glyphicon-user" > View My Profile</a></li>--%>
							<li><a href="/#/viewUpdateAdvertise" class="glyphicon glyphicon-home" style="color: #ccffff; border-color: turquoise; height: 50px; font-size: medium"> My Dashboard</a></li>
							<li><a href="/#/assignadvertise" class="glyphicon glyphicon-upload" style="color: #ccffff; border-color: turquoise; height: 50px; "> Create New Advertisement</a></li> <br/>

						</ul><br>
					</div>
				</div>
				<div ng-view autoscroll="true"></div>
				<%--<ng-include src="'/static/js/template/reader-template/include/side-bar.html'"></ng-include>--%>
				<div class="col-sm-4" ng-if="userRole === 1" >

					<!-- sidebar -->
					<div class="sidebar">



						<div class="widget tab-posts-widget">

							<ul class="nav nav-tabs" id="myTab">
								<li class="active">
									<a href=""  ng-click="showPopularTab()" data-toggle="tab">Popular</a>
								</li>
								<li>
									<a href=""  ng-click="showRecentTab()" data-toggle="tab">Recent</a>
								</li>
								<li>
									<a href=""  ng-click="showTopReviewsTab()" data-toggle="tab">Top Reviews</a>
								</li>
							</ul>

							<div class="tab-content">
								<div class="tab-pane {{isPopularTab}}" id="option1Popular" >
									<ul class="list-posts">
										<li ng-repeat="article in userCtrl.articlesToAdd | limitTo:5">
											<a href="/#/readarticles/{{article.id}}"><img src="{{article.coverImagePath}}" alt=""></a>
											<div class="post-content">
												<h2><a href="/#/readarticles/{{article.id}}">{{article.title}} </a></h2>
												<ul class="post-tags">
													<li><i class="fa fa-clock-o"></i>{{article.publishedDate | date:'medium'}}</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
								<div class="tab-pane {{isRecentTab}}" id="option2Recent" >
									<ul class="list-posts">

										<li ng-repeat="article in userCtrl.wholeArticles | limitTo:5">
											<a href="/#/readarticles/{{article.id}}"><img src="{{article.coverImagePath}}" alt=""></a>
											<div class="post-content">
												<h2><a href="/#/readarticles/{{article.id}}">{{article.title}} </a></h2>
												<ul class="post-tags">
													<li><i class="fa fa-clock-o"></i>{{article.publishedDate | date:'medium'}}</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
								<div class="tab-pane {{isTopReviewsTab}}" id="option3TopReviews" >
									<ul class="list-posts">

										<li ng-repeat="article in userCtrl.topRatedArticles | limitTo:5">
											<a href="/#/readarticles/{{article.id}}"><img src="{{article.coverImagePath}}" alt=""></a>
											<div class="post-content">
												<h2><a href="/#/readarticles/{{article.id}}">{{article.title}} </a></h2>
												<ul class="post-tags">
													<li><i class="fa fa-clock-o"></i>{{article.publishedDate | date:'medium' }}</li>
												</ul>
												<div><average-star-rating ng-model="article.overallRating" max="5" ><average-star-rating></div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="advertisement">
							<div class="desktop-advert" >
								<span>Advertisement</span>
								<br/>
								<a target="_blank" href="{{adSideTopRendom.url}}"><img height="200" width="300" src="{{adSideTopRendom.imagePath}}" alt=""></a>
							</div>
						</div>

						<div class="widget recent-comments-widget">
							<div class="title-section">
								<h1><span>Recent Comments</span></h1>
							</div>

							<owl-carousel owl-options="owlOptions">
								<div class="owl-wrapper">
									<div class="owl-carousel" data-num="1">
										<div class="item">
											<ul class="comment-list">
												<li owl-carousel-item ng-repeat="commentIndex in [0,1,2]">
													<a style="text-decoration: none;" href="/#/readarticles/{{allComments[commentIndex].articleID}}">
														<img src="{{allComments[commentIndex].user.imagePath}}" alt="">
														<div class="comment-content">
															<p class="main-message">{{allComments[commentIndex].comments}}</p>
															<span><i class="fa fa-user"></i>by {{allComments[commentIndex].user.fullname}}</span>
															<span><i class="fa fa-clock-o"></i>{{allComments[commentIndex].dateTime | date:'medium'}}</span>
														</div>
													</a>
												</li>

											</ul>
										</div>
										<div class="item">
											<ul class="comment-list">
												<li owl-carousel-item ng-repeat="commentIndex in [3,4,5]">
													<a style="text-decoration: none;" href="/#/readarticles/{{allComments[commentIndex].articleID}}">
														<img src="{{allComments[commentIndex].user.imagePath}}" alt="">
														<div class="comment-content">
															<p class="main-message">{{allComments[commentIndex].comments}}</p>
															<span><i class="fa fa-user"></i>by {{allComments[commentIndex].user.fullname}}</span>
															<span><i class="fa fa-clock-o"></i>{{allComments[commentIndex].dateTime | date:'medium' }}</span>
														</div>
													</a>
												</li>

											</ul>
										</div>
									</div>
								</div>
							</owl-carousel>
						</div>


						<div class="advertisement">
							<div class="desktop-advert" >
								<span>Advertisement</span>
								<br/>
								<a target="_blank" href="{{adSideBottomRendom.url}}"><img height="200" width="300" src="{{adSideBottomRendom.imagePath}}" alt=""></a>
							</div>
						</div>

					</div>
					<!-- End sidebar -->

				</div>
				<div class="col-sm-4" ng-if="userRole === 0">

					<!-- sidebar -->
					<div class="sidebar">



						<div class="widget tab-posts-widget">

							<ul class="nav nav-tabs" id="guest-myTab">
								<li class="active">
									<a href=""  ng-click="showPopularTab()" data-toggle="tab">Popular</a>
								</li>
								<li>
									<a href=""  ng-click="showRecentTab()" data-toggle="tab">Recent</a>
								</li>
								<li>
									<a href=""  ng-click="showTopReviewsTab()" data-toggle="tab">Top Reviews</a>
								</li>
							</ul>

							<div class="tab-content">
								<div class="tab-pane {{isPopularTab}}" id="guest-option1Popular" >
									<ul class="list-posts">
										<li ng-repeat="article in userCtrl.articlesToAdd | limitTo:5">
											<a href="/#/login"><img src="{{article.coverImagePath}}" alt=""></a>
											<div class="post-content">
												<h2><a href="/#/login">{{article.title}} </a></h2>
												<ul class="post-tags">
													<li><i class="fa fa-clock-o"></i>{{article.publishedDate | date:'medium'}}</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
								<div class="tab-pane {{isRecentTab}}" id="guest-option2Recent" >
									<ul class="list-posts">

										<li ng-repeat="article in userCtrl.wholeArticles | limitTo:5">
											<a href="/#/login"><img src="{{article.coverImagePath}}" alt=""></a>
											<div class="post-content">
												<h2><a href="/#/login">{{article.title}} </a></h2>
												<ul class="post-tags">
													<li><i class="fa fa-clock-o"></i>{{article.publishedDate | date:'medium'}}</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
								<div class="tab-pane {{isTopReviewsTab}}" id="guest-option3TopReviews" >
									<ul class="list-posts">

										<li ng-repeat="article in userCtrl.topRatedArticles | limitTo:5">
											<a href="/#/login"><img src="{{article.coverImagePath}}" alt=""></a>
											<div class="post-content">
												<h2><a href="/#/login">{{article.title}} </a></h2>
												<ul class="post-tags">
													<li><i class="fa fa-clock-o"></i>{{article.publishedDate | date:'medium' }}</li>
												</ul>
												<div><average-star-rating ng-model="article.overallRating" max="5" ><average-star-rating></div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="advertisement">
							<div class="desktop-advert" >
								<span>Advertisement</span>
								<br/>
								<a target="_blank" href="{{adSideTopRendom.url}}"><img height="200" width="300" src="{{adSideTopRendom.imagePath}}" alt=""></a>
							</div>
						</div>

						<div class="widget recent-comments-widget">
							<div class="title-section">
								<h1><span>Recent Comments</span></h1>
							</div>

							<owl-carousel owl-options="owlOptions">
								<div class="owl-wrapper">
									<div class="owl-carousel" data-num="1">
										<div class="item">
											<ul class="comment-list">
												<li owl-carousel-item ng-repeat="commentIndex in [0,1,2]">
													<a style="text-decoration: none;" href="/#/login">
														<img src="{{allComments[commentIndex].user.imagePath}}" alt="">
														<div class="comment-content">
															<p class="main-message">{{allComments[commentIndex].comments}}</p>
															<span><i class="fa fa-user"></i>by {{allComments[commentIndex].user.fullname}}</span>
															<span><i class="fa fa-clock-o"></i>{{allComments[commentIndex].dateTime | date:'medium'}}</span>
														</div>
													</a>
												</li>

											</ul>
										</div>
										<div class="item">
											<ul class="comment-list">
												<li owl-carousel-item ng-repeat="commentIndex in [3,4,5]">
													<a style="text-decoration: none;" href="/#/login">
														<img src="{{allComments[commentIndex].user.imagePath}}" alt="">
														<div class="comment-content">
															<p class="main-message">{{allComments[commentIndex].comments}}</p>
															<span><i class="fa fa-user"></i>by {{allComments[commentIndex].user.fullname}}</span>
															<span><i class="fa fa-clock-o"></i>{{allComments[commentIndex].dateTime | date:'medium' }}</span>
														</div>
													</a>
												</li>

											</ul>
										</div>
									</div>
								</div>
							</owl-carousel>
						</div>


						<div class="advertisement">
							<div class="desktop-advert" >
								<span>Advertisement</span>
								<br/>
								<a target="_blank" href="{{adSideBottomRendom.url}}"><img height="200" width="300" src="{{adSideBottomRendom.imagePath}}" alt=""></a>
							</div>
						</div>

					</div>
					<!-- End sidebar -->

				</div>
			</div>
		</div>
	</section>


	<ng-include src="'/static/js/template/reader-template/include/reader-footer.html'"></ng-include>


</div>
<!-- End Container -->



<script type="text/javascript" src="/static/js/lib/angular-1.4.4.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-route.min.js"></script>
<script type="text/javascript" src="/static/js/writer-js/sweetAlert/sweetalert.min.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-cookies.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-password.min.js"></script>
<script type="text/javascript" src="/static/js/lib/angulike.js"></script>


<script type="text/javascript" src="/static/js/app.js"></script>
<script type="text/javascript" src="/static/js/controller/user_controller.js"></script>
<script type="text/javascript" src="/static/js/controller/rating_controller.js"></script>
<script type="text/javascript" src="/static/js/controller/login_controller.js"></script>
<script type="text/javascript" src="/static/js/controller/register_controller.js"></script>
<script type="text/javascript" src="/static/js/controller/article_controller.js"></script>
<script type="text/javascript" src="/static/js/service/user_service.js"></script>
<script type="text/javascript" src="/static/js/service/register_service.js"></script>
<script type="text/javascript" src="/static/js/service/login_service.js"></script>
<script type="text/javascript" src="/static/js/service/article_service.js"></script>
<script type="text/javascript" src="/static/js/controller/advertiser_controller.js"></script>
<script type="text/javascript" src="/static/js/service/advertiser_service.js"></script>


<script type="text/javascript" src="/static/js/magazine-js/jquery.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.migrate.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/bootstrap.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.ticker.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.imagesloaded.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.isotope.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/owl.carousel.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/retina-1.1.0.min.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/plugins-scroll.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/script.js"></script>
<script type="text/javascript" src="/static/js/magazine-js/jquery.backstretch.min.js"></script>
<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.10.0.js" type="text/javascript"></script>
<script type="text/javascript" src="/static/js/controller/advertiser_controller.js"></script>
<script type="text/javascript" src="/static/js/service/advertiser_service.js"></script>

<%--rich text editor js--%>
<script type="text/javascript" src="/static/js/writer-js/tinymce-dist/tinymce.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-1.4.4.js"></script>
<script type="text/javascript" src="/static/js/writer-js/angular-ui-tinymce/src/tinymce.js"></script>
<%-- end rich text editor --%>

<%-- image picker writer --%>
<script>

	var loadFile = function(event) {
		var reader = new FileReader();
		reader.onload = function(){
			var output = document.getElementById('output');
			output.src = reader.result;
		};
		reader.readAsDataURL(event.target.files[0]);
	};
</script>
<%--end image picker--%>

<%--<script type="text/javascript" src="/static/js/magazine-js/sign-scripts.js"></script>--%>









</body>

<!-- Mirrored from nunforest.com/hotmagazine/default/home2.html by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 03 Sep 2016 22:28:37 GMT -->
</html>
