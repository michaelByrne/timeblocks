angular.module('elkApp').controller('WordController', function ($scope, Word) {
    activate();

    function activate() {
        $scope.content = Word.getStories();
    }

});