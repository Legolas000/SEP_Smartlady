<%--
  Created by IntelliJ IDEA.
  User: ARHAM
  Date: 9/23/2016
  Time: 3:52 PM
  To change this template use File | Settings | File Templates.
--%>

<link href="/static/css/magazine-css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen"/>

<div class="section" ng-init="viewAdvertises()" ng-controller="AdvertiserController as adctrl">
    <div class="container">
        <div class="row">
            <div class="col-md-9" style="text-align: left">
                <div class="panel panel-info" >
                    <div class="panel-heading" style="height: 50px"><h4>View and Update Advertisements</h4></div>
                    <div class="panel-body contact-form-box">
                        <form role="form">

                            <div class="col-sm-6" ng-repeat="item in adctrl.updateitems">
                                <div class="well well-sm" >
                                    <div class="row">

                                        <div ng-if="item.status == 'Available'">
                                            <%--<div class="col-md-12">
                                                <a style="margin-left: 100px; color:black; font-style: inherit; font-size: 25px"><b>New Bugger Bun</b></a>
                                            </div>--%>
                                            <div class="col-md-4">
                                                <img ng-src="{{item.imagePath}}" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                            </div>
                                            <div class="col-md-8 text-center">
                                                <b>
                                                    <label style="color:#009933">{{item.status}}</label>
                                                    <div style="color:#009933"><b><label >Expiry Date {{item.exdate}}</label></b></div>

                                                    <input type="submit" class="btn btn-warning small" ng-click="openTimeExtend(item.id); getSelectedAdvertise(advertiseId)" value="Extend Time" /><br/><br/>
                                                    <button type="submit" class="btn btn-warning small"  ng-click="openUpdateAll(item.id); getSelectedAdvertise(advertiseId)" >Update All</button>
                                                </b>
                                            </div>
                                        </div>

                                        <div ng-if="item.status == 'Pending'" >

                                            <div class="col-md-4">
                                                <img ng-src="{{item.imagePath}}" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                            </div>
                                            <div class="col-md-8 text-center" style="margin-top: 30px">
                                                <b>
                                                    <label style="color:#ff9900; ">{{item.status}}</label> <br/>
                                                    <label style="color:#ff9900">Expiry Date {{item.exdate}}</label>

                                                </b><br/><br/><br/><br/>
                                            </div>
                                        </div>

                                        <div ng-if="item.status == 'Expired'" >

                                            <div class="col-md-4">
                                                <img ng-src="{{item.imagePath}}" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                            </div>
                                            <div class="col-md-8 text-center" style="margin-top: 35px">
                                                <b>
                                                    <label style="color:red">{{item.status}}</label><br/>
                                                    <label style="color:red">Expired Date {{item.exdate}}</label>

                                                    <%--<input type="submit" class="btn btn-warning small" ng-click="openTimeExtend(item.id); getSelectedAdvertise(advertiseId)" value="Extend Time" /><br/><br/>
                                                    <button type="submit" class="btn btn-warning small"  ng-click="openUpdateAll(item.id); getSelectedAdvertise(advertiseId)" >Update All</button>--%>
                                                    <br/><br/>
                                                    <button type="submit" class="btn btn-warning small"  ng-click="openUpdateAll(item.id); getSelectedAdvertise(advertiseId)" >Re-Assign</button>
                                                </b>
                                            </div>
                                        </div>

                                        <div ng-if="item.status == 'Rejected'" >

                                            <div class="col-md-4">
                                                <img ng-src="{{item.imagePath}}" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                            </div>
                                            <div class="col-md-8 text-center">
                                                <b>
                                                    <label style="color:#cc0000; font-style: oblique; text-shadow: black; font-size: 25px; text-align: left; margin-top: 45px"><b>{{item.status}}</b></label>
                                                    <%--<label style="color:#ff9900">Expired Date {{item.exdate}}</label>--%>
                                                </b>
                                            </div>
                                        </div>

                                        <%--<div class="col-md-6">
                                            <img ng-src="{{item.imagePath}}" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                        </div>
                                        <div class="col-md-6 text-center">
                                            <div ng-if="checkAv.isEqual(2)" style="color:#009933"><b><label >{{item.status}}</label></b></div>
                                            <div ng-if="checkAv.isEqual(1)" style="color:red"><b><label >{{item.status}}</label></b></div>
                                            <div style="color:#009933"><b><label >Expirry Date {{item.exdate}}</label></b></div>
                                            <input type="submit" class="btn btn-warning small" ng-click="openTimeExtend(item.id); getSelectedAdvertise(advertiseId)" value="Extend Time" /><br/><br/>
                                            <button type="submit" class="btn btn-warning small"  ng-click="openUpdateAll(item.id); getSelectedAdvertise(advertiseId)" >Update All</button>
                                        </div>--%>

                                        <%--</div>--%>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="/static/js/magazine-js/bootstrap.min.js"></script>