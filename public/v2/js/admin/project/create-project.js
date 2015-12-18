/**
 * Created by antiprovn on 10/8/14.
 */
angularApp.run(function($rootScope){
    var i = 1;
    var element = jQuery("#files > input")[0];
    jQuery(element).filestyle({
        input: false,
        icon: false,
        buttonText: "Add files",
        buttonName: "btn-xs btn-primary",
        badge: false
    });
});

angularApp.filter('breakword', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' �');
    };
});

angularApp.controller('CreateProjectController', function($scope, $http, $timeout, $q, $sce, CurrentUser,
                                                          TableItemListService, ProjectType, CurrentcyRate){
    $scope.ProjectType = ProjectType;
	$scope.CurrentcyRate = CurrentcyRate.get(1).rate;
	//console.log("CurrentcyRate");
	//console.log($scope.CurrentcyRate);

    $scope.files = [];
	$scope.USER_ID = null;
    $scope.currency = null;
	$scope.interpreting = null;
    $scope.editing = true;
	//papertask
	$scope.translationTM = [];
	$scope.translation = [];

    $scope.order = {};
    $scope.project = {

        types: [],
		files: []
    };
    $scope.targets = {};

	function format2n(n) {
		return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}

    $scope.init = function(){
		$http.get("/api/papertask/currencyrate").success(function($data){
			$scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.CurrentcyRate = Number($scope.currencyrate_t.currencyRate);
			TableItemListService.CurrentcyRate = $scope.CurrentcyRate;
        }).error(function($e){
            alert('error');
        });

        $http.get("/api/data/project/")
            .success(function($data){

                jQuery.extend(true, $scope, $data);  // copy data to scope
                var shareData = ['interpretingUnits', 'engineeringUnits', 'dtpUnits'];
                for(var i = 0; i < shareData.length; i++){
                    var key = shareData[i];
                    setModalControllerData(key, $scope[key]);
                }


                $scope.project.targetLanguages = [];
                $timeout(function(){
                    jQuery("select.multiselect").multiselect("destroy").multiselect();
                });
            });
		var ajaxPmlist = $http.get("/" + LANG_CODE + "/admin/staff/getPmList")
            .success( function ( $data ) {
                $scope.pms = $data.pmlist;
            });

        var ajaxSalesList = $http.get("/" + LANG_CODE + "/admin/staff/getSalesList")
            .success( function ( $data ) {
                $scope.sales = $data.saleslist;
            });
		// Get list translationTM
       $http.get("/api/papertask/translationtm").success(function($data){
           $scope.translationTM = $data['translationTM'];

        }).error(function($e){
           alert('error');
        });

		$http.get("/api/papertask/translation").success(function($data){
            $scope.translation = $data['translation'];

        }).error(function($e){
            alert('error');
        });

		$http.get("/api/papertask/interpreting").success(function($data){
            $scope.interpretingPPrices = $data['interpreting'];

        }).error(function($e){
            alert('error');
        });

		TableItemListService.softwarePrices = [];
		$http.get("/api/papertask/desktop-publishing").success(function($data){
						$scope.softwarePrices = $data['softwarePrices'];
						TableItemListService.softwarePrices = $scope.softwarePrices;

					}).error(function($e){
						alert('error');
					});

		TableItemListService.engineeringPPrices = [];
		$http.get("/api/papertask/engineering").success(function($data){
				$scope.engineeringPPrices = $data['engineering'];
				TableItemListService.engineeringPPrices = $scope.engineeringPPrices;

			}).error(function($e){
				alert('error');
		});


		// get some option
		var priceDataRequest = $http.get("/api/user/priceData")
            .success(function($data){
                //$scope.services = $data['services'];
                $scope.softwares = $data['softwares'];
				$scope.engineeringCategories = $data['engcategory'];
				setModalControllerData('engineeringCategories', $scope.engineeringCategories);
				setModalControllerData('softwares', $scope.softwares);
            });
        setModalControllerData('project', $scope.project);

    };

    $scope.projectType = function(){
        if($scope.project.types.length > 0){
            return "normal";
        }
        return "";
    };
	$scope.setserviceLevel= function(level){

		//$scope.project.serviceLevel = level;
		//project.serviceLevel
		// check private
		if($scope.employer.defaultServiceLevel == level)
		{
			if($scope.hasTypeTranslationNoTM)
			{
				$http.get('/api/user/translationprice?userId='+ $scope.USER_ID).success(function($data) {
					$scope.translationPrices = $data['translationPrices'];
				//find

				TableItemListService.translationPrices={};

				for(i=0;i<$scope.translationPrices.length;i++){
					for(j=0;j<$scope.project.targetLanguages.length;j++){


						if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){

							TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
						}
						else {
						//get default papertask
							for(k=0;k<$scope.translation.length;k++){
								if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage && $scope.project.targetLanguages[j].id == $scope.translation[k].targetLanguage)
									if($scope.project.serviceLevel==1)
										TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = Number($scope.translation[k].professionalPrice) ;
									else if($scope.project.serviceLevel==2)
										TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = Number($scope.translation[k].businessPrice);
									else
										TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = Number($scope.translation[k].premiumPrice);

							}

						}

					}


				}
					//TableItemListService.translationPrices = $scope.translationPrices;

				});
			}
		}
		else{//if not check papertask
			for(j=0;j<$scope.project.targetLanguages.length;j++){
				for(k=0;k<$scope.translation.length;k++){
					if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage && $scope.project.targetLanguages[j].id == $scope.translation[k].targetLanguage)
						if($scope.project.serviceLevel==1)
							TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = Number($scope.translation[k].professionalPrice);
						else if($scope.project.serviceLevel==2)
							TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = Number($scope.translation[k].businessPrice);
						else
							TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = Number($scope.translation[k].premiumPrice);
				}
			}
		}
	};

    $scope.change_client = function(client){

	   //get translation no tm
	    if(!client) return null;
	    var USER_ID = client.id;
		console.log(USER_ID);
		$scope.USER_ID = USER_ID;
		TableItemListService.desktopPrices=[];
		$http.get('/api/user/desktopprice?userId='+USER_ID).success(function($data) {
            TableItemListService.desktopPrices = $data['desktopPrices'];
        });

		TableItemListService.engineeringPrices=[];
		$http.get('/api/user/engineeringprice?userId=' + USER_ID).success(function($data) {
            TableItemListService.engineeringPrices = $data['engineeringPrices'];
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
                    tmRatios: $data.tmRatios,
                    cellphone: $data.user.cellphone
                };
				$scope.currency = $data.user.currency;
				$scope.project.currency = $scope.currency;
				TableItemListService.currency = $data.user.currency;

				if($scope.currency == 'usd')
				{
					//change papertask

					//$scope.translationTM

					//$scope.interpretingPPrices  $scope.translation TableItemListService.softwarePrices TableItemListService.engineeringPPrices

				}
			}
		);

		if($scope.interpreting){
			$http.get('/api/user/interpretingprice?userId=' + USER_ID).success(function($data) {
				$scope.interpretingPrices = $data['interpretingPrices'];

				TableItemListService.interpretingPrices={};
				for(i=0;i<$scope.interpretingPrices.length;i++){
					for(j=0;j<$scope.project.targetLanguages.length;j++){
						if($scope.project.sourceLanguage.id == $scope.interpretingPrices[i].sourceLanguage.id
						&& $scope.project.targetLanguages[j].id == $scope.interpretingPrices[i].targetLanguage.id
						&& $scope.interpreting.name == $scope.interpretingPrices[i].service.name
						){
							TableItemListService.interpretingPrices[$scope.project.targetLanguages[j].id] = [];
							TableItemListService.interpretingPrices[$scope.project.targetLanguages[j].id].priceDay = $scope.interpretingPrices[i].priceDay;
							TableItemListService.interpretingPrices[$scope.project.targetLanguages[j].id].priceHalfDay = $scope.interpretingPrices[i].priceHalfDay;
						}
						else {//get default papertask
							for(k=0;k<$scope.interpretingPPrices.length;k++){

								if($scope.project.sourceLanguage.id == $scope.interpretingPPrices[k].sourceLanguage.id
								&& $scope.project.targetLanguages[j].id == $scope.interpretingPPrices[k].targetLanguage.id
								&& $scope.interpreting.name == $scope.interpretingPPrices[k].interpretingService.name
								){
								TableItemListService.interpretingPrices[$scope.project.targetLanguages[j].id] = [];
								TableItemListService.interpretingPrices[$scope.project.targetLanguages[j].id].priceDay = ($scope.currency == 'cny')?Number($scope.interpretingPPrices[k].pricePerDay):format2n(Number($scope.interpretingPPrices[k].pricePerDay)/$scope.CurrentcyRate);
								TableItemListService.interpretingPrices[$scope.project.targetLanguages[j].id].priceHalfDay = ($scope.currency == 'cny')?Number($scope.interpretingPPrices[k].pricePerHalfDay):format2n(Number($scope.interpretingPPrices[k].pricePerHalfDay)/$scope.CurrentcyRate);

								}


							}
						}

					}

				}


			});


		}

	    var ajaxEmployerInfo = $http.get("/api/user/" + USER_ID + "/employer")
        .success( function ( $data ) {
			$scope.employer = {
				defaultServiceLevel: $data.employer.defaultServiceLevel,
			};
			$scope.project.serviceLevel=$scope.employer.defaultServiceLevel;

		TableItemListService.translationPrices = {};
		if($scope.hasTypeTranslationNoTM)
	    {
			$http.get('/api/user/translationprice?userId='+ USER_ID).success(function($data) {
				$scope.translationPrices = $data['translationPrices'];
			//find
			console.log($scope.translationPrices);
			console.log($scope.project);
			TableItemListService.translationPrices={};

			/*for(i=0;i<$scope.translationPrices.length;i++){
				for(j=0;j<$scope.project.targetLanguages.length;j++){


					if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){

						TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
						console.log(TableItemListService.translationPrices[$scope.project.targetLanguages[j].id]);
						console.log($scope.translationPrices[i].price);
						//break;
					}
					else {
					//get default papertask
						for(k=0;k<$scope.translation.length;k++){
							if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage
								&& $scope.project.targetLanguages[j].id == $scope.translation[k].targetLanguage)
								if($scope.project.serviceLevel==1)
									TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].professionalPrice):format2n(Number($scope.translation[k].professionalPrice)/$scope.CurrentcyRate);
								else if($scope.project.serviceLevel==2)
									TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'usd')?Number($scope.translation[k].businessPrice):format2n(Number($scope.translation[k].businessPrice)/$scope.CurrentcyRate);
								else
									TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'usd')?Number($scope.translation[k].premiumPrice):format2n(Number($scope.translation[k].premiumPrice)/$scope.CurrentcyRate);

						}

					}

				}


			}*/
			for(j=0;j<$scope.project.targetLanguages.length;j++){
				for(i=0;i<$scope.translationPrices.length;i++){
					if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){

						TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
						console.log(TableItemListService.translationPrices[$scope.project.targetLanguages[j].id]);
						console.log($scope.translationPrices[i].price);
						//break;
					}
				}
			}
			//console.log($scope.translation);
			for(j=0;j<$scope.project.targetLanguages.length;j++) {
					//get default papertask
					if(!TableItemListService.translationPrices[$scope.project.targetLanguages[j].id])
						for(k=0;k<$scope.translation.length;k++){
							if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage
								&& $scope.project.targetLanguages[j].id == $scope.translation[k].targetLanguage)
								{
								if($scope.project.serviceLevel==1)
									TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].professionalPrice):format2n(Number($scope.translation[k].professionalPrice)/$scope.CurrentcyRate);
								else if($scope.project.serviceLevel==2)
									TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].businessPrice):format2n(Number($scope.translation[k].businessPrice)/$scope.CurrentcyRate);
								else
									TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].premiumPrice):format2n(Number($scope.translation[k].premiumPrice)/$scope.CurrentcyRate);
								}
						}
			}


				//TableItemListService.translationPrices = $scope.translationPrices;
				console.log(TableItemListService.translationPrices);

			});

		}
		if($scope.hasTypeTranslationUseTM){

			$http.get("/api/user/" + USER_ID + "")
				.success ( function ( $data ) {
				   TableItemListService.tmRatios =  $data.tmRatios;

				   if(!$data.tmRatios)
				   {
						TableItemListService.tmRatios = [];
						TableItemListService.tmRatios.repetitions = Number($scope.translationTM[0].rate*100);
						TableItemListService.tmRatios.yibai = Number($scope.translationTM[1].rate*100);
						TableItemListService.tmRatios.jiuwu = Number($scope.translationTM[2].rate*100);
						TableItemListService.tmRatios.bawu = Number($scope.translationTM[3].rate*100);
						TableItemListService.tmRatios.qiwu = Number($scope.translationTM[4].rate*100);
						TableItemListService.tmRatios.wushi = Number($scope.translationTM[5].rate*100);
						TableItemListService.tmRatios.nomatch = Number($scope.translationTM[6].rate*100);
				   }

			})
			if(!$scope.hasTypeTranslationNoTM){
				$http.get('/api/user/translationprice?userId='+ USER_ID).success(function($data) {
					$scope.translationPrices = $data['translationPrices'];
					//find

					TableItemListService.translationPrices={};

					for(j=0;j<$scope.project.targetLanguages.length;j++){
						for(i=0;i<$scope.translationPrices.length;i++){
							if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){

								TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
								console.log(TableItemListService.translationPrices[$scope.project.targetLanguages[j].id]);
								console.log($scope.translationPrices[i].price);
								//break;
							}
						}
					}

					for(j=0;j<$scope.project.targetLanguages.length;j++) {
							//get default papertask
							if(!TableItemListService.translationPrices[$scope.project.targetLanguages[j].id])
								for(k=0;k<$scope.translation.length;k++){
									if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage
										&& $scope.project.targetLanguages[j].id == $scope.translation[k].targetLanguage){
										if($scope.project.serviceLevel==1)
											TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].professionalPrice):format2n(Number($scope.translation[k].professionalPrice)/$scope.CurrentcyRate);
										else if($scope.project.serviceLevel==2)
											TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].businessPrice):format2n(Number($scope.translation[k].businessPrice)/$scope.CurrentcyRate);
										else
											TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = ($scope.currency == 'cny')?Number($scope.translation[k].premiumPrice):format2n(Number($scope.translation[k].premiumPrice)/$scope.CurrentcyRate);
										}
								}
					}
						//TableItemListService.translationPrices = $scope.translationPrices;

				});
				//console.log("lan 2");
			}

		}
        });
	   //get translation tm
    };

	$scope.active_class = function(a, b){
        return a == b ? 'active' : '';
    };

    $scope.setInterpreting = function($interpreting){
        jQuery(".project-types .active").removeClass("active");
		jQuery(".project-types :checked").prop("checked", false);
        $scope.project.types = [$interpreting];
        $scope.interpreting = $interpreting;

    };

    $scope.clearInterpreting =function (){
        jQuery("#project-interpreting .active").removeClass("active");
		jQuery("#project-interpreting :checked").prop("checked", false);

        $scope.interpreting = null;
    };

    $scope.addType = function($translation){
        $scope.clearInterpreting();
        var $index = $scope.project.types.indexOf($translation);
        if($index == -1){
            $scope.project.types.push($translation);
        } else {
            $scope.project.types.splice($index, 1);
        }
    };

    $scope.addFile = function($fileInput){
        for(var i = 0; i < $fileInput.files.length; i++){
            var file = $fileInput.files[i];
            var file_time = file.lastModifiedDate.getYear() + "-"
                + file.lastModifiedDate.getMonth() + "-"
                + file.lastModifiedDate.getDate() + " "
                + file.lastModifiedDate.getHours() + ":"
                + file.lastModifiedDate.getMinutes() + ":"
                + file.lastModifiedDate.getSeconds()
            $scope.project.files.push({
                name: file.name,
                size: Math.ceil(file.size / 1024) + " Kb",
                time: file_time
            });
        }
        $timeout(function(){});  // made template re-render
    };

    $scope.removeFile = function($index){
        $scope.project.files.splice($index, 1);
        jQuery("#files input").slice($index, $index + 1).remove();
    };

    $scope.submit = function(){

        $scope.project.data = TableItemListService.data();
        /*
        for(var i =0; i < $scope.project.data.length; i++){
        	if($scope.project.data[i].itemtm){
        		$scope.project.data[i].itemtm.rate = $scope.vartms.itemtm.rate;
        	}
        }*/


        $http.post("/api/admin/project/", $scope.project)
            .success(function($data){

                if($data.success){
                    location.href = "/" + LANG_CODE + "/admin/project/detail/?id=" + $data.project.id;
                } else {
                    location.href = "/" + LANG_CODE + "/admin/quote/detail/?id=" + $data.project.id;
                }
            })
            .error(function($data){

            });


    };

    function existsIdInArray(arr, id){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].id == id){
                return true;
            }
        }
        return false;
    }

    /** order information condition **/
    $scope.hasTypeTranslationNoTM = function(){
        return existsIdInArray($scope.project.types, 1);
    };
    $scope.hasTypeTranslationUseTM = function(){
        return existsIdInArray($scope.project.types, 2);
    };
    $scope.hasTypeTranslationShow = function(){
        return $scope.hasTypeTranslationUseTM() || $scope.hasTypeTranslationNoTM();
    };
    $scope.hasTypeDesktopPublishingMacOrWin = function(){
        return $scope.hasTypeDesktopPublishingMac() || $scope.hasTypeDesktopPublishingWin();
    };
    $scope.hasTypeDesktopPublishingMac = function(){
        return existsIdInArray($scope.project.types, 4)
    };
    $scope.hasTypeDesktopPublishingWin = function(){
        return existsIdInArray($scope.project.types, 5)
    };
    $scope.hasTypeDesktopPublishingEngineer = function(){
        return existsIdInArray($scope.project.types, 6);
    };
    /** end order information condition **/

    $scope.getTarget = function(language){
        if(typeof $scope.targets[language.id] == 'undefined'){
            $scope.targets[language.id] = {
                interpretings: []
            };
        }
        return $scope.targets[language.id];
    };

    $scope.init();

    $scope.test = function(){

    };
});

