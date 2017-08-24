angular.module('timeApp').component('requestComponent', {
    templateUrl: 'views/newrequest.html',
    bindings: {
        user: '='
    },
    controller: function (Request, $state, $scope) {
        var vm = this;
        vm.request = {};
        vm.success = false;
        vm.requestFields = [
            {
                key: 'reason',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Reason',
                    placeholder: 'Request reason',
                    required: false,
                }
            },
            {
                key: 'start',
                type: 'input',
                templateOptions: {
                    type: 'date',
                    label: 'Start date',
                    required: false
                }
            },
            {
                key: 'end',
                type: 'input',
                templateOptions: {
                    type: 'date',
                    label: 'End date',
                    required: false
                }
            }

        ];
        vm.onSubmit = onSubmit;

        vm.fbLogOut = function(){
            firebase.auth().signOut().then(function() {
                console.log("Signed out");
                $state.go('home');
            });
        };


        function onSubmit(user) {
            vm.request.email = user.email;
            vm.request.emp_name = user.displayName;
            console.log('form submitted:', vm.request);
            Request.newRequest(vm.request);
            vm.success = true;
        }
    }

});