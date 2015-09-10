/**
 * Created by eastagile on 11/11/14.
 */
angularApp.run(function($rootScope){
    jQuery("#edit_project form").validate();
    jQuery("#tasks form").validate();

    //$(function() {
    jQuery('.filestyle').each(function() {
        var $this = $(this), options = $this.attr('data-options') ? JSON.parse($this.attr('data-options')) : {
            'input' : $this.attr('data-input') === 'false' ? false : true,
            'icon' : $this.attr('data-icon') === 'false' ? false : true,
            'buttonBefore' : $this.attr('data-buttonBefore') === 'true' ? true : false,
            'disabled' : $this.attr('data-disabled') === 'true' ? true : false,
            'size' : $this.attr('data-size'),
            'buttonText' : $this.attr('data-buttonText'),
            'buttonName' : $this.attr('data-buttonName'),
            'iconName' : $this.attr('data-iconName'),
            'badge' : $this.attr('data-badge') === 'false' ? false : true
        };

        $this.filestyle(options);
    });

    jQuery('.bootstrap-filestyle').each(function() {
        $(this).css("display", "block");
    });
    //});
});

angularApp.filter("parsehtml", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}]);

angularApp.filter('DateFormatter', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'MMMM dd, yyyy');
 
  return _date.toUpperCase();

 };
});


