angularApp.run( function ( $rootScope ) {

}) 

angularApp.controller('PapertaskEmployerDetailController', function($scope, $http, $timeout, $q, ResourceGroup, ResourceType) {
    $scope.pagetype = 'detail';
	$scope.countries 	= [];
	$scope.pages 		= [];
    $scope.dtpPrices    = [];
    $scope.translationPices = [];
    $scope.interpretingPrices = [];
    $scope.engineeringPrices = [];
    $scope.tmRatios = {};
    
    $scope.ResourceGroup = ResourceGroup;
    $scope.ResourceType = ResourceType;
    
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
        tmRatios: null,
        alias: null
    };
    $scope.employer = {
		username: null,
		defaultServiceLevel: null,
        comments: null,
		company: null,
		employerId: null,
        position: null,
        contracted: null,
        pm: null,
        sales: null
	};
    $scope.priceType    = 'CNY';
	
	$scope.init = function (str_uid) {
		$scope.getUserInfo();

	}
    
    $scope.getUserInfo = function() {
        $http.get("/api/user/" + USER_ID + "")
            .success(function ( $data ) {
                $scope.userInfo = {
                	id : $data.user.id,
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
                    tmRatios: $data.tmRatios,
                    alias: $data.user.alias,
                    translator_pool : $data.user.translator_pool,
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
                    contracted: $data.employer.contracted,
                    pm: $data.employer.pm,
                    sales: $data.employer.sales
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
	
    $scope.removeResource = function(freelancer){
    	 
    		
		$http.get("/" + LANG_CODE + "/admin/employer/removeTranslatorPool?id="+$scope.userInfo.id+'&freelancer_id='+freelancer.id)
		.success(function($data){
			var index = $scope.userInfo.translator_pool.indexOf(freelancer);
    		$scope.userInfo.translator_pool.splice(index, 1);
        }).error(function($e){
            alert('error');
        });	
    }
	
});