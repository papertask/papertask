angularApp.controller('OrderTranslationController', function($scope, $http, $timeout, $q, $sce, Currency, CurrentUser,
		TableItemListService, ProjectServiceLevel, TransGraphs,
		ProjectStatus, ProjectPriority, Fapiao,  ProjectType, CurrentcyRate){
	$scope.files = [];
	$scope.wordsperitem = 0;
	$scope.price = 0;
	$scope.totalwords = $scope.wordsperitem*$scope.totalitems;

	$scope.sourceLanguages = [];
	$scope.modifiedTarLangs = [];
	 $scope.project = {
		        //types: [],
				files: [],
				targetLanguages : []
	};
	 $scope.params = {
        sourceLanguage: null,
        targetLanguage: null,
    };
	 $scope.numberLangs = $scope.project.targetLanguages.length;
	 $scope.totalitems = $scope.project.files.length;
	 $scope.totalwords = $scope.wordsperitem*$scope.totalitems;
	 $scope.ItermsTotal = $scope.price*$scope.totalwords*$scope.numberLangs;
	 $scope.taxRate = 0;
	 $scope.tax = $scope.taxRate*$scope.ItermsTotal;
	 $scope.total = $scope.ItermsTotal + $scope.tax;


	 $('select[name=sourceLanguage]').on('change', function(){
        $scope.modifiedTarLangs = [];
        $scope.project.targetLanguage = null;
        var that = $(this);
		//console.log("that");
		//console.log(that);

        $.each($scope.translation, function(){
				console.log(this);
				console.log(that.val());
            if(this.sourceLanguage == that.val()){
                $scope.modifiedTarLangs.push($scope.languages[this.targetLanguage - 1]);
            }
        });
    });

	 $scope.init = function(){
		 $http.get("/api/data/project/")
         .success(function($data){
				//console.log($data);
             jQuery.extend(true, $scope, $data);  // copy data to scope
             var shareData = ['interpretingUnits', 'engineeringUnits', 'dtpUnits'];
             for(var i = 0; i < shareData.length; i++){
                 var key = shareData[i];
                 setModalControllerData(key, $scope[key]);
             }
             //console.log('scope');
             //console.log($scope);

             $scope.project.targetLanguages = [];
             $timeout(function(){
                 //jQuery("select.multiselect").multiselect("destroy").multiselect();
             });
             //$scope.modifiedTarLangs = $scope.languages;
			 $http.get("/api/papertask/translation").success(function($data){
	         $scope.translation = $data['translation'];

				$.each($scope.translation, function(){
					if(arrayObjectIndexOf($scope.sourceLanguages,this.sourceLanguage)  == -1){
						$scope.sourceLanguages.push($scope.languages[this.sourceLanguage - 1]);
					}
				});
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


		//Get currency
		$http.get("/api/papertask/currencyrate").success(function($data){
            $scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.currencyrate = Number($scope.currencyrate_t.currencyRate);
        }).error(function($e){
            alert('error');
        });
		//if(LANG_CODE=='en-US')
		//$scope.curency_default = 0;
		//else
		//$scope.curency_default = ;


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
		 $scope.ajaxEmployerInfo();
		 $('ul.setup-panel li:eq(1)').removeClass('disabled');
         $('ul.setup-panel li a[href="#step-2"]').trigger('click');

         // Default transGraphs => No
				$scope.transGraphs = TransGraphs.all(LANG_CODE);
		 		$scope.project.transGraph = $scope.transGraphs[0];


		 if($scope.project.transGraph.id == 0)
			 $scope.isGraph = false;
		 else
			 $scope.isGraph = true;

	 }

	 $scope.choosetransGraph = function(){
		 if($scope.project.transGraph.id == 0)
			 $scope.isGraph = false;
		 else
			 $scope.isGraph = true;
	 }

	 $scope.curentStep = 1;

	 if(LANG_CODE=="en-US"){
 	$scope.currency_tmp = Currency.get(1,LANG_CODE);
  }
  else{
 	$scope.currency_tmp = Currency.get(2,LANG_CODE);
  }
  $scope.CurrentCurrency = $scope.currency_tmp.name;
  $scope.project.serviceLevel = ProjectServiceLevel.get(2,LANG_CODE);
  $scope.ProjectServiceLevels = ProjectServiceLevel.all(LANG_CODE);
  $scope.currencys = Currency.all(LANG_CODE);

  // Default Currency => USA
  if(LANG_CODE=="en-US"){
 	$scope.project.currency = Currency.get(1,LANG_CODE);
  }
  else{
 	$scope.project.currency = Currency.get(2,LANG_CODE);
  }
  $scope.CurrentCurrency = $scope.project.currency.name;





	 //Fapiao
	 $scope.Fapiaos = Fapiao.all();
	 $scope.project.fapiao = Fapiao.get(0);

	 $scope.checkCurr = function(){

	 }

	 $scope.chooseCurrency = function(){
		 //$scope.project.currency = currency;
		 if($scope.project.currency.name == "CNY"){
			 $scope.changeRate = $scope.currencyrate;
		 } else if ($scope.project.currency.name == "USD") {
			 $scope.changeRate = 1/$scope.currencyrate;
		 }

		 if($scope.project.currency.id == 1){
			 $scope.changeRate = $scope.currencyrate;
		 } else if($scope.project.currency.id == 2) {
			 $scope.changeRate = 1/$scope.currencyrate;
		 }
		 $scope.CurrentCurrency =  Currency.get($scope.project.currency.id,LANG_CODE).name;
 		$scope.changePrice($scope.changeRate);
		 //console.info(' $scope.project.currency', $scope.project.currency);
	 }

	 $scope.changePrice = function(Rate){
		 for(i=0; i<$scope.project.targetLanguages.length; i++){
			 $scope.project.targetLanguages[i].price =  $scope.project.targetLanguages[i].price*Rate;
		 }
	 }

	 $scope.chooseProjectServiceLevel = function(){
		 //$scope.project.serviceLevel = ProjectServiceLevel;
		 console.info('$scope.project.serviceLevel', $scope.project.serviceLevel);
	 }
	 $scope.chooseFapiao = function(Fapiao){
		 $scope.project.fapiao = Fapiao;
		 if( $scope.project.fapiao.name == 'yes'){
			 $scope.taxRate = 0;
			 $scope.isFapiao = true;
		 }
		 else {
			 $scope.taxRate = 0;
			 $scope.isFapiao = false;

		 }
		 $scope.refreshwithoutWordCount();

	 }



	 $scope.changeCurStep = function (nextStep){
		 $scope.curentStep = nextStep;
	 }

	 $scope.checkValidStep2 = function(){
		 //$( "#formStep2" ).valid()
		 if($( "#formStep2" ).valid()){
			 $('ul.setup-panel li:eq(2)').removeClass('disabled');
             $('ul.setup-panel li a[href="#step-3"]').trigger('click');
            //$("#activate-step-3").remove();
         } else{
             return false;
         }
	 }

	 $scope.PayAndStartTrans = function(){
		 if($( "#formStep3" ).valid()){
			 $scope.project.client = CurrentUser.info;
			 $scope.project.status = ProjectStatus.get(2);
			 $scope.project.startDate = StrDate(new Date());
			 $scope.project.dueDate =  $scope.project.startDate;
			 var $params = $scope.prepareData($scope.project);
			 $params['createType'] = 'orderTranslationNonContract';

			 console.log($scope.project);
			 console.log($params);
			 //return false;

			 $http.post("/api/admin/project/", $params)
	         .success(function($data){
	        	 //$('#PayAndStartTrans').remove();
	             if($data.success){
	                 location.href = "/" + LANG_CODE + "/admin/project/detail/?id=" + $data.project.id;
	             } else {
	                 location.href = "/" + LANG_CODE + "/admin/quote/detail/?id=" + $data.project.id;
	             }
	         })
	         .error(function($data){

	         });

			 return false;
         } else{
             return false;
         }
	 }

	 $scope.RequestQuote = function(){
		 if($( "#formStep3" ).valid()){

			 $scope.project.client = CurrentUser.info;
			 $scope.project.status = ProjectStatus.get(1);
			 $scope.project.startDate = StrDate(new Date());
			 $scope.project.dueDate =  $scope.project.startDate;
			 var $params = $scope.prepareData($scope.project);
			 $params['createType'] = 'orderTranslationNonContract';



			 $http.post("/api/admin/project/", $params)
	         .success(function($data){
	        	 //$('#RequestQuote').remove();
	             if($data.success){
	                location.href = "/" + LANG_CODE + "/admin/project/detail/?id=" + $data.project.id;
	             } else {
	                 location.href = "/" + LANG_CODE + "/admin/quote/detail/?id=" + $data.project.id;
	             }
	         })

	         .error(function($data){

	         });

         } else{
             return false;
         }
	 }


	 $scope.prepareData = function(proj){
		 var data = $.extend(true, {}, proj);
		 data.serviceLevel = data.serviceLevel.id;
		 data.transGraph = data.transGraph.id;
		 data.currency = $scope.CurrentCurrency;
		 data.totalwords = $scope.totalwords;
		 data.price = [];
		 data.targetLanguages.forEach(function(lang) {
			data.price[lang.id] = lang.price;
		 });
		 data.invoiceinfo = {
				 'subtotal' : $scope.ItermsTotal,
				 'tax': $scope.tax,
				 'discount' : 0,
				 'total': $scope.total,
		 }

		 return data;
	 }



	 $scope.init();

	 $scope.add_targetLanguage = function(){
		 $scope.hidetargetLang = true;

		 if ($scope.project.targetLanguages.indexOf($scope.project.targetLanguage) == -1) {
			 $scope.project.targetLanguages.push($scope.project.targetLanguage);
	     }


		 $scope.refreshwithoutWordCount();


	 }

	 $scope.removeTargetLang = function(lang){
		 var index = $scope.project.targetLanguages.indexOf(lang);
		  $scope.project.targetLanguages.splice(index, 1);
		  //console.log($scope.project);
		  if($scope.project.targetLanguages.length == 0){

			  $scope.hidetargetLang = false;
			  $scope.project.targetLanguage= "";
		  }
		  $scope.refreshwithoutWordCount();
	 }



	 //$scope.project.client = CurrentUser.info;

	 // Get EmployerInfo
	 $scope.ajaxEmployerInfo = function(){
		 $scope.USER_ID = CurrentUser.info.id;
		 var ajaxEmployerInfo = $http.get("/api/user/" + $scope.USER_ID + "/employer")
	     .success( function ( $data ) {
	    	 	$scope.employer = $data.employer;

	    	 	/*
	    	 	for(i=0;i<$scope.ProjectServiceLevel.length;i++){
	    	 		if($scope.ProjectServiceLevel[i].id ==  $scope.employer.defaultServiceLevel){
	    	 			$scope.project.serviceLevel = $scope.ProjectServiceLevel[i];
	    	 			break;
	    	 		}
	    	 	}
	    	 	*/

	    	 	$http.get("/api/user/" + $scope.USER_ID)
		   	     .success( function ( $data ) {
		   	    	 $scope.employer.translationPrices = $data.translationPrices;
		   	     });
	     });
	 }

	 $scope.wordcount = function(fileId){
		 var words = $http.get("/" + LANG_CODE + "/admin/project/wordcount?fileId="+fileId)
         .success( function ( $data ) {
        	 $scope.totalwordFiles = $scope.totalwordFiles + $data.datawordcount.wordcount;
        	 $scope.refreshwithoutWordCount();
         }).error(function($e){
             return 0;
         });
	 }

	 $('#sourcetext').keyup(function(){


		 $scope.$apply($scope.refreshwithoutWordCount());

	});



	 $scope.refreshInfo = function(){

		 $scope.totalitems = $scope.project.files.length;
		 $scope.totalwordFiles = 0;
		 for(var key=0; key<$scope.totalitems; key++){
			 $scope.totalwordFiles = $scope.totalwordFiles + $scope.project.files[key].count;
		 }


		/*var str = $('#sourcetext').val();
		str = str.trim();
		 var words = str.split(' ');
		 var wordsArr = new Array();
			for(var i =0; i< words.length ; i++){
				if(words[i] != '')
					wordsArr.push( words[i]);
			}
			words = wordsArr;

		 if(words[(words.length-1)]==''){
			 words.pop();
		 }

		 if($scope.totalwordFiles){
			 if(words.length == 1 && words[0] == '')
				 $scope.totalwords =  $scope.totalwordFiles;
			 else
				 $scope.totalwords = words.length +  $scope.totalwordFiles;
		 } else {

			 if(words.length == 1 && words[0] == '')
				 $scope.totalwords =  0;
			 else
				 $scope.totalwords = words.length;
		 }*/
		if($scope.totalwordFiles){
			$scope.totalwords = $scope.totalwordFiles;
		} else {
			$scope.totalwords =  0;
		}	

		 $scope.refreshwithoutWordCount();
	 }

	 $scope.refreshwithoutWordCount = function(){
		 /*var str = $('#sourcetext').val();
		 if(!str) return false;
		str = str.trim();
		var words = str.split(' ');
		var wordsArr = new Array();
		for(var i =0; i< words.length ; i++){
			if(words[i] != '')
				wordsArr.push( words[i]);
		}
		words = wordsArr;

		 if(words[(words.length-1)]==''){
			 words.pop();
		 }

		 if($scope.totalwordFiles){
			 if(words.length == 1 && words[0] == ''){

				 $scope.totalwords =  $scope.totalwordFiles;
			 }

			 else{

				 $scope.totalwords = words.length +  $scope.totalwordFiles;
			 }

		 } else {
			 if(words.length == 1 && words[0] == '')
				 $scope.totalwords =  0;
			 else
				 $scope.totalwords = words.length;
		 }*/

		if($scope.totalwordFiles){
			$scope.totalwords = $scope.totalwordFiles;
		} else {
			$scope.totalwords =  0;
		}	
		 $scope.numberLangs = $scope.project.targetLanguages.length;
		 //$scope.price = ($scope.numberLangs > 0)? $scope.project.targetLanguages[0].price : 0 ;

		 if($scope.numberLangs > 0) {
			 if($scope.project.targetLanguages[0].price == 0){
				 if($scope.project.currency.id==1)
					 $scope.project.targetLanguages[0].price = 0.25;
				 else if ($scope.project.currency.id==2)
					 $scope.project.targetLanguages[0].price = 0.25*$scope.currencyrate;
			 }
			 $scope.price = $scope.project.targetLanguages[0].price;

		 } else {
			 $scope.price = 0;
		 }

		 $scope.ItermsTotal = $scope.price*$scope.totalwords*$scope.numberLangs;
		 $scope.tax = $scope.taxRate*$scope.ItermsTotal;
		 $scope.total = $scope.ItermsTotal + $scope.tax;
		 $scope.hours = $scope.totalwords * 24/3000;
		 return false;
	 }

	 $scope.changePServicePrice = function(){
			if($scope.project.sourceLanguage != null){

				TableItemListService.translationPrices = new Array();
				var tempTrans = [];
				for(j=0; j<$scope.project.targetLanguages.length; j++){
					var isFind = false;
					var price = null;

						//get default papertask
						for(k=0;k<$scope.translation.length;k++){
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
								if($scope.project.currency.name == "CNY"){
									//price = price/$scope.currencyrate;
								 } else if ($scope.project.currency.name == "USD") {
									price = price/$scope.currencyrate;
								 }
								 break;
							}
						}


					if(isFind == false){

						if($scope.project.serviceLevel != null )
							price = $scope.project.serviceLevel.price.USD;
						else
							price = 0;

						if($scope.project.currency.name == "CNY"){
							price = $scope.currencyrate*price;
						 } else if ($scope.project.currency.name == "USD") {
						 }

						tempTrans.push({ 'langId' : $scope.project.targetLanguages[j].id , 'price' : '1.10'});
					}
					$scope.project.targetLanguages[j].price = price;
				}
				TableItemListService.translationPrices = tempTrans;
			}
			$scope.refreshwithoutWordCount();
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

angularApp.controller('AppController', ['$scope', 'FileUploader', '$timeout', '$http', function($scope, FileUploader, $timeout, $http) {
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

        $http.get("/" + LANG_CODE + "/admin/project/wordcount?fileId="+response.file.id)
        .success( function ( $data ) {

        	fileItem.projectFile = {
                    name: fileItem.file.name,
                    id: response.file.id,
                    count: $data.datawordcount.wordcount
            };
             $scope.project.files.push(fileItem.projectFile);
	       	 $scope.refreshInfo();
        }).error(function($e){
        fileItem.projectFile = {
            name: fileItem.file.name,
                    id: response.file.id,
                    count: 0
        };
        $scope.project.files.push(fileItem.projectFile);
	       	 $scope.refreshInfo();
        });

    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
       // console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploader.onCompleteAll = function(fileItem, response, status, headers) {
        //console.info('onCompleteAll');

    };

    ///console.info('uploader', uploader);


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
                    $scope.refreshInfo();
                    break;
                }
            }
        };
        item.remove();
    };
}]);
