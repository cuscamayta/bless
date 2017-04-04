app.controller('GroupController', function ($scope, GroupService, $filter) {
    init();
    function init() {
        getgroups();
        datagroup();
    }

    function datagroup() {
        $scope.editgroup = {
            id: 0,
            state: 1
        };
    };

    function getgroups() {
        var response = GroupService.getgroups();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.groups = res.data; }
        });
    }

    $scope.savegroup = function () {
        $scope.editgroup.type = $("#type").val();
        if ($scope.editgroup.id == 0) {
            var response = GroupService.savegroup($scope.editgroup);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getgroups();
                    datagroup();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = GroupService.updategroup($scope.editgroup);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getgroups();
                    datagroup();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletegroup = function () {
        var response = GroupService.deletegroup($scope.editgroup);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeletegroup").modal("hide");
                datagroup();
                getgroups();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedgroup = function (group, option) {
        $scope.groupselected = group;
        $scope.editgroup = angular.copy($scope.groupselected);
        $scope.editgroup.state = 2;

        $("#type").val($scope.editgroup.type);
    };

    $scope.validatecontrols = function () {
        return $scope.editgroup == null || $scope.editgroup.title == null
            || ($scope.editgroup.title != null && $scope.editgroup.title.length < 3) || $("#type").val() == null;
    };

    $scope.newgroup = function () {
        datagroup();
    };
});