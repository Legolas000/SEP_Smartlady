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

                            <%--<table class="col-md-9">
                                <tbody >

                                    <tr ng-repeat="item in adctrl.updateitems track by $index">
                                        <td class="text-center" >
                                            <div data-animate-hover="shake">
                                                &lt;%&ndash;{{item}}&ndash;%&gt;
                                                <img src="/static/js/template/addvertiserPage/advertises/maxresdefault.jpg" style="height: 130px; width: 100px; alignment: right" class="img-rounded" />
                                                <div style="color:#009933"><b><label >{{item.status}}</label></b></div>
                                                <div style="color:#009933"><b><label >{{item.exdate}}</label></b></div>
                                                <div style="color:#009933 "><b><label >{{adctrl.remainingDays}}</label></b></div>
                                                <button type="submit" class="btn btn-warning" data-toggle="modal" data-target="#updateAdvertiseModal">Extend</button>
                                            </div>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>--%>

                            <div class="col-sm-6" ng-repeat="item in adctrl.updateitems track by $index">
                                <div class="well well-sm" >
                                    <div class="row">
                                        <div class="col-md-6">
                                            <img src="/static/js/template/advertiser-template/advertises/gel.jpg" style="height: 130px; width: 110px; alignment: right" class="img-rounded" />
                                        </div>
                                        <div class="col-md-6 text-center">
                                            <div ng-if="adctrl.check" style="color:#009933"><b><label >{{item.status}}</label></b></div>
                                            <div ng-if="!adctrl.check" style="color:red"><b><label >{{item.status}}</label></b></div>
                                            <div style="color:#009933"><b><label >Expirry Date {{item.exdate}}</label></b></div>
                                            <%--<div style="color:#009933 "><b><label >{{adctrl.remainingDays}}</label></b></div>--%><br/><br/>
                                            <button type="submit" class="btn btn-warning" ng-click="open(item.id)" data-target="#updateAdvertiseModal">Extend</button>

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

<!-- View Or Update Advertise Modal -->
<div class="modal" id="updateAdvertiseModal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>{{adctrl.urltest}} Update The Advertise</b></h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="control-label" >Time Period for Avdertisement :</label>
                    <select class="form-control" ng-model="adctrl.advertise.time">
                        <option>For 2 Weeks</option>
                        <option>For 1 Month</option>
                        <option>For 3 Month</option>
                        <option>For 6 Month</option>
                        <option>For 1 Year</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label" >URL of Advertise : {{adctrl.urltest}}</label>
                    <input class="form-control" name="burl" type="url" ng-model="adctrl.testdescription" required >
                    <%--<div ng-show="advertiseForm.aurl.$touched && advertiseForm.aurl.$invalid" class="col-md-12 col-sm-12 col-xs-12 ">
                        <span ng-show="advertiseForm.aurl.$error.required">
                        <a class="errorfont">URL field is required</a> <br/>
                        </span>
                        <a class="errorfont">Invalid URL address </a>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Update Changes</button>
                </div>
            </div>

        </div>
    </div>
</div>




<script type="text/javascript" src="/static/js/magazine-js/bootstrap.min.js"></script>