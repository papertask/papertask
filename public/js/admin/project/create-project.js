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

angularApp.controller('CreateProjectController', function($scope, $http, $timeout, $q, $sce, CurrentUser,
                                                          TableItemListService, ProjectType){
    $scope.ProjectType = ProjectType;

    $scope.files = [];
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

    $scope.init = function(){
        $http.get("/api/data/project/")
            .success(function($data){
				console.log($data);
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
			
        setModalControllerData('project', $scope.project);
    };

    $scope.projectType = function(){
        if($scope.project.types.length > 0){
            return "normal";
        }
        return "";
    };

    $scope.change_client = function(client){
       console.log(client);
	   //get translation no tm
	    var USER_ID = client.id;
	    var ajaxEmployerInfo = $http.get("/api/user/" + USER_ID + "/employer")
        .success( function ( $data ) {
			$scope.employer = {
				defaultServiceLevel: $data.employer.defaultServiceLevel,
			};
			$scope.project.serviceLevel=$scope.employer.defaultServiceLevel;
		if($scope.hasTypeTranslationNoTM)
	    {
			$http.get('/api/user/translationprice?userId='+ USER_ID).success(function($data) {
				$scope.translationPrices = $data['translationPrices'];
			//find 
			console.log($scope.translationPrices);
			console.log($scope.project.sourceLanguage);
			console.log($scope.project.targetLanguages);
			TableItemListService.translationPrices={};
			
			for(i=0;i<$scope.translationPrices.length;i++){
				for(j=0;j<$scope.project.targetLanguages.length;j++){
					console.log($scope.translationPrices[i].sourceLanguage.id );
					
					console.log($scope.translationPrices[i].targetLanguage.id );
					
					console.log($scope.project.targetLanguages[j].id);
				
					if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){
						
						TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
					}
					else {
					//get default papertask
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
				
				
			}
				//TableItemListService.translationPrices = $scope.translationPrices;
				console.log(TableItemListService.translationPrices);
			});
		}
		if($scope.hasTypeTranslationUseTM){
				
			$http.get("/api/user/" + USER_ID + "")
				.success ( function ( $data ) {
				   TableItemListService.tmRatios =  $data.tmRatios;
				    console.log("tmRatios");
				   console.log($data.tmRatios);
				   console.log($scope.translationTM);
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
				   console.log(TableItemListService.tmRatios);
			})
			if(!$scope.hasTypeTranslationNoTM){
				$http.get('/api/user/translationprice?userId='+ USER_ID).success(function($data) {
					$scope.translationPrices = $data['translationPrices'];
					//find 
					console.log($scope.translationPrices);
					console.log($scope.project.sourceLanguage);
					console.log($scope.project.targetLanguages);
					TableItemListService.translationPrices={};
					for(i=0;i<$scope.translationPrices.length;i++){
						for(j=0;j<$scope.project.targetLanguages.length;j++){
							console.log($scope.translationPrices[i].sourceLanguage.id );
							
							console.log($scope.translationPrices[i].targetLanguage.id );
							
							console.log($scope.project.targetLanguages[j].id);
						
							if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){
								
								TableItemListService.translationPrices[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
							}
							else {
							//get default papertask
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
						
						
					}
						//TableItemListService.translationPrices = $scope.translationPrices;
						console.log(TableItemListService.translationPrices);
				});
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
		console.log($scope.project.data);
		
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
        console.log($scope.project);
        console.log($scope.order);
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
			console.log("check");
			console.log(modalId);
			console.log($scope);
            vars.item = $item;
			if(modalId == "#modal-translation-noTM")
			{
				//find rate
				vars.item.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
				console.log($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
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
			console.log("check");
			console.log(modalId);
			console.log($scope);
            vartms.itemtm = $itemtm;
			if(modalId == "#modal-translation-TM")
			{
				//find rate
				vartms.itemtm.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
				
				console.log($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
			}
            itemCloned = {};
            jQuery.extend(true, itemCloned, $itemtm);
            $(modalId).modal("show");
        },
        vars: vars,
		vartms: vartms
    }
});

angularApp.controller('TableItemController', function($scope, CurrentUser, TableItemListService){
    $scope.CurrentUser = CurrentUser;
    $scope.TableItemListService = TableItemListService;
    $scope.identifier = {};
	$scope.itemtm = [];
	//$scope.itemtm.rate =  TableItemListService.tmRatios.repetitions;
	
	
    $scope.items = [];
    $scope.$modalId = "";
    TableItemListService.addScope($scope);
	
	$scope.setRateTm = function(){
        if(TableItemListService.tmRatios){
			console.log(TableItemListService.tmRatios);
			$scope.raterepetitions =  (TableItemListService.tmRatios.repetitions)?TableItemListService.tmRatios.repetitions:0;
			$scope.rateyibai =  (TableItemListService.tmRatios.yibai)?TableItemListService.tmRatios.yibai:0;
			$scope.ratejiuwu =  (TableItemListService.tmRatios.jiuwu)?TableItemListService.tmRatios.jiuwu:0;
			$scope.ratebawu =  (TableItemListService.tmRatios.bawu)?TableItemListService.tmRatios.bawu:0;
			$scope.rateqiwu =  (TableItemListService.tmRatios.qiwu)?TableItemListService.tmRatios.qiwu:0;
			$scope.ratewushi =  (TableItemListService.tmRatios.wushi)?TableItemListService.tmRatios.wushi:0;
			$scope.ratenomatch =  (TableItemListService.tmRatios.nomatch)?TableItemListService.tmRatios.nomatch:0;
		}
    };
    $scope.setIdentifier = function($identifier){
        $scope.identifier = $identifier;
		if(TableItemListService.translationPrices)
		$scope.itemtm.rate = Number(TableItemListService.translationPrices[$scope.identifier[1].id]);
    };
    $scope.add = function($item){
        $scope.items.push($item);
    };
	$scope.addtm = function($itemtm){
        //	$scope.itemtm.push($itemtm);
		$scope.itemtm = $itemtm;
		console.log("item_tm");
		console.log($scope.itemtm);
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
        return {
            items: $scope.items,
            identifier: $scope.identifier,
			itemtm: $scope.itemtm
            
        };
    }
});

angularApp.controller('TableModalController', function($scope, TableItemListService){
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
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.upload();
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
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
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);


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