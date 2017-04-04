app.service('GroupService', function ($http, $q) {

    init();

    function init() {
    }

    this.savegroup = function (group) {
        var defer = $q.defer();
        $http.post('/groups/create', group).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updategroup = function (group) {
        var defer = $q.defer();
        $http.post('/groups/update', group).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getgroups = function () {
        var defer = $q.defer();
        $http.get('/groups?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletegroup = function (group) {
        var defer = $q.defer();
        $http.post('/groups/destroy', group).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});