angular.module('elkApp').factory('auth', function($firebaseAuth, rootRef) {
    return $firebaseAuth();
})