app.controller('CostcenterController', function ($scope, CostcenterService, $filter) {
    init();
    function init() {
        getcostcenters();
        datacostcenter();
    }

    function datacostcenter() {
        $scope.editcostcenter = {
            id: 0,
            state: 1
        };
    };

    function getcostcenters() {
        var response = CostcenterService.getcostcenters();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.costcenters = res.data; }
        });
    }

    $scope.savecostcenter = function () {
        $scope.editcostcenter;
        if ($scope.editcostcenter.id == 0) {
            var response = CostcenterService.savecostcenter($scope.editcostcenter);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcostcenters();
                    datacostcenter();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = CostcenterService.updatecostcenter($scope.editcostcenter);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcostcenters();
                    datacostcenter();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletecostcenter = function () {
        var response = CostcenterService.deletecostcenter($scope.editcostcenter);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeletecostcenter").modal("hide");
                datacostcenter();
                getcostcenters();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedcostcenter = function (costcenter, option) {
        $scope.costcenterselected = costcenter;
        $scope.editcostcenter = angular.copy($scope.costcenterselected);
        $scope.editcostcenter.state = 2;

        if (option == 1) {
            $('#title').val($scope.editcostcenter.title);
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editcostcenter == null || $scope.editcostcenter.title == null
            || ($scope.editcostcenter.title != null && $scope.editcostcenter.title.length < 3);
    };

    $scope.newcostcenter = function () {
        datacostcenter();
    };
});