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
            angular.element('#EditProfileFreelancerController').scope().submit();
        }
    });
});


angularApp.controller('EditProfileFreelancerController', function($scope, $http, $timeout, $q){

	$scope.pagetype = 'edit';
    $scope.countries = [];
    $scope.languages = [];
    $scope.resources = [];
	$scope.resource_active = {};
    $scope.softwares = [];
    $scope.companies = [];
	
    $scope.userInfo = {};
	
	$scope.translationPrices = [];
	$scope.desktopPrices = [];
	$scope.interpretingPrices = [];
	
	$scope.editTranslation = -1;
    $scope.editDtp = -1;
    $scope.editInterpreting = -1;
    $scope.editEngineering = -1;
	
    $scope.resume = {
        'user_id': USER_ID
    };

    function getBankInfo(){
        $http.get('/api/user/' + USER_ID + '/bank-info').success(function($data){
            if($data['bankInfo']){
                $scope.bankInfo = $data['bankInfo'];
                console.log($scope.bankInfo);
            }
        });
    }

    function getCountriesList(){
        $http.get('/api/common/country').success(function($data){
            $scope.countries = $data['countries'];
            console.log($scope.countries)
        });
    }
	
	
    // get user
    function getUser(){
        $http.get('/api/user/' + USER_ID).success(function($data){
            $scope.userInfo = $data['user'];
            console.log($scope.userInfo);
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
        		$("#editFrelancerController").fadeIn();
        });
    }

    function getFreelancerResume(){
        $http.get('/api/user/' + USER_ID + '/resume').success(function($data){
            if($data['resume']){
                $scope.resume = $data['resume'];
                console.log($scope.resume);
            }
        });
    }
	
	function getFreelancerData(){
        $http.get('/api/user/freelancer-data').success(function($data){
            $scope.freelancerData = $data;
            console.log($scope.freelancerData);
            // get resource group
            $.each($scope.freelancerData.resources, function(){
                var that = this;
                $.each(this.resources, function(){
                    if($scope.freelancer.Resources.indexOf(this.id) >= 0){
                        $scope.resourcesType[that.group.name] = 1;
                    }
                });
            });
            // get translation specialism
            $scope.TranslationSpecialisms = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.TranslationSpecialisms);
            // get desktop translation cat tools
            $scope.TranslationCatTools = findOptions($scope.freelancerData.catTools,
                $scope.freelancer.TranslationCatTools);
            // get operating systems
            $scope.operatingSystems = findOptions($scope.freelancerData.operatingSystems,
                $scope.freelancer.DesktopOperatingSystems);
            // get desktop cat tools
            $scope.DesktopCatTools = findOptions($scope.freelancerData.catTools,
                $scope.freelancer.DesktopCatTools);
            // get interpreting specialism
            $scope.InterpretingSpecialisms = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.InterpretingSpecialisms);
			// get rating
            $scope.Ratings = findOptions($scope.freelancerData.ratings,
                $scope.freelancer.Ratings);	

            console.log($scope.InterpretingSpecialisms);
        });
    }
	/**
     * Submit the form
     */
    $scope.submit = function(){
    	$scope.freelancer.comments = $('.summernote').code();

    	/*if ( $scope.userInfo.tmRatios && $scope.userInfo.tmRatios.id ) {
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
    	}*/
    	
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
	$scope.editTranslationPrice = function ( index, tid ) {
    	$scope.editTranslation = index;
    	setModalControllerData('translationPrice', $scope.translationPrices[index]);
    	jQuery("#modal-translation").modal("show");
    }
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
		console.log($scope.desktopPrices[ind]);
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
     * Mark resource active params
     */
    function initModal(){
        setModalControllerData('languages', $scope.languages);
        setModalControllerData('services', $scope.services);
        setModalControllerData('softwares', $scope.softwares);
        setModalControllerData('engineeringCategories', $scope.engineeringCategories);       
    }
    function init(){
		var priceDataRequest = $http.get("/api/user/priceData")
            .success(function($data){
                $scope.languages = $data['languages'];
                $scope.services = $data['services'];
                $scope.softwares = $data['softwares'];
                $scope.engineeringCategories = $data['engcategory'];
                
                initModal();
            });
        // submit
        $scope.editProfile = function(){
            $('form[name=editProfileForm]').validate();
            var validate = $('form[name=editProfileForm]').valid();
            if(validate == true){
                // update user info
                $http.put('/api/user/'+USER_ID+'', $scope.userInfo).success(function($data){
                    console.log('Updated user', $data);
                });

                // update resume
                if($scope.resume.user_id){
                    // create
                    $http.post('/api/user/'+USER_ID+'/resume', $scope.resume).success(function($data){
                        console.log("Created resume");
                    });
                }else{
                    // Update
                    $http.put('/api/user/'+USER_ID+'/resume', $scope.resume).success(function($data){
                        console.log("Updated resume");
                    });
                }
                getFreelancerResume();
                console.log('Resume', $scope.resume);
            }
        }
        getUser();
		loadFreelancerData();
		$http.get('/api/user/translationprice?userId='+ USER_ID).success(function($data) {
            $scope.translationPrices = $data['translationPrices'];
        });
		$http.get('/api/user/desktopprice?userId='+USER_ID).success(function($data) {
            $scope.desktopPrices = $data['desktopPrices'];
        });
		$http.get('/api/user/interpretingprice?userId=' + USER_ID).success(function($data) {
            $scope.interpretingPrices = $data['interpretingPrices'];
        });
        //getFreelancerResume();
        //getCountriesList();
		//getFreelancerData();
    }
	function loadFreelancerData(){

        $http.get("/api/user/" + USER_ID + "/freelancer")
            .success(function($data){
                $scope.freelancer = $data['freelancer'];
				console.log($scope.freelancer);
			
                generateActiveResources();

                var priceDataRequest = $http.get("/api/user/freelancerData")
                    .success(function($data){
                        /** map data **/
                        $scope.catTools = $data['catTools'];
                        $scope.operatingSystems = $data['operatingSystems'];
                        $scope.specialisms = $data['specialisms'];
                        $scope.resources = $data['resources'];
						console.log($scope.resources);
                        rebuildMultiSelect();
                        updateFreelancerSkillData();
                    });
            });
    }
	/**
     * Mark resource active params
     */
    function generateActiveResources(){
		console.log($scope.freelancer.Resources );
        $scope.freelancer.Resources = $scope.freelancer.Resources;
        for(var i = 0; i < $scope.freelancer.Resources.length; i++){
            $scope.resource_active[$scope.freelancer.Resources[i]] = 'active';
        }
    }
	function rebuildMultiSelect(){
        $timeout(function(){
            $(".multiselect").multiselect("destroy");
        }).then(function(){
            $(".multiselect").multiselect();
        });
    }
	function updateFreelancerSkillData(){
        var $info = $scope.freelancer;
        $info.TranslationCatTools = findOptions($scope.catTools, $info.TranslationCatTools);
        $info.TranslationSpecialisms = findOptions($scope.specialisms, $info.TranslationSpecialisms);
        $info.DesktopCatTools = findOptions($scope.catTools, $info.DesktopCatTools);
        $info.Resources = findResources($scope.resources, $info.Resources);
		
        $info.DesktopOperatingSystems = findOptions($scope.operatingSystems, $info.DesktopOperatingSystems);
        $info.InterpretingSpecialisms = findOptions($scope.specialisms, $info.InterpretingSpecialisms);
    }
	function findResources($resourceGroups, $ids){
        var resources = [];
        for(var i = 0; i < $resourceGroups.length; i++){
            for(var j = 0; j < $resourceGroups[i].resources.length; j++){
                var resource = $resourceGroups[i].resources[j];
                if($ids.indexOf(resource.id) != -1){
					console.log($resourceGroups[i]);
                    resources.push(resource);
                }
            }
        }
        return resources;
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
    init();
});

angularApp.controller('AppController', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/admin/project/uploadFile'
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