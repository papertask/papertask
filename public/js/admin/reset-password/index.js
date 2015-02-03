/**
 * Created by G
 *
 */
angularApp.run( function ($rootScope) {
    $("#form").validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#new"
            }
        },
        submitHandler: function( form ) {
            angular.element('#ResetPasswordController').scope().submit();
        }
    });
});
angularApp.controller('ResetPasswordController', function($scope, $http, $timeout, $q) {

    /**
     * Submit the form
     */
    $scope.submit = function(){

        var data = {
            current: $scope.current,
            new: $scope.new,
            confirm: $scope.confirm,
        };

        $http.put("/api/user/" + USER_ID, $scope.userInfo)
            .success(function($data){
                $http.put("/api/user/"+USER_ID+"/resetpassword", data).success(function(result, code){
                        console.log(result['data']);

                        // TODO: Change this to common messages in Papertask instead of alerts.
                        if(result['data']['success']){
                            alert("Password changed!");
                        } else {
                            alert("Some error occured: "+result['data']);
                        }
                    });
                });


    };


});
