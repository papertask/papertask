angularApp.controller('PapertaskProfileController', function($scope, $http, $timeout, $q) {
    $scope.translationTM = [];
    $scope.translation = [];
    $scope.languages = [];
    $scope.languageGroups = [];
	$scope.currency = 'CNY';
	$scope.currencyrate = 6.3;
    $scope.newLanguagePricePair = nullTranslation = {
        'id': null,
        'sourceLanguage': null,
        'targetLanguage': null,
        'professionalPrice': null,
        'businessPrice': null,
        'premiumPrice': null
    };

    $scope.desktopSoftwares = [];
    $scope.softwarePrices = [];
    $scope.softwarePrice = nullPrice = {
        'id': null,
        'languageGroup': {},
        'desktopSoftware': {},
        'priceApplePerPage': null,
        'priceWindowPerPage': null,
        'priceApplePerHour': null,
        'priceWindowPerHour': null
    };

    $scope.engineeringCategories = [];
    $scope.units = [];
    $scope.engineeringPrices = [];
    $scope.engineeringPrice = nullEngineeringPrice = {
        'id': null,
        'engineeringCategory': {},
        'unit': {},
        'price': null
    };

    $scope.interpretingServices = [];
    $scope.interpretingPrices = [];
    $scope.interpretingPrice = nullInterpretingPrice = {
        'id': null,
        'sourceLanguage': {},
        'targetLanguage': {},
        'interpretingService': {},
        'pricePerDay': null,
        'pricePerHalfDay': null
    };
	$scope.changecurrency = function(currency){
		if(currency==1){
			$scope.currency = 'CNY';
			init();
		}
		else if(currency==2){
			$scope.currency = 'USD';
			for(i=0;i<$scope.translation.length;i++)
			{
				$scope.translation[i].premiumPrice = format2(Number($scope.translation[i].premiumPrice)/$scope.currencyrate);
				$scope.translation[i].professionalPrice = format2(Number($scope.translation[i].professionalPrice)/$scope.currencyrate);
				$scope.translation[i].businessPrice	= format2(Number($scope.translation[i].businessPrice)/$scope.currencyrate);
			}
			for(i=0;i<$scope.softwarePrices.length;i++)
			{
				$scope.softwarePrices[i].priceApplePerHour = format2(Number($scope.softwarePrices[i].priceApplePerHour)/$scope.currencyrate);
				$scope.softwarePrices[i].priceApplePerPage = format2(Number($scope.softwarePrices[i].priceApplePerPage)/$scope.currencyrate);
				$scope.softwarePrices[i].priceWindowPerHour = format2(Number($scope.softwarePrices[i].priceWindowPerHour)/$scope.currencyrate);
				$scope.softwarePrices[i].priceWindowPerPage = format2(Number($scope.softwarePrices[i].priceWindowPerPage)/$scope.currencyrate);
			}
			for(i=0;i<$scope.engineeringPrices.length;i++)
			{
				$scope.engineeringPrices[i].price = format2(Number($scope.engineeringPrices[i].price)/$scope.currencyrate);
				
			}
			for(i=0;i<$scope.interpretingPrices.length;i++)
			{
				$scope.interpretingPrices[i].pricePerDay = format2(Number($scope.interpretingPrices[i].pricePerDay)/$scope.currencyrate);
				$scope.interpretingPrices[i].pricePerHalfDay = format2(Number($scope.interpretingPrices[i].pricePerHalfDay)/$scope.currencyrate);
				
			}
			
			
			
			
		}
	};
	function format2(n) {
		return n.toFixed(3).replace(/(\d)(?=(\d{4})+\.)/g, "$1,");
	}
    function init(){
        // validate
        $('form').validate();
		//Get currency
		$http.get("/api/papertask/currencyrate").success(function($data){
            $scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.currencyrate = Number($scope.currencyrate_t.currencyRate);
			
			
        }).error(function($e){
            alert('error');
        });
		
		// Get Country
        $http.get("/api/common/country/")
        .success(function($data){
       	 jQuery.extend(true, $scope, $data);  // copy data to scope

        });
		
		//get company info
		$http.get("/api/papertask/companyinfo").success(function($data){
            $scope.companyinfo = $data['companyinfo'];
			$scope.companyinfo1 = $scope.companyinfo[0];
			$scope.companyinfo2 = $scope.companyinfo[1];
			
        }).error(function($e){
            alert('error');
        });
		//get bank info
		$http.get("/api/papertask/bankinfo").success(function($data){
            $scope.bankinfos = $data['bankinfo'];
			//$scope.bankinfo1 = $scope.bankinfo[0];
			//$scope.bankinfo2 = $scope.bankinfo[1];
			//console.info('bankinfo',$scope.bankinfos);
			//console.log("bankinfo");
			//console.log($scope.bankinfo1);
			//console.log($scope.bankinfo2);
        }).error(function($e){
            alert('error');
        });
		
		$scope.saveRate = function(){
            var validate = $('form[name=CurrencyRate]').valid();
            if(validate == true){
                hideModal();
				$http.put('/api/papertask/currencyrate/'+ $scope.currencyrate_t.id + '/',
                        $scope.currencyrate_t).success(function($data){
						$scope.currencyrate = Number($scope.currencyrate_t.currencyRate);
                        
                    });                    
			}
        };
        // Get list translationTM
        $http.get("/api/papertask/translationtm").success(function($data){
           $scope.translationTM = $data['translationTM'];
        }).error(function($e){
           alert('error');
        });

        // update translationTM
        $scope.updateTranslationTM = function(){
            var validate = $('form[name=formTM]').valid();
            if(validate == true){
                hideModal();
                $.each($scope.translationTM, function(){
                    if($(this)[0].rate){
                        $http.put('/api/papertask/translationtm/' + $(this)[0].id + '/', {
                            rate: $(this)[0].rate
                        });
                    }
                });
            }
        };

        // hide target language option as source language
        $('select[name=sourceLanguage]').on('change', function(){
            $('select[name=targetLanguage] option').show();
           $('select[name=targetLanguage] option[value='+ $(this).val() +']').hide();
        });

        // Get list translation
        getListTranslation();

        // init add new row -> reset all row value val
        $scope.initAddNewRow = function(){
            $scope.newLanguagePricePair = nullTranslation;
            $scope.softwarePrice = nullPrice;
            $scope.interpretingPrice = nullInterpretingPrice;
        };

        // create translation
        $scope.createLanguagePricePair = function(){
            var validate = $('form[name=formTranslation]').valid();
            if(validate == true){
                // hide modal
                hideModal();
                if($scope.newLanguagePricePair.id > 0){
                    $http.put('/api/papertask/translation/' + $scope.newLanguagePricePair.id +'/',
                        $scope.newLanguagePricePair
                    ).success(function($data){
                    });
                }else{
                    $http.post('/api/papertask/translation/', $scope.newLanguagePricePair).success(function($data){
                        getListTranslation();
                        $scope.newLanguagePricePair = nullTranslation;
                    });
                }
            }
        };

        // update translation
        $scope.editTranslation = function(pair){
            $scope.newLanguagePricePair = pair;
        }

        // delete translation
        $scope.deleteTranslation = function(id){
            bootbox.confirm(confirmDeleteText, function(result) {
                if(result == true){
                    $http.delete('/api/papertask/translation/' + id).success(function(){
                        getListTranslation();
                        scrollToDiv('translation');
                    });
                }
            });
        };

        // get list languages
        $http.get("/api/common/language").success(function($data){
            $scope.languages = $data;
        });

        // get list language groups
        $http.get("/api/common/language-group").success(function($data){
            $scope.languageGroups = $data;
        });

        //get list desktop software and interpreting services
        $http.get("/api/user/price-data").success(function($data){
            $scope.desktopSoftwares = $data['softwares'];
            $scope.interpretingServices = $data['services'];
        });

        //get list software prices
        getListSoftwarePrices();

        // edit software price
        $scope.editSoftwarePrice = function(price){
            $scope.softwarePrice = price;
        }

        // add software price
        $scope.addSoftwarePrice = function(){
            var validate = $('form[name=softwarePriceForm]').valid();
            if(validate == true){
                if($scope.softwarePrice.id > 0){
                    // update software price
                    $http.put('/api/papertask/desktop-publishing/'+ $scope.softwarePrice.id + '/',
                        $scope.softwarePrice).success(function($data){
                    });
                }else{
                    // add software price
                    $http.post('/api/papertask/desktop-publishing', $scope.softwarePrice).success(function($data){
                    });
                }
                getListSoftwarePrices();
                hideModal();
            }
        }

        // delete software price
        $scope.deleteSoftwarePrice = function($id){
            bootbox.confirm(confirmDeleteText, function(result) {
                if(result == true){
                    $http.delete('/api/papertask/desktop-publishing/' + $id).success(function(){
                        getListSoftwarePrices();
                        scrollToDiv('desktop-publishing');
                    });
                }
            });
        };

        //get list engineering prices
        getListEngineeringPrices();

        // get list engineering categories
        $http.get('/api/common/engineering-category').success(function($data){
            $scope.engineeringCategories = $data;
        });

        // get list units
        $http.get('/api/common/unit').success(function($data){
            $scope.units = $data;

        });

        // add engineering price
        $scope.addEngineeringPrice = function(){
            var validate = $('form[name=engineeringPriceForm]').valid();
            if(validate == true){
                if($scope.engineeringPrice.id > 0){
                    // update engineering price
                    $http.put('/api/papertask/engineering/'+ $scope.engineeringPrice.id +'/', $scope.engineeringPrice)
                        .success(function($data){
                  
                    });
                }else{
                    // add engineering price
                    $http.post('/api/papertask/engineering/', $scope.engineeringPrice).success(function($data){
                       
                    });
                }
                getListEngineeringPrices();
                hideModal();
            }
        }

        // edit engineering price
        $scope.editEngineeringPrice = function($price){
            $scope.engineeringPrice = $price;
        }

        // delete engineering price
        $scope.deleteEngineeringPrice = function($id){
            bootbox.confirm(confirmDeleteText, function(result) {
                if(result == true){
                    $http.delete('/api/papertask/engineering/' + $id).success(function(){
                        
                        getListEngineeringPrices();
                        scrollToDiv('engineering');
                    });
                }
            });
        };

        // get list interpreting prices
        getListInterpretingPrices();

        // add interpreting price
        $scope.addInterpretingPrice = function(){
            var validate = $('form[name=interpretingPriceForm]').valid();
            if(validate == true){
                if($scope.interpretingPrice.id > 0){
                    // update interpreting price
                    $http.put('/api/papertask/interpreting/'+ $scope.interpretingPrice.id +'/', $scope.interpretingPrice)
                        .success(function($data){
                           
                        });
                }else{
                    // add interpreting price
                    $http.post('/api/papertask/interpreting/', $scope.interpretingPrice).success(function($data){
                       
                    });
                }
                getListInterpretingPrices();
                hideModal();
            }
        }

        // edit interpreting price
        $scope.editInterpretingPrice = function($price){
            $scope.interpretingPrice = $price;
        }

        // delete interpreting price
        $scope.deleteInterpretingPrice = function($id){
            bootbox.confirm(confirmDeleteText, function(result) {
                if(result == true){
                    $http.delete('/api/papertask/interpreting/' + $id).success(function(){
                        
                        getListInterpretingPrices();
                        scrollToDiv('interpreting');
                    });
                }
            });
        };
        
        
    }

    function getListTranslation(){
        $http.get("/api/papertask/translation").success(function($data){
            $scope.translation = $data['translation'];
           
        }).error(function($e){
            alert('error');
        });
    }

    function getListSoftwarePrices(){
        $http.get("/api/papertask/desktop-publishing").success(function($data){
            $scope.softwarePrices = $data['softwarePrices'];

        }).error(function($e){
            alert('error');
        });
    }

    function getListEngineeringPrices(){
        $http.get("/api/papertask/engineering").success(function($data){
            $scope.engineeringPrices = $data['engineering'];

        }).error(function($e){
            alert('error');
        });
    }

    function getListInterpretingPrices(){
        $http.get("/api/papertask/interpreting").success(function($data){
            $scope.interpretingPrices = $data['interpreting'];

        }).error(function($e){
            alert('error');
        });
    }

    function hideModal(){
        $('.modal').modal('hide');
    }

    function scrollToDiv(divId){
        jQuery('html, body').animate({
            scrollTop: jQuery('#' + divId).position().top
        }, 500);
    }

    $scope.SaveEditBankAccount = function(){

        	$http.put("/api/papertask/bankinfo/"+ $scope.EditBankAccount.id +"/", $scope.EditBankAccount)
    		.success( function ( $data ) {
    			for(var i=0; i< $scope.bankinfos.length; i++){
    				if($scope.bankinfos[i].id == $data.bankinfo.id){
    					$scope.bankinfos[i] = $data.bankinfo;
    					break;
    				}
    			}
    			$('#modal-editbank').modal('hide');
    		});
    		
    	return false;
    }
    
    $scope.SaveAddBankAccount = function(){

        	$http.post("/api/papertask/bankinfo/", $scope.AddBankAccount)
    		.success( function ( $data ) {
    			$scope.bankinfos.push($data.bankinfo);
    			$('#modal-addbank').modal('hide');
    		});
    
    		
    	return false;
    }

    
    //EditBankAccount(bankinfo)
    $scope.EditBankAccountBut = function (bankinfo){
    	$scope.EditBankAccount = angular.copy(bankinfo);    	

    }


    init();
});