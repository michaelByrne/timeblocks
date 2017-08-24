angular.module('timeApp').component('login', {
    templateUrl: 'views/login.html',
    bindings: {
        logged: '='
    },
    controller: function(Auth, $location, $route, $state){
        var authCtrl = this;
        authCtrl.loggedIn = this.logged;
        console.log(authCtrl.loggedIn);

        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.login = function (){
            Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (auth){
                $state.go('requests.new');
            }, function (error){
                authCtrl.error = error;
            });
        };

        // this.fbLogin = function(){
        //     Auth.$signInWithPopup("facebook").then(function(){
        //         console.log("contrats");
        //         $state.go('requests.new');
        //     }).catch((function(err){
        //         console.log(Auth);
        //         this.errorMessage = err.code;
        //     }).bind(this));
        // };

        authCtrl.fbLogOut = function(){
            firebase.auth().signOut().then(function() {
                console.log("Signed out");
                $route.reload();
            });
        }
    }
});