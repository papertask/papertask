/**
 * Created by eastagile on 11/11/14.
 */
angularApp.run(function($rootScope){
    jQuery("#edit_task form").validate();
    jQuery("#tasks form").validate();
});
angularApp.run(function($rootScope){
    var i = 1;
    var element = jQuery("#projectfiles > input")[0];
    jQuery(element).filestyle({
        input: false,
        icon: "fa fa-cloud-upload",
        buttonText: "Upload Source files",
        buttonName: "btn-xs btn-primary",
        badge: false
    });
	var element = jQuery("#taskfiles > input")[0];
    jQuery(element).filestyle({
        input: false,
        icon: "fa fa-cloud-upload",
        buttonText: "Upload Final files",
        buttonName: "btn-xs btn-primary",
        badge: false
    });
});

angularApp.filter("parsehtml", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}]);

angularApp.controller('TaskDetailController', function($scope, $http, $timeout, $location, ProjectApi, DateFormatter, ProjectStatus, LangGroup,
                                                          ProjectServiceLevel, ProjectPriority, StaffApi, ClientApi,
                                                          FeedbackQuality, FeedbackTime, 
                                                          FieldApi, ProjectType, TaskApi, TaskStatus, FileListService, $q){

    $scope.DateFormatter = DateFormatter;
    $scope.ProjectStatus = ProjectStatus;
    $scope.ProjectServiceLevel = ProjectServiceLevel;
    $scope.ProjectPriority = ProjectPriority;
    $scope.FieldApi = FieldApi;
    $scope.q_values = FeedbackQuality.all();
    $scope.t_values = FeedbackTime.all();
	$scope.currency = null;
    $scope.tempProject = {};
	$scope.files = [];
	$scope.taskfiles = [];
    $scope.clients = [];
    $scope.sales = [];
    $scope.pms = [];
	$scope.freelancerassign =[];
    $scope.fields = [];
    $scope.project = {
        task: [],
        tasksNum: 0,
        activitiesNum: 0,
    };
	$scope.task = {
        total: 0,
    };
	$scope.task_total = 0;
	$scope.tempTask = {};
	$scope.telephone = [];
	$scope.projectId ='';
	$scope.taskId ='';
	$scope.itermtm = [];
	$scope.subtotal_tmp = 0;
	$scope.USER_ID = null;
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
	
    function search_by_id($array, $id){
        for(var i = 0; i < $array.length; i++){
            if($array[i].id == $id){
                return $array[i];
            }
        }
    }
	function format2n(n) {
		return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	function showiterm(){
	$http.get('/api/admin/file?projectId='+ $scope.projectId).success(function($data) {
								
							arrangeFile($data['files']);
							//$scope.files = $data['files'];
							$scope.project.files = $scope.files;
							setModalControllerData('files', $scope.files);
									
						});
						
					if($scope.task.type.id == 1){
						$http.get('/api/admin/projectitermnotm?projectId='+ $scope.projectId).success(function($data) {
							$scope.itermnotms = $data['Itermnotms'];
							
							// arrange itermnotms based language
							
							$scope.itermnotmsnews = arrangeItem($data['Itermnotms']);
									
						});
					}
					if($scope.task.type.id == 2){
						$http.get('/api/admin/projectitermtm?projectId='+ $scope.projectId).success(function($data) {
							$scope.itemtms = arrangeItem($data['Itermtms']);
							//if($scope.itemtm)
							//	$scope.subtotal = $scope.subtotal + parseFloat($scope.itemtm.total);	
								
							
						});
					}	
					if($scope.task.type.id == 4){
						$http.get('/api/admin/projectitermdtpmac?projectId='+ $scope.projectId).success(function($data) {
							$scope.itermdtpmacs = arrangeItem($data['Itermdtpmacs'], 'dtpUnits');
									
						});
					}
					if($scope.task.type.id == 5){
						$http.get('/api/admin/projectitermdtppc?projectId='+ $scope.projectId).success(function($data) {
							$scope.itermdtppcs = arrangeItem($data['Itermdtppcs'], 'dtpUnits');
										
						});
					}
					if($scope.task.type.id == 6){
						$http.get('/api/admin/projectitermengineering?projectId='+ $scope.projectId).success(function($data) {
							$scope.itermengineerings = arrangeItem($data['Itermengineerings'], 'engineeringUnits');
										
						});
					}
					if($scope.task.type.id > 6){
						$http.get('/api/admin/projectiterminterpreting?projectId='+ $scope.projectId).success(function($data) {
							$scope.iterminterpretings = arrangeItem($data['Iterminterpretings'], 'interpretingUnits');
										
						});
					}
	}
    var taskId = TASK_ID;
	$scope.taskId = taskId;
    function init(){
		$("*[rel=tooltip]").tooltip();
        
		// get task
		var task_listener = $http.get("/api/admin/task/" + taskId)
            .success( function ( $task ) {
				
                $scope.task = $task.task;
				$scope.language = $scope.task.language;
				
				$scope.projectId = $scope.task.project;
				$scope.task.type = ProjectType.get($scope.task.type);
				$scope.task.status = TaskStatus.get($scope.task.status);
				
				jQuery.extend($scope.tempTask, $scope.task);;
				
				var dueDateArr = $scope.task.dueDate.date.split(" ");
				var dueDateStr =  dueDateArr[0]+'T'+dueDateArr[1];
				var dueDate = new Date(dueDateStr);
				var month = dueDate.getMonth() + 1;
				$scope.tempTask.dueDate = dueDate.getDate() + '-' + month + '-' + dueDate.getFullYear() +  ' ' + dueDate.getHours() + ':' + dueDate.getSeconds() ;
				
				var startDateArr = $scope.task.startDate.date.split(" ");
				var startDateStr =  startDateArr[0]+'T'+startDateArr[1];
				var startDate = new Date(startDateStr);
				var startmonth = startDate.getMonth() + 1;
				$scope.tempTask.startDate = startDate.getDate() + '-' + startmonth + '-' + startDate.getFullYear() +  ' ' + startDate.getHours() + ':' + startDate.getSeconds() ;
				
            });
		
        
		var pm_listener = $http.get("/" + LANG_CODE + "/admin/staff/getPmList")
            .success( function ( $data ) {
                $scope.pms = $data.pmlist;
            });

        var sales_listener = $http.get("/" + LANG_CODE + "/admin/staff/getSalesList")
            .success( function ( $data ) {
                $scope.sales = $data.saleslist;
            });
		
		var freelancer_listener = $http.get("/" + LANG_CODE + "/admin/freelancer/getFreelancesList")
            .success( function ( $data ) {
                $scope.freelancers = $data.freelancerslist;
				setModalControllerData('freelancers', $scope.freelancers);

            });		
		//get company info
		 var companyinfo = $http.get("/api/papertask/companyinfo").success(function($data){
            $scope.companyinfo = $data['companyinfo'];
			$scope.companyinfo1 = $scope.companyinfo[0];

        }).error(function($e){
            alert('error');
        });	
		//get bank info
		$http.get("/api/papertask/bankinfo").success(function($data){
            $scope.bankinfo = $data['bankinfo'];
			$scope.bankinfo1 = $scope.bankinfo[0];
			$scope.bankinfo2 = $scope.bankinfo[1];
			

        }).error(function($e){
            alert('error');
        });		
		
        var client_listener = ClientApi.list({}, function($clients){

            $scope.clients = $clients;
        });

        var field_listener = FieldApi.list({}, function($fields){
            $scope.fields = $fields;
        });

        $q.all([task_listener, field_listener, pm_listener, sales_listener, client_listener, companyinfo])
            .then(function(){
                // get project
				var project_listener = ProjectApi.get($scope.projectId, function($project){
					$project.priority = ProjectPriority.get($project.priority);
					$project.serviceLevel = ProjectServiceLevel.get($project.serviceLevel);
					$project.status = ProjectStatus.get($project.status);
					$project.tasks = [];
					
					$scope.project = $project;
					
					var str = $scope.project.quote_no;
					if(str){
						var res = str.split("-");
						$scope.project.project_no = res[1];
					}
					
					$scope.USER_ID = $scope.project.userid;
					console.log($scope.task);
					if($scope.task.assignee)
					{
						$http.get("/" + LANG_CODE + '/admin/freelancer/getuserbyfreelancerid?idfreelancer='+ $scope.task.assignee.id).success(function($data) {	
							$scope.currency = $data.freelancer_user.currency;
							//console.log($data.freelancer_user);
							showiterm();
							
						})						
					}
					else {
						$scope.currency = $scope.project.currency;
						showiterm();
					}	
					//get user login
					
					
					
					
					$scope.project.field = search_by_id($scope.fields, $scope.project.field.id);
						
					if($scope.project.pm)
					$scope.project.pm = search_by_id($scope.pms, $scope.project.pm.id);
					if($scope.project.sale)
						$scope.project.sale = search_by_id($scope.sales, $scope.project.sale.id);
					
					//$scope.project.client = search_by_id($scope.clients, $scope.project.client.id);
					//console.log("$scope.project.client");	
					//console.log($scope.project.client);	
					//get all file
					
					
					//get private price 	
					$http.get('/api/user/translationprice?userId='+ $scope.USER_ID).success(function($data) {
						$scope.translationPrices = $data['translationPrices'];
					});	
					$http.get('/api/user/desktopprice?userId='+$scope.USER_ID).success(function($data) {
						$scope.desktopPrices = $data['desktopPrices'];
						
					});	
					$http.get('/api/user/engineeringprice?userId=' + $scope.USER_ID).success(function($data) {
						$scope.engineeringPrices = $data['engineeringPrices'];
						
					});
					
					//Get Client Info
					
					var ajaxUserInfo = $http.get("/api/user/" + $scope.USER_ID + "")
		            .success ( function ( $data ) {
		            	
		            	$scope.clientTmRatios = $data.tmRatios;
		            			          						
		            });	
					
					
					/** order information condition **/
					$scope.hasTypeTranslationNoTM = function(){
						return existsIdInArray($scope.project.types, 1);
					};
					$scope.hasTypeTranslationUseTM = function(item){
						
						if(!item)
							return false;
						else	
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
					
					
				});
				
				
				var PROJECT_ID = $scope.projectId;
		    	var LANG_ID = $scope.language.id;
		    	//alert(PROJECT_ID); alert(LANG_ID);
		    	//get Correction
				$http.get("/api/admin/projectcorrection/?project_id=" + PROJECT_ID).success(function($data){
					$scope.havecorrection = false;
					
		            for(var i=0; i< $data.corrections.length; i++){
		            	
		            	
		            	if($data.corrections[i].language.id == LANG_ID){
		            		
		            		$scope.correction = $data.corrections[i];
		            		if( $scope.task.status.id == 8 )
		            			$scope.havecorrection = true;
		            		break;
		            	}
		            }
		            
		        }).error(function($e){

		        	$scope.havecorrection = false;
		        });
				
				//get Feedback
				$http.get("/api/admin/projectfeedback/?project_id=" + PROJECT_ID).success(function($data){
					$scope.havefeedback = false;
					
		            for(var i=0; i< $data.feedbacks.length; i++){
		            	
		            	
		            	if($data.feedbacks[i].language == LANG_ID){
		            		
		            		$scope.feedback = $data.feedbacks[i];
		            		if( $scope.task.status.id == 1 )
		            			$scope.havefeedback = true;
		            		break;
		            	}
		            }
		            
		        }).error(function($e){

		        	$scope.havefeedback = false;
		        });
				
				
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
		
		$http.get("/api/papertask/engineering").success(function($data){
				$scope.engineeringPPrices = $data['engineering'];
				
			}).error(function($e){
				alert('error');
		});
		$http.get("/api/papertask/desktop-publishing").success(function($data){
				$scope.softwarePrices = $data['softwarePrices'];
				
				
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
				

                //$scope.project.targetLanguages = [];
                $timeout(function(){
                    jQuery("select.multiselect").multiselect("destroy").multiselect();
                });
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
    }

    $scope.Accept = function(task_id){
		$http.get("/" + LANG_CODE + "/admin/task/FreelancerAcceptTask?id="+ task_id, {
           // params: $params
        }).success(function($data){
        	
        	if($data.status=="have ongoing task"){
        		bootbox.alert(  'You are having an ongoing task. You cannot Accept any more');
        		return false;
        	} else if ($data.status=='ok'){
        		bootbox.alert(  'You accepted task successfully');
        		$scope.task["status"] = TaskStatus.get(2);
        	}
        	
        });
	}
    
    $scope.SubmitReview = function(task_id){
    	
    	if($scope.taskfiles.length == 0){
    		bootbox.alert(  'You need to add final file before submiting');
    		return false;
    	}
		
		
		bootbox.confirm('Do you want to submit task for reviewing?', function() {
			$http.get("/" + LANG_CODE + "/admin/task/submitTask?id="+ task_id, {
		           // params: $params
		        }).success(function($data){
		        	
		        	if($data.status=="error"){
		        		bootbox.alert(  'There are some error');
		        		return false;
		        	} else if ($data.status=='ok'){
		        		bootbox.alert(  'Task is submited successfully');
		        		$scope.task["status"] = TaskStatus.get(7);
		        	}
		        	
		        });
	    });
	}

/**
     * Translation Prices
     */
   
	$scope.saveTranslationTM = function( itemtm ){
			$scope.iterm_tm =[];
			$scope.iterm_tm = itemtm;
			
			//$scope.itemtms[$scope.laguageid][0] = $scope.iterm_tm;
			//return;
			
			//$scope.iterm_notm.rate_tmp = $scope.iterm_notm.rate;
			
		if ( itemtm.id ) {
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
    		
    			
    		
    		itemtm.total_tmp = 	($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.bawu)/100)*$scope.iterm_tm.sourcebawu
								+ ($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.jiuwu)/100)*$scope.iterm_tm.sourcejiuwu
								+ ($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.nomatch)/100)*$scope.iterm_tm.sourcenomatch
								+ ($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.qiwu)/100)*$scope.iterm_tm.sourceqiwu
								+ ($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.repetitions)/100)*$scope.iterm_tm.sourcerepetitions
								+ ($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.wushi)/100)*$scope.iterm_tm.sourcewushi
								+ ($scope.iterm_tm.rate_tmp * Number($scope.clientTmRatios.yibai)/100)*$scope.iterm_tm.sourceyibai;
    		$scope.iterm_tm.total = itemtm.total_tmp;
    		$scope.iterm_tm.total = $scope.currency + " " + Number($scope.iterm_tm.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    		$scope.iterm_tm.rate = $scope.currency + " " + Number($scope.iterm_tm.rate_tmp).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    		
    		
    		
			$http.post("/api/admin/projectitermtm?projectid="+$scope.projectId, 
					{
						//languageid: $scope.laguageid,
						//rate: itemtm.rate_tmp, 
						//quantity: itemtm.quantity, 
						//total: itemtm.total_tmp,
						//name : itemtm.name,
						//file : itemtm.file
						
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
						file : itemtm.file,
						
						raterepetitions :  $scope.clientTmRatios.repetitions,
						rateyibai : $scope.clientTmRatios.yibai,
						ratejiuwu : $scope.clientTmRatios.jiuwu,
						ratebawu : $scope.clientTmRatios.bawu,
						rateqiwu : $scope.clientTmRatios.qiwu,
						ratewushi : $scope.clientTmRatios.wushi ,
						ratenomatch : $scope.clientTmRatios.nomatch,
						
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
		
		if($scope.itemtms[laguageid][0]){
			$scope.itemtm = $scope.itemtms[laguageid][0];
			$scope.itemtm.rate_tmp = Number($scope.itemtms[laguageid][0].rate_tmp);
	    	setModalControllerData('itemtm', $scope.itemtm);
		}
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
			$http.post("/api/admin/projectitermnotm?projectid="+$scope.projectId, 
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
			$http.post("/api/admin/projectitermdtpmac?projectid="+$scope.projectId, 
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
			$http.post("/api/admin/projectitermdtppc?projectid="+$scope.projectId, 
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
			$http.post("/api/admin/projectitermengineering?projectid="+$scope.projectId, 
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
			$http.post("/api/admin/projectiterminterpreting?projectid="+$scope.projectId, 
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
				
				//get private
				if( $scope.desktopPrices)
				{
					
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
					
					$lang_group = LangGroup.get($scope.laguageid);
					
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
				
				$scope.desktopPc = $item;
				//get private
				if( $scope.desktopPrices)
				{
					
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
					
					$lang_group = LangGroup.get($scope.laguageid);
					
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
		
		
		if($item.engineeringcategory && $item.unit)
		{
			$scope.engineering = $item;
			//get private
			
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
				
				for(j=0;j<$scope.engineeringPPrices.length;j++)
					{
						
						
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
	$scope.downloadInvoice = function(){
		$scope.url_downloadInvoice = "/" + LANG_CODE + "/admin/project/invoicedownload?id=" + projectId;
    };
	
	function existsIdInArray(arr, id){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].id == id){
                return true;
            }
        }
        return false;
    }
	
	function format22(n) {
		n = Number(n)
		return $scope.currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	function arrangeFile(files) {
		for(var i = 0; i < files.length; i++)
		{
			var date = new Date(files[i].time*1000);
			var month = date.getMonth() + 1;	
			files[i].date = date.getFullYear()  + '-' + month + '-' + date.getDate() +  ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
			if(files[i].task)
				$scope.taskfiles.push(files[i]); 
			else $scope.files.push(files[i]);
		}
		return true;
	}
	function arrangeItem(Itemr, unit) {
		$scope.itermtmnew = [];
		for(var i = 0; i < $scope.project.targetLanguages.length; i++)
		{
			$scope.itermtmnew[$scope.project.targetLanguages[i].id] = [];
			if(Itemr)
			for(var j = 0; j < Itemr.length; j++){
				if(Itemr[j].language.id == $scope.project.targetLanguages[i].id){
					$scope.subtotal_tmp = $scope.subtotal_tmp + parseFloat(Itemr[j].total_freelancer);
					var total = Number(Itemr[j].total_freelancer);
					$scope.task_total = $scope.task_total + total;
					var rate = Number(Itemr[j].rate_freelancer);
					var subtotal_tmp = Number($scope.subtotal_tmp);
									
					Itemr[j].total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
					
					Itemr[j].rate_tmp = Itemr[j].rate_freelancer;
					/*if(rate == 0){
						total = 0;
						Itemr[j].total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					}*/	
					Itemr[j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
						
					//set unit
					if(unit == 'interpretingUnits'){
						if(Itemr[j].unit == 1) {
							Itemr[j].unit = {};
							Itemr[j].unit.name = 'Day';
							Itemr[j].unit.id = 1;
						}
						else {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 2;
							Itemr[j].unit.name = 'Half Day';
						}	
					}	
					else if(unit == 'engineeringUnits'){
						if(Itemr[j].unit == 1) {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 1;
							Itemr[j].unit.name = 'Hour';
						}	
						else if(Itemr[j].unit == 2) {
							Itemr[j].unit = {};	
							Itemr[j].unit.id = 2;
							Itemr[j].unit.name = 'Day';
						}	
						else if(Itemr[j].unit == 3) {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 3;
							Itemr[j].unit.name = 'Month';
						}	
						else  if(Itemr[j].unit == 4) {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 4;
							Itemr[j].unit.name = 'Word';	
						}
						else  if(Itemr[j].unit == 5) {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 5;
							Itemr[j].unit.name = 'Graphic';
						}	
						else {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 6;
							Itemr[j].unit.name = 'Page';
						}	
					}		
					else if(unit == 'dtpUnits'){
						if(Itemr[j].unit == 1) {
							Itemr[j].unit = {};
							Itemr[j].unit.id = 1;
							Itemr[j].unit.name = 'Hour';
						}	
						else{
							Itemr[j].unit = {};
							Itemr[j].unit.id = 2;
							Itemr[j].unit.name  = 'Page';
						}	
					}
					$scope.subtotal = $scope.currency + " " + subtotal_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					var tax = Number((subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
					$scope.tax = $scope.currency + " " + tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					
					var total_tm = Number( (subtotal_tmp - $scope.project.discount)* $scope.project.tax/100 + subtotal_tmp - $scope.project.discount );
					
					$scope.total = $scope.currency + " " + total_tm.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					$scope.itermtmnew[$scope.project.targetLanguages[i].id].push(Itemr[j]);
				}	
			}
		}
        return $scope.itermtmnew;
    }
	function rearrangeItem(Itemr, targetLanguagesid, newrate) {
		if(Itemr){
			for(var j = 0; j < Itemr[targetLanguagesid].length; j++){
					var rate = Number(newrate);
					var total = rate * Itemr[targetLanguagesid][j].quantity;
					Itemr[targetLanguagesid][j].rate_freelancer = rate;
					Itemr[targetLanguagesid][j].total_freelancer = total + Itemr[targetLanguagesid][j].total_freelancer;
					Itemr[targetLanguagesid][j].rate_tmp = rate;
					Itemr[targetLanguagesid][j].total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
					Itemr[targetLanguagesid][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					
			}
		}	
        return Itemr;
    }
	// update task
	$scope.assignFre = function(){
		
		$scope.task.freelancerassign.total = $scope.task_total;
		
		
		if($scope.task.freelancerassign){
			
			
			//get translation price 
			
			$scope.task.freelancerassign.type = $scope.task.type.id;	
			var ajaxUserInfo = $http.get("/api/user/" + $scope.task.freelancerassign.userid + "")
            .success ( function ( $data ) {
				$scope.currency = $data.user.currency;
			});
			$q.all([ajaxUserInfo])
                .then(function(){
            
			if($scope.task.type.id == 1){//translationNoTM
				$http.get('/api/user/translationprice?userId='+ $scope.task.freelancerassign.userid).success(function($data) {
				
					$scope.translationPrices = $data['translationPrices'];
					
					for(i=0;i<$scope.translationPrices.length;i++){
						if($scope.project.sourceLanguage.id == $scope.translationPrices[i].sourceLanguage.id && $scope.task.language.id == $scope.translationPrices[i].targetLanguage.id  ){
							$scope.task.freelancerassign.rate_freelancer  = $scope.translationPrices[i].price;
							//$scope.task.freelancerassign.total_freelancer  = Number($scope.task.freelancerassign.rate_freelancer) * Number($scope.itermnotmsnews[$scope.task.language.id][0].quantity);
						}
						
					}
					
					console.log("fdfsfd");
					console.log($scope.itermnotmsnews);
					console.log($scope.task);
					console.log($scope.itermnotmsnews[$scope.task.language.id][0].quantity);
					console.log($scope.task.freelancerassign);
					
					//$scope.itermnotmsnews = rearrangeItem($scope.itermnotmsnews,$scope.task.language.id,$scope.task.freelancerassign.rate_freelancer);
					var total_task_freelancer = 0;
					var targetLanguagesid = $scope.task.language.id;
					for(var j = 0; j < $scope.itermnotmsnews[targetLanguagesid].length; j++){
							var rate = Number($scope.task.freelancerassign.rate_freelancer);
							var total = rate * $scope.itermnotmsnews[targetLanguagesid][j].quantity;
							$scope.itermnotmsnews[targetLanguagesid][j].rate_freelancer = rate;
							total_task_freelancer = total_task_freelancer + total;
							$scope.itermnotmsnews[targetLanguagesid][j].rate_tmp = rate;
							$scope.itermnotmsnews[targetLanguagesid][j].total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
							$scope.itermnotmsnews[targetLanguagesid][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
							
					}
					
					$scope.task.freelancerassign.itermnotmsnews = $scope.itermnotmsnews[$scope.task.language.id];
					$scope.task.freelancerassign.total_task_freelancer = total_task_freelancer;
					$scope.task.freelancerassign.currency = $scope.currency;
					console.log($scope.task.freelancerassign);
					console.log($scope.task.total_task_freelancer);
					
					var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=2", $scope.task.freelancerassign)
					.success( function ( $data ) {
						$scope.task = $data.task;
						$scope.task.status = TaskStatus.get($scope.task.status);
						bootbox.alert(ASSIGN_SUCCESSFUL);
					});	
					
				});	
			
			}
			else if($scope.task.type.id == 2){
			
			
			}
			else if($scope.task.type.id == 3){
				
			
			}
			else if($scope.task.type.id == 4){
			var ajaxUserInfo = $http.get("/api/user/" + $scope.task.freelancerassign.userid + "")
            .success ( function ( $data ) {
				$scope.currency = $data.user.currency;
			});
			$q.all([ajaxUserInfo])
                .then(function(){
				$http.get('/api/user/desktopprice?userId=' + $scope.task.freelancerassign.userid).success(function($data) {
					$scope.desktopPrices = $data['desktopPrices'];
					console.log($scope.desktopPrices );
					console.log($scope.itermdtpmacs);
					for(i=0;i<$scope.desktopPrices.length;i++)
					{
						if($scope.desktopPrices[i].language.id == $scope.task.language.id){
						
							for(j=0;i<$scope.itermdtpmacs[$scope.task.language.id].length;i++)
							{
								if($scope.itermdtpmacs[$scope.task.language.id][j].software.id == $scope.desktopPrices[i].software.id){
								
									if($scope.itermdtpmacs[$scope.task.language.id][j].unit.name == "Hour"){
										var rate = Number($scope.desktopPrices[i].priceHourMac);
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_tmp = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].total_tmp = rate * $scope.itermdtpmacs[$scope.task.language.id][j].quantity;
										$scope.itermdtpmacs[$scope.task.language.id][j].total = $scope.currency + " " + $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_freelancer = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].total_freelancer = $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp;
										
										//return;
									}	
									else if ($scope.itermdtpmacs[$scope.task.language.id][j].unit.name == "Page"){	
										var rate = Number($scope.desktopPrices[i].priceMac);
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_tmp = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].total_tmp = rate * $scope.itermdtpmacs[$scope.task.language.id][j].quantity;
										$scope.itermdtpmacs[$scope.task.language.id][j].total = $scope.currency + " " + $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_freelancer = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].total_freelancer = $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp;
										//return;
									}	
								}
								
							}	
						}
					}	
					
					$scope.task.freelancerassign.itermdtpmacs = $scope.itermdtpmacs[$scope.task.language.id];
					console.log($scope.task.freelancerassign);
					
					var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=2", $scope.task.freelancerassign)
					.success( function ( $data ) {
						//$scope.task = $data.task;
						//$scope.task.status = TaskStatus.get($scope.task.status);
						bootbox.alert(ASSIGN_SUCCESSFUL);
					});	
					
				});
				})
			
			}
			else if($scope.task.type.id == 5){
				
			var ajaxUserInfo = $http.get("/api/user/" + $scope.task.freelancerassign.userid + "")
            .success ( function ( $data ) {
				$scope.currency = $data.user.currency;
			});
			$q.all([ajaxUserInfo])
                .then(function(){
				$http.get('/api/user/desktopprice?userId=' + $scope.task.freelancerassign.userid).success(function($data) {
					$scope.desktopPrices = $data['desktopPrices'];
					console.log($scope.desktopPrices );
					console.log($scope.itermdtppcs);
					for(i=0;i<$scope.desktopPrices.length;i++)
					{
						if($scope.desktopPrices[i].language.id == $scope.task.language.id){
						
							for(j=0;i<$scope.itermdtppcs[$scope.task.language.id].length;i++)
							{
								if($scope.itermdtppcs[$scope.task.language.id][j].software.id == $scope.desktopPrices[i].software.id){
								
									if($scope.itermdtppcs[$scope.task.language.id][j].unit.name == "Hour"){
										var rate = Number($scope.desktopPrices[i].priceHourPc);
										$scope.itermdtppcs[$scope.task.language.id][j].rate_tmp = rate;
										$scope.itermdtppcs[$scope.task.language.id][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtppcs[$scope.task.language.id][j].total_tmp = rate * $scope.itermdtppcs[$scope.task.language.id][j].quantity;
										$scope.itermdtppcs[$scope.task.language.id][j].total = $scope.currency + " " + $scope.itermdtppcs[$scope.task.language.id][j].total_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtppcs[$scope.task.language.id][j].rate_freelancer = rate;
										$scope.itermdtppcs[$scope.task.language.id][j].total_freelancer = $scope.itermdtppcs[$scope.task.language.id][j].total_tmp;
										
										//return;
									}	
									else if ($scope.itermdtppcs[$scope.task.language.id][j].unit.name == "Page"){	
										var rate = Number($scope.desktopPrices[i].pricePc);
										$scope.itermdtppcs[$scope.task.language.id][j].rate_tmp = rate;
										$scope.itermdtppcs[$scope.task.language.id][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtppcs[$scope.task.language.id][j].total_tmp = rate * $scope.itermdtppcs[$scope.task.language.id][j].quantity;
										$scope.itermdtppcs[$scope.task.language.id][j].total = $scope.currency + " " + $scope.itermdtppcs[$scope.task.language.id][j].total_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtppcs[$scope.task.language.id][j].rate_freelancer = rate;
										$scope.itermdtppcs[$scope.task.language.id][j].total_freelancer = $scope.itermdtppcs[$scope.task.language.id][j].total_tmp;
										//return;
									}	
								}
								
							}	
						}
					}	
					
					$scope.task.freelancerassign.itermdtpmacs = $scope.itermdtpmacs[$scope.task.language.id];
					console.log($scope.task.freelancerassign);
					
					var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=2", $scope.task.freelancerassign)
					.success( function ( $data ) {
						//$scope.task = $data.task;
						//$scope.task.status = TaskStatus.get($scope.task.status);
						bootbox.alert(ASSIGN_SUCCESSFUL);
					});	
					
				});
				})
			
			
			}
			else if($scope.task.type.id == 6){//engineering
			
			var ajaxUserInfo = $http.get("/api/user/" + $scope.task.freelancerassign.userid + "")
            .success ( function ( $data ) {
				$scope.currency = $data.user.currency;
			});
			$q.all([ajaxUserInfo])
                .then(function(){
				$http.get('/api/user/engineeringprice?userId=' + $scope.task.freelancerassign.userid).success(function($data) {
					$scope.engineeringPrices = $data['engineeringPrices'];
					console.log($scope.engineeringPrices );
					console.log($scope.itermdtpmacs);
					/*for(i=0;i<$scope.engineeringPrices.length;i++)
					{
						if($scope.desktopPrices[i].language.id == $scope.task.language.id){
						
							for(j=0;i<$scope.itermdtpmacs[$scope.task.language.id].length;i++)
							{
								if($scope.itermdtpmacs[$scope.task.language.id][j].software.id == $scope.desktopPrices[i].software.id){
								
									if($scope.itermdtpmacs[$scope.task.language.id][j].unit.name == "Hour"){
										var rate = Number($scope.desktopPrices[i].priceHourMac);
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_tmp = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].total_tmp = rate * $scope.itermdtpmacs[$scope.task.language.id][j].quantity;
										$scope.itermdtpmacs[$scope.task.language.id][j].total = $scope.currency + " " + $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_freelancer = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].total_freelancer = $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp;
										
										//return;
									}	
									else if ($scope.itermdtpmacs[$scope.task.language.id][j].unit.name == "Page"){	
										var rate = Number($scope.desktopPrices[i].priceMac);
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_tmp = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].total_tmp = rate * $scope.itermdtpmacs[$scope.task.language.id][j].quantity;
										$scope.itermdtpmacs[$scope.task.language.id][j].total = $scope.currency + " " + $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
										$scope.itermdtpmacs[$scope.task.language.id][j].rate_freelancer = rate;
										$scope.itermdtpmacs[$scope.task.language.id][j].total_freelancer = $scope.itermdtpmacs[$scope.task.language.id][j].total_tmp;
										//return;
									}	
								}
								
							}	
						}
					}	
					
					$scope.task.freelancerassign.itermdtpmacs = $scope.itermdtpmacs[$scope.task.language.id];
					console.log($scope.task.freelancerassign);
					
					var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=2", $scope.task.freelancerassign)
					.success( function ( $data ) {
						//$scope.task = $data.task;
						//$scope.task.status = TaskStatus.get($scope.task.status);
						bootbox.alert(ASSIGN_SUCCESSFUL);
					});	*/
					
				});
				})
			
				
			}
			else{
			
			
			}
            
			
			});
			
			
			
			
		}
	};	
	$scope.sendToSpecialismPool = function(){
		var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=3")
		.success( function ( $data ) {
			$scope.task = $data.task;
			bootbox.alert(ASSIGN_SUCCESSFUL);
		});	
	};
	$scope.sendToClientPool = function(){
		var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=4")
		.success( function ( $data ) {
			$scope.task = $data.task;
			bootbox.alert(ASSIGN_SUCCESSFUL);
		});	
	};
	
	$scope.update = function(){
        var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=1", $scope.tempTask)
		.success( function ( $data ) {
			$scope.task = $data.task;
			//location.href = "/" + LANG_CODE + "/admin/admin/task?id=" + projectId;
		});	
    };	
	$scope.removeItem = function(item){
            var id = item.id;
			bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
				if ( bflag == true ) {
					$http.delete("/api/admin/file/" + id, {
						id: id            
					}).success(function( data ) {                
						for(var i = 0; i < $scope.files.length; i++){
							if($scope.files[i].id == id){
								$scope.files.splice(i, 1);
								
								break;
							}
						}	
						
					})
					.error(function( data ){
						bootbox.alert(CANNOT_DELETE_TEXT);
					});             
					
				}
			});
    };
		
	$scope.removetaskItem = function(item){
		var id = item.id;
			bootbox.confirm( DELETE_CONFIRM_TEXT, function (bflag) {
				if ( bflag == true ) {
					$http.delete("/api/admin/file/" + id, {
						id: id            
					}).success(function( data ) {                
						for(var i = 0; i < $scope.taskfiles.length; i++){
							if($scope.taskfiles[i].id == id){
								$scope.taskfiles.splice(i, 1);
								
								break;
							}
						}	
						
					})
					.error(function( data ){
						bootbox.alert(CANNOT_DELETE_TEXT);
					});             
					
				}
			});
    };
    function showEdit(){
        jQuery("#edit_task").collapse("toggle");
    }

    function getOnlyFields($object, $fields){
        var data = {};
        for(var i = 0; i < $fields.length; i++){
            var field = $fields[i];
            data[field] = $object[field];
        }
        return data;
    }

    function update(){
        if(jQuery("#edit_task form").valid()) {
            var fields = ['reference', 'startDate', 'dueDate'];
            var data = getOnlyFields($scope.tempTask, fields);
			var updateTask= $http.put("/api/admin/task/" + $scope.task.id + "?action=1", $scope.tempTask)
			.success( function ( $data ) {
				$scope.task = $data.task;
				jQuery("#edit_task").collapse("toggle");
				//location.href = "/" + LANG_CODE + "/admin/admin/task?id=" + projectId;
			});	
            /*ProjectApi.update($scope.project.id, data, function () {
                jQuery.extend($scope.project, $scope.tempProject);
                jQuery("#edit_project").collapse("toggle");
            });*/
        }
    }
    $scope.showEdit = showEdit;
    $scope.update = update;
	$scope.formatDate = function(date){
		var dateString = date, //'17-09-2013 10:08'  	"2015-04-30 15:00:00"
	    dateParts = dateString.split(' '),
	    timeParts = dateParts[1].split(':'),
	    date;

	    dateParts = dateParts[0].split('-');
		date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        return date.getTime();
	};
    init();
});


angularApp.controller("ProjectActivitiesController", function($scope, ActivityApi){
    var templateActivity = {
        type: "message"
    };
    $scope.newActivity = Object.create(templateActivity);

    $scope.setItemApi(ActivityApi);

    $scope.sendMessage = function(){
        var newActivity = $scope.newActivity;
        newActivity.project_id = $scope.project.id;

        ActivityApi.create(newActivity, function($newActivity){
            $scope.newActivity = Object.create(templateActivity);
            $scope.items.push($newActivity);
            $scope.project.activitiesNum = $scope.items.length;
        });
    }

    $scope.custom.afterLoadItems = function($activities){
        $scope.project.activitiesNum = $activities.length;
    }

    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        }
    });
});

angularApp.factory("FileListService", function(){
	var files = [];
	var taskfiles = [];
	var projectid = '';
	var taskid = '';
	return {
		files: files,
		taskfiles: taskfiles,
		projectid: projectid,
		taskid :taskid,
	};


});
/*
angularApp.controller("TaskCorrectionController", function($scope,  $http, $q, $timeout, CorrectionApi){
	
	
	$q.all([task_listener])
    .then(function(){
       
    	var PROJECT_ID = $scope.projectId;
    	//var LANG_ID = $scope.language.id;
    	
    	alert(PROJECT_ID); 
    	//alert(LANG_ID);
    	
    	$http.get("/api/papertask/projectcorrection/?project_id=" + PROJECT_ID).success(function($data){
            for(var i=0; i< $data.corrections.length; i++){
            	//if($data.corrections[i]=)
            }
        }).error(function($e){
            
        });
		
    });
   
});
*/
angularApp.controller('AppController', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {
    var uploader = $scope.uploader = new FileUploader({
		scope: true, 
        url: "/" + LANG_CODE + "/admin/project/uploadFile" ,
		//formData : [{projectId : $scope.projectId}],
    });
	
	var uploadertask = $scope.uploadertask = new FileUploader({
        url: "/" + LANG_CODE + "/admin/project/uploadFile", 
		//formData : [{projectId : $scope.projectId, taskid : $scope.taskId}],
    });
    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
	
	uploadertask.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });


    // CALLBACKS FILE PROJECT

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.upload();
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        
    };
    uploader.onBeforeUploadItem = function(item) {
		//var projectId = 
		item.formData.push({ projectId: $scope.projectId });
        //uploader.formData.projectId = $scope.projectId;
        
    };
    uploader.onProgressItem = function(fileItem, progress) {
        
    };
    uploader.onProgressAll = function(progress) {
        
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
		
		
		
        if(!response.success){
            fileItem.file.name += " - Uploading error";
            $timeout(function(){
                fileItem.remove();
            }, 1000);
            return;
        }
		var date = new Date(response.file.time*1000);
		
		var month = date.getMonth() + 1;	
		var dateshow = date.getFullYear()  + '-' + month + '-' + date.getDate() +  ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
	
        fileItem.projectFile = {
            name: fileItem.file.name,
            id: response.file.id,
			size : response.file.size,
			date : dateshow,
			path : response.file.path, 
        };
		$scope.files.push(fileItem.projectFile);
		
		
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploader.onCompleteAll = function() {
        
    };

    


    // -------------------------------
	// CALLBACKS FILE TASK

    uploadertask.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        
    };
    uploadertask.onAfterAddingFile = function(fileItem) {
        fileItem.upload();
    };
    uploadertask.onAfterAddingAll = function(addedFileItems) {
        
    };
    uploadertask.onBeforeUploadItem = function(item) {
		item.formData.push({ projectId: $scope.projectId, taskId: $scope.taskId });
        
    };
    uploadertask.onProgressItem = function(fileItem, progress) {
        
    };
    uploadertask.onProgressAll = function(progress) {
        
    };
    uploadertask.onSuccessItem = function(fileItem, response, status, headers) {
        if(!response.success){
            fileItem.file.name += " - Uploading error";
            $timeout(function(){
                fileItem.remove();
            }, 1000);
            return;
        }
		var date = new Date(response.file.time*1000);
		var month = date.getMonth() + 1;	
		var dateshow = date.getFullYear()  + '-' + month + '-' + date.getDate() +  ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
		
        fileItem.taskFile = {
            name: fileItem.file.name,
            id: response.file.id,
			size : response.file.size,
			date : dateshow,
			path : response.file.path,
        };
		$scope.taskfiles.push(fileItem.taskFile);
    };
    uploadertask.onErrorItem = function(fileItem, response, status, headers) {
        
    };
    uploadertask.onCancelItem = function(fileItem, response, status, headers) {
        
    };
    uploadertask.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploadertask.onCompleteAll = function() {
        
    };

    


    // -------------------------------

    var controller = $scope.controller = {
        isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    var calTo = $scope.calTo = function(){

        var modalSelector = arguments[0];
        
        if(modalSelector){
            var elementSelector = arguments[1];
            var functionName = arguments[2];
            var args = [];
            for(var i = 3; i < arguments.length; i++){
                args.push(arguments[i]);
            }
            angular.element(elementSelector).scope()[functionName].apply(null, args);
        }
    }
	
}]);