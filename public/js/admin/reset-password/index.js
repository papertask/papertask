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

        $http.put("/api/user/" + USER_ID, $scope.userInfo)
            .success(function($data){
                $http.put("/api/user/"+USER_ID+"/employer/reset-password", { sampleData: "Data" }).success(function(){
                        console.log("Blahblah");
                    });
                });


    };


});