angularApp.factory("TableItemListService", function(){
    var $scopes = [];
    var listener;
    var isNew = false;
    var modalId = "#modal-interpreting";
    var vars = {
        item: {}
    };
	var vartms = {
        itemtm: {}
    };

    var itemCloned = {};
    function setListener($scope){
        listener = $scope;
    }
    return {
        addScope: function($scope){
            if($scopes.indexOf($scope) === -1){
                $scopes.push($scope);
            }
        },
        data: function(){
            var data = [];
            for(var i = 0; i < $scopes.length; i++){
                var scopeData = $scopes[i].data();
                if(scopeData !== false){
                    data.push($scopes[i].data());
                }
            }
            return data;
        },
        cancel: function(){
            jQuery.extend(true, vars.item, itemCloned);
            $(modalId).modal("hide");
        },
        save: function(){
            $(modalId).find("form").validate();
            if(!$(modalId).find("form").valid()){
                return;
            }
            if(isNew){
                listener.add(vars.item);
            }
            $(modalId).modal("hide");
        },
        setModalId: function(id){
            modalId = id;
        },
        showModal: function($scope, $item){
            if($item === false){
                $item = {};
                isNew = true;
            } else {
                isNew = false;
            }

            setListener($scope);
            vars.item = $item;
			if(modalId == "#modal-translation-noTM")
			{
				//find rate
				if($scope.TableItemListService.translationPrices){
					vars.item.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
				} else {
					vars.item.rate = vartms.itemtm.rate;
				}

			}
            itemCloned = {};
            jQuery.extend(true, itemCloned, $item);
            $(modalId).modal("show");
        },
		savetm: function(){
            $(modalId).find("form").validate();
            if(!$(modalId).find("form").valid()){
                return;
            }
            if(isNew){
            	//setListener($scope);

                listener.addtm(vartms.itemtm);
            }
            $(modalId).modal("hide");
        },
		showModalTM: function($scope, $itemtm){

            if($itemtm === false){
                $itemtm = {};
                isNew = true;
            } else {
                isNew = false;
            }

            setListener($scope);
            vartms.itemtm = $itemtm;

			if(modalId == "#modal-translation-TM")
			{

				if($scope.TableItemListService.translationPrices[$scope.identifier[1].id]){
					vartms.itemtm.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
				} else {
					vartms.itemtm.rate = null;
				}

			}
            itemCloned = {};
            jQuery.extend(true, itemCloned, $itemtm);
            $(modalId).modal("show");
        },
		getRateDtp : function($scope){
			listener.getRateDtp(vars.item);
		},
		getRateEng : function($scope){
			listener.getRateEng(vars.item);
		},
		getRateInt : function($scope){
			listener.getRateInt(vars.item);
		},
        vars: vars,
		vartms: vartms
    }
});

