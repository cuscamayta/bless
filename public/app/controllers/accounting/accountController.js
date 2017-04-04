app.controller('AccountController', function ($scope, AccountService, GroupService, $filter) {
    init();
    function init() {
        getgroups();
        getaccounts();
        dataaccount();
    }

    function dataaccount() {
        $scope.editaccount = {
            id: 0,
            state: 1
        };
    };

    function getaccounts() {
        var response = AccountService.getaccounts();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.accounts = res.data; }
        });
    }

    function getgroups() {
        var response = GroupService.getgroups();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listgroup = res.data;
            }
        });
    }

    $scope.saveaccount = function () {
        $scope.editaccount.idgroup = $scope.selectedgroup.id;
        if ($scope.editaccount.id == 0) {
            var response = AccountService.saveaccount($scope.editaccount);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getaccounts();
                    dataaccount();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = AccountService.updateaccount($scope.editaccount);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getaccounts();
                    dataaccount();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deleteaccount = function () {
        var response = AccountService.deleteaccount($scope.editaccount);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeleteaccount").modal("hide");
                dataaccount();
                getaccounts();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedaccount = function (account, option) {
        $scope.accountselected = account;
        $scope.editaccount = angular.copy($scope.accountselected);
        $scope.editaccount.state = 2;

        if ($scope.listgroup) {
            for (var i = 0; i < $scope.listgroup.length; i++) {
                if ($scope.listgroup[i].id == $scope.editaccount.idgroup) {
                    $scope.selectedgroup = $scope.listgroup[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editaccount == null || $scope.editaccount.title == null
            || $scope.editaccount.numberid == null || $scope.selectedgroup == null
            || ($scope.editaccount.title != null && $scope.editaccount.title.length < 3);
    };

    $scope.newaccount = function () {
        dataaccount();
    };
});