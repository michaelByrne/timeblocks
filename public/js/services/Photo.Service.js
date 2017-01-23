angular.module('PhotoService', [])
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    })
    .factory('Photo', ['$http', function ($http) {
        return {
            searchImages: function () {
                var flickrPromise = $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=cdfc01c756a5e9b2cf0c4c416ef172d4&photoset_id=72157673523985406&extras=url_c&format=json&nojsoncallback=1');
                console.log(flickrPromise);
                return flickrPromise;
            }
        }
    }]);