angularApp.controller('ProjectDetailController', function($scope, $rootScope, $http, $location, ProjectApi, DateFormatter, ProjectStatus,
                                                          ProjectServiceLevel, ProjectPriority, StaffApi, ClientApi,
                                                          FieldApi, ProjectType, TaskApi, TaskStatus,
                                                          FeedbackQuality, FeedbackTime,
                                                          $q){

	$scope.formatDate = function(date){
		var dateString = date; //'17-09-2013 10:08'  	"2015-04-30 15:00:00"
		if((typeof dateString !== 'undefined')&&(typeof dateString != null)){
			
			var dateParts = dateString.split(' ');
		    var timeParts = dateParts[1].split(':');
		    var date;

		    dateParts = dateParts[0].split('-');
			date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
	        return date.getTime();
	        
			//return date;
		} else {
			return date;
		}
	    
	};

    $scope.q_values = FeedbackQuality.all();
    $scope.t_values = FeedbackTime.all();
    $scope.DateFormatter = DateFormatter;
    $scope.ProjectStatus = ProjectStatus;
    $scope.ProjectServiceLevel = ProjectServiceLevel;
    $scope.ProjectPriority = ProjectPriority;
    $scope.FieldApi = FieldApi;
	$scope.currency = null;
    $scope.tempProject = {};
    $scope.clients = [];
    $scope.sales = [];
    $scope.pms = [];
    $scope.fields = [];
    $scope.project = {
        tasks: [],
        tasksNum: 0,
        feedbacksNum: 0,
        activitiesNum: 0,
    };
	$scope.telephone = [];
	
	
	$scope.itermtm = [];
	$scope.subtotal_tmp = 0;
    function search_by_id($array, $id){
        for(var i = 0; i < $array.length; i++){
            if($array[i].id == $id){
                return $array[i];
            }
        }
    }

    var projectId = PROJECT_ID;
    function init(){
    	$scope.Total_tmp = 0;
		$("*[rel=tooltip]").tooltip();
        var project_listener = ProjectApi.get(projectId, function($project){
            $project.priority = ProjectPriority.get($project.priority);
            $project.serviceLevel = ProjectServiceLevel.get($project.serviceLevel);
            $project.status = ProjectStatus.get($project.status);
            $project.tasks = [];
			
            
			$scope.project = $project;
			var ajaxPmUser = $http.get("/" + LANG_CODE + "/admin/staff/getUserByPm?staffid="+$project.pm.id)
            .success( function ( $data ) {
                $scope.project.pm.user = $data.user_staff;
				
            });
			console.log($scope.project);
			$scope.currency = $scope.project.currency;	
		

            jQuery.extend($scope.tempProject, $scope.project);
        });
		
		
        /*var pm_listener = StaffApi.list({
            type: 2
        }, function($pms){
            $scope.pms = $pms;
        });
		
        var sales_listener = StaffApi.list({
            type: 1
        }, function($sales){
            $scope.sales = $sales;
        });
		*/
		var pm_listener = $http.get("/" + LANG_CODE + "/admin/staff/getPmList")
            .success( function ( $data ) {
                $scope.pms = $data.pmlist;
            });

        var sales_listener = $http.get("/" + LANG_CODE + "/admin/staff/getSalesList")
            .success( function ( $data ) {
                $scope.sales = $data.saleslist;
            });
		//get company info
		 var companyinfo = $http.get("/api/papertask/companyinfo").success(function($data){
            $scope.companyinfo = $data['companyinfo'];
			if($scope.currency=='cny')
				$scope.companyinfo1 = $scope.companyinfo[0];
			else 	$scope.companyinfo1 = $scope.companyinfo[1];
			
        }).error(function($e){
            alert('error');
        });	
		//get bank info
		$http.get("/api/papertask/bankinfo").success(function($data){
            $scope.bankinfo = $data['bankinfo'];
			if($scope.currency=='cny')
				$scope.bankinfo1 = $scope.bankinfo[0];
			else 	$scope.bankinfo1 = $scope.bankinfo[1];
			//$scope.bankinfo1 = $scope.bankinfo[0];
			//$scope.bankinfo2 = $scope.bankinfo[1];
			
			
        }).error(function($e){
            alert('error');
        });		
		
        var client_listener = ClientApi.list({}, function($clients){
            $scope.clients = $clients;
        });

        var field_listener = FieldApi.list({}, function($fields){
            $scope.fields = $fields;
        });

        $q.all([project_listener, field_listener, pm_listener, sales_listener, client_listener, companyinfo])
            .then(function(){
            	if($scope.project.field){
                $scope.project.field = search_by_id($scope.fields, $scope.project.field.id);
            	}
					
				if($scope.project.pm){
                $scope.project.pm = search_by_id($scope.pms, $scope.project.pm.id);
				}
				
				if($scope.project.sale)
					$scope.project.sale = search_by_id($scope.sales, $scope.project.sale.id);
				if(  $scope.project.client) {
                $scope.project.client = search_by_id($scope.clients, $scope.project.client.id);
				}
                
					
                $http.get('/api/admin/projectitermnotm?projectId='+ projectId).success(function($data) {
					$scope.itermnotms = $data['Itermnotms'];
					
					// arrange itermnotms based language
					
					$scope.itermnotmsnews = arrangeItem($data['Itermnotms']);
					
					
							
				});
				$http.get('/api/admin/projectitermtm?projectId='+ projectId).success(function($data) {
					$scope.itemtms = arrangeItem($data['Itermtms']);
					//if($scope.itemtm)
					//	$scope.subtotal = $scope.subtotal + parseFloat($scope.itemtm.total);	
						
					
				});
				
				$http.get('/api/admin/projectitermdtpmac?projectId='+ projectId).success(function($data) {
					$scope.itermdtpmacs = arrangeItem($data['Itermdtpmacs'], 'dtpUnits');
							
				});
				
				$http.get('/api/admin/projectitermdtppc?projectId='+ projectId).success(function($data) {
					$scope.itermdtppcs = arrangeItem($data['Itermdtppcs'], 'dtpUnits');
								
				});
				
				$http.get('/api/admin/projectitermengineering?projectId='+ projectId).success(function($data) {
					$scope.itermengineerings = arrangeItem($data['Itermengineerings'], 'engineeringUnits');
								
				});
				
				$http.get('/api/admin/projectiterminterpreting?projectId='+ projectId).success(function($data) {
					$scope.iterminterpretings = arrangeItem($data['Iterminterpretings'], 'interpretingUnits');
							
				});
				
				/*$http.get('/api/admin/invoice?projectId='+ projectId).success(function($data) {
					$scope.invoice = $data['invoices'];
					if($scope.invoice)
					if($scope.invoice.invoiceDate){
						//$scope.invoice.invoiceDate = $scope.invoice.invoiceDate.date;
					}
						
					$scope.subtotal = $scope.invoice.subtotal;
					$scope.tax = $scope.invoice.tax;
					//$scope.project.discount = $scope.invoice.discount;
					$scope.total = $scope.invoice.total;
					$scope.project.tax = 	Math.round(($scope.tax / $scope.subtotal)*100);
					
								
				});*/
				
				$scope.project.types = ProjectType.find($scope.project.types.sort())
				
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
				
                jQuery.extend($scope.tempProject, $scope.project);
            });
			
			
    }

	$scope.saveTaxandDiscount = function ( ) {
		
		var subtotal_tmp = Number($scope.subtotal_tmp);
		var tax = Number((subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
		$scope.tax = $scope.currency + " " + tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		var total = Number(subtotal_tmp - $scope.project.discount + (subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
		$scope.total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
		var updateInvoiceDate= $http.put("/api/admin/project/" + $scope.project.id + "?action=1", $scope.project)
		.success( function ( $data ) {
			jQuery("#modal-edit-quote").modal("hide");
		});	
	}
	$scope.quoteAccepted= function ( ) {
		
		
		$scope.project.targetLanguages = null;
		/*
		for(var i=0; i<$scope.project.targetLanguages.length; i++){
			//$scope.project.targetLanguages[i] = $scope.project.targetLanguages[i].id;
			//var index = $scope.project.targetLanguages[i].indexOf(feedback);
			$scope.project.targetLanguages[i].feedback = null;
		}
		*/
		
		
		
		
		var updateInvoiceDate = $http.put("/api/admin/project/" + $scope.project.id + "?action=2&lang_code=" + LANG_CODE, $scope.project)
		.success( function ( $data ) {
			//show tap
			location.reload();
			//$project.status = ProjectStatus.get(2);
		});	
		
	}
	$scope.setinvoiceDate = function ( ){
				
				
				//var d = new Date($scope.invoice.invoiceDate_tmp);
				var dt  = $scope.invoice.invoiceDate_tmp.split(/\-|\s/);
				//d = new Date(dt.slice(0,3).reverse().join('/')+' '+dt[3]);
				var d = $scope.invoice.invoiceDate_tmp;
				//d = new Date($scope.invoice.invoiceDate_tmp, "d-m-Y g:i");
				//16-06-2015 18:34
				d = d.split(' ');
				var date = d[0];
				date = date.split('-');
				var hour = d[1];
				hour = hour.split(':');
				
				d = new Date(date[2], date[1], date[0], hour[0], hour[1]);
				
				
				//var d = new Date.parseDate($scope.invoice.invoiceDate_tmp, "d-m-Y g:i");
				
				//return;
				//$scope.invoice.invoiceDate = d;
				var dd = d.getDate()
				if (dd<10) dd= '0'+dd;
				var mm = d.getMonth() + 1  // now moths are 1-12
				if (mm<10) mm= '0'+mm;
				var yy = d.getFullYear();
				
				$scope.invoice.invoice_no = "INV-" +  yy + mm + dd  + Math.floor((Math.random()*9000) + 1000);
				
				
				
				$scope.invoice.invoiceDate = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':00';
				if(d.getMonth()<12)
					$scope.invoice.dueDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':00';
				else
					$scope.invoice.dueDate = (d.getFullYear()+1)+'-01-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':00';
				console.log($scope.invoice.invoiceDate);
				
				console.log($scope.invoice.dueDate);
				//$scope.invoice.dueDate = $scope.invoice.dueDate.date;
				//$scope.invoice.invoiceDate = $scope.invoice.invoiceDate_tmp;
				
				//return false;
				var updateinvoiceDate = $http.put("/api/admin/invoice/" + $scope.invoice.id + "?action=1", $scope.invoice)
					.success( function ( $data ) {
						
						$scope.invoice = $data.invoice;
						
				});			
	}
	$scope.printInvoice = function ( ){
	   var divToPrint = document.getElementById('divToPrint');
       var popupWin = window.open('', '_blank', '');
       popupWin.document.open();
       popupWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</html>');
       popupWin.document.close();
	}
	
	$scope.printQuote = function(){
		$scope.url_printQuote = "/" + LANG_CODE + "/admin/project/quoteprint?id=" + projectId;
    };
	$scope.printInvoice = function(){
		$scope.url_printInvoice = "/" + LANG_CODE + "/admin/project/invoiceprint?id=" + projectId;
    };
	$scope.downloadQuote = function(){
		$scope.url_downloadQuote = "/" + LANG_CODE + "/admin/project/quotedownload?id=" + projectId;
    };
	$scope.editQuote = function(){
		$scope.url_editQuote = "/" + LANG_CODE + "/admin/project/quoteedit?id=" + projectId;
    };
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
		return $scope.currency + " " + n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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
										
					Itemr[j].total = $scope.currency + " " + total.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
					
					Itemr[j].rate_tmp = Itemr[j].rate;
					Itemr[j].rate = $scope.currency + " " + rate.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					//set unit
					if(unit == 'interpretingUnits'){
						if(Itemr[j].unit == 1) 
							Itemr[j].unit = 'Day';
						else Itemr[j].unit = 'Half Day';
					}	
					else if(unit == 'engineeringUnits'){
						if(Itemr[j].unit == 1) 
							Itemr[j].unit = 'Hour';
						else if(Itemr[j].unit == 2) 
							Itemr[j].unit = 'Day';
						else if(Itemr[j].unit == 3) 
							Itemr[j].unit = 'Month';
						else  if(Itemr[j].unit == 4) 
							Itemr[j].unit = 'Word';	
						else  if(Itemr[j].unit == 5) 
							Itemr[j].unit = 'Graphic';				
						else Itemr[j].unit = 'Page';
					}		
					else if(unit == 'dtpUnits'){
						if(Itemr[j].unit == 1) 
							Itemr[j].unit = 'Hour';
						else Itemr[j].unit = 'Page';
					}
					$scope.subtotal = $scope.currency + " " + subtotal_tmp.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					var tax = Number((subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
					$scope.tax = $scope.currency + " " + tax.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					
					var total = Number(subtotal_tmp - $scope.project.discount + (subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
					$scope.project.total_tmp = total;
					$scope.total = $scope.currency + " " + total.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					$scope.itermtmnew[$scope.project.targetLanguages[i].id].push(Itemr[j]);
				}	
			}
		}
        return $scope.itermtmnew;
    }
	
    function showEdit(){
        jQuery("#edit_project").collapse("toggle");
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
        if(jQuery("#edit_project form").valid()) {
			
			var fields = ['client', 'pm', 'sale', 'priority', 'reference', 'field', 'po'];
            var data = getOnlyFields($scope.tempProject, fields);
			console.log(data);
			var updateInvoiceDate= $http.put("/api/admin/project/" + $scope.project.id + "?action=4", data)
			.success( function ( $data ) {
				jQuery.extend($scope.project, $scope.tempProject);
                jQuery("#edit_project").collapse("toggle");
			});	
		
            /*ProjectApi.update($scope.project.id, data, function () {
                jQuery.extend($scope.project, $scope.tempProject);
                jQuery("#edit_project").collapse("toggle");
            });*/
        }
    }
    $scope.showEdit = showEdit;
    $scope.update = update;

    init();
    
  
});


angularApp.controller("ProjectTasksController", function($scope, $http, TaskStatus, ProjectType, TaskApi, DateFormatter){
	$scope.filter.project_id = PROJECT_ID;
    $scope.newTask = {};
    $scope.DateFormatter = DateFormatter;
    $scope.setItemApi(TaskApi);
    /*
    $scope.formatDate = function(date){
    	var dateString = date; //'17-09-2013 10:08'  	"2015-04-30 15:00:00"
		if((typeof dateString !== 'undefined')&&(typeof dateString != null)){
			var dateParts = dateString.split(' ');
		    var timeParts = dateParts[1].split(':');
		    var date;

	    dateParts = dateParts[0].split('-');
		date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        return date.getTime();
		} else {
			return date;
		}
	};
	*/

    var templateCorrection = {
        options: {},
        message: "Describe your feedback in details to improve quality of service.",
        buttonTitle: "Submit"
    };

    function attachData($task){
        $task.type = ProjectType.get($task.type);
        $task.status = TaskStatus.get($task.status);
		$task.files = [];

        // var mockC = Object.create(templateCorrection);
        // mockC.language = $task.language;
        // mockC.task = $task;
        // mockC.project_id = $scope.project.id;
        // mockC.needToCreate = true;
        // $task.correction = mockC;
    }

    function createTask(){
    	
        if(jQuery("#tasks form").valid()){
            var newTask = $scope.newTask;
            newTask.name = newTask.name ? newTask.name : "";
            newTask.startDate = $scope.project.startDate.date;
            newTask.dueDate = $scope.project.dueDate.date;
            newTask.project_id = $scope.project.id;
            newTask.status = TaskStatus.unassigned;
            newTask.language = newTask.language.id;
            if(!newTask.type){
            	newTask.type = { 'id' : 0};
            }
			console.log(newTask);
			/*
            TaskApi.create(newTask, function($newTask){
                attachData($newTask);
                $scope.newTask = {};
                $scope.items.push($newTask);
                $scope.project.tasksNum = $scope.items.length;
            });
            */
			
			 $http.post("/api/admin/task/", newTask)
				.success( function ( $data ) {
					$scope.filter.project_id = $scope.project.id;
	                $scope.refresh();
			});
			
        }
    }

    function afterLoadItems($tasks){
        for(var i = 0; i < $tasks.length; i++){
            attachData($tasks[i]);
        }
        $scope.project.tasksNum = $tasks.length;
        $scope.project.tasks = $tasks;
		//console.log($scope.tasks);
    }
    $scope.custom.afterLoadItems = afterLoadItems;

    $scope.createTask = createTask;

    function update($task, $data){
        TaskApi.update($task.id, $data, function($updateTask){
            attachData($updateTask);
            jQuery.extend($task, $updateTask);
        });
    }

    function sendToSpecialismPool($task){
        update($task, {is_specialism_pool: 1, status_id: 6});
    }
    $scope.sendToSpecialismPool = sendToSpecialismPool;

    function sendToClientPool($task){
        update($task, {is_client_pool: 1, status_id: 6});
    }
	function viewtaskdetail($task){
		
        location.href = '/' + LANG_CODE + "/admin/task/detail?id="+$task.id;
    }
	 $scope.viewtaskdetail = viewtaskdetail;
    $scope.sendToClientPool = sendToClientPool;

    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
        	
        		//var str = $scope.project.quote_no;
    			//var res = str.split("-");
    			//$scope.project.project_no = res[1];
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        				
        }
    });
});

angularApp.controller("ProjectActivitiesController", function($scope, ActivityApi, $sce){
	$scope.filter.project_id = PROJECT_ID;
    var templateActivity = {
        type: "message"
    };
    $scope.newActivity = Object.create(templateActivity);

    $scope.setItemApi(ActivityApi);

    $scope.sendMessage = function(){
    
    	var str = $scope.newActivity.message;
    	var endstr = str.substring(str.length - 4);
    	//console.info('endstr',endstr);
    	if(endstr == '<br>')
    		str = str.substring(0,str.length - 4);	
    	$scope.newActivity.message = str;
    	//console.info('str',str);
    	//return false;
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

angularApp.controller("ProjectFeedbackController", function($scope, FeedbackApi){
	$scope.filter.project_id = PROJECT_ID;
    var fb_dump = [], fb_loaded = false, fb_refreshed = false;

    var prepare = function(feedback){
        feedback.buttonTitle = "Update";
        feedback.qualityTitle = $scope.q_values[Number(feedback.quality)-1].name;
        feedback.timeTitle = $scope.q_values[Number(feedback.turnAroundTime)-1].name;
        // console.log($scope.q_values[feedback.quality].name);
        fb_dump[feedback.language] = feedback;
    };

    var templateFeedback = {
        quality: 3,
        turnAroundTime: 3,
        //message: "Describe your feedback in details to improve quality of service.",
        buttonTitle: "Submit"
    };

    $scope.newFeedback = Object.create(templateFeedback);

    $scope.setItemApi(FeedbackApi);
	

    $scope.sendFeedback = function(newFeedback){
        //var newFeedback = $scope.newFeedback;
        newFeedback.buttonTitle = "Sending..."
        newFeedback.project_id = $scope.project.id;

        if(newFeedback.needToCreate){
            FeedbackApi.create(newFeedback, function($newFeedback){
                // $scope.newFeedback = Object.create(templateFeedback);
                // $scope.items.push($newFeedback);
                
                newFeedback.buttonTitle = "Updated!";
            });
        } else {
            FeedbackApi.update(newFeedback.id , newFeedback, function($newFeedback){
                // $scope.newFeedback = Object.create(templateFeedback);
                // $scope.items.push($newFeedback);
                
                newFeedback.buttonTitle = "Feedback updated";
            });
        }

    }

    $scope.custom.afterLoadItems = function($feedbacks){
    	
        $scope.project.targetLanguages.forEach(function(lang){
            if(!$feedbacks.some(function(fb){
                if(fb.language.id == lang.id){
                    return true;
                }
            })){
                // var mockFb = Object.create(templateFeedback);
                // mockFb.language = task.language;
                // mockFb.task = task;
                // mockFb.project_id = $scope.project.id;
                // mockFb.needToCreate = true;
                // $feedbacks.push(mockFb);
            }
        });

        $feedbacks.forEach(prepare);
		console.log($feedbacks);
        $scope.project.feedbacksNum = $feedbacks.length;
        fb_loaded = true && fb_refreshed;
        fb_refreshed = true;
        
    }
    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        }
    });

    function attachFeedbacks(){
        // if(fb_dump !== "done" && fb_dump.length !== 0){
        // if(fb_dump !== "done" && $scope.project.targetLanguages && $scope.project.targetLanguages.length){
        if(fb_loaded && fb_dump !== "done" && $scope.project.targetLanguages && $scope.project.targetLanguages.length){
            $scope.project.targetLanguages.forEach(function(lang) {
                if(fb_dump[lang.id])
                    lang.feedback = fb_dump[lang.id];
                else {
                	var mockFb = Object.create(templateFeedback);
                    mockFb.language = lang;
	                mockFb.project_id = $scope.project.id;
	                mockFb.needToCreate = true;
                    lang.feedback = mockFb;
                    lang.feedback.quality = mockFb.quality;
                    lang.feedback.turnAroundTime = mockFb.turnAroundTime;
					

              }
			  console.log(lang);
        });
		
        fb_dump = "done";
        
        }
        
        
    }

    $scope.$watch(function(){
        //return !!((fb_loaded && $scope.project.targetLanguages && $scope.project.targetLanguages.length) || (fb_dump.length && fb_dump !== "done"));
        return fb_loaded &&
            $scope.project.targetLanguages && $scope.project.targetLanguages.length > 0 &&
            fb_dump !== "done";
        // return !!(fb_loaded && fb_dump.length && $scope.project.targetLanguages && $scope.project.targetLanguages.length);
    }, function(){
        attachFeedbacks();
    });
});

angularApp.controller("ProjectCorrectionController", function($scope, CorrectionApi){
	$scope.filter.project_id = PROJECT_ID;
    var c_dump = [], c_empty = false, c_refreshed = false, c_loaded = false;

    var prepare = function(correction){
        correction.buttonTitle = "Update";
        // correction.options = ;
        c_dump[correction.language.id] = correction;
    };

    var templateCorrection = {
        options: {sampleOption: 34, sampleOption2: "trr"},
        message: "Describe your feedback in details to improve quality of service.",
        buttonTitle: "Submit"
    };

    $scope.setItemApi(CorrectionApi);

    $scope.custom.afterLoadItems = function($corrections){
        $corrections.forEach(prepare);

        // if(!$corrections.length) c_empty = true;
        c_loaded = true && c_refreshed;
        c_refreshed = true;
    }

    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        }
    });

    function attachCorrections(){
        // if(c_dump !== "done" && c_dump.length !== 0){
        if(c_loaded && c_dump !== "done" && $scope.project.targetLanguages && $scope.project.targetLanguages.length){
            $scope.project.targetLanguages.forEach(function(lang) {
                if(c_dump[lang.id])
                    lang.correction = c_dump[lang.id];
                else {
                    // var mockC = Object.create(templateCorrection);
                    // mockC.language = task.language;
                    // mockC.task = task;
                    // mockC.project_id = $scope.project.id;
                    // mockC.needToCreate = true;
                    // task.correction = mockC;
                }
            });
            c_dump = "done";
        }
    }

    $scope.$watch(function(){

        return c_loaded &&
            $scope.project.targetLanguages && $scope.project.targetLanguages.length > 0 &&
            c_dump !== "done";
        // return !!($scope.project.targetLanguages && $scope.project.targetLanguages.length);
        // return !!($scope.project.targetLanguages && $scope.project.targetLanguages.length && c_dump.length && c_dump !== "done");
    }, function(){
        attachCorrections();
    });
});

