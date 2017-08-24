angular.module('timeApp').factory('auth', function($firebaseAuth, rootRef) {
    return $firebaseAuth();
})