app.controller('DailycashController', function ($scope, SaleService, UserService, $rootScope) {
    init();

    function init() {
        getusers();
        $scope.listsales = [];

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
            $scope.filters.dateinit = picker.startDate;
        });

        $('#dateend').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4",
            startDate: $scope.filters.dateend
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateend = picker.startDate;
        });
    }

    function getusers() {
        var response = UserService.getusersforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listuser = res.data;
            }
        });
    }

    $scope.generatedailycash = function () {
        $scope.filters.iduser = $scope.selecteduser.id;

        var response = SaleService.getdailycash($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsales = res.data;
                $scope.sumTotal = $scope.listsales.sum(function (item) {
                    return parseInt(item.total);
                });
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateinit == null
            || $scope.filters.dateend == null || $scope.selecteduser == null;
    };
});