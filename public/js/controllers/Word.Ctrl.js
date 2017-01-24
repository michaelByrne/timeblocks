angular.module('elkApp').controller('WordController', function ($scope, Word, $location) {
    activate();

    function activate() {
        $scope.content = Word.getStories();
    }

});