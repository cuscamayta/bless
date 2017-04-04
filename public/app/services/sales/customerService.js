app.service('customerService', function ($http, $q) {

    init();

    function init() {
    }

    this.savecustomer = function (customer) {
        var defer = $q.defer();
        $http.post('/customer/create', customer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatecustomer = function (customer) {
        var defer = $q.defer();
        $http.post('/customer/update', customer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getcustomer = function () {
        var defer = $q.defer();
        $http.get('/customer?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});

/*
app.service('customerService', function ($http, $q) {

    init();

    function init() {
    }

    this.getcustomer = function () {
        var defer = $q.defer();
        $http.post('/customer').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.savecustomer = function () {
        var defer = $q.defer();
        $http.post('/customer/create', orderbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
this.deletecustomer = function (item) {
        var defer = $q.defer();
        $http.post('/customer/delete', item).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
  
    this.invalidatecustomer = function (sale) {
        var defer = $q.defer();
        $http.post('/customer/invalidate', sale).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
    
    this.getinvoice = function (filters) {
        var defer = $q.defer();
        $http.post('/customer/invoice', filters).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
}); */