// //https://friendlychat-e4a68.firebaseapp.com/__/auth/handler
// angular.module('timeApp').component('login', {
//     templateUrl: 'security/login.html',
//     bindings: {
//         logged: '='
//     },
//     controller: function(auth, $location, $route){
//         this.loggedIn = this.logged;
//         console.log(this.loggedIn);
//         this.anonLogin = function(){
//             auth.$signInAno$sinymously().then(function(){
//                 $location.path('/');
//             }).catch((function(err){
//                 this.errorMessage = err.code;
//             }).bind(this));
//         };
//
//         this.fbLogin = function(){
//             auth.$signInWithPopup("facebook").then(function(){
//                 $location.path('/admin');
//             }).catch((function(err){
//                 this.errorMessage = err.code;
//             }).bind(this));
//         };
//
//         this.fbLogOut = function(){
//             firebase.auth().signOut().then(function() {
//                 console.log("Signed out");
//                 $route.reload();
//             });
//         }
//     }
// });
