angular.module('elkApp').controller('AdminController', function ($scope, Word, AdminService) {
    $scope.story = {};
    $scope.submit = function(){
        var uploadUrl = '/stories/upload';
        console.log($scope.story);
        AdminService.post(uploadUrl, $scope.story);
    };
    $scope.save = function () {
        console.log($scope.story);
        Word.setStory($scope.story);
    };

});