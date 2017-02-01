angular.module('elkApp')
    .run(function($rootScope, $location){
        $rootScope.$on("$routeChangeError", function(e, next, prev, err){
            if(err === "AUTH_REQUIRED"){
                $location.path('/login');
            }
        })
    })
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/words', {
            templateUrl: 'views/writing.html',
            controller: 'WordController'
        })

        .when('/photos', {
            template: '<photos></photos>'
        })

        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController',
            resolve: {
                currentAuth: function(auth){
                    return auth.$requireSignIn();
                }
            }
        })

        .when('/contact', {
            template: '<contact></contact>'
        })

        .when('/projects', {
            template: '<projects></projects>'
        })

        .when('/login',
            {
                template: '<login logged="$resolve.currentAuth"></login>',
                resolve: {
                    currentAuth: function (auth) {
                        //console.log(!!auth.$waitForSignIn());
                        return auth.$waitForSignIn();
                    },
                    testAuth: function () {
                        return true;
                    }
                }

            })

        .when('/logout', {
            template: '<logout></logout>'
        });
    $locationProvider.html5Mode({enabled: true});

}]);