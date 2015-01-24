/**
 * Created by antiprovn on 9/27/14.
 */
angularApp.controller('UpdateInfoController', function($scope, $http, $timeout, $q){
	$scope.translation = 0;
	$scope.desktop_publish = 0;
	$scope.interpreting = 0;
	
    $scope.catTools = [];
    $scope.countries = [];
    $scope.languages = [];
    $scope.resources = [];
    $scope.softwares = [];
    $scope.companies = [];

    $scope.operatingSystems = [];
    $scope.specialisms = [];

    $scope.desktopPricesP = [];
    $scope.interpretingPricesP = [];
    $scope.resource_active = {};
    $scope.translationPricesP = [];
	$scope.translationPriceP = {};
	
	$scope.editTranslation = -1;
    $scope.editDtp = -1;
    $scope.editInterpreting = -1;
    $scope.editEngineering = -1;

    $scope.user = $scope.userInfo = {
        "city": null,
        "country": null,
        "currency": null,
        "createdTime": null,
        "email": null,
        "firstName": null,
		"username": null,
        "gender": false,
        "group": null,
        "id": null,
        "isActive": null,
        "lastLogin": null,
        "lastName": null,
        "phone": null,
        "profileUpdated": null,
        "resources": null,
        "DesktopCatTools": null,
        "DesktopOperatingSystems": null,
        "InterpretingSpecialisms": null,
        "TranslationCatTools": null,
        "TranslationSpecialisms": null
    };
    $scope.freelancer = {
		ResourcesP:[]
	};

    /**
     * Mark resource active params
     */
    function generateActiveResources(){
        $scope.freelancer.ResourcesP = $scope.freelancer.ResourcesP;
        for(var i = 0; i < $scope.freelancer.ResourcesP.length; i++){
            $scope.resource_active[$scope.freelancer.ResourcesP[i]] = 'active';
			console.log($scope.freelancer.ResourcesP[i]);
        }
		
    }

    function findResources($resourceGroups, $ids){
        var resources = [];
        for(var i = 0; i < $resourceGroups.length; i++){
            for(var j = 0; j < $resourceGroups[i].resources.length; j++){
                var resource = $resourceGroups[i].resources[j];
                if($ids.indexOf(resource.id) != -1){
					console.log($resourceGroups[i]);
                    resources.push(resource);
					if($resourceGroups[i].group.id == 1)
						$scope.translation = 1;
					else if ($resourceGroups[i].group.id == 2) 
						$scope.desktop_publish = 1;
					else if ($resourceGroups[i].group.id == 3)	
						$scope.interpreting = 1;	
                }
            }
        }
        return resources;
    }

    function updateFreelancerSkillData(){
        var $info = $scope.freelancer;
        $info.TranslationCatToolsP = findOptions($scope.catTools, $info.TranslationCatToolsP);
        $info.TranslationSpecialismsP = findOptions($scope.specialisms, $info.TranslationSpecialismsP);
        $info.DesktopCatToolsP = findOptions($scope.catTools, $info.DesktopCatToolsP);
        $info.ResourcesP = findResources($scope.resources, $info.ResourcesP);
        $info.DesktopOperatingSystemsP = findOptions($scope.operatingSystems, $info.DesktopOperatingSystemsP);
        $info.InterpretingSpecialismsP = findOptions($scope.specialisms, $info.InterpretingSpecialismsP);
    }

    function initModal(){
        setModalControllerData('languages', $scope.languages);
        setModalControllerData('services', $scope.services);
        setModalControllerData('softwares', $scope.softwares);
    }

    function rebuildMultiSelect(){
        $timeout(function(){
            $(".multiselect").multiselect("destroy");
        }).then(function(){
            $(".multiselect").multiselect();
        });
    }

    /** end mapping function **/
    function init($userId){
        $http.get("/api/user/" + $userId + "")
            .success(function($data){
				console.log("data");
				console.log($data);
                $scope.user = $scope.userInfo = $data['user'];
                $scope.translationPricesP = $data['translationPricesP'];
				//for(var i = 0; i < $scope.translationPricesP.length; i++){
					//setModalControllerData('translationPriceP', $scope.translationPricesP[i]);
				//}
				
                $scope.interpretingPricesP = $data['interpretingPricesP'];
                $scope.desktopPricesP = $data['desktopPricesP'];
                if($scope.countries.length){
                    $scope.user.country = findOption($scope.countries, $scope.user.country);
                }

                if($scope.user.group.isFreelancer){
                    loadFreelancerData();
                } else if ($scope.user.group.isEmployer) {
                    loadEmployerData();
                } else {
                    loadAdminData();
                }
            });

        var priceDataRequest = $http.get("/api/user/priceData")
            .success(function($data){
                $scope.languages = $data['languages'];
                $scope.services = $data['services'];
                $scope.softwares = $data['softwares'];

                initModal();
            });

        $http.get("/api/common/country")
            .success(function($data){
                $scope.countries = $data['countries'];
                setModalControllerData('countries', $scope.countries);
                if($scope.user.country){
                    $scope.user.country = findOption($scope.countries, $scope.user.country);
                }
            });
    };

    function loadFreelancerData(){

        $http.get("/api/user/" + $scope.user.id + "/freelancer")
            .success(function($data){
                $scope.freelancer = $data['freelancer'];
				console.log("freelancer");
				console.log($scope.freelancer);
				console.log($scope.freelancer.ResourcesP);
				console.log($scope.user.id);
                var priceDataRequest = $http.get("/api/user/freelancerData")
                    .success(function($data){
                        /** map data **/
                        $scope.catTools = $data['catTools'];
                        $scope.operatingSystems = $data['operatingSystems'];
                        $scope.specialisms = $data['specialisms'];
                        $scope.resources = $data['resources'];
						//$scope.freelancer.ResourcesP = findResources($scope.resources, $scope.freelancer.ResourcesP);
						generateActiveResources();
                        rebuildMultiSelect();
                        updateFreelancerSkillData();
                    });
            });
    }

    function loadEmployerData(){

        $http.get("/api/user/" + $scope.user.id + "/employer")
            .success(function($data){
                $scope.employerInfo = $data['employer'];
                var priceDataRequest = $http.get("/api/user/employerData")
                    .success(function($data){
                    });
            });
        $http.get("/api/common/company")
            .success(function($data){
                $scope.companies = $data['companies'];
            });
    }

    function loadAdminData(){

        $http.get("/api/user/" + $scope.user.id + "/freelancer")
            .success(function($data){
                $scope.freelancer = $data['freelancer'];
                generateActiveResources();

                var priceDataRequest = $http.get("/api/user/freelancerData")
                    .success(function($data){
                        /** map data **/
                        $scope.catTools = $data['catTools'];
                        $scope.operatingSystems = $data['operatingSystems'];
                        $scope.specialisms = $data['specialisms'];
                        rebuildMultiSelect();
                    });

                var resourceRequest = $http.get("/api/user/resource")
                    .success(function($data){
                        $scope.resources = $data['resources'];
                    });
                $q.all([priceDataRequest, resourceRequest])
                    .then(function(){
                        updateFreelancerSkillData();
                    });
            });
    }

    init(USER_ID);

    function updateFreelancer(){
		
	
		console.log($scope.freelancer.ResourcesP);
		var tmp = getIds($scope.freelancer.ResourcesP);
		console.log(tmp);
		console.log($scope.freelancer);		 
        return $http.put("/api/user/" + $scope.user.id + "/freelancer/" + $scope.freelancer.id, {
            'DesktopCatToolsP': getIds($scope.freelancer.DesktopCatToolsP),
            'DesktopOperatingSystemsP': getIds($scope.freelancer.DesktopOperatingSystemsP),
            'InterpretingSpecialismsP': getIds($scope.freelancer.InterpretingSpecialismsP),
            'ResourcesP': getIds($scope.freelancer.ResourcesP),
            'TranslationCatToolsP': getIds($scope.freelancer.TranslationCatToolsP),
            'TranslationSpecialismsP': getIds($scope.freelancer.TranslationSpecialismsP)
        });
    }

    function updateEmployer(){
        return $http.put("/api/user/" + $scope.user.id + "/employer/" + $scope.employerInfo.id, $scope.employerInfo);
    }

    $scope.submitGroup = function(){
        if($scope.user.group.isFreelancer){
            return updateFreelancer();
        } else if ($scope.user.group.isEmployer){
            return updateEmployer();
        } else {
            return updateAdmin();  // TODO: implement this
        }
    }

    /**
     * Submit the form
     */
    $scope.submit = function(){

        var requestInfo = $http.put("/api/user/" + $scope.user.id, $scope.userInfo);
        
		
		var requestGroup = $scope.submitGroup();

        // wait all done
        $q.all([requestGroup, requestInfo])
            .then(function(result){
                location.href = "/" + LANG_CODE + "/admin/freelancer/detail?id=" + USER_ID;
            });
    };

    /**
     * Toggle resource
     */
    $scope.toggleResource = function($id){
        console.log($scope.freelancer.ResourcesP);
		console.log($scope.resources);
        var $index = $scope.freelancer.ResourcesP.indexOf($id);
        if($index == -1){
            $scope.freelancer.ResourcesP.push($id);
        } else {
            $scope.freelancer.ResourcesP.splice($index, 1);
        }
		//check hide some part 
		$scope.translation = 0;
		$scope.desktop_publish = 0;
		$scope.interpreting = 0;
		for(var i = 0; i < $scope.freelancer.ResourcesP.length; i++){
			for(var j = 0; j < $scope.resources.length; j++){
				for (var k = 0; k < $scope.resources[j].resources.length; k++)
				{
					console.log($scope.resources[j].resources[k]);
				
					if($scope.freelancer.ResourcesP[i].id == $scope.resources[j].resources[k].id )
					{
						if($scope.resources[j].group.id == 1)
							$scope.translation = 1;
						else if ($scope.resources[j].group.id == 2) 
							$scope.desktop_publish = 1;
						else if ($scope.resources[j].group.id == 3)	
							$scope.interpreting = 1;
						break;	
					}
						
				}	
			}
		}
		console.log($scope.freelancer.ResourcesP);
    };
	/**
     * Translation Prices
     */
    $scope.translationPricePlaceholder = function () {
    	return {
            sourceLanguage: $scope.languages[0],
            targetLanguage: $scope.languages[0],
            price: 0
        };
    }
    
    $scope.saveTranslationPrice = function( translationPriceP ){
		console.log("translationPriceP_1");
		console.log(translationPriceP);
		
		if ( $scope.editTranslation==-1 ) {
    		$http.post("/api/user/translationpricep", 
				{
    				userId: USER_ID,
					sourceLanguageId: translationPriceP.sourceLanguage.id, 
					targetLanguageId: translationPriceP.targetLanguage.id, 
					price: translationPriceP.price
				}).success(function( data ) {
					$scope.translationPricesP.push( data.translationPriceP );
    			});
    	} else {
		
    		$http.put("/api/user/" + translationPriceP.id + "/translationpricep", 
				{
    				userId: USER_ID,
					sourceLanguageId: translationPriceP.sourceLanguage.id, 
					targetLanguageId: translationPriceP.targetLanguage.id, 
					price: translationPriceP.price
				}).success(function( data ) {
					$scope.translationPricesP[$scope.editTranslation] = {sourceLanguage: data.sourceLanguage, targetLanguage: data.targetLanguage, price: data.price, id: data.id}
    			});
    		
    	}
    	/*if ( $scope.editTranslation == -1 ) {
			console.log(translationPriceP);
			console.log($scope.translationPricesP);
    		$scope.translationPricesP.push({sourceLanguage: translationPriceP.sourceLanguage, targetLanguage: translationPriceP.targetLanguage, price: translationPriceP.price});
    	} else {
    		$scope.translationPricesP[$scope.editTranslation] = {sourceLanguage: translationPriceP.sourceLanguage, targetLanguage: translationPriceP.targetLanguage, price: translationPriceP.price}
    	}*/
    	jQuery("#modal-translation").modal("hide");
    	setModalControllerData('translationPriceP', $scope.translationPricePlaceholder);
		console.log("translationPriceP");
		console.log(translationPriceP);
    	$scope.editTranslation = -1;
    };
    
    $scope.deleteTranslationPrice = function ( index, tid ) {        
    	bootbox.confirm( DELETE_CONFIRM_TEXT, function( bflag ) {
            if ( bflag == true ) {
                $http.delete("/api/user/" + tid + "/translationpricep", {
                    userId: USER_ID            
                }).success(function( data ) {                
                    $scope.translationPricesP.splice(index, 1);
                });                
            }
        }); 
		
    }
    $scope.addTranslationPrice = function(){
		setModalControllerData('translationPriceP', $scope.translationPricePlaceholder);
		$scope.editTranslation = -1;
		jQuery("#modal-translation").modal("show");
	}
    $scope.editTranslationPrice = function ( index, tid ) {
    	$scope.editTranslation = index;
		console.log($scope.translationPricesP);
		
		console.log($scope.translationPricesP[index]);
		$scope.tmp = $scope.translationPricesP[index];
		$scope.tmp.price = Number($scope.translationPricesP[index].price);
		setModalControllerData('translationPriceP', $scope.tmp);
		console.log($scope.translationPriceP);	
		console.log($scope.translationPricesP[index]);	
    	jQuery("#modal-translation").modal("show");
    }
    
    /**
     * Desktop Price
     */
    $scope.dtpPricePlaceholder = function () {
    	return {
    		language: {},
    		priceHourMac: 0,
    		priceHourPc: 0,
    		priceMac: 0,
    		pricePc: 0,
    		software: {}
        };
    }
    $scope.saveDesktopPrice = function (desktopPriceP ) {
		console.log(desktopPriceP);
    	
		if ( $scope.editDtp == -1) {
    		$http.post("/api/user/desktoppricep", {
    			userId: USER_ID,
    			languageId: desktopPriceP.language.id,
    			softwareId: desktopPriceP.software.id,
    			priceHourMac: desktopPriceP.priceHourMac,
    			priceMac: desktopPriceP.priceMac,
    			pricePc: desktopPriceP.pricePc,
    			priceHourPc: desktopPriceP.priceHourPc
    		}).success(function (data){
    			$scope.desktopPricesP.push ( data.desktopPriceP );
    		});
    	} else {
    		$http.put("/api/user/" + desktopPriceP.id + "/desktoppricep", {
    			userId: USER_ID,
    			languageId: desktopPriceP.language.id,
    			softwareId: desktopPriceP.software.id,
    			priceHourMac: desktopPriceP.priceHourMac,
    			priceMac: desktopPriceP.priceMac,
    			pricePc: desktopPriceP.pricePc,
    			priceHourPc: desktopPriceP.priceHourPc
    		}).success( function (data) {
    			$scope.desktopPricesP[ $scope.editDtp ] = data.desktopPriceP;
    		});
    	}
		
		/*if ( $scope.editDtp == -1) {
    		$scope.desktopPricesP.push ({
        		language: desktopPriceP.language,
        		priceHourMac: desktopPriceP.priceHourMac,
        		priceHourPc: desktopPriceP.priceHourPc,
        		priceMac: desktopPriceP.priceMac,
        		pricePc: desktopPriceP.pricePc,
        		software: desktopPriceP.software
        	});
    	} else {
    		$scope.desktopPricesP[$scope.editDtp] = {
        		language: desktopPriceP.language,
        		priceHourMac: desktopPriceP.priceHourMac,
        		priceHourPc: desktopPriceP.priceHourPc,
        		priceMac: desktopPriceP.priceMac,
        		pricePc: desktopPriceP.pricePc,
        		software: desktopPriceP.software
        	};
    	}*/
    	
    	jQuery("#modal-dtp").modal("hide");
    	setModalControllerData('desktopPriceP', $scope.dtpPricePlaceholder);
    	$scope.editDtp = -1;
    }
    $scope.editDesktopPrice = function ( ind ) {
    	$scope.editDtp = ind;
    	setModalControllerData('desktopPriceP', $scope.desktopPricesP[ind]);
    	jQuery("#modal-dtp").modal("show");
    }
	$scope.addDesktopPrice = function(){
		setModalControllerData('desktopPriceP', $scope.dtpPricePlaceholder);
		$scope.editTranslation = -1;
		jQuery("#modal-dtp").modal("show");
	}
    $scope.deleteDesktopPrice = function ( ind, did ) {
	
		bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag )
                $http.delete("/api/user/" + did + "/desktoppricep", {
                    userId: USER_ID            
                }).success(function( data ) {                
                    $scope.desktopPricesP.splice( ind, 1 );
                });    
        });

    }
    
    /**
     * Interpreting price
     */
    $scope.interpretingPricePlaceholder = function () {
    	return {
    		priceDay: 0,
    		priceHalfDay: 0,
    		service: {},
    		sourceLanguage: {},
    		targetLanguage: {}
    	};
    }
    $scope.saveInterpretingPrice = function ( interpretingPriceP ) {
    	
		if ( $scope.editInterpreting == -1) {
    		$http.post("/api/user/interpretingpricep", {
    			userId: USER_ID,
    			priceDay: interpretingPriceP.priceDay,
    			priceHalfDay: interpretingPriceP.priceHalfDay,
    			sourceLanguageId: interpretingPriceP.sourceLanguage.id,
    			targetLanguageId: interpretingPriceP.targetLanguage.id,
    			serviceId: interpretingPriceP.service.id
    		}).success(function( data ){
    			$scope.interpretingPricesP.push ( data.interpretingPriceP );
    		});
    	} else {
    		$http.put("/api/user/" + interpretingPriceP.id + "/interpretingpricep", {
    			userId: USER_ID,
    			priceDay: interpretingPriceP.priceDay,
    			priceHalfDay: interpretingPriceP.priceHalfDay,
    			sourceLanguageId: interpretingPriceP.sourceLanguage.id,
    			targetLanguageId: interpretingPriceP.targetLanguage.id,
    			serviceId: interpretingPriceP.service.id
    		}).success(function( data ) {
    			$scope.interpretingPricesP[ $scope.editInterpreting ] = data.interpretingPriceP;
    		});
    	}
		
		/*if ( $scope.editInterpreting == -1) {
    		$scope.interpretingPricesP.push ({
    			priceDay: interpretingPriceP.priceDay,
    			priceHalfDay: interpretingPriceP.priceHalfDay,
    			service: interpretingPriceP.service,
    			sourceLanguage: interpretingPriceP.sourceLanguage,
    			targetLanguage: interpretingPriceP.targetLanguage
        	});
    	} else {
    		$scope.interpretingPricesP[$scope.editInterpreting] = {
    				priceDay: interpretingPriceP.priceDay,
        			priceHalfDay: interpretingPriceP.priceHalfDay,
        			service: interpretingPriceP.service,
        			sourceLanguage: interpretingPriceP.sourceLanguage,
        			targetLanguage: interpretingPriceP.targetLanguage
        	};
    	}*/
    	
    	jQuery("#modal-interpreting").modal("hide");
    	setModalControllerData('interpretingPriceP', $scope.interpretingPricePlaceholder);
    	$scope.editInterpreting = -1;
    }
    $scope.editInterpretingPrice = function (ind) {
    	$scope.editInterpreting = ind;
    	setModalControllerData('interpretingPriceP', $scope.interpretingPricesP[ind]);
    	jQuery("#modal-interpreting").modal("show");
    }
	$scope.addInterpretingPrice = function(){
		setModalControllerData('interpretingPriceP', $scope.interpretingPricePlaceholder);
		$scope.editTranslation = -1;
		jQuery("#modal-interpreting").modal("show");
	}
    $scope.deleteInterpretingPrice = function (ind, iid) {
    	bootbox.confirm( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) 
               $http.delete("/api/user/" + iid + "/interpretingpricep", {
                    userId: USER_ID            
                }).success(function( data ) {                
                    $scope.interpretingPricesP.splice( ind, 1 );
                }); 
        });
    }
            
    /**
     * Engineering Price
     */
    $scope.engineerPlaceholder = function () {
    	return {};
    }
    
    $scope.saveEngineeringPrice = function( engineerPriceP ) {
    	if ( $scope.editEngineering == -1) {
    		$scope.engineeringPricesP.push ({
    			engineeringCategory: engineerPriceP.engineeringCategory,
    			unit: engineerPriceP.unit,
    			price: engineerPriceP.price
        	});
    	} else {
    		$scope.engineeringPricesP[$scope.editEngineering] = {
    				engineeringCategory: engineerPriceP.engineeringCategory,
        			unit: engineerPriceP.unit,
        			price: engineerPriceP.price
        	};
    	}
    	
    	jQuery("#modal-eng").modal("hide");
    	setModalControllerData('engineerPriceP', $scope.engineerPlaceholder());
    	$scope.editEngineering = -1;
    }
    $scope.deleteEngineeringPrice = function (ind) {
    	$scope.engineeringPricesP.splice( ind, 1 );
    }
    $scope.editEngineeringPrice = function (ind) {
    	$scope.editEngineering = ind;
    	setModalControllerData('engineerPriceP', $scope.engineeringPricesP[ind]);
    	jQuery("#modal-eng").modal("show");
    }
	$scope.addaddEngineeringPrice = function(){
		setModalControllerData('engineerPriceP', $scope.engineerPlaceholder);
		$scope.editTranslation = -1;
		jQuery("#modal-eng").modal("show");
	}
	

    /**
     * Display activate class
     */
    $scope.active_class = function(a, b){
        return a == b ? 'active' : '';
    };
});