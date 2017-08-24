angular.module('timeApp')
    .run(["$rootScope", "$state", function ($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            console.log(fromState);
            if (error === "AUTH_REQUIRED" && fromState.name ==='requests') {
                $state.go("login");
            }
            else{
                $state.go("adminLogin");
            }

        });
    }])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');
        $stateProvider

        // home page
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'MainController',
                authenticate: false
            })


            .state('requests', {
                url: '/requests',
                templateUrl: 'views/requests.html',
                controller: 'RequestsController'
            })

            .state('requests.new', {
                url: '/new',
                template: '<request-component user="$resolve.currentAuth"></request-component>',
                resolve: {
                    // controller will not be loaded until $requireSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }]
                }
            })

            .state('reports', {
                url: '/reports',
                template: '<report-component user="$resolve.currentAuth" requests="$resolve.currentContent"></report-component>',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }],
                    "currentContent": ["Report", function (Report) {
                        return Report.getRequests();
                    }]
                }
            })

          



            .state('requests.list', {
                template: '<employee-requests></employee-requests>'
            })


            // .state('/admin', {
            //     templateUrl: 'views/admin.html',
            //     controller: 'AdminController',
            //     resolve: {
            //         currentAuth: function(auth){
            //             return auth.$requireSignIn();
            //         }
            //     }
            // })

            .state('login', {
                url: '/login',
                template: '<login logged="$resolve.currentAuth"></login>',
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        console.log(Auth);
                        return Auth.$waitForSignIn();
                    }]
                }

            })
            .state('adminLogin', {
                url: '/admin-login',
                template: '<admin-login logged="$resolve.currentAuth"></admin-login>',
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $waitForSignIn returns a promise so the resolve waits for it to complete
                        console.log(Auth);
                        return Auth.$waitForSignIn();
                    }]
                }

            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'views/register.html'
            })
            .state('logoff', {
                url: '/logoff',
                template: '<logout></logout>'
            });

        //
        // .when('/logout', {
        //     template: '<logout></logout>'
        // });
        $locationProvider.html5Mode({enabled: true});

    }]);