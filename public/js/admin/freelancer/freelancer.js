/**
 * Created by G
 *
 */
angularApp.run( function ( $rootScope ) {    
    $(".summernote").summernote();
	$("#form").validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function( form ) {
            angular.element('#FreelancerController').scope().submit();
        }
    });
}) 
angularApp.controller('FreelancertController', function($scope, $http, $timeout, $q) {
	$scope.translation = 0;
	$scope.desktop_publish = 0;
	$scope.interpreting = 0;
	
    $scope.countries = [];
    $scope.languages = [];
    $scope.resources = [];
    $scope.softwares = [];
    $scope.isActive = 0;

    // For Engineering Price
    $scope.units 	 = [];
    $scope.engineeringCategories = [];
    
    $scope.translationPrices = [];
    $scope.desktopPrices = [];
    $scope.interpretingPrices = [];
    $scope.engineeringPrices = [];
    
    $scope.editTranslation = -1;
    $scope.editDtp = -1;
    $scope.editInterpreting = -1;
    $scope.editEngineering = -1;
    
    $scope.freelancer = {
    	isActive: '0',
    	profileUpdated: '0',
		email: '',
		userName: '',
		firstName: '',
		surname: '',
		gender: '0',
		city: '',
		lastName: '',
		phone: '',
		country: '',
		currency:'cny',
		serviceLevel: 1,
		defaultServiceLevel: '1',
		Resources:[],
		TranslationSpecialisms: [],
		TranslationCatTools: [],
		DesktopOperatingSystems: [],
		DesktopCatTools: [],
		InterpretingSpecialisms: []

	};

    /**
     * Mark resource active params
     */
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
    $scope.init = function(){
        var priceDataRequest = $http.get("/api/user/priceData")
            .success(function($data){
                $scope.languages = $data['languages'];
                $scope.services = $data['services'];
                $scope.softwares = $data['softwares'];

                initModal();
            });

        $http.get("/api/common/country")
            .success(function($data){
				console.log($data['countries']);
                $scope.countries = $data['countries'];
                setModalControllerData('countries', $scope.countries);
                if($scope.freelancer.country){
                    $scope.freelancer.country = findOption($scope.countries, $scope.freelancer.country);
                }
        });
        $http.get("/api/common/unit")
	        .success(function($data){
	            $scope.units = $data;
	            setModalControllerData('units', $scope.units);
	    });
        $http.get("/api/common/engineeringCategory")
	        .success(function($data){
	            $scope.engineeringCategories = $data;
	            setModalControllerData('engineeringCategories', $scope.engineeringCategories);
	    });
		$http.get("/api/user/freelancerData")
                    .success(function($data){
                        /** map data **/
                        $scope.catTools = $data['catTools'];
                        $scope.operatingSystems = $data['operatingSystems'];
                        $scope.specialisms = $data['specialisms'];
                        $scope.resources = $data['resources'];
                        rebuildMultiSelect();
                        //updateFreelancerSkillData();
                    });
    };
 
    /**
     * Submit the form
     */
    $scope.submit = function(){
        $scope.resorce_tmp = getIds($scope.freelancer.Resources);
		$scope.TranslationSpecialisms_tmp = getIds($scope.freelancer.TranslationSpecialisms);
		$scope.TranslationCatTools_tmp = getIds($scope.freelancer.TranslationCatTools);
		$scope.DesktopOperatingSystems_tmp = getIds($scope.freelancer.DesktopOperatingSystems);
		$scope.DesktopCatTools_tmp = getIds($scope.freelancer.DesktopCatTools);
		$scope.InterpretingSpecialisms_tmp = getIds($scope.freelancer.InterpretingSpecialisms);
		
		console.log($scope.resorce_tmp);
		console.log($scope.TranslationSpecialisms_tmp);
		console.log($scope.TranslationCatTools_tmp);
		console.log($scope.DesktopOperatingSystems_tmp);
		console.log($scope.DesktopCatTools_tmp);
		console.log($scope.InterpretingSpecialisms_tmp);
    	var ptr_freelancer = {
    			isActive: $scope.freelancer.isActive,
    			profileUpdated: $scope.freelancer.profileUpdated,
    			lastname: $scope.freelancer.lastName,
    			firstname: $scope.freelancer.firstName,
				username: $scope.freelancer.userName,
    			defaultServiceLevel: $scope.freelancer.defaultServiceLevel,
    			email: $scope.freelancer.email, 
    			password: $scope.freelancer.password,
    			city: $scope.freelancer.city,
    			country: $scope.freelancer.country.id,
    			currency: $scope.freelancer.currency,
    			phone: $scope.freelancer.phone,
    			gender: $scope.freelancer.gender,
				resources: $scope.resorce_tmp,
				
				translationspecialisms : ($scope.translation == 1)?$scope.TranslationSpecialisms_tmp:null,
				translationcattools : ($scope.translation == 1)?$scope.TranslationCatTools_tmp:null,
				desktopoperatingsystems : ($scope.desktop_publish == 1)?$scope.DesktopOperatingSystems_tmp:null,
				desktopcattools : ($scope.desktop_publish == 1)?$scope.DesktopCatTools_tmp:null,
				interpretingspecialisms : ($scope.interpreting == 1)?$scope.InterpretingSpecialisms_tmp:null,
				
				//$scope.translation = 0;
	            //$scope.desktop_publish = 0;
	            //$scope.interpreting = 0;
				
				
    			translationPrices: ($scope.translation == 1)?$scope.translationPrices:[],
    			desktopPrices: ($scope.desktop_publish == 1)?$scope.desktopPrices:[],
    			interpretingPrices: ($scope.interpreting == 1)?$scope.interpretingPrices:[],
    			//engineeringPrices: $scope.engineeringPrices
    	};
    	console.log('translationPrices');
		console.log($scope.translationPrices);
		console.log($scope.desktopPrices);
		console.log($scope.interpretingPrices);
    	
		$http.post("/api/user/freelancer", ptr_freelancer)
        	.success(function($data){
				if ( $data.success == 'failed') {
                    bootbox.alert("User already exited. Please check your email address.");
                    return ;
                }
	            location.href=   "/" + LANG_CODE + "/admin/freelancer/detail?id=" + $data.user.id;
	            //location.href="/admin/dashboard";
        });
    };
    
    /**
     * Translation Prices
     */
    $scope.translationPricePlaceholder = function () {
    	return {
            sourceLanguage: {},
            targetLanguage: {},
            price: 0
        };
    }
    
    $scope.saveTranslationPrice = function( translationPrice ){
    	if ( $scope.editTranslation == -1 ) {
    		$scope.translationPrices.push({sourceLanguage: translationPrice.sourceLanguage, targetLanguage: translationPrice.targetLanguage, price: translationPrice.price});
    	} else {
    		$scope.translationPrices[$scope.editTranslation] = {sourceLanguage: translationPrice.sourceLanguage, targetLanguage: translationPrice.targetLanguage, price: translationPrice.price}
    	}
    	jQuery("#modal-translation").modal("hide");
		console.log("translationPricePlaceholder");
    	console.log($scope.translationPricePlaceholder);
		console.log($scope.languages[0]);
    	setModalControllerData('translationPrice', $scope.translationPricePlaceholder);
    	$scope.editTranslation = -1;
    };
    
    $scope.deleteTranslationPrice = function ( index ) {        
    	$scope.translationPrices.splice(index, 1);
    	setModalControllerData('translationPrice', $scope.translationPricePlaceholder);
    }
    
    $scope.editTranslationPrice = function ( index ) {
    	$scope.editTranslation = index;
    	$scope.translationPrices[index].price = Number($scope.translationPrices[index].price);
    	setModalControllerData('translationPrice', $scope.translationPrices[index]);
    	jQuery("#modal-translation").modal("show");
    }
    $scope.addTranslationPrice = function(){
		setModalControllerData('translationPrice', []);
		$scope.editTranslation = -1;
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
    $scope.saveDesktopPrice = function (desktopPrice ) {
    	if ( $scope.editDtp == -1) {
    		$scope.desktopPrices.push ({
        		language: desktopPrice.language,
        		priceHourMac: desktopPrice.priceHourMac,
        		priceHourPc: desktopPrice.priceHourPc,
        		priceMac: desktopPrice.priceMac,
        		pricePc: desktopPrice.pricePc,
        		software: desktopPrice.software
        	});
    	} else {
    		$scope.desktopPrices[$scope.editDtp] = {
        		language: desktopPrice.language,
        		priceHourMac: desktopPrice.priceHourMac,
        		priceHourPc: desktopPrice.priceHourPc,
        		priceMac: desktopPrice.priceMac,
        		pricePc: desktopPrice.pricePc,
        		software: desktopPrice.software
        	};
    	}
    	
    	jQuery("#modal-dtp").modal("hide");
    	setModalControllerData('desktopPrice', $scope.dtpPricePlaceholder);
    	$scope.editDtp = -1;
    }
    $scope.editDesktopPrice = function ( ind ) {
    	$scope.editDtp = ind;
		$scope.desktopPrices[ind].priceMac = Number($scope.desktopPrices[ind].priceMac);
		$scope.desktopPrices[ind].pricePc = Number($scope.desktopPrices[ind].pricePc);
		$scope.desktopPrices[ind].priceHourMac = Number($scope.desktopPrices[ind].priceHourMac);
		$scope.desktopPrices[ind].priceHourPc = Number($scope.desktopPrices[ind].priceHourPc);
    	setModalControllerData('desktopPrice', $scope.desktopPrices[ind]);
    	jQuery("#modal-dtp").modal("show");
    }
	$scope.addDesktopPrice = function(){
		setModalControllerData('desktopPrice', []);
		
		$scope.editDtp = -1;
		jQuery("#modal-dtp").modal("show");
	}
    $scope.deleteDesktopPrice = function ( ind ) {
    	$scope.desktopPrices.splice(ind, 1);
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
    $scope.saveInterpretingPrice = function ( interpretingPrice ) {
    	if ( $scope.editInterpreting == -1) {
    		$scope.interpretingPrices.push ({
    			priceDay: interpretingPrice.priceDay,
    			priceHalfDay: interpretingPrice.priceHalfDay,
    			service: interpretingPrice.service,
    			sourceLanguage: interpretingPrice.sourceLanguage,
    			targetLanguage: interpretingPrice.targetLanguage
        	});
    	} else {
    		$scope.interpretingPrices[$scope.editInterpreting] = {
    				priceDay: interpretingPrice.priceDay,
        			priceHalfDay: interpretingPrice.priceHalfDay,
        			service: interpretingPrice.service,
        			sourceLanguage: interpretingPrice.sourceLanguage,
        			targetLanguage: interpretingPrice.targetLanguage
        	};
    	}
    	
    	jQuery("#modal-interpreting").modal("hide");
    	setModalControllerData('interpretingPrice', $scope.interpretingPricePlaceholder);
    	$scope.editInterpreting = -1;
    }
    $scope.editInterpretingPrice = function (ind) {
    	$scope.editInterpreting = ind;
		$scope.interpretingPrices[ind].priceDay = Number($scope.interpretingPrices[ind].priceDay);
		$scope.interpretingPrices[ind].priceHalfDay = Number($scope.interpretingPrices[ind].priceHalfDay);
    	setModalControllerData('interpretingPrice', $scope.interpretingPrices[ind]);
    	jQuery("#modal-interpreting").modal("show");
    }
	$scope.addInterpretingPrice = function(){
		setModalControllerData('interpretingPrice', []);
		$scope.editTranslation = -1;
		jQuery("#modal-interpreting").modal("show");
	}
    $scope.deleteInterpretingPrice = function (ind) {
    	$scope.interpretingPrices.splice( ind, 1 );
    }
    
    /**
     * Company
     */
    $scope.countryPlaceholder = function () {
    	return {};
    }
    $scope.saveCompany = function(company){
        var $data = jQuery.extend(true, {}, company);
        $data.country = $data.country.select;
        $http.post("/api/common/company", $data)
            .success(function($data){
                jQuery("#modal-company").modal("hide");
                $scope.companies.push($data['company']);
                setModalControllerData('company', $scope.countryPlaceholder())
            });
    }
    
    /**
     * Engineering Price
     */
    $scope.engineerPlaceholder = function () {
    	return {};
    }
    
    $scope.saveEngineeringPrice = function( engineerPrice ) {
    	if ( $scope.editEngineering == -1) {
    		$scope.engineeringPrices.push ({
    			engineeringCategory: engineerPrice.engineeringCategory,
    			unit: engineerPrice.unit,
    			price: engineerPrice.price
        	});
    	} else {
    		$scope.engineeringPrices[$scope.editEngineering] = {
    				engineeringCategory: engineerPrice.engineeringCategory,
        			unit: engineerPrice.unit,
        			price: engineerPrice.price
        	};
    	}
    	
    	jQuery("#modal-eng").modal("hide");
    	setModalControllerData('engineerPrice', $scope.engineerPlaceholder());
    	$scope.editEngineering = -1;
    }
    $scope.deleteEngineeringPrice = function (ind) {
    	$scope.engineeringPrices.splice( ind, 1 );
    }
    $scope.editEngineeringPrice = function (ind) {
    	$scope.editEngineering = ind;
    	setModalControllerData('engineerPrice', $scope.engineeringPrices[ind]);
    	jQuery("#modal-eng").modal("show");
    }

    /**
     * Display activate class
     */
    $scope.active_class = function(a, b){
        return a == b ? 'active' : '';
    };
    
    $scope.setActive = function ( str_flag ) {
    	$scope.freelancer.isActive = str_flag;
    }
    $scope.setGender = function ( str_gender ) {
    	$scope.freelancer.gender = str_gender;
    }
    $scope.setCurrency = function ( str_currency ) {
    	$scope.freelancer.currency = str_currency;
    } 
    $scope.setProfileUploaded = function ( str_flag ) {
    	$scope.freelancer.profileUploaded = str_flag;
    }
    $scope.setServiceLevel = function ( str_servicelevel ) {
    	$scope.freelancer.defaultServiceLevel = str_servicelevel;
    }
	/**
     * Toggle resource
     */
    $scope.toggleResource = function($id){
        console.log($scope.freelancer.Resources);
		console.log($scope.resources);
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
					console.log($scope.resources[j].resources[k]);
				
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
		console.log($scope.freelancer.Resources);
    };
});
