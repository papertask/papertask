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
            confirmpwd: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function( form ) {
            angular.element('#freelancerController').scope().submit();
        }
    });
}) 
angularApp.controller('FreelancertController', function($scope, $http, $timeout, $q) {
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
		username: '',
		firstname: '',
		surname: '',
		gender: '0',
		city: '',
		lastName: '',
		phone: '',
		country: '',
		currency:'cny',
		serviceLevel: 1,
		defaultServiceLevel: '1'

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
                        updateFreelancerSkillData();
                    });
    };
 
    /**
     * Submit the form
     */
    $scope.submit = function(){
        
    	var ptr_freelancer = {
    			isActive: $scope.freelancer.isActive,
    			profileUpdated: $scope.freelancer.profileUpdated,
    			surname: $scope.freelancer.surname,
    			firstname: $scope.freelancer.firstname,
    			defaultServiceLevel: $scope.freelancer.defaultServiceLevel,
    			email: $scope.freelancer.email, 
    			password: $scope.freelancer.password,
    			city: $scope.freelancer.city,
    			country: $scope.freelancer.country.id,
    			currency: $scope.freelancer.currency,
    			phone: $scope.freelancer.phone,
    			gender: $scope.freelancer.gender,
    			translationPrices: $scope.translationPrices,
    			desktopPrices: $scope.desktopPrices,
    			interpretingPrices: $scope.interpretingPrices,
    			engineeringPrices: $scope.engineeringPrices
    	};
    	
    	$http.post("/api/user/freelancer", ptr_freelancer)
        	.success(function($data){
	            //location.href="/admin/dashboard";
	            
        });
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
    
    $scope.saveTranslationPrice = function( translationPrice ){
    	if ( $scope.editTranslation == -1 ) {
    		$scope.translationPrices.push({sourceLanguage: translationPrice.sourceLanguage, targetLanguage: translationPrice.targetLanguage, price: translationPrice.price});
    	} else {
    		$scope.translationPrices[$scope.editTranslation] = {sourceLanguage: translationPrice.sourceLanguage, targetLanguage: translationPrice.targetLanguage, price: translationPrice.price}
    	}
    	jQuery("#modal-translation").modal("hide");
    	setModalControllerData('translationPrice', $scope.translationPricePlaceholder);
    	$scope.editTranslation = -1;
    };
    
    $scope.deleteTranslationPrice = function ( index ) {        
    	$scope.translationPrices.splice(index, 1);
    	setModalControllerData('translationPrice', $scope.translationPricePlaceholder);
    }
    
    $scope.editTranslationPrice = function ( index ) {
    	$scope.editTranslation = index;
    	setModalControllerData('translationPrice', {
    		sourceLanguage: $scope.translationPrices[index].sourceLanguage,
    		targetLanguage: $scope.translationPrices[index].targetLanguage,
    		price: $scope.translationPrices[index].price
    	});
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
    	setModalControllerData('desktopPrice', $scope.desktopPrices[ind]);
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
    	setModalControllerData('interpretingPrice', $scope.interpretingPrices[ind]);
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
});
