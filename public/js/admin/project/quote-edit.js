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

angularApp.controller('QuoteEditController', function($scope, $http, $timeout, $q, $sce, CurrentUser,
                                                           ProjectType, ProjectApi,ProjectServiceLevel, 
															ProjectStatus, ProjectPriority, CurrentcyRate, LangGroup){
    $scope.ProjectType = ProjectType;
	$scope.ProjectStatus = ProjectStatus;
    $scope.ProjectServiceLevel = ProjectServiceLevel;
    $scope.ProjectPriority = ProjectPriority;
	$scope.CurrentcyRate = CurrentcyRate.get(1).rate;
	//console.log("CurrentcyRate");
	//console.log($scope.CurrentcyRate);

    $scope.files = [];
	$scope.type_active = [];
	$scope.USER_ID = null;
    $scope.currency = null;
	$scope.interpreting = null;
    $scope.editing = true;
	$scope.itermnotmsnews = [];
	//papertask
	$scope.translationTM = [];
	$scope.translation = [];
	$scope.translationNoTM = [];
	$scope.desktopMac = [];
	$scope.desktopPc = [];
	$scope.engineering = [];
	//private price
	$scope.desktopPrices=[];
	$scope.engineeringPrices=[]
	$scope.translationPrices=[];
	//papertask price
	$scope.softwarePrices =[];
	$scope.engineeringPPrices=[];
	
    $scope.order = {};
	$scope.laguageid = null;
    $scope.project = {
		
        types: [],
		files: []	
    };
    $scope.targets = {};
	
	function format2n(n) {
		return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	var projectId = PROJECT_ID;
    $scope.init = function(){
	
		var project_listener = ProjectApi.get(projectId, function($project){
            $project.priority = ProjectPriority.get($project.priority);
            //$project.serviceLevel = ProjectServiceLevel.get($project.serviceLevel);
            $project.status = ProjectStatus.get($project.status);
            $project.tasks = [];
			$scope.project = $project;
			$scope.USER_ID = $scope.project.userid;
			generateActiveResources();
			$scope.currency = $scope.project.currency;
			$scope.project.types = ProjectType.find($scope.project.types);
			console.log("scope.project");
			console.log($scope.project);
			console.log($scope.project.types);
			//console.log($scope.serviceLevel);

            jQuery.extend($scope.tempProject, $scope.project);
        });
		$q.all([project_listener])
            .then(function(){
				//get all file
				$http.get('/api/admin/file?projectId='+ projectId).success(function($data) {
						$scope.files = $data['files'];
						setModalControllerData('files', $scope.files);
						console.log("scope.files");
						console.log($scope.files);			
				});
				$http.get('/api/admin/projectitermnotm?projectId='+ projectId).success(function($data) {
					$scope.itermnotms = $data['Itermnotms'];
					// arrange itermnotms based language
					$scope.itermnotmsnews = arrangeItem($data['Itermnotms']);
					console.log("scope.itermnotms");
					console.log($scope.itermnotms);	
					
					console.log("scope.itermnotmsnews");
					console.log($scope.itermnotmsnews);			
				});
				$http.get('/api/admin/projectitermtm?projectId='+ projectId).success(function($data) {
					$scope.itemtms = arrangeItem($data['Itermtms']);
					//if($scope.itemtm)
					//	$scope.subtotal = $scope.subtotal + parseFloat($scope.itemtm.total);	
					console.log("scope.itemtms");
					console.log($scope.itemtms);	
					
				});
				
				$http.get('/api/admin/projectitermdtpmac?projectId='+ projectId).success(function($data) {
					$scope.itermdtpmacs = arrangeItem($data['Itermdtpmacs'], 'dtpUnits');
					console.log("scope.itermdtpmacs");
					console.log($scope.itermdtpmacs);		
				});
				
				$http.get('/api/admin/projectitermdtppc?projectId='+ projectId).success(function($data) {
					$scope.itermdtppcs = arrangeItem($data['Itermdtppcs'], 'dtpUnits');
					console.log("scope.itermdtppcs");
					console.log($scope.itermdtppcs);			
				});
				
				$http.get('/api/admin/projectitermengineering?projectId='+ projectId).success(function($data) {
					$scope.itermengineerings = arrangeItem($data['Itermengineerings'], 'engineeringUnits');
					console.log("scope.itermengineerings");
					console.log($scope.itermengineerings);			
				});
				
				$http.get('/api/admin/projectiterminterpreting?projectId='+ projectId).success(function($data) {
					$scope.iterminterpretings = arrangeItem($data['Iterminterpretings'], 'interpretingUnits');
					console.log("scope.iterminterpretings");
					console.log($scope.iterminterpretings);			
				});
				//get private price 	
				$http.get('/api/user/translationprice?userId='+ $scope.USER_ID).success(function($data) {
					$scope.translationPrices = $data['translationPrices'];
				});	
				$http.get('/api/user/desktopprice?userId='+$scope.USER_ID).success(function($data) {
					$scope.desktopPrices = $data['desktopPrices'];
					console.log("$scope.desktopPrices");
					console.log($scope.desktopPrices);
				});	
				$http.get('/api/user/engineeringprice?userId=' + $scope.USER_ID).success(function($data) {
					$scope.engineeringPrices = $data['engineeringPrices'];
					console.log("$scope.engineeringPrices");
					console.log($scope.engineeringPrices);
				});
				
				
			});	
		function generateActiveResources(){
			for(var i = 0; i < $scope.project.types.length; i++){
				$scope.type_active[$scope.project.types[i]] = 'active';
				
			}
			console.log($scope.type_active);
		}
		function arrangeItem(Itemr, unit) {
		$scope.itermtmnew = [];
			for(var i = 0; i < $scope.project.targetLanguages.length; i++)
			{
				$scope.itermtmnew[$scope.project.targetLanguages[i].id] = [];
				for(var j = 0; j < Itemr.length; j++){
					if(Itemr[j].language.id == $scope.project.targetLanguages[i].id){
						$scope.subtotal_tmp = $scope.subtotal_tmp + parseFloat(Itemr[j].total);
						var total = Number(Itemr[j].total);
						var rate = Number(Itemr[j].rate);
						var subtotal_tmp = Number($scope.subtotal_tmp);
						console.log(total);					
						Itemr[j].total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
						console.log(Itemr[j].total);
						Itemr[j].rate_tmp = Number(Itemr[j].rate);
						Itemr[j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
						//set unit
						Itemr[j].unit_tmp = Itemr[j].unit;
						Itemr[j].unit = [];
						Itemr[j].unit.id = Itemr[j].unit_tmp;
						if(unit == 'interpretingUnits'){
							if(Itemr[j].unit_tmp == 1) 
								Itemr[j].unit.name = 'Day';
							else Itemr[j].unit.name = 'Half Day';
						}	
						else if(unit == 'engineeringUnits'){
							if(Itemr[j].unit_tmp == 1) 
								Itemr[j].unit.name = 'Hour';
							else if(Itemr[j].unit_tmp == 2) 
								Itemr[j].unit.name = 'Day';
							else if(Itemr[j].unit_tmp == 3) 
								Itemr[j].unit.name = 'Month';
							else  if(Itemr[j].unit_tmp == 4) 
								Itemr[j].unit.name = 'Word';	
							else  if(Itemr[j].unit_tmp == 5) 
								Itemr[j].unit.name = 'Graphic';				
							else Itemr[j].unit.name = 'Page';
						}		
						else if(unit == 'dtpUnits'){
							if(Itemr[j].unit_tmp == 1) 
								Itemr[j].unit.name = 'Hour';
							else Itemr[j].unit.name = 'Page';
						}
						$scope.subtotal = $scope.currency + " " + subtotal_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
						var tax = Number((subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
						$scope.tax = $scope.currency + " " + tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
						
						var total = Number(subtotal_tmp - $scope.project.discount + (subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
						$scope.total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
						$scope.itermtmnew[$scope.project.targetLanguages[i].id].push(Itemr[j]);
					}	
				}
			}
			return $scope.itermtmnew;
		}
		$http.get("/api/papertask/currencyrate").success(function($data){
			$scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.CurrentcyRate = Number($scope.currencyrate_t.currencyRate);
        }).error(function($e){
            alert('error');
        });
		
        $http.get("/api/data/project/")
            .success(function($data){
				console.log($data);
                jQuery.extend(true, $scope, $data);  // copy data to scope
                var shareData = ['interpretingUnits', 'engineeringUnits', 'dtpUnits'];
                for(var i = 0; i < shareData.length; i++){
                    var key = shareData[i];
                    setModalControllerData(key, $scope[key]);
                }
				

                //$scope.project.targetLanguages = [];
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
            console.log('translationTM');
			console.log($data['translationTM']);
        }).error(function($e){
           alert('error');
        });
		
		$http.get("/api/papertask/translation").success(function($data){
            $scope.translation = $data['translation'];
            console.log($data['translation']);
        }).error(function($e){
            alert('error');
        });
		
		$http.get("/api/papertask/interpreting").success(function($data){
            $scope.interpretingPPrices = $data['interpreting'];
            console.log($scope.interpretingPPrices);
            console.log('Got list interpreting prices');
        }).error(function($e){
            alert('error');
        });
		
		$http.get("/api/papertask/engineering").success(function($data){
				$scope.engineeringPPrices = $data['engineering'];
				console.log('Got list engineering prices');
				console.log($scope.engineeringPPrices);
			}).error(function($e){
				alert('error');
		});
		$http.get("/api/papertask/desktop-publishing").success(function($data){
				$scope.softwarePrices = $data['softwarePrices'];
				console.log('Got list software prices');
				console.log($scope.softwarePrices);
				
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
	/**
     * Translation Prices
     */
   
	$scope.saveTranslationTM = function( itemtm ){
			$scope.iterm_tm =[];
			$scope.iterm_tm = itemtm;
			console.log("scope.iterm_tm");
			console.log($scope.iterm_tm);
			//$scope.itemtms[$scope.laguageid][0] = $scope.iterm_tm;
			//return;
			
			//$scope.iterm_notm.rate_tmp = $scope.iterm_notm.rate;
			itemtm.total_tmp = 	($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.ratebawu)/100)*$scope.iterm_tm.sourcebawu
								+ ($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.ratejiuwu)/100)*$scope.iterm_tm.sourcejiuwu
								+ ($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.ratenomatch)/100)*$scope.iterm_tm.sourcenomatch
								+ ($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.rateqiwu)/100)*$scope.iterm_tm.sourceqiwu
								+ ($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.raterepetitions)/100)*$scope.iterm_tm.sourcerepetitions
								+ ($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.ratewushi)/100)*$scope.iterm_tm.sourcewushi
								+ ($scope.iterm_tm.rate_tmp * Number($scope.iterm_tm.rateyibai)/100)*$scope.iterm_tm.sourceyibai;
			$scope.iterm_tm.total = itemtm.total_tmp;
			$scope.iterm_tm.total = $scope.currency + " " + Number($scope.iterm_tm.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			$scope.iterm_tm.rate = $scope.currency + " " + Number($scope.iterm_tm.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		if ( itemtm.id ) {
			$http.put("/api/admin/projectitermtm/" + itemtm.id, 
				{
    				languageid: $scope.laguageid,
					rate: itemtm.rate_tmp, 
					sourcebawu: itemtm.sourcebawu, 
					sourcejiuwu: itemtm.sourcejiuwu,
					sourcenomatch: itemtm.sourcenomatch,
					sourceqiwu: itemtm.sourceqiwu,
					sourcerepetitions: itemtm.sourcerepetitions,
					sourcewushi: itemtm.sourcewushi,
					sourceyibai: itemtm.sourceyibai,
					total: itemtm.total_tmp,
					name : itemtm.name,
					file : itemtm.file
				}).success(function( data ) {
					$scope.itemtms[$scope.laguageid][0] = $scope.iterm_tm;
    			});
				
    	} else {
			$http.post("/api/admin/projectitermtm?projectid="+projectId, 
					{
						languageid: $scope.laguageid,
						rate: itemtm.rate_tmp, 
						quantity: itemtm.quantity, 
						total: itemtm.total_tmp,
						name : itemtm.name,
						file : itemtm.file
						
					}).success(function( data ) {
						$scope.iterm_tm.id = data.iterm.id;
						$scope.itemtms[$scope.laguageid].push($scope.iterm_tm);
					});
    	}
    	jQuery("#modal-translation-TM").modal("hide");
    	setModalControllerData('itemtm', []);
    	$scope.editTm = -1;
    };
	$scope.editTranslationTM = function ( index, tid, laguageid ) {
    	$scope.editTm = index;
		$scope.laguageid = laguageid;
		
		$scope.itemtm = $scope.itemtms[laguageid][0];
		$scope.itemtm.rate_tmp = Number($scope.itemtms[laguageid][0].rate_tmp);
    	setModalControllerData('itemtm', $scope.itemtm);
    	jQuery("#modal-translation-TM").modal("show");
    }
	$scope.addTranslationNoTM = function(laguageid){
		setModalControllerData('itemtm',[]);
		$scope.editTranslation = -1;
		$scope.laguageid = laguageid;
		jQuery("#modal-translation-TM").modal("show");
	}
	/**
     * Translation Prices
     */
   
	$scope.saveTranslationNoTM = function( translationNoTM ){
			$scope.iterm_notm =[];
			$scope.iterm_notm = translationNoTM;
			//$scope.iterm_notm.rate_tmp = $scope.iterm_notm.rate;
			translationNoTM.total_tmp = $scope.iterm_notm.rate_tmp * $scope.iterm_notm.quantity;
			$scope.iterm_notm.total = translationNoTM.total_tmp;
			$scope.iterm_notm.total = $scope.currency + " " + Number($scope.iterm_notm.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			$scope.iterm_notm.rate = $scope.currency + " " + Number($scope.iterm_notm.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		if ( $scope.editTranslation == -1 ) {
			$http.post("/api/admin/projectitermnotm?projectid="+projectId, 
					{
						languageid: $scope.laguageid,
						rate: translationNoTM.rate_tmp, 
						quantity: translationNoTM.quantity, 
						total: translationNoTM.total_tmp,
						name : translationNoTM.name,
						file : translationNoTM.file
						
					}).success(function( data ) {
						$scope.iterm_notm.id = data.iterm.id;
						$scope.itermnotmsnews[$scope.laguageid].push($scope.iterm_notm);
					});
				
    	} else {
    		$http.put("/api/admin/projectitermnotm/" + translationNoTM.id, 
				{
    				languageid: $scope.laguageid,
					rate: translationNoTM.rate_tmp, 
					quantity: translationNoTM.quantity, 
					total: translationNoTM.total_tmp,
					name : translationNoTM.name,
					file : translationNoTM.file
				}).success(function( data ) {
					$scope.itermnotmsnews[$scope.laguageid][$scope.editTranslation] = $scope.iterm_notm;
    			});
    		
    	}
    	jQuery("#modal-translation-noTM").modal("hide");
    	setModalControllerData('translationNoTM', []);
    	$scope.editTranslation = -1;
    };
	$scope.editTranslationNoTMPrice = function ( index, tid, laguageid ) {
    	$scope.editTranslation = index;
		$scope.laguageid = laguageid;
		
		$scope.translationNoTM = $scope.itermnotmsnews[laguageid][index];
		$scope.translationNoTM.rate_tmp = Number($scope.itermnotmsnews[laguageid][index].rate_tmp);
    	setModalControllerData('translationNoTM', $scope.translationNoTM);
    	jQuery("#modal-translation-noTM").modal("show");
    }
	$scope.addTranslationNoTMPrice = function(laguageid){
		$scope.editTranslation = -1;
		$scope.laguageid = laguageid;
		$scope.translationNoTM = [];
		//get auto rate here
		if($scope.project.client.defaultServiceLevel == $scope.project.serviceLevel){
			console.log("scope.translationPrices");
			console.log($scope.translationPrices);
			console.log($scope.translation);
			for(i=0;i<$scope.translationPrices.length;i++){
				if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id &&  $scope.translationPrices[i].targetLanguage.id == laguageid){
					$scope.translationNoTM.rate_tmp = Number($scope.translationPrices[i].price);
					break;
				}
			}
			for(k=0;k<$scope.translation.length;k++){
				if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage && $scope.translation[k].targetLanguage == laguageid){
					if($scope.project.serviceLevel==1){
						$scope.translationNoTM.rate_tmp = Number($scope.translation[k].professionalPrice);
						break;
					}	
					else if($scope.project.serviceLevel==2){
						$scope.translationNoTM.rate_tmp = Number($scope.translation[k].businessPrice);
						break;
					}	
					else{
						$scope.translationNoTM.rate_tmp = Number($scope.translation[k].premiumPrice);
						break;
					}	
				}			
			}
		}
		else {
			for(k=0;k<$scope.translation.length;k++){
				if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage && $scope.translation[k].targetLanguage == laguageid){
					if($scope.project.serviceLevel==1){
						$scope.translationNoTM.rate_tmp = Number($scope.translation[k].professionalPrice);
						break;
					}	
					else if($scope.project.serviceLevel==2){
						$scope.translationNoTM.rate_tmp = Number($scope.translation[k].businessPrice);
						break;
					}	
					else{
						$scope.translationNoTM.rate_tmp = Number($scope.translation[k].premiumPrice);
						break;
					}	
				}			
			}
		}
		
		setModalControllerData('translationNoTM',$scope.translationNoTM);
		
		jQuery("#modal-translation-noTM").modal("show");
	}
	$scope.deleteTranslationNoTMPrice = function ( index, tid, laguageid  ) {    	
        bootbox.confirm( DELETE_CONFIRM_TEXT, function( bflag ) {
            if ( bflag == true ) {
                $http.delete("/api/admin/projectitermnotm/" + tid, {
                    tid: tid            
                }).success(function( data ) {                
					$scope.itermnotmsnews[laguageid].splice(index, 1);
                    
                });                
            }
        });       
    }
	/**
     * Desktop Price Mac
     */
    
    $scope.saveDesktopMac = function ( desktopMac ) {
		
		$scope.iterm_dtpmac =[];
		$scope.iterm_dtpmac = desktopMac;
		desktopMac.total_tmp = $scope.iterm_dtpmac.rate_tmp * $scope.iterm_dtpmac.quantity;
		$scope.iterm_dtpmac.total = desktopMac.total_tmp;
		$scope.iterm_dtpmac.total = $scope.currency + " " + Number($scope.iterm_dtpmac.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		$scope.iterm_dtpmac.rate = $scope.currency + " " + Number($scope.iterm_dtpmac.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    	if ( $scope.editDtpMac == -1) {
			$http.post("/api/admin/projectitermdtpmac?projectid="+projectId, 
					{
						languageid: $scope.laguageid,
						rate: desktopMac.rate_tmp, 
						unit : desktopMac.unit,
						quantity: desktopMac.quantity, 
						total: desktopMac.total_tmp,
						name : desktopMac.name,
						file : desktopMac.file,
						software : desktopMac.software,
						
					}).success(function( data ) {
						$scope.iterm_dtpmac.id = data.iterm.id;
						$scope.itermdtpmacs[$scope.laguageid].push($scope.iterm_dtpmac);
					});
		} else {
			$http.put("/api/admin/projectitermdtpmac/" + desktopMac.id, 
				{
    				languageid: $scope.laguageid,
					rate: desktopMac.rate_tmp, 
					quantity: desktopMac.quantity, 
					total: desktopMac.total_tmp,
					name : desktopMac.name,
					file : desktopMac.file,
					software : desktopMac.software,
				}).success(function( data ) {
					$scope.itermdtpmacs[$scope.laguageid][$scope.editDtpMac] = $scope.iterm_dtpmac;
    			});
    	}
    	
    	jQuery("#modal-dtp-mac").modal("hide");
    	setModalControllerData('desktopMac', []);
    	$scope.editDtpMac = -1;
    }
    $scope.editDesktopMac = function ( index, tid, laguageid ) {
    	$scope.editDtpMac = index;
		$scope.laguageid = laguageid;
		$scope.desktopMac = $scope.itermdtpmacs[laguageid][index];
		$scope.desktopMac.rate_tmp = Number($scope.itermdtpmacs[laguageid][index].rate_tmp);
		console.log("scope.desktopMac");
		console.log($scope.desktopMac);
		
    	setModalControllerData('desktopMac', $scope.desktopMac);
    	jQuery("#modal-dtp-mac").modal("show");
    }
	$scope.addDesktopMac = function(laguageid){
		setModalControllerData('desktopMac', []);
		$scope.editDtpMac = -1;
		$scope.laguageid = laguageid;
		jQuery("#modal-dtp-mac").modal("show");
	}
	
    $scope.deleteDesktopMac = function ( index, tid, laguageid ) {
        bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag == true ) {
                $http.delete("/api/admin/projectItermdtpmac/" + tid, {
                    tid: tid            
                }).success(function( data ) {                
					$scope.itermdtpmacs[laguageid].splice(index, 1);
                    
                });                
            }
        });
    	
    }
	/**
     * Desktop Price Pc
     */
    
    $scope.saveDesktopPc = function ( desktopPc ) {
		
		$scope.iterm_dtppc =[];
		$scope.iterm_dtppc = desktopPc;
		desktopPc.total_tmp = $scope.iterm_dtppc.rate_tmp * $scope.iterm_dtppc.quantity;
		$scope.iterm_dtppc.total = desktopPc.total_tmp;
		$scope.iterm_dtppc.total = $scope.currency + " " + Number($scope.iterm_dtppc.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		$scope.iterm_dtppc.rate = $scope.currency + " " + Number($scope.iterm_dtppc.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    	if ( $scope.editDtpPc == -1) {
			$http.post("/api/admin/projectitermdtppc?projectid="+projectId, 
					{
						languageid: $scope.laguageid,
						rate: desktopPc.rate_tmp, 
						unit : desktopPc.unit,
						quantity: desktopPc.quantity, 
						total: desktopPc.total_tmp,
						name : desktopPc.name,
						file : desktopPc.file,
						software : desktopPc.software,
						
					}).success(function( data ) {
						$scope.iterm_dtppc.id = data.iterm.id;
						$scope.itermdtppcs[$scope.laguageid].push($scope.iterm_dtppc);
					});
		} else {
			$http.put("/api/admin/projectitermdtppc/" + desktopPc.id, 
				{
    				languageid: $scope.laguageid,
					rate: desktopPc.rate_tmp, 
					quantity: desktopPc.quantity, 
					total: desktopPc.total_tmp,
					name : desktopPc.name,
					file : desktopPc.file,
					software : desktopPc.software,
				}).success(function( data ) {
					$scope.itermdtppcs[$scope.laguageid][$scope.editDtpPc] = $scope.iterm_dtppc;
    			});
    	}
    	
    	jQuery("#modal-dtp-pc").modal("hide");
    	setModalControllerData('desktopPc', []);
    	$scope.editDtpPc = -1;
    }
    $scope.editDesktopPc = function ( index, tid, laguageid ) {
    	$scope.editDtpPc = index;
		$scope.laguageid = laguageid;
		$scope.desktopPc = $scope.itermdtppcs[laguageid][index];
		$scope.desktopPc.rate_tmp = Number($scope.itermdtppcs[laguageid][index].rate_tmp);
		console.log("scope.desktopPc");
		console.log($scope.desktopPc);
		
    	setModalControllerData('desktopPc', $scope.desktopPc);
    	jQuery("#modal-dtp-pc").modal("show");
    }
	$scope.addDesktopPc = function(laguageid){
		setModalControllerData('desktopPc', []);
		$scope.editDtpPc = -1;
		$scope.laguageid = laguageid;
		jQuery("#modal-dtp-pc").modal("show");
	}
	
    $scope.deleteDesktopPc = function ( index, tid, laguageid ) {
        bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag == true ) {
                $http.delete("/api/admin/projectitermdtppc/" + tid, {
                    tid: tid            
                }).success(function( data ) {                
					$scope.itermdtppcs[laguageid].splice(index, 1);
                    
                });                
            }
        });
    	
    }
	/**
     * Engineering
     */
    
    $scope.saveEngineering = function ( engineering ) {
		
		$scope.iterm_engineering =[];
		$scope.iterm_engineering = engineering;
		engineering.total_tmp = $scope.iterm_engineering.rate_tmp * $scope.iterm_engineering.quantity;
		$scope.iterm_engineering.total = engineering.total_tmp;
		$scope.iterm_engineering.total = $scope.currency + " " + Number($scope.iterm_engineering.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		$scope.iterm_engineering.rate = $scope.currency + " " + Number($scope.iterm_engineering.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    	if ( $scope.editEngineering == -1) {
			$http.post("/api/admin/projectitermengineering?projectid="+projectId, 
					{
						languageid: $scope.laguageid,
						rate: engineering.rate_tmp, 
						unit : engineering.unit,
						quantity: engineering.quantity, 
						total: engineering.total_tmp,
						name : engineering.name,
						file : engineering.file,
						engineeringcategory : engineering.engineeringcategory,
						
					}).success(function( data ) {
						$scope.iterm_engineering.id = data.iterm.id;
						$scope.itermengineerings[$scope.laguageid].push($scope.iterm_engineering);
					});
		} else {
			$http.put("/api/admin/projectitermengineering/" + engineering.id, 
				{
    				languageid: $scope.laguageid,
					rate: engineering.rate_tmp, 
					quantity: engineering.quantity, 
					total: engineering.total_tmp,
					name : engineering.name,
					file : engineering.file,
					engineeringcategory : engineering.engineeringcategory,
				}).success(function( data ) {
					$scope.itermengineerings[$scope.laguageid][$scope.editEngineering] = $scope.iterm_engineering;
    			});
    	}
    	
    	jQuery("#modal-eng").modal("hide");
    	setModalControllerData('engineering', []);
    	$scope.editEngineering = -1;
    }
    $scope.editEng = function ( index, tid, laguageid ) {
    	$scope.editEngineering = index;
		$scope.laguageid = laguageid;
		$scope.engineering = $scope.itermengineerings[laguageid][index];
		$scope.engineering.rate_tmp = Number($scope.itermengineerings[laguageid][index].rate_tmp);
		console.log("scope.engineering");
		console.log($scope.engineering);
		
    	setModalControllerData('engineering', $scope.engineering);
    	jQuery("#modal-eng").modal("show");
    }
	$scope.addEngineering = function(laguageid){
		setModalControllerData('engineering', []);
		$scope.editEngineering = -1;
		$scope.laguageid = laguageid;
		jQuery("#modal-eng").modal("show");
	}
	
    $scope.deleteEngineering = function ( index, tid, laguageid ) {
        bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag == true ) {
                $http.delete("/api/admin/projectitermengineering/" + tid, {
                    tid: tid            
                }).success(function( data ) {                
					$scope.itermengineerings[laguageid].splice(index, 1);
                    
                });                
            }
        });
    	
    }
	/**
     * Interpreting price
     */
	$scope.saveInt = function( interpreting ){
			$scope.iterm_interpreting =[];
			$scope.iterm_interpreting = interpreting;
			interpreting.total_tmp = $scope.iterm_interpreting.rate_tmp * $scope.iterm_interpreting.quantity;
			$scope.iterm_interpreting.total = interpreting.total_tmp;
			$scope.iterm_interpreting.total = $scope.currency + " " + Number($scope.iterm_interpreting.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			$scope.iterm_interpreting.rate = $scope.currency + " " + Number($scope.iterm_interpreting.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		if ( $scope.editInterpreting == -1 ) {
			$http.post("/api/admin/projectiterminterpreting?projectid="+projectId, 
					{
						languageid: $scope.laguageid,
						rate: interpreting.rate_tmp, 
						quantity: interpreting.quantity, 
						total: interpreting.total_tmp,
						name : interpreting.name,
						file : interpreting.file
						
					}).success(function( data ) {
						$scope.iterm_interpreting.id = data.iterm.id;
						$scope.iterminterpretings[$scope.laguageid].push($scope.iterm_interpreting);
					});
				
    	} else {
    		$http.put("/api/admin/projectiterminterpreting/" + interpreting.id, 
				{
    				languageid: $scope.laguageid,
					rate: interpreting.rate_tmp, 
					quantity: interpreting.quantity, 
					total: interpreting.total_tmp,
					name : interpreting.name,
					file : interpreting.file
				}).success(function( data ) {
					$scope.iterminterpretings[$scope.laguageid][$scope.editInterpreting] = $scope.iterm_interpreting;
    			});
    		
    	}
    	jQuery("#modal-interpreting").modal("hide");
    	setModalControllerData('interpreting', []);
    	$scope.editInterpreting = -1;
    };
	$scope.editInt = function ( index, tid, laguageid ) {
    	$scope.editInterpreting = index;
		$scope.laguageid = laguageid;
		
		$scope.interpreting = $scope.iterminterpretings[laguageid][index];
		$scope.interpreting.rate_tmp = Number($scope.iterminterpretings[laguageid][index].rate_tmp);
    	setModalControllerData('interpreting', $scope.interpreting);
    	jQuery("#modal-interpreting").modal("show");
    }
	$scope.addInt = function(laguageid){
		setModalControllerData('interpreting',[]);
		$scope.editInterpreting = -1;
		$scope.laguageid = laguageid;
		jQuery("#modal-interpreting").modal("show");
	}
	$scope.deleteInt = function ( index, tid, laguageid  ) {    	
        bootbox.confirm( DELETE_CONFIRM_TEXT, function( bflag ) {
            if ( bflag == true ) {
                $http.delete("/api/admin/projectiterminterpreting/" + tid, {
                    tid: tid            
                }).success(function( data ) {                
					$scope.iterminterpretings[laguageid].splice(index, 1);
                    
                });                
            }
        });       
    }
	
	// save project
	$scope.saveProject = function(){
        var updateProject= $http.put("/api/admin/project/" + $scope.project.id + "?action=3", $scope.project)
		.success( function ( $data ) {
			//comback project detail/
			location.href = "/" + LANG_CODE + "/admin/project/detail?id=" + projectId;
			
		});	
    };
	//get translation
	
	// get rate dtp mac
	$scope.getRateDtpMac = function($item){
			if($item.software && $item.unit)
			{
				$scope.desktopMac = $item;
				console.log("start get dtp");
				console.log( $scope.desktopPrices );
				console.log($item);
				//get private
				if( $scope.desktopPrices)
				{
					console.log($scope.laguageid);
					for(i=0;i<$scope.desktopPrices.length;i++)
					{
						if($scope.laguageid == $scope.desktopPrices[i].language.id 
						&& $item.software.id == $scope.desktopPrices[i].software.id){
						
							if($item.unit.id == 1){
								$scope.desktopMac.name = $item.name;
								$scope.desktopMac.rate_tmp = Number($scope.desktopPrices[i].priceHourMac);
								setModalControllerData('desktopMac', $scope.desktopMac);
								return;
							}	
							else if ($item.unit.id == 2){	
								$scope.desktopMac.name = $item.name;
								setModalControllerData('desktopMac', $scope.desktopMac);
								return;
							}	
						}
					}
					console.log("lang_group");
					$lang_group = LangGroup.get($scope.laguageid);
					console.log($lang_group);
					console.log($scope.softwarePrices);
					for(j=0;j<$scope.softwarePrices.length;j++)
						{
							if($scope.softwarePrices[j].languageGroup.id == $lang_group.group_id && $item.software.id ==  $scope.softwarePrices[j].desktopSoftware.id){
								
								if($item.unit.id == 1){
									$scope.desktopMac.name = $item.name;
									$scope.desktopMac.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceApplePerHour):format2n(Number($scope.softwarePrices[j].priceApplePerHour)/$scope.CurrentcyRate);
									setModalControllerData('desktopMac', $scope.desktopMac);
									return;
								}
								else if ($item.unit.id == 2){
									$scope.desktopMac.name = $item.name;
									$scope.desktopMac.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceApplePerPage):format2n(Number($scope.softwarePrices[j].priceApplePerPage)/$scope.CurrentcyRate);
									setModalControllerData('desktopMac', $scope.desktopMac);
									return;
								}
							}
						}
						
				}
				else {//if not get paper task
						//get group language
						console.log("lang_group");
						$lang_group  =    LangGroup.get($scope.laguageid);
						for(j=0;j<$scope.softwarePrices.length;j++)
						{
							if($scope.softwarePrices[j].languageGroup.id == $lang_group.group_id && $item.software.id ==  $scope.softwarePrices[j].desktopSoftware.id){
								if($item.unit.id == 1){
									$scope.desktopMac.name = $item.name;
									$scope.desktopMac.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceApplePerHour):format2n(Number($scope.softwarePrices[j].priceApplePerHour)/$scope.CurrentcyRate);
									setModalControllerData('desktopMac', $scope.desktopMac);
									return;
								}
								else if ($item.unit.id == 2){	
									$scope.desktopMac.name = $item.name;
									$scope.desktopMac.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceApplePerPage):format2n(Number($scope.softwarePrices[j].priceApplePerPage)/$scope.CurrentcyRate);
									setModalControllerData('desktopMac', $scope.desktopMac);
									return;
								}
							}
						}
				}
			}
	}
	
	// get rate dtp pc
	$scope.getRateDtpPc = function($item){
			if($item.software && $item.unit)
			{
				console.log("start get dtp pc");
				console.log( $scope.desktopPrices );
				console.log($item);
				$scope.desktopPc = $item;
				//get private
				if( $scope.desktopPrices)
				{
					console.log($scope.laguageid);
					for(i=0;i<$scope.desktopPrices.length;i++)
					{
						if($scope.laguageid == $scope.desktopPrices[i].language.id 
						&& $item.software.id == $scope.desktopPrices[i].software.id){
						
							if($item.unit.id == 1){
								$scope.desktopPc.name = $item.name;
								$scope.desktopPc.rate_tmp = Number($scope.desktopPrices[i].priceHourPc);
								setModalControllerData('desktopPc', $scope.desktopPc);
								return;
							}	
							else if ($item.unit.id == 2){
								$scope.desktopPc.name = $item.name;	
								$scope.desktopPc.rate_tmp = Number($scope.desktopPrices[i].pricePc);
								setModalControllerData('desktopPc', $scope.desktopPc);
								return;
							}	
						}
					}
					console.log("lang_group");
					$lang_group = LangGroup.get($scope.laguageid);
					console.log($lang_group);
					console.log($scope.softwarePrices);
					for(j=0;j<$scope.softwarePrices.length;j++)
						{
							if($scope.softwarePrices[j].languageGroup.id == $lang_group.group_id && $item.software.id ==  $scope.softwarePrices[j].desktopSoftware.id){
								
								if($item.unit.id == 1){
									$scope.desktopPc.name = $item.name;
									$scope.desktopPc.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceWindowPerHour):format2n(Number($scope.softwarePrices[j].priceWindowPerHour)/$scope.CurrentcyRate);
									setModalControllerData('desktopPc', $scope.desktopPc);
									return;
								}
								else if ($item.unit.id == 2){	
									$scope.desktopPc.name = $item.name;
									$scope.desktopPc.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceWindowPerPage):format2n(Number($scope.softwarePrices[j].priceWindowPerPage)/$scope.CurrentcyRate);
									setModalControllerData('desktopPc', $scope.desktopPc);
									return;
								}
							}
						}
						
				}
				else {//if not get paper task
						//get group language
						console.log("lang_group");
						$lang_group  =    LangGroup.get($scope.laguageid);
						for(j=0;j<$scope.softwarePrices.length;j++)
						{
							if($scope.softwarePrices[j].languageGroup.id == $lang_group.group_id && $item.software.id ==  $scope.softwarePrices[j].desktopSoftware.id){
								
								if($item.unit.id == 1){
									$scope.desktopPc.name = $item.name;
									$scope.desktopPc.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceWindowPerHour):format2n(Number($scope.softwarePrices[j].priceWindowPerHour)/$scope.CurrentcyRate);
									setModalControllerData('desktopPc', $scope.desktopPc);
									return;
								}
								else if ($item.unit.id == 2){	
									$scope.desktopPc.name = $item.name;
									$scope.desktopPc.rate_tmp = ($scope.currency == 'cny')?Number($scope.softwarePrices[j].priceWindowPerPage):format2n(Number($scope.softwarePrices[j].priceWindowPerPage)/$scope.CurrentcyRate);
									setModalControllerData('desktopPc', $scope.desktopPc);
									return;
								}
							}
						}
				}
			}
	}
	// get auto end price
	$scope.getRateEng = function($item){
		console.log($item);
		
		if($item.engineeringcategory && $item.unit)
		{
			$scope.engineering = $item;
			//get private
			console.log("start get eng");
			console.log( $scope.engineeringPrices );
			console.log( $item.engineeringcategory );
			console.log( $item.unit );	
			if( $scope.engineeringPrices.length)
			{
				for(i=0;i<$scope.engineeringPrices.length;i++){
					if($item.engineeringcategory.id == $scope.engineeringPrices[i].engineeringcategory.id 
					&&  $item.unit.id == $scope.engineeringPrices[i].unit.id){
						
						$scope.engineering.rate_tmp =  Number($scope.engineeringPrices[i].price);
						setModalControllerData('engineering', $scope.engineering);
						return;
					}
				}	
				console.log("engineeringPPrices");
				console.log($scope.engineeringPPrices);
				console.log($item.engineeringcategory.id);
				console.log($item.unit.id);
				for(j=0;j<$scope.engineeringPPrices.length;j++)
					{
						console.log($scope.engineeringPPrices[j].engineeringCategory.id );
						console.log($scope.engineeringPPrices[j].unit.id);
						
						if($item.engineeringcategory.id == $scope.engineeringPPrices[j].engineeringCategory.id 
							&&  $item.unit.id == $scope.engineeringPPrices[j].unit.id){
								
							$scope.engineering.rate_tmp =  ($scope.currency == 'cny')?Number($scope.engineeringPPrices[j].price):format2n(Number($scope.engineeringPPrices[j].price)/$scope.CurrentcyRate);
							setModalControllerData('engineering', $scope.engineering);
							return;
						}
					}
				$scope.engineering.rate_tmp =  0;
				setModalControllerData('engineering', $scope.engineering);
				return;	
				//$item.rate = 0;

			}
			else{
				for(j=0;j<$scope.engineeringPPrices.length;j++)
				{
					if($item.category.id == $scope.engineeringPPrices[j].engineeringCategory.id 
					&&  $item.unit.id == $scope.engineeringPPrices[j].unit.id){
						$scope.engineering.rate_tmp =  ($scope.currency == 'cny')?Number($scope.engineeringPPrices[j].price):format2n(Number($scope.engineeringPPrices[j].price)/$scope.CurrentcyRate);
						setModalControllerData('engineering', $scope.engineering);
						return;
					}
				}
				$scope.engineering.rate_tmp = 0;
				setModalControllerData('engineering', $scope.engineering);
				return;	
			}
		}
	}
	
	$scope.getRateInt = function($item){
		console.log($item);
		console.log($scope.interpretingPrices);
		if($scope.interpretingPrices){
			if($item.unit.id == 1)
			{
				$item.rate =  Number($scope.interpretingPrices[$scope.laguageid].priceDay);
			}
			else if ($item.unit.id == 2){
				$item.rate =  Number($scope.interpretingPrices[$scope.laguageid].priceHalfDay);
			
			}
		}
	}
	
    $scope.projectType = function(){
        if($scope.project.types.length > 0){
            return "normal";
        }
        return "";
    };
	$scope.setserviceLevel= function(level){
		 $scope.project.serviceLevel = level;
		
	};
	
    
		if($scope.interpreting){
			$http.get('/api/user/interpretingprice?userId=' + USER_ID).success(function($data) {
				$scope.interpretingPrices = $data['interpretingPrices'];
				console.log("interpretingPrices");
				console.log($scope.interpretingPrices);
				console.log($scope.interpretingPPrices);
				console.log($scope.interpreting);
				$scope.interpretingPrices={};
				for(i=0;i<$scope.interpretingPrices.length;i++){
					for(j=0;j<$scope.project.targetLanguages.length;j++){
						if($scope.project.sourceLanguage.id == $scope.interpretingPrices[i].sourceLanguage.id 
						&& $scope.project.targetLanguages[j].id == $scope.interpretingPrices[i].targetLanguage.id  
						&& $scope.interpreting.name == $scope.interpretingPrices[i].service.name
						){
							$scope.interpretingPrices[$scope.project.targetLanguages[j].id] = [];
							$scope.interpretingPrices[$scope.project.targetLanguages[j].id].priceDay = $scope.interpretingPrices[i].priceDay;
							$scope.interpretingPrices[$scope.project.targetLanguages[j].id].priceHalfDay = $scope.interpretingPrices[i].priceHalfDay;
						}
						else {//get default papertask
							for(k=0;k<$scope.interpretingPPrices.length;k++){
							
								if($scope.project.sourceLanguage.id == $scope.interpretingPPrices[k].sourceLanguage.id 
								&& $scope.project.targetLanguages[j].id == $scope.interpretingPPrices[k].targetLanguage.id
								&& $scope.interpreting.name == $scope.interpretingPPrices[k].interpretingService.name
								){
								$scope.interpretingPrices[$scope.project.targetLanguages[j].id] = [];
								$scope.interpretingPrices[$scope.project.targetLanguages[j].id].priceDay = ($scope.currency == 'cny')?Number($scope.interpretingPPrices[k].pricePerDay):format2n(Number($scope.interpretingPPrices[k].pricePerDay)/$scope.CurrentcyRate);
								$scope.interpretingPrices[$scope.project.targetLanguages[j].id].priceHalfDay = ($scope.currency == 'cny')?Number($scope.interpretingPPrices[k].pricePerHalfDay):format2n(Number($scope.interpretingPPrices[k].pricePerHalfDay)/$scope.CurrentcyRate);
							
								}
								
								
							}
						}
					
					}
				
				}
				console.log("interpretingPrices");
				console.log($scope.interpretingPrices);
				
			});
			
			
		}
		
	
	$scope.active_class = function(a, b){
        return a == b ? 'active' : '';
    };

    $scope.setInterpreting = function($interpreting){
        jQuery(".project-types .active").removeClass("active");
        $scope.project.types = [$interpreting];
        $scope.interpreting = $interpreting;
		console.log("scope.interpreting");
		console.log($scope.interpreting);
		console.log($scope.project.types);
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
		console.log("scope.project.types");
		console.log($scope.project.types);
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
		console.log("$scope.project");
		console.log($scope.project);
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


});

