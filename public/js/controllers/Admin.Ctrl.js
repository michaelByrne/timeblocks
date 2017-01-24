angular.module('elkApp').controller('AdminController', function ($scope, Word, AdminService) {
    $scope.story = {};
    $scope.submit = function(){
        var uploadUrl = '/stories/upload';
        if($scope.story.url.indexOf("http") > -1 && $scope.story.url.indexOf("http") < 5){
            console.log("legit http");
        }
        else{
            $scope.story.url = "http://" + $scope.story.url;
        }
        console.log($scope.story);
        AdminService.post(uploadUrl, $scope.story);
    };
    $scope.save = function () {
        console.log($scope.story);
        Word.setStory($scope.story);
    };

});