angularApp.controller('TableItemController', function($scope, CurrentUser, TableItemListService, LangGroup){
    $scope.CurrentUser = CurrentUser;

	$scope.TableItemListService = TableItemListService;
	$scope.CurrentcyRate = TableItemListService.CurrentcyRate;

    $scope.identifier = {};
	$scope.itemtm = [];
	//$scope.itemtm.rate =  TableItemListService.tmRatios.repetitions;


    $scope.items = [];
    $scope.$modalId = "";
    TableItemListService.addScope($scope);

	function format2n(n) {
		return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}

	$scope.setRateTm = function(){
        if(TableItemListService.tmRatios){

			$scope.itemtm.raterepetitions = $scope.raterepetitions =  (TableItemListService.tmRatios.repetitions)?TableItemListService.tmRatios.repetitions:0;
			$scope.itemtm.rateyibai = $scope.rateyibai =  (TableItemListService.tmRatios.yibai)?TableItemListService.tmRatios.yibai:0;
			$scope.itemtm.ratejiuwu = $scope.ratejiuwu =  (TableItemListService.tmRatios.jiuwu)?TableItemListService.tmRatios.jiuwu:0;
			$scope.itemtm.ratebawu = $scope.ratebawu =  (TableItemListService.tmRatios.bawu)?TableItemListService.tmRatios.bawu:0;
			$scope.itemtm.rateqiwu = $scope.rateqiwu =  (TableItemListService.tmRatios.qiwu)?TableItemListService.tmRatios.qiwu:0;
			$scope.itemtm.ratewushi = $scope.ratewushi =  (TableItemListService.tmRatios.wushi)?TableItemListService.tmRatios.wushi:0;
			$scope.itemtm.ratenomatch = $scope.ratenomatch =  (TableItemListService.tmRatios.nomatch)?TableItemListService.tmRatios.nomatch:0;
		}
    };
    $scope.setIdentifier = function($identifier){
        $scope.identifier = $identifier;
		if(TableItemListService.translationPrices)
			$scope.itemtm.rate = Number(TableItemListService.translationPrices[$scope.identifier[1].id]);
    };
    $scope.add = function($item){
		$item.total = $item.rate * $item.quantity;
        $scope.items.push($item);
    };
	$scope.getRateDtp = function($item){

			if($item.software && $item.unit)
			{


				//get private
				if( TableItemListService.desktopPrices.length)
				{

					for(i=0;i<TableItemListService.desktopPrices.length;i++)
					{
						if($scope.identifier[1].id == $scope.TableItemListService.desktopPrices[i].language.id
						&& $item.software.id == $scope.TableItemListService.desktopPrices[i].software.id){

							if($item.unit.id == 1 && $scope.identifier[0] == "dtpMac"){
								$item.rate = Number($scope.TableItemListService.desktopPrices[i].priceHourMac);
								return;
							}
							else if ($item.unit.id == 2 && $scope.identifier[0] == "dtpMac"){
								$item.rate = Number($scope.TableItemListService.desktopPrices[i].priceMac);
								return;
							}

							else if ($item.unit.id == 1 && $scope.identifier[0] == "dtpPc")	{
								$item.rate = Number($scope.TableItemListService.desktopPrices[i].priceHourPc);
								return;
							}
							else if ($item.unit.id == 2 && $scope.identifier[0] == "dtpPc")	{
								$item.rate = Number($scope.TableItemListService.desktopPrices[i].pricePc);
								return;
							}
						}
					}
					//	else {
							//get group language

							$lang_group  =    LangGroup.get($scope.identifier[1].id);


							for(j=0;j<TableItemListService.softwarePrices.length;j++)
							{
								console.log("check dtp");
								console.log(TableItemListService);
								console.log($lang_group);
								console.log($item);
								if(TableItemListService.softwarePrices[j].languageGroup.id == $lang_group.group_id && $item.software.id ==  TableItemListService.softwarePrices[j].desktopSoftware.id){
									console.log("check dtp more");
									console.log($item.unit);
									console.log($scope.identifier[0]);
									if($item.unit.id == 1 && $scope.identifier[0] == "dtpMac"){

										$item.rate = (TableItemListService.currency == 'cny')?Number(TableItemListService.softwarePrices[j].priceApplePerHour):format2n(Number(TableItemListService.softwarePrices[j].priceApplePerHour)/$scope.CurrentcyRate);
										$item.rate = Number($item.rate);
										console.log($item.rate);
										return;
									}
									else if ($item.unit.id == 2 && $scope.identifier[0] == "dtpMac"){
										$item.rate = (TableItemListService.currency == 'cny')?Number($scope.TableItemListService.softwarePrices[j].priceApplePerPage):format2n(Number($scope.TableItemListService.softwarePrices[j].priceApplePerPage)/$scope.CurrentcyRate);
										$item.rate = Number($item.rate);
										return;
									}
									else if ($item.unit.id == 1 && $scope.identifier[0] == "dtpPc")	{
										$item.rate = (TableItemListService.currency == 'cny')?Number($scope.TableItemListService.softwarePrices[j].priceWindowPerHour):format2n(Number($scope.TableItemListService.softwarePrices[j].priceWindowPerHour)/$scope.CurrentcyRate);
										$item.rate = Number($item.rate);
										return;
									}
									else if ($item.unit.id == 2 && $scope.identifier[0] == "dtpPc")	{
										$item.rate = (TableItemListService.currency == 'cny')?Number($scope.TableItemListService.softwarePrices[j].priceWindowPerPage):format2n(Number($scope.TableItemListService.softwarePrices[j].priceWindowPerPage)/$scope.CurrentcyRate);
										$item.rate = Number($item.rate);
										return;
									}
								}
							}
							// TableItemListService.softwarePrices.length


						//}


					//}

				}
				else {//if not get paper task

							//get group language

							$lang_group  =    LangGroup.get($scope.identifier[1].id);


							for(j=0;j<TableItemListService.softwarePrices.length;j++)
							{
								if(TableItemListService.softwarePrices[j].languageGroup.id == $lang_group.group_id && $item.software.id ==  TableItemListService.softwarePrices[j].desktopSoftware.id){

								if($item.unit.id == 1 && $scope.identifier[0] == "dtpMac"){
									$item.rate = (TableItemListService.currency == 'cny')?Number(TableItemListService.softwarePrices[j].priceApplePerHour):format2n(Number(TableItemListService.softwarePrices[j].priceApplePerHour)/$scope.CurrentcyRate);
									$item.rate = Number($item.rate);
									return;
								}
								else if ($item.unit.id == 2 && $scope.identifier[0] == "dtpMac"){
									$item.rate = (TableItemListService.currency == 'cny')?Number($scope.TableItemListService.softwarePrices[j].priceApplePerPage):format2n(Number($scope.TableItemListService.softwarePrices[j].priceApplePerPage)/$scope.CurrentcyRate);
									$item.rate = Number($item.rate);
									return;
								}
								else if ($item.unit.id == 1 && $scope.identifier[0] == "dtpPc")	{
									$item.rate = (TableItemListService.currency == 'cny')?Number($scope.TableItemListService.softwarePrices[j].priceWindowPerHour):format2n(Number($scope.TableItemListService.softwarePrices[j].priceWindowPerHour)/$scope.CurrentcyRate);
									$item.rate = Number($item.rate);
									return;
								}
								else if ($item.unit.id == 2 && $scope.identifier[0] == "dtpPc")	{
									$item.rate = (TableItemListService.currency == 'cny')?Number($scope.TableItemListService.softwarePrices[j].priceWindowPerPage):format2n(Number($scope.TableItemListService.softwarePrices[j].priceWindowPerPage)/$scope.CurrentcyRate);
									$item.rate = Number($item.rate);
									return;
								}
								}
							}
							// TableItemListService.softwarePrices.length
				}
			}
	}
	$scope.getRateEng = function($item){
		if($item.category && $item.unit)
		{
			//get private

			if( TableItemListService.engineeringPrices.length)
			{
				for(i=0;i<TableItemListService.engineeringPrices.length;i++){
					if($item.category.id == TableItemListService.engineeringPrices[i].engineeringcategory.id
					&&  $item.unit.id == TableItemListService.engineeringPrices[i].unit.id){

						$item.rate =  Number(TableItemListService.engineeringPrices[i].price);
						return;
					}
				}
				//	else {

						for(j=0;j<TableItemListService.engineeringPPrices.length;j++)
						{


							if($item.category.id == TableItemListService.engineeringPPrices[j].engineeringCategory.id
							&&  $item.unit.id == TableItemListService.engineeringPPrices[j].unit.id){

								$item.rate =  (TableItemListService.currency == 'cny')?Number(TableItemListService.engineeringPPrices[j].price):format2n(Number(TableItemListService.engineeringPPrices[j].price)/$scope.CurrentcyRate);
								$item.rate = Number($item.rate);
								return;
							}
						}
						$item.rate = 0;
					//}
				//}
			}
			else{
				for(j=0;j<TableItemListService.engineeringPPrices.length;j++)
				{
					if($item.category.id == TableItemListService.engineeringPPrices[j].engineeringCategory.id
					&&  $item.unit.id == TableItemListService.engineeringPPrices[j].unit.id){
						$item.rate =  (TableItemListService.currency == 'cny')?Number(TableItemListService.engineeringPPrices[j].price):format2n(Number(TableItemListService.engineeringPPrices[j].price)/$scope.CurrentcyRate);
						$item.rate = Number($item.rate);
						return;
					}
				}
				$item.rate = 0;
			}

		}

	}
	$scope.getRateInt = function($item){

		if(TableItemListService.interpretingPrices){
			if($item.unit.id == 1)
			{
				$item.rate =  Number(TableItemListService.interpretingPrices[$scope.identifier[1].id].priceDay);
			}
			else if ($item.unit.id == 2){
				$item.rate =  Number(TableItemListService.interpretingPrices[$scope.identifier[1].id].priceHalfDay);

			}
		}
	}
	$scope.addtm = function($itemtm){
        //	$scope.itemtm.push($itemtm);
		$scope.itemtm = $itemtm;
		$scope.itemtm.total = ($scope.itemtm.rate * $scope.raterepetitions / 100) * $scope.itemtm.sourcerepetitions
							+($scope.itemtm.rate * $scope.rateyibai / 100) * $scope.itemtm.sourceyibai
							+($scope.itemtm.rate * $scope.ratejiuwu / 100) * $scope.itemtm.sourcejiuwu
							+($scope.itemtm.rate * $scope.ratebawu / 100) * $scope.itemtm.sourcebawu
							+($scope.itemtm.rate * $scope.ratewushi / 100) * $scope.itemtm.sourcewushi
							+($scope.itemtm.rate * $scope.ratenomatch / 100) * $scope.itemtm.sourcenomatch


    };
    $scope.remove = function($index){
        $scope.items.splice($index, 1);
    };
    $scope.showModal = function($item){
        TableItemListService.setModalId($scope.$modalId);
        TableItemListService.showModal($scope, $item);
    };

	$scope.showModalTM = function($itemtm){
        TableItemListService.setModalId($scope.$modalId);
        TableItemListService.showModalTM($scope, $itemtm);
    };
    $scope.setModalId = function($modalId){
        $scope.$modalId = $modalId;
    }
    $scope.data = function(){
        if($scope.items.length == 0 && $scope.itemtm.length==0){
            return false;
        }
		else if($scope.items.length > 0 && $scope.itemtm.length==0)
		{
			return {
            items: $scope.items,
            identifier: $scope.identifier,

			};
		}
		else if($scope.items.length == 0 && $scope.itemtm.length > 0)
		{
			return {
            itemtm: $scope.itemtm,
            identifier: $scope.identifier,

			};
		}
        return {
            items: $scope.items,
            identifier: $scope.identifier,
			itemtm: $scope.itemtm

        };
    }
});

angularApp.controller('TableModalController', function($scope, TableItemListService,$http){
    $scope.TableItemListService = TableItemListService;
    $scope.vars = TableItemListService.vars;
	$scope.vartms = TableItemListService.vartms;
});

angularApp.controller('AppController', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {
    var uploader = $scope.uploader = new FileUploader({
        url: "/" + LANG_CODE + "/admin/project/uploadFile"
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });


    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.upload();
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        //console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        if(!response.success){
            fileItem.file.name += " - Uploading error";
            $timeout(function(){
                fileItem.remove();
            }, 1000);
            return;
        }
        fileItem.projectFile = {
            name: fileItem.file.name,
            id: response.file.id
        };
        $scope.project.files.push(fileItem.projectFile);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploader.onCompleteAll = function() {
       // console.info('onCompleteAll');
    };

    //console.info('uploader', uploader);


    // -------------------------------


    var controller = $scope.controller = {
        isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    $scope.removeItem = function(item){
        if(item.isSuccess){
            var id = item.projectFile.id;
            for(var i = 0; i < $scope.project.files.length; i++){
                if($scope.project.files[i].id == id){
                    $scope.project.files.splice(i, 1);
                    break;
                }
            }
        };
        item.remove();
    };
}]);
