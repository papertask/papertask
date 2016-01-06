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
            angular.element('#EmployerController').scope().submit();
        }
    });
}) 
angularApp.controller('PapertaskEmployerController', function($scope, $http, $timeout, $q) {
	$scope.pagetype = 'new';
    $scope.countries = [];
    $scope.languages = [];
    $scope.resources = [];
    $scope.softwares = [];
    $scope.companies = [];
    $scope.units 	 = [];
    $scope.pmlist    = [];
    $scope.saleslist = [];
    $scope.engineeringCategories = [];

    $scope.translationPrices = [];
    $scope.desktopPrices = [];
    $scope.interpretingPrices = [];
    $scope.engineeringPrices = [];
    
    $scope.editTranslation = -1;
    $scope.editDtp = -1;
    $scope.editInterpreting = -1;
    $scope.editEngineering = -1;

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
        cellphone: null
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

    /**
     * Mark resource active params
     */
    function initModal(){
        setModalControllerData('languages', $scope.languages);
        setModalControllerData('services', $scope.services);
        setModalControllerData('softwares', $scope.softwares);
        setModalControllerData('engineeringCategories', $scope.engineeringCategories);       
    }

    /** end mapping function **/
    $scope.init = function(){
        var priceDataRequest = $http.get("/api/user/priceData")
            .success(function($data){
                $scope.languages = $data['languages'];
                $scope.services = $data['services'];
                $scope.softwares = $data['softwares'];
                $scope.engineeringCategories = $data['engcategory'];
                initModal();
            });

        var ajaxPmlist = $http.get("/" + LANG_CODE + "/admin/staff/getPmList")
            .success( function ( $data ) {
                $scope.pmlist = $data.pmlist;
            });

        var ajaxSalesList = $http.get("/" + LANG_CODE + "/admin/staff/getSalesList")
            .success( function ( $data ) {
                $scope.saleslist = $data.saleslist;
            });

        $http.get("/api/common/country")
            .success(function($data){
                $scope.countries = $data['countries'];
                setModalControllerData('countries', $scope.countries);
        });
        $http.get("/api/common/company")
	        .success(function($data){
	            $scope.companies = $data['companies'];
        });
        $http.get("/api/common/unit")
	        .success(function($data){
	            $scope.units = $data;
	            setModalControllerData('units', $scope.units);
	    });
    };
 
    /**
     * Submit the form
     */
    $scope.submit = function(){
    	$scope.employer.comments = $('.summernote').code();

    	var ptr_employer = {
    			isActive: $scope.userInfo.isActive,
    			profileUpdated: $scope.userInfo.profileUpdated,
    			surname: $scope.userInfo.lastName,
    			firstname: $scope.userInfo.firstName,
    			defaultServiceLevel: $scope.employer.defaultServiceLevel,
    			email: $scope.userInfo.email,
    			password: $scope.userInfo.password,
    			city: $scope.userInfo.city,
    			country: $scope.userInfo.country.id,
    			currency: $scope.userInfo.currency,
    			phone: $scope.userInfo.phone,
    			gender: $scope.userInfo.gender,
    			position: $scope.employer.position,
    			company: $scope.employer.company,
    			translationPrices: $scope.translationPrices,
    			desktopPrices: $scope.desktopPrices,
    			interpretingPrices: $scope.interpretingPrices,
    			tmRatio: $scope.userInfo.tmRatios,
    			comments: $('.summernote').code(),
    			engineeringPrices: $scope.engineeringPrices,
                contracted: $scope.employer.contracted,
                pm: $scope.employer.pm,
                sales: $scope.employer.sales,
                cellphone: $scope.userInfo.cellphone,
                name: $scope.employer.username,
				lang_code : LANG_CODE,
    	};
    	
    	$http.post("/api/user/employer", ptr_employer)
        	.success(function($data){
                if ( $data.success == 'failed') {
                    bootbox.alert("User already exited. Please check your email address.");
                    return ;
                }
	            location.href="/" + LANG_CODE + "/admin/employer/detail?id=" + $data.user.id;
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
		setModalControllerData('translationPrice', []);
    	$scope.editTranslation = -1;
    };
    
    $scope.deleteTranslationPrice = function ( index ) {  
        bootbox.confirm ( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) {
                $scope.translationPrices.splice(index, 1);
	            setModalControllerData('translationPrice', $scope.translationPricePlaceholder);
             }
        });
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
    	setModalControllerData('desktopPrice', []);
    	$scope.editDtp = -1;
    }
    $scope.editDesktopPrice = function ( ind ) {
    	$scope.editDtp = ind;
    	setModalControllerData('desktopPrice', $scope.desktopPrices[ind]);
    	jQuery("#modal-dtp").modal("show");
    }
    $scope.deleteDesktopPrice = function ( ind ) {
        bootbox.confirm ( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) {
    	       $scope.desktopPrices.splice(ind, 1);
            }
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
    	setModalControllerData('interpretingPrice', []);
    	$scope.editInterpreting = -1;
    }
    $scope.editInterpretingPrice = function (ind) {
    	$scope.editInterpreting = ind;
    	setModalControllerData('interpretingPrice', $scope.interpretingPrices[ind]);
    	jQuery("#modal-interpreting").modal("show");
    }
    $scope.deleteInterpretingPrice = function (ind) {
        bootbox.confirm ( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) {
    	       $scope.interpretingPrices.splice( ind, 1 );
            }
        });
    }
    
    /**
     * Company
     */
    $scope.countryPlaceholder = function () {
    	return {};
    }
    $scope.saveCompany = function(company){

        var $data = jQuery.extend(true, {}, company);
        $data.country = $data.country.name;
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
    			engineeringcategory: engineerPrice.engineeringCategory,
    			unit: engineerPrice.unit,
    			price: engineerPrice.price
        	});
    	} else {
    		$scope.engineeringPrices[$scope.editEngineering] = {
    				engineeringcategory: engineerPrice.engineeringCategory,
        			unit: engineerPrice.unit,
        			price: engineerPrice.price
        	};
    	}
    	
    	jQuery("#modal-eng").modal("hide");
    	setModalControllerData('engineerPrice', $scope.engineerPlaceholder());
    	$scope.editEngineering = -1;
    }
    $scope.deleteEngineeringPrice = function (ind) {
        bootbox.confirm ( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) {
    	       $scope.engineeringPrices.splice( ind, 1 );
            }
        });
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
    	$scope.userInfo.isActive = str_flag;
    }
    $scope.setGender = function ( str_gender ) {
    	$scope.userInfo.gender = str_gender;
    }
    $scope.setCurrency = function ( str_currency ) {
    	$scope.userInfo.currency = str_currency;
    } 
    $scope.setProfileUploaded = function ( str_flag ) {
    	$scope.userInfo.profileUpdated = str_flag;
    }

    $scope.setEmployerContracted = function ( str_flag ) {
        $scope.employer.contracted = str_flag;
    }
    $scope.setServiceLevel = function ( str_servicelevel ) {
    	$scope.employer.defaultServiceLevel = str_servicelevel;
    }
});
