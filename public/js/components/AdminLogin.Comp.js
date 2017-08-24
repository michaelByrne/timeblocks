angular.module('timeApp').component('adminLogin', {
    templateUrl: 'views/admin.login.html',
    bindings: {
        logged: '='
    },
    controller: function(Auth, $location, $route, $state){
        this.loggedIn = this.logged;
        console.log(this.loggedIn);
        this.anonLogin = function(){
            Auth.$signInAno$sinymously().then(function(){
                $location.path('/');
            }).catch((function(err){
                this.errorMessage = err.code;
            }).bind(this));
        };

        this.fbLogin = function(){
            Auth.$signInWithPopup("facebook").then(function(){
                console.log("contrats");
                $state.go('reports');
            }).catch((function(err){
                console.log(Auth);
                this.errorMessage = err.code;
            }).bind(this));
        };

        this.fbLogOut = function(){
            firebase.auth().signOut().then(function() {
                console.log("Signed out");
                $route.reload();
            });
        }
    }
});