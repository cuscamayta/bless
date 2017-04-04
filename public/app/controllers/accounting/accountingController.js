app.controller('AccountingController', function ($scope, AccountingService, CostcenterService, AccountService, $rootScope) {
    init();
    function init() {
        getaccounts();
        getcostcenters();
        getaccountings();
        dataaccounting();

        $scope.editaccounting.dateregister = moment().format('DD/MM/YYYY');
        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.editaccounting.dateregister = picker.startDate.format('DD/MM/YYYY');
        });

        $("#step-1").css("display", "block");
        $("#step-2").css("display", "none");
    }

    function dataaccounting() {
        $scope.editaccounting = {
            id: 0,
            state: 1,
            details: []
        };
        $scope.selectedwarehouse = null;
        $scope.selecteditem = null;
        $scope.accountingdetails = [];

        $scope.editdetail = {
            state: "0"
        }

        $scope.debit = 0;
        $scope.credit = 0;
    };

    function getaccountings() {
        var response = AccountingService.getaccountings();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.accountings = res.data;
            }
        });
    }

    function getaccounts() {
        var response = AccountService.getaccounts();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listaccount = res.data;
            }
        });
    }

    function getcostcenters() {
        var response = CostcenterService.getcostcenters();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listcostcenter = res.data;
            }
        });
    }

    $scope.saveaccounting = function () {
        $scope.editaccounting;
        $scope.editaccounting.idoffice = $rootScope.idoffice;
        $scope.editaccounting.iduser = $rootScope.currentUser.user.id;
        $scope.editaccounting.details = $scope.accountingdetails;
        if ($scope.editaccounting.id == 0) {
            var response = AccountingService.saveaccounting($scope.editaccounting);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getaccountings();
                    dataaccounting();
                    toastr.success(res.message);
                    $("#step-1").css("display", "block");
                    $("#step-2").css("display", "none");
                    dataaccounting();
                }
            });
        } else {
            var response = AccountingService.updateaccounting($scope.editaccounting);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getaccountings();
                    dataaccounting();
                    $scope.sumTotal = 0;
                    toastr.success(res.message);
                    $("#step-1").css("display", "block");
                    $("#step-2").css("display", "none");
                    dataaccounting();
                }
            });
        }
    };

    $scope.deleteaccounting = function () {
        var response = AccountingService.deleteaccounting($scope.editaccounting);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteaccounting").modal("hide");
                dataaccounting();
                getaccountings();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedaccounting = function (accounting, option) {
        $scope.accountingselected = accounting;
        $scope.editaccounting = angular.copy($scope.accountingselected);
        $scope.editaccounting.state = 2;

        if ($scope.listcostcenter) {
            for (var i = 0; i < $scope.listcostcenter.length; i++) {
                if ($scope.listcostcenter[i].id == $scope.editcashbox.idcostcenter) {
                    $scope.selectedcostcenter = $scope.listcostcenter[i];
                }
            }
        }

        if ($scope.listoffice) {
            for (var i = 0; i < $scope.listoffice.length; i++) {
                if ($scope.listoffice[i].id == $scope.editcashbox.idoffice) {
                    $scope.selectedoffice = $scope.listoffice[i];
                }
            }
        }

        if ($scope.accountings) {
            for (var i = 0; i < $scope.accountings.length; i++) {
                if ($scope.accountings[i].id == $scope.editaccounting.id) {
                    $scope.accountingdetails = $scope.accountings[i].Accountingdetails;
                }

                if ($scope.accountingdetails) {
                    for (var j = 0; j < $scope.accountingdetails.length; j++) {
                        $scope.accountingdetails[j].name = $scope.accountingdetails[j].Account.name;
                    }
                }
            }
            getTotal();
        }

        if (option == 1) {
            $("#step-2").css("display", "block");
            $("#step-1").css("display", "none");
        }
    };

    function getTotal() {
        $scope.sumDebit = $scope.accountingdetails.where(function (row) { return row.state == 1; }).sum(function (item) {
            return parseInt(item.debit);
        });

        $scope.sumCredit = $scope.accountingdetails.where(function (row) { return row.state == 1; }).sum(function (item) {
            return parseInt(item.credit);
        });
    }

    $scope.validatecontrols = function () {
        return $scope.editaccounting == null || $scope.editaccounting.dateregister == null
            || $scope.selectedwarehouse == null || $scope.selectedtype == null
            || $scope.selectedtypeprice == null || $scope.editaccounting.code == null || $scope.editaccounting.owner == null
            || ($scope.accountingdetails != null && $scope.accountingdetails.length < 1);
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.editdetail == null || $scope.debit == null
            || $scope.selectedaccount == null || $scope.credit == null || $scope.detail == null
            || ($scope.debit == 0 && $scope.credit == 0);
    };

    $scope.newaccounting = function () {
        $("#step-2").css("display", "block");
        $("#step-1").css("display", "none");
        dataaccounting();
    };

    $scope.cancel = function () {
        $("#step-1").css("display", "block");
        $("#step-2").css("display", "none");
        dataaccounting();
    };

    $scope.newaccountingdetail = function () {
        $scope.editdetail = {};

        var n = $scope.accountingdetails.where(function (item) {
            return item.idaccount == $scope.selectedaccount.id;
        });

        if (n.length == 0) {
            $scope.editdetail.idaccount = $scope.selectedaccount.id;
            $scope.editdetail.name = $scope.selectedaccount.numberid + ' ' + $scope.selectedaccount.title;
            $scope.editdetail.state = 1;
            $scope.editdetail.debit = $scope.debit;
            $scope.editdetail.credit = $scope.credit;
            $scope.editdetail.detail = $scope.detail;
            if ($scope.selectedcostcenter) {
                $scope.editdetail.idcostcenter = $scope.selectedcostcenter.id;
                $scope.editdetail.namecost = $scope.selectedcostcenter.title;
            }
            else
                $scope.editdetail.idcostcenter = null;
            $scope.accountingdetails.push($scope.editdetail);
        }
        getTotal();
        $scope.debit = 0;
        $scope.credit = 0;
        $scope.selectedaccount = null;
    }

    $scope.deleteaccountingdetail = function (item) {
        item.state = 0;
        getTotal();
    };
});