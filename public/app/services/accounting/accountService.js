app.service('AccountService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveaccount = function (account) {
        var defer = $q.defer();
        $http.post('/accounts/create', account).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateaccount = function (account) {
        var defer = $q.defer();
        $http.post('/accounts/update', account).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getaccounts = function () {
        var defer = $q.defer();
        $http.get('/accounts?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteaccount = function (account) {
        var defer = $q.defer();
        $http.post('/accounts/destroy', account).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});