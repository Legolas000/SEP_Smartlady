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
</style>

<link rel="stylesheet" type="text/css" href="/static/sweetalert/dist/sweetalert.css"/>
<script src="/static/sweetalert/dist/sweetalert.min.js"></script>

<div class="section">
    <div class="container" >
        <div class="row">
            <div class="col-md-9" style="text-align: left">
                <div class="panel panel-info" >
                    <div class="panel-heading" style="height: 50px"><h4>Assigning New Advertisements</h4></div>
                    <div class="panel-body contact-form-box">
                        <form role="form" name="advertiseForm" class="ng-pristine ng-invalid ng-invalid-required" enctype="multipart/form-data"><%--ng-submit="submitUser()">--%>
                            <div class="form-group">
                                <label class="control-label" name="category">Select Category :</label>
                                <select class="form-control" ng-model="adctrl.advertise.category">
                                    <option>Fashion</option>
                                    <option>Food</option>
                                    <option>Education</option>
                                    <option>Entertainment</option>
                                    <option>Item 5</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <input type="file" ng-model="myFile" accept="image/*" onchange="angular.element(this).scope().uploadFile(this.files)"/>
                                        <img id="output" height="150" width="250">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >URL of Advertise :</label>
                                <input class="form-control" name="aurl" type="text" ng-model="adctrl.advertise.url" required class="glyphicon glyphicon-ok">
                                <%--<div ng-show="advertiseForm.aurl.$touched && advertiseForm.aurl.$invalid" class="col-md-12 col-sm-12 col-xs-12 ">
                                    <span ng-show="advertiseForm.aurl.$error.required">
                                    <a class="errorfont">URL field is required</a> <br/>
                                    </span>
                                    <a class="errorfont">Invalid URL address </a>
                                </div>--%>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >Description about advertise :</label>
                                <textarea class="form-control" name="description" type="text" ng-model="adctrl.advertise.description" style="height: 100px" required ng-minlength="15" ng-maxlength="70"></textarea>
                                <%--<div ng-show="advertiseForm.description.$touched && advertiseForm.description.$invalid" class="col-md-12 col-sm-12 col-xs-12 ">
                                    <span ng-show="advertiseForm.description.$error.required">
                                    <a class="errorfont">Description field is required</a> <br/>
                                    </span>
                                    <a class="errorfont">Description should be greater than 15 or less than 70 letters</a>
                                </div>--%>
                            </div>
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
                                <label class="control-label" >Place to Display Add :</label>
                                <select class="form-control" ng-model="adctrl.advertise.place">
                                    <option>middle of right Side</option>
                                    <option>Bottom of right Side</option>
                                    <option>middle of Page</option>
                                    <option>Bottom of Page</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label" >Payment for Advertisement :</label>
                                <%--<input class="form-control" type="text">--%>
                                <label class="control-label"  ng-model="adctrl.advertise.payment">{{adctrl.advertise.payment}}</label>
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
                            <%--<input type="submit" class="btn btn-danger"  ng-click="adctrl.display()" value="Retrieve Details" />--%>

                        </form>
                        <%--<button type="button" ng-click="adctrl.test()"  class="btn btn-warning" >Test Form</button>
--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="/static/js/lib/angular-1.4.4.js"></script>
<script type="text/javascript" src="/static/js/lib/angular-route.min.js"></script>
<script type="text/javascript" src="/static/js/app.js"></script>
<script type="text/javascript" src="/static/js/controller/advertiser_controller.js"></script>
<script type="text/javascript" src="/static/js/service/advertiser_service.js"></script>
