angular.module('ReportService', ['ngResource'])
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    })
    .factory('Report', ['$http', '$resource', function ($http, $resource) {
        return {
            getRequests: function () {
                //return $http({method: 'GET', url: '/stories'});
                return $http.get('/stories');
            },
            acceptRequests: function (requests) {
                for (var i = 0; i < requests.length; i++) {
                    console.log(requests[i].status);
                    requests[i].status = 'accepted';
                    console.log(requests[i].status);
                    $http.put('/stories/update', requests[i]);
                }
            },
            denyRequests: function (requests) {
                for (var i = 0; i < requests.length; i++) {
                    console.log(requests[i].status);
                    requests[i].status = 'denied';
                    console.log(requests[i].status);
                    $http.put('/stories/update', requests[i]);
                }
            },
            scheduleRequests: function (requests) {
                for (var i = 0; i < requests.length; i++) {
                    console.log(requests[i].status);
                    requests[i].status = 'scheduled';
                    console.log(requests[i].status);
                    $http.put('/stories/update', requests[i]);
                }
            },
            deleteRequests: function (requests) {
                for (var i = 0; i < requests.length; i++) {
                    $http.delete('/stories/' + requests[i].req_key);
                }
            }
        }
    }]);