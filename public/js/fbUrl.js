angular.module('timeApp').factory('rootRef', function() {
    return firebase.database().ref();
});