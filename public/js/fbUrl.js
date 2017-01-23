angular.module('elkApp').factory('rootRef', function() {
    return firebase.database().ref();
});