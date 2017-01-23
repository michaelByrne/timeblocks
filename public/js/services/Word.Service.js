angular.module('WordService', ['ngResource']).factory('Word', ['$http', '$resource', function ($http, $resource) {
    
    return {
        setStory: function (story) {
            return $resource('/stories').save(story);
        },
        getStories: function () {
            //return $http({method: 'GET', url: '/stories'});
            return $resource('/stories').query();
        }
    }

}]);