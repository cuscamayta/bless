app.controller('customerController', function ($scope, customerService,  $filter) {
    init();
    function init() {
        getcustomers();
        datacustomer();
    }

    function datacustomer() {
        $scope.editcustomer = {
            id: 0,
            state: 1
        };
    };

    function getcustomers() {
        var response = customerService.getcustomer();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.customers = res.data; }
        });
    }

    $scope.savecustomer = function() {
        debugger;
        $scope.editcustomer;
        if ($scope.editcustomer.id == 0) {
            var response = customerService.savecustomer($scope.editcustomer);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcustomers();
                    datacustomer();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = customerService.updatecustomer($scope.editcustomer);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getcustomers();
                    datacustomer();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletecustomer = function() {
        var response = customerService.deletecustomer($scope.editcustomer);
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeletecustomer").modal("hide");
                datacustomer();
                getcustomers();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedcustomer = function(customer, option) {
        $scope.customerselected = customer;
        $scope.editcustomer = angular.copy($scope.customerselected);
        $scope.editcustomer.state = 2;

        if (option == 1) {
            $('#title').val($scope.editcustomer.title);
        }
    };

    $scope.validatecontrols = function() {
        return $scope.editcustomer == null || $scope.editcustomer.numberid == null
            || $scope.editcustomer.fullname == null || $scope.editcustomer.address == null
            || $scope.editcustomer.phone == null || $scope.editcustomer.email == null;
    };
    
    $scope.newcustomer = function() {
        datacustomer();
    };
});


/* Nombre de tabla: Customer

Campos:
	fullname	        STRING		not null
	numberid	        STRING		not null
	address		STRING		null
	phone		STRING		null
	email		STRING 		null */