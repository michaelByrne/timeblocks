angular.module('RequestService', [])
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    })
    .factory('Request', ['$http','$resource', function ($http,$resource) {
        return {
            newRequest: function (request) {
                console.log(request);
                return $resource('/stories').save(request);
            }
        }
    }]);