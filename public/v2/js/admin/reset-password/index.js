
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

    $('.alert .close').on('click', function(e) {
        var scope = $(this).scope();
        scope.$apply(function(){
            scope.formMessage = '';
        });
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
                       

                        if(result['data']['success']){
                            //alert();
                            $scope.formMessageClass = "alert-success";
                            $scope.formMessage = "Password changed!";
                        } else {
                            //alert("Some error occured: "+result['data']);
                            $scope.formMessageClass = "alert-danger";
                            if (!result['data']['valid?']) {
                                $scope.formMessage = "Current password is incorrect";
                            } else {
                                $scope.formMessage = "Some error occured: "+JSON.stringify(result['data']);
                            }
                        }
                    });
                });


    };


});
