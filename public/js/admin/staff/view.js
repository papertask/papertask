angularApp.controller('viewStaffController', function($scope, $http, $timeout, $q){
    $scope.password = null;
    $scope.passwordChanged = 0;

    $scope.staff = {
        id: null,
        name: null,
        client: null,
        type: null
    };
    $scope.init = function () {
        $http.get('/api/user/' + USER_ID + "/staff")
            .success( function ( result ) {
                $scope.staff = result.staff;
            });
    }
    $scope.resetPassword = function(){
        if ( $scope.password.length <= 5 )
        {
            bootbox.alert("Password length must be atleast 5.");
            return ;
        }
        $http.put('/api/user/' + USER_ID, {'password': $scope.password}).success(function($data){
            if($data.success == 1){
                $scope.password = null;
                $scope.passwordChanged = 1;
            }
        });
    }
});