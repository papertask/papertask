angularApp.run( function ( $rootScope ) {

}) 

angularApp.controller('FreelancerController', function($scope, $http, $timeout, $q) {
    $scope.pagetype = 'detail';
	$scope.countries 	= [];
	$scope.pages 		= [];
    $scope.dtpPrices    = [];
    $scope.translationPices = [];
    $scope.interpretingPrices = [];
    $scope.engineeringPrices = [];
	$scope.resources = [];
    
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
        currency: null
    };
    $scope.freelancer = {
		username: null,
		defaultServiceLevel: null,
        comments: null,
		company: null,
		freelancerId: null,
        position: null
	};
    $scope.priceType    = 'CNY';
	
	$scope.init = function (str_uid) {
		$scope.getUserInfo();
        $scope.getFreelancer();
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
                    currency: $data.user.currency
                };
                $scope.translationPrices = $data.translationPrices;
                $scope.interpretingPrices = $data.interpretingPrices;
                $scope.dptPrices = $data.desktopPrices;
                $scope.engineeringPices = $data.engineeringPrices;
                
                if ( $scope.userInfo.currency == 'cny') 
                    $scope.priceType = 'CNY';
                else
                    $scope.priceType = 'USD';
            });
    }
    
    $scope.getFreelancer = function () {
		$http.get("/api/user/" + USER_ID + "/freelancer")
            .success(function($data){
                $scope.freelancer = $data['freelancer'];
                var priceDataRequest = $http.get("/api/user/freelancerData")
                    .success(function($data){
                        /** map data **/
                        $scope.catTools = $data['catTools'];
                        $scope.operatingSystems = $data['operatingSystems'];
                        $scope.specialisms = $data['specialisms'];
                        $scope.resources = $data['resources'];
						console.log($scope.resources);
						console.log($scope.freelancer.Resources);
						$scope.freelancer.ResourcesGroup = findResourcesGroup($scope.resources, $scope.freelancer.Resources);
						
                    });
				
            });
			
    }
    function findResourcesGroup($resourceGroups, $ids){
        var resourcesgroup = [];
        for(var i = 0; i < $resourceGroups.length; i++){
            for(var j = 0; j < $resourceGroups[i].resources.length; j++){
                var resource = $resourceGroups[i].resources[j];
                if($ids.indexOf(resource.id) != -1  ){
                    if( resourcesgroup.length > 0 && resourcesgroup.indexOf($resourceGroups[i]) != -1){
						//console.log(resourcesgroup);
						//resourcesgroup.push($resourceGroups[i]);
					}	
					else 	resourcesgroup.push($resourceGroups[i]);
                }
            }
        }
		console.log(resourcesgroup);
        return resourcesgroup;
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