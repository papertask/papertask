angularApp.run( function ( $rootScope ) {
$(".summernote").summernote();
$('.note-toolbar.btn-toolbar').remove();
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
	
	$scope.resume = {};
	
	$scope.TranslationSpecialisms = [];
    $scope.TranslationCatTools = [];
    $scope.operatingSystems = [];
    $scope.DesktopCatTools = [];
    $scope.InterpretingSpecialisms = [];
    $scope.InterpretingCatTools = [];
	$scope.tmRatios = {};
    
    $scope.password = null;
    $scope.passwordChanged = 0;
    
	$scope.userInfo = {
        isActive: null,
		alias: null,
        profileUpdated: null,
        email: null,
        firstName: null,
        lastName: null,
		username:null,
        gender: null,
        city: null,
        phone: null,
        country: null,
        company: null,
		tmRatios: null,
        currency: null
    };
    $scope.freelancer = {
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
						console.log("getUserInfo");

			console.log($data);
                $scope.userInfo = {
                    isActive: $data.user.isActive,
					alias : $data.user.alias,
                    profileUpdated: $data.user.profileUpdated,
                    email: $data.user.email,
                    firstName: $data.user.firstName,
                    lastName: $data.user.lastName,
					username: $data.user.username,
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
            });
    }

    $scope.getFreelancer = function () {
		$http.get("/api/user/" + USER_ID + "/freelancer")
            .success(function($data){
                $scope.freelancer = $data['freelancer'];
				$scope.rating = $scope.freelancer.Rating;
                console.log("rating");
				console.log($scope.rating);
				// get data after freelancer was loaded
				getFreelancerData();
				getFreelancerResume();
				getBankInfo();
				
				
            });
			
    }
	function getFreelancerResume(){
        $http.get('/api/user/' + USER_ID + '/resume').success(function($data){
            $scope.resume = $data['resume'];
            console.log($scope.resume);
        });
    }
	function getBankInfo(){
        $http.get('/api/user/' + USER_ID + '/bank-info').success(function($data){
            if($data['bankInfo']){
                $scope.bankInfo = $data['bankInfo'];
                console.log($scope.bankInfo);
            }
        });
    }
    function findResourcesGroup($resourceGroups, $ids){
		console.log("resourceGroups");
		console.log($resourceGroups);
		console.log($ids);
        var resourcesgroup = [];
		resourcesgroup.translation = 0;
		resourcesgroup.deesktop = 0;
		resourcesgroup.interpreting = 0;
        for(var i = 0; i < $resourceGroups.length; i++){
            for(var j = 0; j < $resourceGroups[i].resources.length; j++){
                var resource = $resourceGroups[i].resources[j];
                if($ids.indexOf(resource.id) != -1  ){
					console.log(resource);
					if($resourceGroups[i].group.name == "Translation")
							resourcesgroup.translation = 1;
                    if($resourceGroups[i].group.name == "Desktop Publishing")
							resourcesgroup.desktop = 1;
					if($resourceGroups[i].group.name == "Interpreting")
							resourcesgroup.interpreting = 1;
							
                    i/*f( resourcesgroup.length > 0 && resourcesgroup.indexOf($resourceGroups[i]) != -1){
						//console.log(resourcesgroup);
						resourcesgroup.push($resourceGroups[i]);
					}	
					else 	{
						console.log(resourcesgroup);
						$resourcesgroup[$resourceGroups[i].id - 1] = $resourceGroups[i]; 
						//if $resourceGroups[i].id = "Specialism";
						
						//if $resourceGroups[i].id = "Desktop Publishing";
						
						//if $resourceGroups[i].id = "Desktop Publishing";Interpreting
						resourcesgroup.push($tmp[$resourceGroups[i].id]);
					}*/
					
                }
            }
        }
		console.log("resource");
		console.log(resourcesgroup);
        return resourcesgroup;
    }
	
	function getFreelancerData(){
        $http.get('/api/user/freelancer-data').success(function($data){
            $scope.freelancerData = $data;
			console.log("freelancerData");
            console.log($scope.freelancerData);
            // get resource group
			$scope.resources = $data['resources'];
			$scope.freelancer.ResourcesGroup = findResourcesGroup($scope.resources, $scope.freelancer.Resources);
			
            /*$.each($scope.freelancerData.resources, function(){
                var that = this;
                $.each(this.resources, function(){
                    if($scope.freelancer.Resources.indexOf(this.id) >= 0){
                        $scope.resourcesType[that.group.name] = 1;
                    }
                });
            });*/
            // get translation specialism
            $scope.TranslationSpecialisms = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.TranslationSpecialisms);
            // get desktop translation cat tools
			//con
            $scope.TranslationCatTools = findOptions($scope.freelancerData.catTools,
                $scope.freelancer.TranslationCatTools);
            // get operating systems
            $scope.operatingSystems = findOptions($scope.freelancerData.operatingSystems,
                $scope.freelancer.DesktopOperatingSystems);
            // get desktop cat tools
            $scope.DesktopCatTools = findOptions($scope.freelancerData.catTools,
                $scope.freelancer.DesktopCatTools);
            // get interpreting specialism
            $scope.InterpretingSpecialisms = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.InterpretingSpecialisms);

            //console.log($scope.InterpretingSpecialisms);
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