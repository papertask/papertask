/**
 * Created by G
 *
 */
angularApp.run( function ($rootScope) {    
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
});
angularApp.controller('PapertaskEmployerEditController', function($scope, $http, $timeout, $q) {
    $scope.pagetype = 'edit';
    $scope.countries = [];
    $scope.languages = [];
    $scope.resources = [];
    $scope.softwares = [];
    $scope.companies = [];
    
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
        position: null
	};
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
    $scope.init = function( ){
        var priceDataRequest = $http.get("/api/user/priceData")
            .success(function($data){
                $scope.languages = $data['languages'];
                $scope.services = $data['services'];
                $scope.softwares = $data['softwares'];
                $scope.engineeringCategories = $data['engcategory'];
                
                initModal();
            });
        
        var ajaxEmployerInfo = $http.get("/api/user/" + USER_ID + "/employer")
        	.success( function ( $data ) {
        		$scope.employer = {
    				username: $data.employer.name,
    				defaultServiceLevel: $data.employer.defaultServiceLevel,
		            comments: $data.employer.comments,
    				company: $data.employer.company,
    				employerId: $data.employer.id,
                    position: $data.employer.position
    			};
                $(".summernote").code( $data.employer.comments );
        		$("#EmployerController").fadeIn();
        	});
        var ajaxUserInfo = $http.get("/api/user/" + USER_ID + "")
            .success ( function ( $data ) {
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
            });
        var ajaxCountryInfo = $http.get("/api/common/country")
            .success(function($data){
                $scope.countries = $data['countries'];
                setModalControllerData('countries', $scope.countries);
        });  
        var ajaxCompanyInfo = $http.get("/api/common/company")
	        .success(function($data){
	            $scope.companies = $data['companies'];
        });      
        $q.all([ajaxUserInfo, ajaxCountryInfo])
            .then(function(){
                $scope.userInfo.country = findOptionByName($scope.countries, $scope.userInfo.country);
            });
        $q.all([ajaxEmployerInfo, ajaxCompanyInfo])
            .then ( function () {
                $scope.employer.company = findOptionByName($scope.companies, $scope.employer.company);
            });
        $http.get('/api/user/desktopprice?userId='+USER_ID).success(function($data) {
            $scope.desktopPrices = $data['desktopPrices'];
        });
        $http.get('/api/user/translationprice?userId='+ USER_ID).success(function($data) {
            $scope.translationPrices = $data['translationPrices'];
        });
        $http.get('/api/user/engineeringprice?userId=' + USER_ID).success(function($data) {
            $scope.engineeringPrices = $data['engineeringPrices'];
        });
        $http.get('/api/user/interpretingprice?userId=' + USER_ID).success(function($data) {
            $scope.interpretingPrices = $data['interpretingPrices'];
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

    	if ( $scope.userInfo.tmRatios && $scope.userInfo.tmRatios.id ) {
    		$http.put("/api/user/" + $scope.userInfo.tmRatios.id + "/tmratio", {
    			userId: USER_ID,
    			repetitions: $scope.userInfo.tmRatios.repetitions,
    			yibai: $scope.userInfo.tmRatios.yibai,
    			jiuwu: $scope.userInfo.tmRatios.jiuwu,
    			bawu: $scope.userInfo.tmRatios.bawu,
    			qiwu: $scope.userInfo.tmRatios.qiwu,
    			wushi: $scope.userInfo.tmRatios.wushi,
    			nomatch: $scope.userInfo.tmRatios.nomatch
    		}).success( function($data) {
                $http.put("/api/user/" + USER_ID, $scope.userInfo)
                    .success(function($data){
                        $http.put("/api/user/"+$scope.employer.employerId+"/employer?user_id=" + USER_ID, $scope.employer).success(function(){
                            location.href="/admin/employer/detail?id=" + USER_ID;
                        });
                    });
            } ) ;
    	} else {
    		$http.post("/api/user/tmratio", {
    			userId: USER_ID,
    			repetitions: $scope.userInfo.tmRatios.repetitions,
    			yibai: $scope.userInfo.tmRatios.yibai,
    			jiuwu: $scope.userInfo.tmRatios.jiuwu,
    			bawu: $scope.userInfo.tmRatios.bawu,
    			qiwu: $scope.userInfo.tmRatios.qiwu,
    			wushi: $scope.userInfo.tmRatios.wushi,
    			nomatch: $scope.userInfo.tmRatios.nomatch
    		}).success( function($data) {
                $http.put("/api/user/" + USER_ID, $scope.userInfo)
                    .success(function($data){
                        $http.put("/api/user/"+$scope.employer.employerId+"/employer?user_id=" + USER_ID, $scope.employer).success(function(){
                            location.href="/admin/employer/detail?id=" + USER_ID;
                        });
                    });
            } ) ;
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
    
    $scope.saveTranslationPrice = function( translationPrice ){
    	if ( $scope.editTranslation == -1 ) {
    		$http.post("/api/user/translationprice", 
				{
    				userId: USER_ID,
					sourceLanguageId: translationPrice.sourceLanguage.id, 
					targetLanguageId: translationPrice.targetLanguage.id, 
					price: translationPrice.price
				}).success(function( data ) {
					$scope.translationPrices.push( data.translationPrice );
    			});
    	} else {
    		$http.put("/api/user/" + translationPrice.id + "/translationprice", 
				{
    				userId: USER_ID,
					sourceLanguageId: translationPrice.sourceLanguage.id, 
					targetLanguageId: translationPrice.targetLanguage.id, 
					price: translationPrice.price
				}).success(function( data ) {
					$scope.translationPrices[$scope.editTranslation] = {sourceLanguage: data.sourceLanguage, targetLanguage: data.targetLanguage, price: data.price, id: data.id}
    			});
    		
    	}
    	jQuery("#modal-translation").modal("hide");
    	setModalControllerData('translationPrice', $scope.translationPricePlaceholder);
    	$scope.editTranslation = -1;
    };
    
    $scope.deleteTranslationPrice = function ( index, tid ) {    	
        bootbox.confirm( DELETE_CONFIRM_TEXT, function( bflag ) {
            if ( bflag == true ) {
                $http.delete("/api/user/" + tid + "/translationprice", {
                    userId: USER_ID            
                }).success(function( data ) {                
                    $scope.translationPrices.splice(index, 1);
                });                
            }
        });       
    }
    
    $scope.editTranslationPrice = function ( index, tid ) {
    	$scope.editTranslation = index;
    	setModalControllerData('translationPrice', $scope.translationPrices[index]);
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
    		$http.post("/api/user/desktopprice", {
    			userId: USER_ID,
    			languageId: desktopPrice.language.id,
    			softwareId: desktopPrice.software.id,
    			priceHourMac: desktopPrice.priceHourMac,
    			priceMac: desktopPrice.priceMac,
    			pricePc: desktopPrice.pricePc,
    			priceHourPc: desktopPrice.priceHourPc
    		}).success(function (data){
    			$scope.desktopPrices.push ( data.desktopPrice );
    		});
    	} else {
    		$http.put("/api/user/" + desktopPrice.id + "/desktopprice", {
    			userId: USER_ID,
    			languageId: desktopPrice.language.id,
    			softwareId: desktopPrice.software.id,
    			priceHourMac: desktopPrice.priceHourMac,
    			priceMac: desktopPrice.priceMac,
    			pricePc: desktopPrice.pricePc,
    			priceHourPc: desktopPrice.priceHourPc
    		}).success( function (data) {
    			$scope.desktopPrices[ $scope.editDtp ] = data.desktopPrice;
    		});
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
    $scope.deleteDesktopPrice = function ( ind, did ) {
        bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag )
                $http.delete("/api/user/" + did + "/desktopprice", {
                    userId: USER_ID            
                }).success(function( data ) {                
                    $scope.desktopPrices.splice( ind, 1 );
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
    $scope.saveInterpretingPrice = function ( interpretingPrice ) {
    	console.log ( interpretingPrice);
    	if ( $scope.editInterpreting == -1) {
    		$http.post("/api/user/interpretingprice", {
    			userId: USER_ID,
    			priceDay: interpretingPrice.priceDay,
    			priceHalfDay: interpretingPrice.priceHalfDay,
    			sourceLanguageId: interpretingPrice.sourceLanguage.id,
    			targetLanguageId: interpretingPrice.targetLanguage.id,
    			serviceId: interpretingPrice.service.id
    		}).success(function( data ){
    			$scope.interpretingPrices.push ( data.interpretingPrice );
    		});
    	} else {
    		$http.put("/api/user/" + interpretingPrice.id + "/interpretingprice", {
    			userId: USER_ID,
    			priceDay: interpretingPrice.priceDay,
    			priceHalfDay: interpretingPrice.priceHalfDay,
    			sourceLanguageId: interpretingPrice.sourceLanguage.id,
    			targetLanguageId: interpretingPrice.targetLanguage.id,
    			serviceId: interpretingPrice.service.id
    		}).success(function( data ) {
    			$scope.interpretingPrices[ $scope.editInterpreting ] = data.interpretingPrice;
    		});
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
    $scope.deleteInterpretingPrice = function (ind, iid) {
        bootbox.confirm( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) 
               $http.delete("/api/user/" + iid + "/interpretingprice", {
                    userId: USER_ID            
                }).success(function( data ) {                
                    $scope.interpretingPrices.splice( ind, 1 );
                }); 
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
    	console.log ( $scope.engineeringPrices );
        if ( $scope.editEngineering == -1) {
    		$http.post("/api/user/engineeringprice", {
    			userId: USER_ID,
    			engineeringcategory: engineerPrice.engineeringCategory,
    			unit: engineerPrice.unit,
    			price: engineerPrice.price
    		}).success(function ( data ) {
    		  console.log ( data );
    			$scope.engineeringPrices.push ( data.engineeringPrice );
    		});
    	} else {
    		$http.put("/api/user/" + engineerPrice.id + "/engineeringprice", {
    			userId: USER_ID,
    			engineeringcategory: engineerPrice.engineeringCategory,
    			unit: engineerPrice.unit,
    			price: engineerPrice.price
    		}).success(function( data ) { 
    			$scope.engineeringPrices[$scope.editEngineering] = data.engineeringPrice;
    		});
    	}
    	
    	jQuery("#modal-eng").modal("hide");
    	setModalControllerData('engineerPrice', $scope.engineerPlaceholder());
    	$scope.editEngineering = -1;
    }
    $scope.deleteEngineeringPrice = function (ind, eid) {
        bootbox.confirm( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) {
                $http.delete("/api/user/" + eid + "/engineeringprice", {
                    userId: USER_ID
                }).success(function (data ){
                    $scope.engineeringPrices.splice( ind, 1 );
                });        
            }
        });    	
    }
    $scope.editEngineeringPrice = function (ind) {
    	$scope.editEngineering = ind;
    	setModalControllerData( 'engineerPrice', $scope.engineeringPrices[ind]);
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
    	$scope.userInfo.profileUploaded = str_flag;
    }
    $scope.setServiceLevel = function ( str_servicelevel ) {
    	$scope.employer.defaultServiceLevel = str_servicelevel;
    }
});
