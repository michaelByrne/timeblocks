angular.module('elkApp').controller('MainController', function($scope) {

	$scope.mainImage = ['../../images/virgin.jpg', '../../images/bluesilk.jpg','../../images/green.jpg'];
    $scope.imDex = Math.floor((Math.random() * 3));


});