app.controller('CashboxController', function ($scope, CashboxService, UserService, CostcenterService, AccountService, OfficeService, $rootScope) {
    init();
    function init() {
        getoffices();
        getaccounts();
        getcostcenters();
        getusers();
        getcashboxes();
        datacashbox();
    }

    function datacashbox() {
        $scope.editcashbox = {
            id: 0,
            state: 1
        };
        $scope.selectedoffice = null;
        $scope.selectedaccount = null;
        $scope.selecteduser = null;
        $scope.selectedcostcenter = null;
    };

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

    function getusers() {
        var response = UserService.getusers();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listuser = res.data;
            }
        });
    }

    function getoffices() {
        var response = OfficeService.getoffices();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
            }
        });
    }

    function getcashboxes() {
        var response = CashboxService.getcashboxes();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.cashboxes = res.data; }
        });
    }

    $scope.savecashbox = function () {
        $scope.editcashbox.idoffice = $scope.selectedoffice.id;
        $scope.editcashbox.idaccount = $scope.selectedaccount.id;
        $scope.editcashbox.iduser = $scope.selecteduser.id;
        $scope.editcashbox.idcostcenter = $scope.selectedcostcenter.id;
        if ($scope.editcashbox.id == 0) {
            var response = CashboxService.savecashbox($scope.editcashbox);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getcashboxes();
                    datacashbox();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = CashboxService.updatecashbox($scope.editcashbox);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getcashboxes();
                    datacashbox();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletecashbox = function () {
        var response = CashboxService.deletecashbox($scope.editcashbox);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletecashbox").modal("hide");
                datacashbox();
                getcashboxes();
                toastr.success(res.message);
            }
        })
    };

    $scope.selectedcashbox = function (cashbox, option) {
        $scope.cashboxeselected = cashbox;
        $scope.editcashbox = angular.copy($scope.cashboxeselected);
        $scope.editcashbox.state = 2;

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

        if ($scope.listuser) {
            for (var i = 0; i < $scope.listuser.length; i++) {
                if ($scope.listuser[i].id == $scope.editcashbox.iduser) {
                    $scope.selecteduser = $scope.listuser[i];
                }
            }
        }

        if ($scope.listaccount) {
            for (var i = 0; i < $scope.listaccount.length; i++) {
                if ($scope.listaccount[i].id == $scope.editcashbox.idaccount) {
                    $scope.selectedaccount = $scope.listaccount[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editcashbox == null || $scope.editcashbox.title == null
            || $scope.selectedaccount == null || $scope.selecteduser == null
            || $scope.selectedoffice == null || $scope.selectedcostcenter == null;
    };

    $scope.newcashbox = function () {
        datacashbox();
    };
});