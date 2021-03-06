angularApp.controller('OrderTranslationController', function($scope, $http, $timeout, $q, $sce, CurrentUser,Currency,
		TableItemListService, ProjectServiceLevel, ProjectStatus, ProjectPriority,  ProjectType, CurrentcyRate, TransGraphs){
	$scope.files = [];
	$scope.USER_ID = null;
	$scope.employer = null;
	$scope.sourceLanguages = [];
	$scope.modifiedTarLangs = [];

	 $scope.project = {

		        //types: [],
				files: []
	};
	$scope.totalitems = $scope.project.files.length;

	$('select[name=sourceLanguage]').on('change', function(){
        $scope.modifiedTarLangs = [];
        $scope.project.targetLanguage = null;
        var that = $(this);
		console.log("that");
		console.log($scope.languages);
		$scope.modifiedTarLangs=[];
			$.each($scope.translation, function(){
					console.log(this);
					console.log(that.val());
				if(this.sourceLanguage == that.val()){
					$scope.modifiedTarLangs.push($scope.languages[this.targetLanguage - 1]);
				}
			});

    });
	$scope.chooseProjectServiceLevel = function(ProjectServiceLevel){
		 //$scope.project.serviceLevel = ProjectServiceLevel;

	 }
	 $scope.init = function(){

		 $http.get('/api/user/translationprice?userId='+ UserId).success(function($data) {
			 $scope.translationPrices = $data['translationPrices'];
			 console.log("$scope.translationPrices");
			 console.log($scope.translationPrices);

		 });
		 $http.get("/api/user/" + UserId + "/employer")
			 .success( function ( $data ) {
		 	 $scope.employer = {
			 defaultServiceLevel: $data.employer.defaultServiceLevel,}

			 console.log("$scope.employer.defaultServiceLevel");
			 console.log($scope.employer.defaultServiceLevel);
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
             });
             //$scope.modifiedTarLangs = $scope.languages;

			 $http.get("/api/papertask/translation").success(function($data){
				$scope.translation = $data['translation'];
				if($scope.translation.length>0){
				$.each($scope.translation, function(){
					if(arrayObjectIndexOf($scope.sourceLanguages,this.sourceLanguage)  == -1){
						$scope.sourceLanguages.push($scope.languages[this.sourceLanguage - 1]);
					}
				});
				}else{$scope.sourceLanguages=[];}
			 }).error(function($e){
				 alert('error');
			 });
         });
		function arrayObjectIndexOf(arr, id){
			for(var i = 0; i < arr.length; i++){
				if(arr[i].id == id){
					return i;
				}
			};
			return -1;
		}
		$http.get("/api/papertask/currencyrate").success(function($data){
			$scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.CurrentcyRate = Number($scope.currencyrate_t.currencyRate);
        }).error(function($e){
            alert('error');
        });
	 };

	 $scope.removeLangFSML  = function(lang){
		 /*$scope.modifiedTarLangs = [];
		 var lang = $scope.project.sourceLanguage;
		 var id = lang.id;
         for(var i = 0; i < $scope.languages.length; i++){
             if($scope.languages[i].id != id){
            	 $scope.modifiedTarLangs.push($scope.languages[i]);
             }
         }*/
	}

	 $scope.clearTargetLanguages = function(){
		 $scope.project.targetLanguages =[];
	 }

	 $scope.initStep2 = function(){
		 $scope.currency = CurrentUser.info.currency;
		 //$scope.project.currency =  $scope.currency;
		 $scope.ajaxEmployerInfo();
		 $scope.transGraphs = TransGraphs.all(LANG_CODE);
 	 	 $scope.project.transGraph = $scope.transGraphs[0];

		 //$scope.transGraphs = TransGraphs.all();
		 //$scope.project.transGraph = $scope.transGraphs[1];
		 $scope.isGraph = true;

		 if($scope.currency=="usd" || $scope.currency =="USD" ){
		  $scope.currency_tmp = Currency.get(1,LANG_CODE);
		 }
		 else{
		  $scope.currency_tmp = Currency.get(2,LANG_CODE);
		 }
		 $scope.CurrentCurrency = $scope.currency_tmp.name;
		 //$scope.CurrentCurrency = $scope.project.currency.name;
		 $scope.project.currency	= $scope.currency_tmp;
		 console.log("$scope.project.currency");
		 console.log($scope.project.currency);

	 }

	 $scope.changeTransGraphs = function(){
		 if($scope.project.transGraph.name == 'no')
			 $scope.isGraph = false;
		 else
			 $scope.isGraph = true;
	 }

	 $scope.init();


	 $scope.add_targetLanguage = function(){
		 if ($scope.project.targetLanguages.indexOf($scope.project.targetLanguage) == -1) {
			 $scope.project.targetLanguages.push($scope.project.targetLanguage);
	     }
	 }

	 $scope.removeTargetLang = function(lang){
		 var index = $scope.project.targetLanguages.indexOf(lang);
		  $scope.project.targetLanguages.splice(index, 1);

	 }

	 //$scope.ProjectServiceLevel = ProjectServiceLevel.all();
	 $scope.project.serviceLevel = ProjectServiceLevel.get(2,LANG_CODE);
	 $scope.ProjectServiceLevel = ProjectServiceLevel.all(LANG_CODE);

	 //$scope.USER_ID = $scope.project.client.id;
	 function format2n(n) {
		return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	 $scope.changePServicePrice = function(){
		if($scope.project.sourceLanguage != null){



			TableItemListService.translationPrices = new Array();
			TableItemListService.translationPrices_tmp={};
			var tempTrans = [];
			for(j=0; j<$scope.project.targetLanguages.length; j++){
					var isFind = false;
					var price = null;
					if($scope.employer.defaultServiceLevel == $scope.project.serviceLevel.id){ 
						for(i=0;i<$scope.translationPrices.length;i++){

							if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.project.targetLanguages[j].id == $scope.translationPrices[i].targetLanguage.id  ){

								TableItemListService.translationPrices_tmp[$scope.project.targetLanguages[j].id] = $scope.translationPrices[i].price;
								price = Number($scope.translationPrices[i].price);
								tempTrans.push({ 'langId' : $scope.project.targetLanguages[j].id , 'price' : Number($scope.translationPrices[i].price)});
								isFind = true;
								//break;
							}
						}
					}
						//get default papertask
						for(k=0;k<$scope.translation.length;k++){
							if(!TableItemListService.translationPrices_tmp[$scope.project.targetLanguages[j].id])
							{
							if($scope.project.sourceLanguage.id == $scope.translation[k].sourceLanguage && $scope.project.targetLanguages[j].id == $scope.translation[k].targetLanguage){
								if($scope.project.serviceLevel.id==1) {

									price = Number($scope.translation[k].professionalPrice);
									tempTrans.push({ 'langId' : $scope.project.targetLanguages[j].id , 'price' : Number($scope.translation[k].professionalPrice)});
								}
								else if($scope.project.serviceLevel.id==2) {
									price = Number($scope.translation[k].businessPrice);
									tempTrans.push({ 'langId' : $scope.project.targetLanguages[j].id , 'price' : Number($scope.translation[k].businessPrice)});
								}
								else {
									price = Number($scope.translation[k].premiumPrice);
									tempTrans.push({ 'langId' : $scope.project.targetLanguages[j].id , 'price' : Number($scope.translation[k].premiumPrice)});
								}
								isFind = true;
								if($scope.project.currency.id == 2){
									//price = price/$scope.currencyrate;
								 } else if ($scope.project.currency.id == 1) {
									price = price/$scope.currencyrate;
								 }
								break;
							}
							}
						}


					if(isFind == false){

						if($scope.project.serviceLevel != null )
							price = $scope.project.serviceLevel.price.USD;
						else
							price = 0;

						if($scope.project.currency.id == 2){
							price = $scope.currencyrate*price;
						 } else if ($scope.project.currency.id == 1) {
						 }

						tempTrans.push({ 'langId' : $scope.project.targetLanguages[j].id , 'price' : '1.10'});
					}
					$scope.project.targetLanguages[j].price = price;
				}
			TableItemListService.translationPrices = tempTrans;
		}
	 }


	 // Get EmployerInfo
	 $scope.ajaxEmployerInfo = function(){
		 $scope.USER_ID = CurrentUser.info.id;
		 var ajaxEmployerInfo = $http.get("/api/user/" + $scope.USER_ID + "/employer")
	     .success( function ( $data ) {
	    	 	$scope.employer = $data.employer;

	    	 	for(i=0;i<$scope.ProjectServiceLevel.length;i++){
	    	 		if($scope.ProjectServiceLevel[i].id ==  $scope.employer.defaultServiceLevel){
	    	 			$scope.project.serviceLevel = $scope.ProjectServiceLevel[i];
	    	 			break;
	    	 		}
	    	 	}

	    	 	$http.get("/api/user/" + $scope.USER_ID)
		   	     .success( function ( $data ) {
		   	    	 $scope.employer.translationPrices = $data.translationPrices;
		   	     });
	     });
	 }



	 $scope.orderTranslation = function(){
		 var isvalid = $("#form").valid();

		 $scope.project.client = CurrentUser.info;
		 $scope.project.status = ProjectStatus.get(2);
		 $scope.project.startDate = StrDate(new Date());
		 $scope.project.dueDate =  $scope.project.startDate;
		 //$scope.project.type =	ProjectType.get(2)
		 var $params = $scope.prepareData($scope.project);
		 $params.createType = 'orderTranslation';

		 if(isvalid){
		     $('#activate-step-3').remove();


			 $http.post("/api/admin/project/", $params)
	         .success(function($data){
	             if($data.success){
	                location.href = "/" + LANG_CODE + "/admin/project/detail/?id=" + $data.project.id;
	             } else {
	                location.href = "/" + LANG_CODE + "/admin/quote/detail/?id=" + $data.project.id;
	             }
	         })
	         .error(function($data){

	         });

		 } 	else {
				//alert('unvalid');
		 }
	 }

	 $scope.needaQuote = function(){
		 var isvalid = $("#form").valid();

		 $scope.project.client = CurrentUser.info;
		 $scope.project.status = ProjectStatus.get(0);
		 $scope.project.startDate = StrDate(new Date());
		 $scope.project.dueDate =  $scope.project.startDate;
		 var $params = $scope.prepareData($scope.project);
		 $params.createType = 'orderTranslation';
		 if(isvalid){
		     $('#activate-step-3').remove();


			 $http.post("/api/admin/project/", $params)
	         .success(function($data){
	             if($data.success){
	                location.href = "/" + LANG_CODE + "/admin/project/detail/?id=" + $data.project.id;
	             } else {
	                location.href = "/" + LANG_CODE + "/admin/quote/detail/?id=" + $data.project.id;
	             }
	         })
	         .error(function($data){

	         });


		 } 	else {
				//alert('unvalid');
		 }
	 }

	 $scope.prepareData = function(proj){
		 var data = $.extend(true, {}, proj);
		 var serviceLevel = data.serviceLevel.id;
		 data.serviceLevel = serviceLevel;

		 var transGraph = data.transGraph.id;
		 data.transGraph = transGraph;
		 return data;
	 }
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
				vars.item.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
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
            vartms.itemtm = $itemtm;
			if(modalId == "#modal-translation-TM")
			{
				//find rate
				vartms.itemtm.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
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
    	//console.log('fileItem'); console.log(fileItem);
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
        //console.info('onCompleteAll');
    };




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
