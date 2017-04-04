app.controller('InvalidateController', function ($scope, SalesbookService, OfficeService, SaleService, $rootScope) {
    init();

    function init() {
        $scope.selectedsalebook = null;
        $scope.listsalebook = [];

        $scope.filters = {};
        var date = new Date();

        $scope.filters.dateinit = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('DD/MM/YYYY');
        $scope.filters.dateend = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('DD/MM/YYYY');

        $('#dateinit').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4",
            startDate: $scope.filters.dateinit
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateinit = picker.startDate.format('DD/MM/YYYY');
        });

        $('#dateend').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4",
            startDate: $scope.filters.dateend
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateend = picker.startDate.format('DD/MM/YYYY');
        });
        getoffices();
    }

    function getoffices() {
        $scope.filters.iduser = $rootScope.currentUser.user.id;
        var response = OfficeService.getofficesforselect($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
            }
        });
    }

    $scope.getsalebooks = function () {
        $scope.filters.idoffice = $scope.selectedoffice.id;
        var response = SalesbookService.getsalesbooksforselect($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsalebook = res.data;
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateinit == null
            || $scope.filters.dateend == null || $scope.selectedoffice == null;
    };

    $scope.salebookselected = function (salebook) {
        $scope.selectedsalebook = salebook;
    };

    $scope.deletesalebook = function () {
        var response = SaleService.invalidatesale($scope.selectedsalebook);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletesalebook").modal("hide");
                $scope.selectedsalebook = null;
                $scope.listsalebook = [];
                toastr.success(res.message);
            }
        });
    };
});