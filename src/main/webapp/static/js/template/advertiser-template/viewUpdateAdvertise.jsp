<%--
  Created by IntelliJ IDEA.
  User: ARHAM
  Date: 9/23/2016
  Time: 3:52 PM
  To change this template use File | Settings | File Templates.
--%>

<link href="/static/css/magazine-css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen"/>

<div class="section">
    <div class="container">
        <%--<div ng-include="'modal.jsp'"></div>--%>
        <div class="row">
            <div class="col-md-9" style="text-align: left">
                <div class="panel panel-info" >
                    <div class="panel-heading" style="height: 50px"><h4>View and Update Advertisements</h4></div>
                    <div class="panel-body contact-form-box">
                        <form role="form">

                            <div class="col-sm-6" ng-repeat="item in adctrl.updateitems track by $index">
                                <div class="well well-sm" >
                                    <div class="row">
                                        <div class="col-md-6">
                                            <img src="/static/js/template/advertiser-template/advertises/maxresdefault.jpg" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                        </div>
                                        <div class="col-md-6 text-center">
                                            <div ng-if="adctrl.check" style="color:#009933"><b><label >{{item.status}}</label></b></div>
                                            <div ng-="!adctrl.check" style="color:red"><b><label >{{item.status}}</label></b></div>
                                            <div style="color:#009933"><b><label >Expirry Date {{item.exdate}}</label></b></div>
                                            <input type="submit" class="btn btn-warning small" ng-click="openTimeExtend(item.id); getSelectedAdvertise(advertiseId)" value="Extend Time" /><br/><br/>
                                            <button type="submit" class="btn btn-warning small"  ng-click="openUpdateAll(item.id); getSelectedAdvertise(advertiseId)" >Update All</button>
                                        </div>
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