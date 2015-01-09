angularApp.run( function ( $rootScope ) {

}) 

angularApp.controller('PapertaskEmployerDetailController', function($scope, $http, $timeout, $q) {
    $scope.pagetype = 'detail';
	$scope.countries 	= [];
	$scope.pages 		= [];
    $scope.dtpPrices    = [];
    $scope.translationPices = [];
    $scope.interpretingPrices = [];
    $scope.engineeringPrices = [];
    $scope.tmRatios = {};
    
    $scope.password = null;
    $scope.passwordChanged = 0;
    
	$scope.userInfo = {
        isActive: null,
        profileUpdated: null,
        email: null,
        firstName: null,
        lastName: null,
        gender: null,
        city: null,
        phone: null,
        country: null,
        company: null,
        currency: null,
        tmRatios: null
    };
    $scope.employer = {
		username: null,
		defaultServiceLevel: null,
        comments: null,
		company: null,
		employerId: null,
        position: null,
        contracted: null
	};
    $scope.priceType    = 'CNY';
	
	$scope.init = function (str_uid) {
		$scope.getUserInfo();
	}
    
    $scope.getUserInfo = function() {
        $http.get("/api/user/" + USER_ID + "")
            .success(function ( $data ) {
                $scope.userInfo = {
                    isActive: $data.user.isActive,
                    profileUpdated: $data.user.profileUpdated,
                    email: $data.user.email,
                    firstName: $data.user.firstName,
                    lastName: $data.user.lastName,
                    gender: $data.user.gender,
                    city: $data.user.city,
                    phone: $data.user.phone,
                    country: $data.user.country,
                    currency: $data.user.currency,
                    tmRatios: $data.tmRatios
                };
                $scope.tmRatios = $data.tmRatios;
                $scope.translationPrices = $data.translationPrices;
                $scope.interpretingPrices = $data.interpretingPrices;
                $scope.dptPrices = $data.desktopPrices;
                $scope.engineeringPices = $data.engineeringPrices;
                
                if ( $scope.userInfo.currency == 'cny') 
                    $scope.priceType = 'CNY';
                else
                    $scope.priceType = 'USD';

                // Get Employer Information
                $scope.getEmployerInfo();
            });
    }
    
    $scope.getEmployerInfo = function () {
        $http.get("/api/user/" + USER_ID + "/employer")
        	.success( function ( $data ) {
        		$scope.employer = {
    				username: $data.employer.name,
    				defaultServiceLevel: $data.employer.defaultServiceLevel,
		            comments: $data.employer.comments,
    				company: $data.employer.company,
    				employerId: $data.employer.id,
                    position: $data.employer.position,
                    contracted: $data.employer.contracted
    			};
                $("#objNote").html($scope.employer.comments);
        	});
    }
    
    $scope.resetPassword = function () {
        $http.put('/api/user/' + USER_ID, {'password': $scope.password}).success(function($data){
            if($data.success == 1){
                $scope.password = null;
                $scope.passwordChanged = 1;
            }
        });
    }
	
});