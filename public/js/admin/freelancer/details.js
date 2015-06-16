angularApp.run( function ( $rootScope ) {
$(".summernote").summernote();
$('.note-toolbar.btn-toolbar').remove();
}) 
angularApp.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);


angularApp.controller('FreelancerController', function($scope, $window, $http, $timeout, $q,  TaskStatus, ProjectType) {
    $scope.pagetype = 'detail';
	$scope.countries 		= [];
	$scope.companies		= [];
    
	$scope.dtpPrices    = [];
    $scope.translationPices = [];
    $scope.interpretingPrices = [];
    $scope.engineeringPrices = [];
	$scope.resources = [];
	
	$scope.resume = {};
	$scope.checkTranslationSpecialism = [];
	$scope.checkInterpretingSpecialism = [];
	
	$scope.TranslationSpecialisms = [];
    $scope.TranslationCatTools = [];
    $scope.operatingSystems = [];
    $scope.DesktopCatTools = [];
    $scope.InterpretingSpecialisms = [];
    $scope.InterpretingCatTools = [];
	$scope.tmRatios = {};
    
    $scope.password = null;
    $scope.passwordChanged = 0;
    
	$scope.userInfo = {
        isActive: null,
		alias: null,
        profileUpdated: null,
        email: null,
        firstName: null,
        lastName: null,
		username:null,
        gender: null,
        city: null,
        phone: null,
        country: null,
        company: null,
		tmRatios: null,
        currency: null
    };
    $scope.freelancer = {
        comments: null,
		company: null,
		freelancerId: null,
        position: null
	};
    $scope.priceType    = 'CNY';
	//data add pool
	$scope.pagesTranslation 		= [];
	$scope.pagesDesktop 			= [];
	$scope.pagesInterpreting 		= [];
	
	$scope.translation_employers 	= [];
	$scope.desktop_employers 		= [];
	$scope.interpreting_employers 	= [];
	
	$scope.clientsDesktop 		= [];
	$scope.clientsTranslation	= [];
	$scope.clientsInterpreting 	= [];
	
	
	$scope.searchParamsTranslation = {
        'search': null,
        'name': null,
        'idEmployer': null,
        'email': null,
        'country': null,
        'includeInactive': null,
        'currency': null,
        'page': null,
        'company': null
    };
	$scope.searchParamsDesktop = {
        'search': null,
        'name': null,
        'idEmployer': null,
        'email': null,
        'country': null,
        'includeInactive': null,
        'currency': null,
        'page': null,
        'company': null
    };
	$scope.searchParamsInterpreting = {
        'search': null,
        'name': null,
        'idEmployer': null,
        'email': null,
        'country': null,
        'includeInactive': null,
        'currency': null,
        'page': null,
        'company': null
    };
	
	$scope.init = function (str_uid) {
		$scope.getUserInfo();
        $scope.getFreelancer();
		
		$http.get("/api/user/employer?page=1")
	        .success(function($data){
	            $scope.pagesTranslation = $data.pages;
				$scope.pagesDesktop = $data.pages;
				$scope.pagesInterpreting = $data.pages;
	            $scope.translation_employers = $data.employers;
				$scope.desktop_employers = $data.employers;
				$scope.interpreting_employers = $data.employers;
				console.log("translation_employers");
				console.log($scope.translation_employers);
	    });

		$http.get("/api/common/country")
	        .success(function($data){
	            $scope.countries = $data['countries'];
	    });
        var ajaxCompanyInfo = $http.get("/api/common/company")
            .success(function($data){
                $scope.companies = $data['companies'];
        });
		//get client translation
		$http.get("/api/user/clienttranslation?userId="+ USER_ID)
	        .success(function($data){
	            $scope.clientsTranslation = $data['transClients'];
				console.log("clientsTranslation");
				console.log($scope.clientsTranslation);
				console.log($scope.clientsTranslation[0].client);
	    });
		//get client desktop
		$http.get("/api/user/clientdesktop?userId="+ USER_ID)
	        .success(function($data){
	            $scope.clientsDesktop = $data['desktopClients'];
				console.log("clientsDesktop");
				console.log($scope.clientsDesktop);
	    });
		//get client interpreting
		$http.get("/api/user/clientinterpreting?userId="+ USER_ID)
	        .success(function($data){
	            $scope.clientsInterpreting = $data['interpretingClients'];
				console.log("clientsinterpreting");
				console.log($scope.clientsinterpreting);
	    });
		
		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?page="+'1'+"&freelancer_id="+FREELANCER_ID, {
            //params: $params
        }).success(function($data){
        	$scope.tasks_tmp = $data.tasks;
 			$scope.tasks = [];
 			angular.forEach($scope.tasks_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var task =  [];
 				task["status"] = TaskStatus.get(element.status);
 				task["id"] = element.id;
 				task["language"] = element.language;
 				task["project"] = element.project;
 				task["type"] = ProjectType.get(element.type);
 				task["dueDate"] = element.dueDate;
				task["total"] = element.total;
 				//alert(task);
 				//console.log(task);
 				$scope.tasks.push(task);
 			});
			console.log("task begin");
			console.log($scope.tasks);	
            $scope.pages = $data.pages;
        });
		
	}
	//translation
	$scope.addClientTrans = function (employer, client_id) {
		//console.log(client_id);
		var addToArray=true;
		for(var i=0;i<$scope.clientsTranslation.length;i++){
			if($scope.clientsTranslation[i].client.id == employer.id){
				addToArray=false;
				console.log("exits");
			}
		}
		if(addToArray){
			$http.post("/api/user/clienttranslation", 
			{
				userclientId: client_id,
				userfreelancerId: USER_ID, 
			}).success(function( data ) {
				$scope.clienttmpTranslation = data["clientTranslation"];
				$scope.clientsTranslation.push( $scope.clienttmpTranslation );
				console.log("data.clientTranlation");
				console.log($scope.clienttmpTranslation);
			});
		}
		else{
			bootbox.alert( EXITS_CONFIRM_TEXT);
		}
        console.log($scope.clientsTranslation);
    }
	$scope.deleteClientTrans = function (ind , id) {
		console.log(id);
		console.log($scope.clientsTranslation);
		console.log(ind);
		bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag ){
                $http.delete("/api/user/" + id + "/clienttranslation").success(function( data ) {       
					var index = $scope.clientsTranslation.indexOf(ind);
                    $scope.clientsTranslation.splice( index, 1 );
                });    
			}	
        });
		console.log($scope.clientsTranslation);
    }
	
	$scope.selectPage = function($page){
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?page="+$page+"&freelancer_id="+FREELANCER_ID, {
            params: $params
        }).success(function($data){
        	$scope.tasks_tmp = $data.tasks;
 			$scope.tasks = [];
 			angular.forEach($scope.tasks_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var task =  [];
 				task["status"] = TaskStatus.get(element.status);
 				task["id"] = element.id;
 				task["language"] = element.language;
 				task["project"] = element.project;
 				task["type"] = ProjectType.get(element.type);
 				task["dueDate"] = element.dueDate;
				task["total"] = element.total;
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?page="+$scope.pages.previous+"&freelancer_id="+FREELANCER_ID, {
            params: $params
        }).success(function($data){
        	$scope.tasks_tmp = $data.tasks;
 			$scope.tasks = [];
 			angular.forEach($scope.tasks_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var task =  [];
 				task["status"] = TaskStatus.get(element.status);
 				task["id"] = element.id;
 				task["language"] = element.language;
 				task["project"] = element.project;
 				task["type"] = ProjectType.get(element.type);
 				task["dueDate"] = element.dueDate;
				task["total"] = element.total;
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?page="+ (int_index*1 + 1) +"&freelancer_id="+FREELANCER_ID, {
            params: $params
        }).success(function($data){
        	$scope.tasks_tmp = $data.tasks;
 			$scope.tasks = [];
 			angular.forEach($scope.tasks_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var task =  [];
 				task["status"] = TaskStatus.get(element.status);
 				task["id"] = element.id;
 				task["language"] = element.language;
 				task["project"] = element.project;
 				task["type"] = ProjectType.get(element.type);
 				task["dueDate"] = element.dueDate;
				task["total"] = element.total;
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
	}
	$scope.onBtnNextClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?page="+ $scope.pages.next +"&freelancer_id="+FREELANCER_ID, {
            params: $params
        }).success(function($data){
        	$scope.tasks_tmp = $data.tasks;
 			$scope.tasks = [];
 			angular.forEach($scope.tasks_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var task =  [];
 				task["status"] = TaskStatus.get(element.status);
 				task["id"] = element.id;
 				task["language"] = element.language;
 				task["project"] = element.project;
 				task["type"] = ProjectType.get(element.type);
 				task["dueDate"] = element.dueDate;
				task["total"] = element.total;
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
	}
	//desktop
	$scope.addClientDesktop = function (employer , client_id) {
		console.log(client_id);
		console.log($scope.clientsDesktop);
		console.log(employer);
		var addToArray=true;
		for(var i=0;i<$scope.clientsDesktop.length;i++){
			if($scope.clientsDesktop[i].client.id == employer.id){
				addToArray=false;
				console.log("exits");
			}
		}
		if(addToArray){
			$http.post("/api/user/clientdesktop", 
			{
				userclientId: client_id,
				userfreelancerId: USER_ID, 
			}).success(function( data ) {
				if ( $data.success == 'failed') {
						bootbox.alert("User already exited. Please check your email address.");
						return ;
					}
				else {	
					$scope.clienttmpDesktop = data["clientDesktop"];
					$scope.clientsDesktop.push( $scope.clienttmpDesktop );
					console.log("data.clientsDesktop");
					console.log($scope.clienttmpDesktop);
				}
			});
		}
		else {
			bootbox.alert( EXITS_CONFIRM_TEXT);
		}
    }
	$scope.deleteClientDesktop = function (ind , id) {
		console.log(id);
		 bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag )
                $http.delete("/api/user/" + id + "/clientdesktop").success(function( data ) { 
					var index = $scope.clientsDesktop.indexOf(ind);
                    $scope.clientsDesktop.splice( index, 1 );
                });    
        });
    }
	
	$scope.advancedSearchDesktop = function () {
        $scope.selectPageDesktop( 1 );
    }
	$scope.resetDesktop = function () {
        $scope.searchParamsDesktop = {
            'search': null,
            'name': null,
            'idEmployer': null,
            'email': null,
            'country': null,
            'includeInactive': null,
            'currency': null,
            'page': null,
            'company': null
        };
        $scope.selectPageDesktop(1);
    }
	$scope.selectPageDesktop = function($page){
        // check search
        var search = 0;
        for(var key in $scope.searchParamsDesktop) {
            var obj = $scope.searchParamsDesktop[key];
            if (obj != null) {
                search++;
            }
        };
        if(search > 0){
            $scope.searchParamsDesktop.page = $page;
            $scope.searchParamsDesktop.search = 1;
            var $params = $scope.searchParamsDesktop;
        }else{
            var $params = {page: $page};
        }

        $http.get("/api/user/employer", {
            params: $params
        }).success(function($data){
            $scope.desktop_employers = $data.employers;
            $scope.pagesDesktop = $data.pages;
            if($data['pages']){
                var N = $scope.pagesDesktop.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
        });
    }
	$scope.onBtnPreviousDesktopClicked = function () {
		$http.get("/api/user/employer?page="+ $scope.pagesDesktop.previous)
	        .success(function($data){
	            $scope.pagesDesktop = $data.pages;
	            $scope.desktop_employers = $data.employers;
	    });
	}
	
	$scope.onBtnGotoDesktop = function ( int_index ) {
		$http.get("/api/user/employer?page="+ (int_index*1 + 1))
	        .success(function($data){
	            $scope.pagesDesktop = $data.pages;
	            $scope.desktop_employers = $data.employers;
	    });
	}
	
	$scope.onBtnNextDesktopClicked = function () {
		$http.get("/api/user/employer?page="+ $scope.pages.next)
	        .success(function($data){
	            $scope.pagesDesktop = $data.pages;
	            $scope.desktop_employers = $data.employers;
	    });
	}
    //interpreting
	$scope.addClientInterpreting = function (employer, client_id) {
		//console.log(client_id);
		var addToArray=true;
		for(var i=0;i<$scope.clientsInterpreting.length;i++){
			if($scope.clientsInterpreting[i].client.id == employer.id){
				addToArray=false;
				console.log("exits");
			}
		}
		if(addToArray){
			$http.post("/api/user/clientinterpreting", 
			{
				userclientId: client_id,
				userfreelancerId: USER_ID, 
			}).success(function( data ) {
				$scope.clienttmpInterpreting = data["clientInterpreting"];
				$scope.clientsInterpreting.push( $scope.clienttmpInterpreting );
				console.log("data.clientsInterpreting");
				console.log($scope.clienttmpInterpreting);
			});
		}
		else{
			bootbox.alert( EXITS_CONFIRM_TEXT);
		}	
        console.log($scope.clientsInterpreting);
    }
	$scope.deleteClientInterpreting = function (ind , id) {
		console.log(id);
		 bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
            if ( bflag )
                $http.delete("/api/user/" + id + "/clientinterpreting").success(function( data ) {
					var index = $scope.clientsInterpreting.indexOf(ind);	
                    $scope.clientsInterpreting.splice( index, 1 );
                });    
        });
    }
	
	$scope.advancedSearchInterpreting = function () {
        $scope.selectPageInterpreting( 1 );
    }
	$scope.resetInterpreting = function () {
        $scope.searchParamsInterpreting = {
            'search': null,
            'name': null,
            'idEmployer': null,
            'email': null,
            'country': null,
            'includeInactive': null,
            'currency': null,
            'page': null,
            'company': null
        };
        $scope.selectPageInterpreting(1);
    }
	$scope.selectPageInterpreting = function($page){
        // check search
        var search = 0;
        for(var key in $scope.searchParamsInterpreting) {
            var obj = $scope.searchParamsInterpreting[key];
            if (obj != null) {
                search++;
            }
        };
        if(search > 0){
            $scope.searchParamsInterpreting.page = $page;
            $scope.searchParamsInterpreting.search = 1;
            var $params = $scope.searchParamsInterpreting;
        }else{
            var $params = {page: $page};
        }

        $http.get("/api/user/employer", {
            params: $params
        }).success(function($data){
            $scope.interpreting_employers = $data.employers;
            $scope.pagesInterpreting = $data.pages;
            if($data['pages']){
                var N = $scope.pagesInterpreting.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
        });
    }
	$scope.onBtnPreviousInterpretingClicked = function () {
		$http.get("/api/user/employer?page="+ $scope.pagesInterpreting.previous)
	        .success(function($data){
	            $scope.pagesInterpreting = $data.pages;
	            $scope.interpreting_employers = $data.employers;
	    });
	}
	
	$scope.onBtnGotoInterpreting = function ( int_index ) {
		$http.get("/api/user/employer?page="+ (int_index*1 + 1))
	        .success(function($data){
	            $scope.pagesInterpreting = $data.pages;
	            $scope.interpreting_employers = $data.employers;
	    });
	}
	
	$scope.onBtnNextInterpretingClicked = function () {
		$http.get("/api/user/employer?page="+ $scope.pages.next)
	        .success(function($data){
	            $scope.pagesInterpreting = $data.pages;
	            $scope.interpreting_employers = $data.employers;
	    });
	}
	//
    $scope.getUserInfo = function() {
        $http.get("/api/user/" + USER_ID + "")
            .success(function ( $data ) {
						console.log("getUserInfo");

			console.log($data);
                $scope.userInfo = {
                    isActive: $data.user.isActive,
					alias : $data.user.alias,
                    profileUpdated: $data.user.profileUpdated,
                    email: $data.user.email,
                    firstName: $data.user.firstName,
                    lastName: $data.user.lastName,
					username: $data.user.username,
                    gender: $data.user.gender,
                    city: $data.user.city,
                    phone: $data.user.phone,
                    country: $data.user.country,
                    currency: $data.user.currency,
					tmRatios: $data.tmRatios
                };
				$scope.tmRatios = $data.tmRatios;
                $scope.translationPrices = $data.translationPrices;
                $scope.interpretingPrices = $data.interpretingPrices;
                $scope.dptPrices = $data.desktopPrices;
                $scope.engineeringPices = $data.engineeringPrices;
                
				$scope.translationPricesP = $data.translationPricesP;
                $scope.interpretingPricesP = $data.interpretingPricesP;
                $scope.dptPricesP = $data.desktopPricesP;
                $scope.engineeringPicesP = $data.engineeringPricesP;
				
                if ( $scope.userInfo.currency == 'cny') 
                    $scope.priceType = 'CNY';
                else
                    $scope.priceType = 'USD';
            });
    }

    $scope.getFreelancer = function () {
		$http.get("/api/user/" + USER_ID + "/freelancer")
            .success(function($data){
                $scope.freelancer = $data['freelancer'];
				$scope.rating = $scope.freelancer.Rating;
                console.log("TranslationSpecialismsP");
				console.log($scope.freelancer.TranslationSpecialismsP);
				// get data after freelancer was loaded
				getFreelancerData();
				getFreelancerResume();
				getBankInfo();
				
				
            });
			
    }
	function getFreelancerResume(){
        $http.get('/api/user/' + USER_ID + '/resume').success(function($data){
            $scope.resume = $data['resume'];
			 $("#objComment").html($scope.resume.papertaskComments);
            console.log($scope.resume);
        });
    }
	function getBankInfo(){
        $http.get('/api/user/' + USER_ID + '/bank-info').success(function($data){
            if($data['bankInfo']){
                $scope.bankInfo = $data['bankInfo'];
                console.log($scope.bankInfo);
            }
        });
    }
    function findResourcesGroup($resourceGroups, $ids){
		console.log("resourceGroups");
		console.log($resourceGroups);
		console.log($ids);
        var resourcesgroup = [];
		resourcesgroup.translation = 0;
		resourcesgroup.deesktop = 0;
		resourcesgroup.interpreting = 0;
        for(var i = 0; i < $resourceGroups.length; i++){
            for(var j = 0; j < $resourceGroups[i].resources.length; j++){
                var resource = $resourceGroups[i].resources[j];
                if($ids.indexOf(resource.id) != -1  ){
					console.log(resource);
					if($resourceGroups[i].group.name == "Translation")
							resourcesgroup.translation = 1;
                    if($resourceGroups[i].group.name == "Desktop Publishing")
							resourcesgroup.desktop = 1;
					if($resourceGroups[i].group.name == "Interpreting")
							resourcesgroup.interpreting = 1;
							
                    i/*f( resourcesgroup.length > 0 && resourcesgroup.indexOf($resourceGroups[i]) != -1){
						//console.log(resourcesgroup);
						resourcesgroup.push($resourceGroups[i]);
					}	
					else 	{
						console.log(resourcesgroup);
						$resourcesgroup[$resourceGroups[i].id - 1] = $resourceGroups[i]; 
						//if $resourceGroups[i].id = "Specialism";
						
						//if $resourceGroups[i].id = "Desktop Publishing";
						
						//if $resourceGroups[i].id = "Desktop Publishing";Interpreting
						resourcesgroup.push($tmp[$resourceGroups[i].id]);
					}*/
					
                }
            }
        }
		console.log("resource");
		console.log(resourcesgroup);
        return resourcesgroup;
    }
	
	function getFreelancerData(){
        $http.get('/api/user/freelancer-data').success(function($data){
            $scope.freelancerData = $data;
			console.log("freelancerData");
            console.log($scope.freelancerData);
            // get resource group
			$scope.resources = $data['resources'];
			$scope.freelancer.ResourcesGroup = findResourcesGroup($scope.resources, $scope.freelancer.Resources);
			
            /*$.each($scope.freelancerData.resources, function(){
                var that = this;
                $.each(this.resources, function(){
                    if($scope.freelancer.Resources.indexOf(this.id) >= 0){
                        $scope.resourcesType[that.group.name] = 1;
                    }
                });
            });*/
            // get translation specialism
            $scope.TranslationSpecialisms = findOptions($scope.freelancerData.specialisms,
               $scope.freelancer.TranslationSpecialisms);
            // get desktop translation cat tools
			//con
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
			//person 
			
			// get translation specialism
			for(i=0 ; i < $scope.freelancer.TranslationSpecialisms.length; i++) 
			{
				var tmp = 0;
				for(j=0 ; j < $scope.freelancer.TranslationSpecialismsP.length; j++) {
					if($scope.freelancer.TranslationSpecialisms[i] == $scope.freelancer.TranslationSpecialismsP[j])
						tmp = 1;
				}
				$scope.checkTranslationSpecialism.push(tmp);
			}
			 
			$scope.freelancer.TranslationSpecialismsP = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.TranslationSpecialismsP);
            
			console.log("InterpretingSpecialisms");
			console.log($scope.InterpretingSpecialisms);
			for(i=0 ; i < $scope.freelancer.InterpretingSpecialisms.length; i++) 
			{
				var tmp1 = 0;
				for(j=0 ; j < $scope.freelancer.InterpretingSpecialismsP.length; j++) {
					if($scope.freelancer.InterpretingSpecialisms[i] == $scope.freelancer.InterpretingSpecialismsP[j])
						tmp1 = 1;
				}
				$scope.checkInterpretingSpecialism.push(tmp1);
			}
            $scope.freelancer.InterpretingSpecialismsP = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.InterpretingSpecialismsP);
				
			console.log($scope.freelancer.InterpretingSpecialismsP);	
			// get desktop translation cat tools
			//con
            //$scope.TranslationCatToolsP = findOptions($scope.freelancerData.catTools,
            //    $scope.freelancer.TranslationCatToolsP);
            // get operating systems
            //$scope.operatingSystemsP = findOptions($scope.freelancerData.operatingSystems,
            //    $scope.freelancer.DesktopOperatingSystemsP);
            // get desktop cat tools
            //$scope.DesktopCatToolsP = findOptions($scope.freelancerData.catTools,
            //    $scope.freelancer.DesktopCatToolsP);
            // get interpreting specialism
			
            //console.log($scope.InterpretingSpecialisms);
        });
    }
    $scope.resetPassword = function () {
        $http.put('/api/user/' + USER_ID, {'password': $scope.password}).success(function($data){
            if($data.success == 1){
                $scope.password = null;
                $scope.passwordChanged = 1;
            }
        });
    }
	$scope.setTestTranslationSpecialisms = function($id){
        console.log($scope.freelancer.TranslationSpecialismsP);
        var $index = $scope.freelancer.TranslationSpecialismsP.indexOf($id);
        if($index == -1){
            $scope.freelancer.TranslationSpecialismsP.push($id);
        } else {
            $scope.freelancer.TranslationSpecialismsP.splice($index, 1);
        }
		console.log($scope.freelancer.TranslationSpecialismsP);
		//update data TranslationSpecialismsP
		 var requestResources = $http.put("/api/user/" + USER_ID + "/freelancer/" + $scope.freelancer.id, {
					'TranslationSpecialismsP': getIds($scope.freelancer.TranslationSpecialismsP),
					'InterpretingSpecialismsP': getIds($scope.freelancer.InterpretingSpecialismsP)
				}).success(function($data){
					console.log("Update Resources");
         });
		
    };
	$scope.setTestInterpretingSpecialisms = function($id){
        console.log($scope.freelancer.InterpretingSpecialismsP);
        var $index = $scope.freelancer.InterpretingSpecialismsP.indexOf($id);
        if($index == -1){
            $scope.freelancer.InterpretingSpecialismsP.push($id);
        } else {
            $scope.freelancer.InterpretingSpecialismsP.splice($index, 1);
        }
		console.log($scope.freelancer.InterpretingSpecialismsP);
		//update data TranslationSpecialismsP
		 var requestResources = $http.put("/api/user/" + USER_ID + "/freelancer/" + $scope.freelancer.id, {
					'TranslationSpecialismsP': getIds($scope.freelancer.TranslationSpecialismsP),
					'InterpretingSpecialismsP': getIds($scope.freelancer.InterpretingSpecialismsP)
				}).success(function($data){
					console.log("Update Resources");
         });
		
    };
	$scope.formatDate = function(date){
		var dateString = date, //'17-09-2013 10:08'  	"2015-04-30 15:00:00"
	    dateParts = dateString.split(' '),
	    timeParts = dateParts[1].split(':'),
	    date;

	    dateParts = dateParts[0].split('-');
		date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        return date.getTime();
	};
	
	$scope.download = function(path){
		$window.open("/" + LANG_CODE + "/admin/freelancer/download?path="+path, '_blank');
		
	};
});