angularApp.controller("ProjectFilesController", function($scope, $rootScope, $http, $window, FileUploader, TaskApi, FeedbackApi, CorrectionApi){

	
	
	// Raw
		var Fuploader = $scope.uploader = new FileUploader({
	        url: "/" + LANG_CODE + "/admin/project/uploadFile",formData: [{ projectId: PROJECT_ID, }]
	    });
	      
	    // FILTERS
	
	    Fuploader.filters.push({
	        name: 'customFilter',
	        fn: function(item /*{File|FileLikeObject}*/, options) {
	            return this.queue.length < 10;
	        }
	    });
	
	    
	    // CALLBACKS
	
	    Fuploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
	        //console.info('onWhenAddingFileFailed', item, filter, options);
	    };
	    Fuploader.onAfterAddingFile = function(fileItem) {
	        fileItem.upload();
	    };
	    Fuploader.onAfterAddingAll = function(addedFileItems) {
	        //console.info('onAfterAddingAll', addedFileItems);
	    };
	    Fuploader.onBeforeUploadItem = function(item) {
	        //console.info('onBeforeUploadItem', item);
	    };
	    Fuploader.onProgressItem = function(fileItem, progress) {
	        //console.info('onProgressItem', fileItem, progress);
	    };
	    Fuploader.onProgressAll = function(progress) {
	        //console.info('onProgressAll', progress);
	    };
	    Fuploader.onSuccessItem = function(fileItem, response, status, headers) {
	    
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
	        
	        init();

	    };
	    Fuploader.onErrorItem = function(fileItem, response, status, headers) {
	       // console.info('onErrorItem', fileItem, response, status, headers);
	    };
	    Fuploader.onCancelItem = function(fileItem, response, status, headers) {
	        //console.info('onCancelItem', fileItem, response, status, headers);
	    };
	    Fuploader.onCompleteItem = function(fileItem, response, status, headers) {
	    };
	    Fuploader.onCompleteAll = function() {
	        //console.info('onCompleteAll');
	    };
	// End Raw
   
	
    function attachUploaders(){
        $scope.project.targetLanguages.forEach(function(lang, i) {
            var uploader = lang.uploader = new FileUploader({
                url: "/" + LANG_CODE + "/admin/project/uploadFile",
                formData: [{langId: lang.id, projectId: $scope.project.id, filetype: 1}]
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
                //console.info('onWhenAddingFileFailed', lang.code, item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                fileItem.upload();
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                //console.info('onAfterAddingAll', lang.code, addedFileItems);
            };
            uploader.onBeforeUploadItem = function(item) {
                //console.info('onBeforeUploadItem', lang.code, item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                //console.info('onProgressItem', lang.code, fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                //console.info('onProgressAll', lang.code, progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
            	//console.info('lang.uploader');
                if(!response.success){
                    fileItem.file.name += " - Uploading error";
                    $timeout(function(){
                        fileItem.remove();
                    }, 1000);
                    return;
                }

                fileItem.projectFile = {
                    name: fileItem.file.name,
                    lang: lang.id,
                    id: response.file.id
                };
                fileItem.token = response.file.token;

                if(!lang.files) lang.files = [];
                lang.files.push(response.file);

            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                //console.info('onErrorItem', lang.code, fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                //console.info('onCancelItem', lang.code, fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
            };
            uploader.onCompleteAll = function() {
                //console.info('onCompleteAll', lang.code);
            };

            //console.info('uploader', lang.code, uploader);


            // -------------------------------
        });
    }


    $scope.controller = {
        isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    $scope.removeItem = function(item){

    	//console.info('item',item);
        if(item.isSuccess){
            if(item.projectFile.lang){
                var token = item.token;
                for(var i = 0; i < $scope.project.targetLanguages[item.projectFile.lang].files.length; i++){
                    if($scope.project.targetLanguages[item.projectFile.lang].files[i].token == token){
                        $scope.project.files.splice(i, 1);
                        break;
                    }
                }
            } else {
                var token = item.token;
                for(var i = 0; i < $scope.project.files.length; i++){
                    if($scope.project.files[i].token == token){
                        $scope.project.files.splice(i, 1);
                        break;
                    }
                }
            }
        };
        item.remove();
    };

    $scope.sendFeedback = function(lang){
        lang.feedback.buttonTitle = "Sending...";

        var newFeedback = lang.feedback;
        newFeedback.language = {id: lang.id};
        newFeedback.project_id = $scope.project.id;
		newFeedback.language_data = {id: lang.id};
		

        /**
         * Update smth. status set to appreved!
         *
         */
        // TaskApi.update(task.id, { 'status_id' : 1 }, function($res){
        //     console.log($res);
        // });

        FeedbackApi.create(newFeedback, function($newFeedback){
            // $scope.newFeedback = Object.create(templateFeedback);
            // $scope.items.push($newFeedback);
            //console.log($newFeedback);
            lang.feedback.buttonTitle = "Updated!";
            location.reload();
        });
    }

    $scope.requestCorrection = function(lang){
        // task.feedback.buttonTitle = "Sending...";

        var newCorrection = lang.correction;
        newCorrection.lang = {id: lang.id};
        newCorrection.options = newCorrection.options;
        newCorrection.project_id = $scope.project.id;

        /**
         * Update smth. status set to approved!
         */
        // TaskApi.update(task.id, { 'status_id' : 3 }, function($res){
        //     console.log($res);
        // });

        if(newCorrection.id)
            CorrectionApi.update(newCorrection.id , newCorrection, function($newCorrection){
                // $scope.newFeedback = Object.create(templateFeedback);
                // $scope.items.push($newFeedback);
               
            });
        else
            CorrectionApi.create(newCorrection, function($res){
                // $scope.newFeedback = Object.create(templateFeedback);
                // $scope.items.push($newFeedback);
                //console.log($res);
                // task.feedback.buttonTitle = "Updated!";
                location.reload();
});
    }

    $scope.files = [];
    $scope.langFiles = [];

    var projectId = PROJECT_ID;

    function attachLangFiles(){
        $scope.langFiles.forEach(function(file) {
            $scope.project.targetLanguages.some(function(l){
				if(file.task){
					if(l.id == file.task.language.id){
						if(!l.files) l.files = [];
						l.files.push(file);
						return true;
					}
				}
				else{
					if(file.filetype==1){
						if(!l.files) l.files = [];
						l.files.push(file);
						return true;
					}
					
				}
            });
        });
    }

    function init(){
    	
        $http.get("/" + LANG_CODE + "/admin/project/getFilesList?project_id="+projectId)
            .success( function ( $data ) {
            	
                $scope.files = $data.filter(function(file){
					console.log(file);
                    return !file.task && !file.language;
                });
                
                $scope.langFiles = $data.filter(function(file){
				console.log(file);
                    return file.task || file.filetype;
                });
                
             $rootScope.filesLength = $scope.files.length;
            });
    }

    $scope.downloadFile = function(token){
        // alert("DWD");
        $window.open("/" + LANG_CODE + "/admin/project/downloadFile?token="+token, '_blank');
    };

    $scope.deleteFile = function(token){
        
        // $window.open("/" + LANG_CODE + "/admin/project/downloadFile?token="+token, '_blank');
    };

    $scope.removeFile = function(file){
    	$http.delete("/api/admin/file/"+file.id)
        .success( function ( $data ) {
        	$scope.files.splice(file, 1);
        	$rootScope.filesLength = $scope.files.length;
        });
    }

    init();

    $scope.$watch(function(){
        return !!($scope.project.targetLanguages && $scope.project.targetLanguages.length && $scope.langFiles && $scope.langFiles.length);
    }, function(){
        attachLangFiles();
    });

    $scope.$watch(function(){
        return !!($scope.project.targetLanguages && $scope.project.targetLanguages.length);
    }, function(){
        if($scope.project.targetLanguages && $scope.project.targetLanguages.length) attachUploaders();
    });
});
