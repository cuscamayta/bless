app.service('CostcenterService', function ($http, $q) {

    init();

    function init() {
    }

    this.savecostcenter = function (costcenter) {
        var defer = $q.defer();
        $http.post('/costcenters/create', costcenter).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatecostcenter = function (costcenter) {
        var defer = $q.defer();
        $http.post('/costcenters/update', costcenter).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getcostcenters = function () {
        var defer = $q.defer();
        $http.get('/costcenters?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletecostcenter = function (costcenter) {
        var defer = $q.defer();
        $http.post('/costcenters/destroy', costcenter).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});