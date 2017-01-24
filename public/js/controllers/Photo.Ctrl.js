// angular.module('elkApp').controller('PhotoController', function($scope, Photo) {
//
//     $scope.photos = [];
//     $scope.selected = 0;
//     $scope.buttons = [];
//     $scope.anything = "noise";
//     console.log($scope.anything);
//     $scope.initButtons = function(){
//         for(var i = 0;i < $scope.photos.length; i++){
//             $scope.buttons[i] = 'unchecked';
//         }
//     };
//     $scope.initButtons();
//     $scope.buttons[0] = 'active';
//
//     $scope.setSelectedPhoto = function(image, index){
//         $scope.initButtons();
//         $scope.buttons[index] = 'active';
//         $scope.selected = index;
//     };
//
//     activate();
//
//     function activate(){
//         return Photo.searchImages().then(function(data){
//             $scope.photos = data.data.photoset.photo;
//             return $scope.photos;
//         })
//     }
//
// });

angular.module('elkApp').component('photos', {
    templateUrl: 'views/photo.html',
    bindings: {
        photos: '='
    },
    controller: function($scope, Photo) {

        $scope.photos = [];
        $scope.selected = 0;
        $scope.buttons = [];
        this.anything = "noise";
        console.log($scope.anything);
        $scope.initButtons = function(){
            for(var i = 0;i < $scope.photos.length; i++){
                $scope.buttons[i] = 'unchecked';
            }
        };
        $scope.initButtons();
        $scope.buttons[0] = 'active';

        $scope.setSelectedPhoto = function(image, index){
            $scope.initButtons();
            $scope.buttons[index] = 'active';
            $scope.selected = index;
        };

        activate();

        function activate(){
            return Photo.searchImages().then(function(data){
                $scope.photos = data.data.photoset.photo;
                return $scope.photos;
            })
        }

    }
});