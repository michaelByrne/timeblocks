angular.module('timeApp', ['ngRoute', 'firebase', 'ngResource', 'ReportService', 'formly', 'formlyBootstrap', 'RequestService', 'ui.router', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection','ui.bootstrap','dialogs','mwl.calendar'])
    .factory("Auth", ["$firebaseAuth",
        function ($firebaseAuth) {
            return $firebaseAuth();
        }])
    .controller('HeaderController', function HeaderController($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    });