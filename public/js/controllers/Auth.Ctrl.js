angular.module('timeApp')
    .controller('AuthCtrl', function(Auth, $state){
        var authCtrl = this;

        authCtrl.user = {
            email: '',
            password: '',
            displayName: ''
        };

        authCtrl.register = function (){
            Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (user){
                user.updateProfile({
                    displayName: authCtrl.user.displayName
                }).then(function() {
                    console.log("added display name " + user.displayName)
                }, function(error) {
                    // An error happened.
                });
                $state.go('home');
            }, function (error){
                console.log(error);
                authCtrl.error = error;
            });
        };


    });