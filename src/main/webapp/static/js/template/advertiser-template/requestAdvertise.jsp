<%--
  Created by IntelliJ IDEA.
  User: ARHAM
  Date: 9/22/2016
  Time: 4:14 PM
  --%>
<style style="text/css">
    .errorfont{
        color: red;
        font-size: small;

    }

    .textarea{
        resize: vertical;

    }

</style>
<link href="/static/css/magazine-css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen"/>

<div class="section">
    <div class="container" ng-init="fetchAllCategories(); fetchAllPayments()" ng-controller="AdvertiserController as adctrl">
        <div class="row">
            <div class="col-md-9" style="text-align: left">
                <div class="panel panel-info" style="margin-top: 0px">
                    <div class="panel-heading" style="height: 50px"><h4>Assigning New Advertisements</h4></div>
                    <div class="panel-body contact-form-box">
                        <form role="form" name="advertiseForm" class="ng-pristine ng-invalid ng-invalid-required" enctype="multipart/form-data">
                            <div class="form-group">
                                <label class="control-label" name="category">Select Category :</label>
                                <select class="form-control" ng-model="categoriesName" onchange="angular.element(this).scope().fetchAllCategories()">
                                    <option ng-repeat="cName in adctrl.Categories" >{{cName.catName}}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="control-label" >URL of Advertise :</label>
                                <input class="form-control" name="aurl" type="url" ng-model="adctrl.advertise.url" required class="glyphicon glyphicon-ok">
                                <div ng-show="advertiseForm.aurl.$touched && advertiseForm.aurl.$invalid && variableValid" class="col-md-12 col-sm-12 col-xs-12 ">
                                    <span ng-show="advertiseForm.aurl.$error.required">
                                    <a class="errorfont">URL field is required</a> <br/>
                                    </span>
                                    <a class="errorfont">Invalid URL address </a>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >Description about advertise :</label>
                                <textarea class="form-control textarea" name="description" type="text" ng-model="adctrl.advertise.description" style="height: 100px" required ng-minlength="15" ng-maxlength="150"></textarea>
                                <div ng-show="advertiseForm.description.$touched && advertiseForm.description.$invalid && variableValid" class="col-md-12 col-sm-12 col-xs-12 ">
                                    <span ng-show="advertiseForm.description.$error.required">
                                    <a class="errorfont">Description field is required</a> <br/>
                                    </span>
                                    <a class="errorfont">Description should be greater than 15 or less than 150 letters</a>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >Time Period for Advertisement :</label>
                                <select class="form-control" ng-model="adctrl.advertise.time" onchange="angular.element(this).scope().fetchAllPayments()">
                                    <option>For 2 Weeks</option>
                                    <option>For 1 Month</option>
                                    <option>For 3 Month</option>
                                    <option>For 6 Month</option>
                                    <option>For 1 Year</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >Place to Display Add :</label>
                                <select class="form-control" ng-model="adctrl.advertise.place" onchange="angular.element(this).scope().fetchAllPayments()">
                                    <option>Middle of right Side</option>
                                    <option>Bottom of right Side</option>
                                    <option>Middle of Page</option>
                                    <option>Bottom of Page</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >Payment for Advertisement :</label>
                                <%--<input class="form-control" type="text">--%>
                                <label class="control-label"  ng-model="adctrl.advertise.payment"> Rs. {{adctrl.advertise.payment}}.0</label>
                            </div> <br/>

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <input type="file" id="advertiseImage" class="advertiseImage" ng-model="myFile" accept="image/*" name="advertiseImage" onchange="loadFile(event); angular.element(this).scope().uploadFile(this.files)"/>
                                        <%--<div ng-if="fileValid" >
                                            <a class="errorfont">Please select an image. The file format is wrong</a>
                                        </div>--%><br/>
                                        <img id="output" height="200" width="300"> <br/>
                                        <%--<div ng-if="adctrl.dimensions == 'true'">

                                            &lt;%&ndash;<img id="output" height="200" width="300"> <br/>&ndash;%&gt;
                                        </div>--%>
                                        <div ng-if="adctrl.dimensions == ''">
                                            <%--<a class="errorfont">Invalid File Format</a> <br/>--%>
                                            <a class="errorfont">Invalid Dimensions</a> <br/>
                                        </div>

                                        <%--<a class="errorfont">The image width is : {{imgWidth}} Height is : {{imgHeight}}</a>--%>
                                        <%--<div ng-show="advertiseForm.advertiseImage.$invalid" class="col-md-12 col-sm-12 col-xs-12 ">
                                            <span ng-show="advertiseForm.advertiseImage.$error.required">
                                                <a class="errorfont">Image field is required</a> <br/>
                                            </span>

                                        </div>--%>
                                    </div>
                                </div>
                            </div>

                            <%--<div class="form-group">
                                <label class="control-label" >Values are :</label>
                                &lt;%&ndash;<input class="form-control" type="text">&ndash;%&gt;
                                <label class="control-label"  ng-model="adctrl.advertise.payment">{{adctrl.testdescription}}</label>
                            </div>--%>

                            <input type="submit" class="btn btn-success" ng-disabled="advertiseForm.$invalid" ng-click="adctrl.submit()" value="Upload to Administrator" />

                            <%--<div ng-if="adctrl.swt">
                                    sweetAlert("Success..!!!", "You have successfully assigned a New Promotion", "success");

                            </div>--%>
                            <button type="button" ng-click="adctrl.reset()"  class="btn btn-warning" >Reset Form</button>
                            <%--<input type="submit" class="btn btn-danger"  ng-click="viewAdvertises()" value="Retrieve Details" />--%>

                        </form>
                        <%--<button type="button" ng-click="adctrl.test()"  class="btn btn-warning" >Test Form</button>
--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="/static/js/magazine-js/bootstrap.min.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-1.4.4.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-route.min.js"></script>
<script type="text/javascript" src="/static/js/app.js"></script>
<script type="text/javascript" src="/static/js/controller/advertiser_controller.js"></script>
<script type="text/javascript" src="/static/js/service/advertiser_service.js"></script>
