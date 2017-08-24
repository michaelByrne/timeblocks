angular.module('timeApp').controller('RequestsController', function ($scope, $location, Report) {
    $scope.active = false;
    $scope.makeActive = function () {
        $scope.active = true;
    }
});