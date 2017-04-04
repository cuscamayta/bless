app.service('AccountingService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveaccounting = function (accounting) {
        var defer = $q.defer();
        $http.post('/accountingtransactions/create', accounting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getaccountings = function () {
        var defer = $q.defer();
        $http.get('/accountingtransactions?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteaccounting = function (accounting) {
        var defer = $q.defer();
        $http.post('/accountingtransactions/destroy', accounting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});