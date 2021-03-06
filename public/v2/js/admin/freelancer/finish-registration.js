/**
 * Created by antiprovn on 9/27/14.
 */
 angularApp.run( function ( $rootScope ) {    
	$("#form").validate({
        submitHandler: function( form ) {
            angular.element('#UpdateInfoControllert').scope().submit();
        }
    });
}) 
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
		Resources:[]
	};

    /**
     * Mark resource active params
     */
    function generateActiveResources(){
        $scope.freelancer.Resources = $scope.freelancer.Resources;
        for(var i = 0; i < $scope.freelancer.Resources.length; i++){
            $scope.resource_active[$scope.freelancer.Resources[i]] = 'active';

        }
		
    }

    function findResources($resourceGroups, $ids){
        var resources = [];
        for(var i = 0; i < $resourceGroups.length; i++){
            for(var j = 0; j < $resourceGroups[i].resources.length; j++){
                var resource = $resourceGroups[i].resources[j];
                if($ids.indexOf(resource.id) != -1){

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
        $info.TranslationCatTools = findOptions($scope.catTools, $info.TranslationCatTools);
        $info.TranslationSpecialisms = findOptions($scope.specialisms, $info.TranslationSpecialisms);
        $info.DesktopCatTools = findOptions($scope.catTools, $info.DesktopCatTools);
        $info.Resources = findResources($scope.resources, $info.Resources);
        $info.DesktopOperatingSystems = findOptions($scope.operatingSystems, $info.DesktopOperatingSystems);
        $info.InterpretingSpecialisms = findOptions($scope.specialisms, $info.InterpretingSpecialisms);
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

                $scope.user = $scope.userInfo = $data['user'];
				//if()
                $scope.translationPricesP = $data['translationPricesP'];
                $scope.interpretingPricesP = $data['interpretingPricesP'];
                $scope.desktopPricesP = $data['desktopPricesP'];
                if($scope.countries.length){
					if($scope.user.country)
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

                var priceDataRequest = $http.get("/api/user/freelancerData")
                    .success(function($data){
                        /** map data **/
                        $scope.catTools = $data['catTools'];
                        $scope.operatingSystems = $data['operatingSystems'];
                        $scope.specialisms = $data['specialisms'];
                        $scope.resources = $data['resources'];
						//$scope.freelancer.Resources = findResources($scope.resources, $scope.freelancer.Resources);
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
		
	
		var tmp = getIds($scope.freelancer.Resources);
	 
        return $http.put("/api/user/" + $scope.user.id + "/freelancer/" + $scope.freelancer.id, {
            'DesktopCatTools': getIds($scope.freelancer.DesktopCatTools),
            'DesktopOperatingSystems': getIds($scope.freelancer.DesktopOperatingSystems),
            'InterpretingSpecialisms': getIds($scope.freelancer.InterpretingSpecialisms),
            'Resources': getIds($scope.freelancer.Resources),
            'TranslationCatTools': getIds($scope.freelancer.TranslationCatTools),
            'TranslationSpecialisms': getIds($scope.freelancer.TranslationSpecialisms)
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

        var $index = $scope.freelancer.Resources.indexOf($id);
        if($index == -1){
            $scope.freelancer.Resources.push($id);
        } else {
            $scope.freelancer.Resources.splice($index, 1);
        }
		//check hide some part 
		$scope.translation = 0;
		$scope.desktop_publish = 0;
		$scope.interpreting = 0;
		for(var i = 0; i < $scope.freelancer.Resources.length; i++){
			for(var j = 0; j < $scope.resources.length; j++){
				for (var k = 0; k < $scope.resources[j].resources.length; k++)
				{
				
					if($scope.freelancer.Resources[i].id == $scope.resources[j].resources[k].id )
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
		
		if ( $scope.editTranslation==-1 ) {
			var checkexist = true;
			for(i=0 ; i < $scope.translationPricesP.length; i++)
			{
				if(translationPriceP.sourceLanguage.id == $scope.translationPricesP[i].sourceLanguage.id && translationPriceP.targetLanguage.id == $scope.translationPricesP[i].targetLanguage.id )
					checkexist = false;
			}
			if(checkexist){
				$http.post("/api/user/translationpricep", 
					{
						userId: USER_ID,
						sourceLanguageId: translationPriceP.sourceLanguage.id, 
						targetLanguageId: translationPriceP.targetLanguage.id, 
						price: translationPriceP.price
					}).success(function( data ) {
						$scope.translationPricesP.push( data.translationPriceP );
					});
			}
			else{
				bootbox.alert( EXITS_CONFIRM_OPTION_TEXT);
			}	
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
		setModalControllerData('translationPriceP',[]);
		$scope.editTranslation = -1;
		jQuery("#modal-translation").modal("show");
	}
    $scope.editTranslationPrice = function ( index, tid ) {
    	$scope.editTranslation = index;

		$scope.tmp = $scope.translationPricesP[index];
		$scope.tmp.price = Number($scope.translationPricesP[index].price);
		setModalControllerData('translationPriceP', $scope.tmp);
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
    	
		if ( $scope.editDtp == -1) {
			var checkexist = true;
			for(i=0 ; i < $scope.desktopPricesP.length; i++)
			{
				if(desktopPriceP.language.id == $scope.desktopPricesP[i].language.id && desktopPriceP.software.id == $scope.desktopPricesP[i].software.id )
					checkexist = false;
			}
			if(checkexist){
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
			}
			else{
				bootbox.alert( EXITS_CONFIRM_OPTION_TEXT);
			}	
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
		$scope.desktopPricesP[ind].priceMac = Number($scope.desktopPricesP[ind].priceMac);
		$scope.desktopPricesP[ind].pricePc = Number($scope.desktopPricesP[ind].pricePc);
		$scope.desktopPricesP[ind].priceHourMac = Number($scope.desktopPricesP[ind].priceHourMac);
		$scope.desktopPricesP[ind].priceHourPc = Number($scope.desktopPricesP[ind].priceHourPc);
		
    	setModalControllerData('desktopPriceP', $scope.desktopPricesP[ind]);
    	jQuery("#modal-dtp").modal("show");
    }
	$scope.addDesktopPrice = function(){
		setModalControllerData('desktopPriceP', []);
		$scope.editDtp = -1;
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
			var checkexist = true;
			for(i=0 ; i < $scope.interpretingPricesP.length; i++)
			{
				if(interpretingPriceP.sourceLanguage.id == $scope.interpretingPricesP[i].sourceLanguage.id && interpretingPriceP.targetLanguage.id == $scope.interpretingPricesP[i].targetLanguage.id 
				&& interpretingPriceP.service.id == $scope.interpretingPricesP[i].service.id)
					checkexist = false;
			}
			if(checkexist){
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
			}
			else{
				bootbox.alert( EXITS_CONFIRM_OPTION_TEXT);
			}	
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
		$scope.interpretingPricesP[ind].priceDay = Number($scope.interpretingPricesP[ind].priceDay);
		$scope.interpretingPricesP[ind].priceHalfDay = Number($scope.interpretingPricesP[ind].priceHalfDay);
    	setModalControllerData('interpretingPriceP', $scope.interpretingPricesP[ind]);
    	jQuery("#modal-interpreting").modal("show");
    }
	$scope.addInterpretingPrice = function(){
		setModalControllerData('interpretingPriceP', []);
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