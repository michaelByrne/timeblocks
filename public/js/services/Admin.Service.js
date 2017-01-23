angular.module('elkApp').service('AdminService', function($http, Word){
    this.post = function(uploadUrl, data){
        var fd = new FormData();
        for (var key in data){
            fd.append(key, data[key]);
        }
        data.img = "/uploads/" + data.image.name;
        console.log(data.img);
        Word.setStory(data);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.indentity,
            headers: {'Content-Type': undefined}
        }).then(function(res){
            console.log(res);
        })

    }
});