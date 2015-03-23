/**
 * Created by eastagile on 11/11/14.
 */
angularApp.run(function($rootScope){
    jQuery("#edit_project form").validate();
    jQuery("#tasks form").validate();
});
angularApp.filter('dateFormat', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; }

  var _date = $filter('date')(new Date(input), 'MMMM dd, yyyy');

  return _date.toUpperCase();

 };
});
angularApp.controller('ProjectDetailController', function($scope, $http, $location, ProjectApi, DateFormatter, ProjectStatus,
                                                          ProjectServiceLevel, ProjectPriority, StaffApi, ClientApi,
                                                          FieldApi, ProjectType, TaskApi, TaskStatus,
                                                          FeedbackQuality, FeedbackTime,
                                                          $q){

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

        var project_listener = ProjectApi.get(projectId, function($project){
            $project.priority = ProjectPriority.get($project.priority);
            $project.serviceLevel = ProjectServiceLevel.get($project.serviceLevel);
            $project.status = ProjectStatus.get($project.status);
            $project.tasks = [];

            $scope.project = $project;
			$scope.currency = $scope.project.currency;

			console.log("scope.project");
			console.log($scope.project);
			console.log($scope.currency);

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
			$scope.companyinfo1 = $scope.companyinfo[0];
			console.log("companyinfo");
			console.log($scope.companyinfo1);
        }).error(function($e){
            alert('error');
        });
		//get bank info
		$http.get("/api/papertask/bankinfo").success(function($data){
            $scope.bankinfo = $data['bankinfo'];
			$scope.bankinfo1 = $scope.bankinfo[0];
			$scope.bankinfo2 = $scope.bankinfo[1];

			console.log("bankinfo");
			console.log($scope.bankinfo1);
			console.log($scope.bankinfo2);
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
                $scope.project.field = search_by_id($scope.fields, $scope.project.field.id);
				console.log("project.pm");
				console.log($scope.project.pm);
				console.log($scope.pms);
                $scope.project.pm = search_by_id($scope.pms, $scope.project.pm.id);
				if($scope.project.sale)
					$scope.project.sale = search_by_id($scope.sales, $scope.project.sale.id);

                $scope.project.client = search_by_id($scope.clients, $scope.project.client.id);
				console.log("$scope.project.client");
				console.log($scope.project.client);
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

				$http.get('/api/admin/invoice?projectId='+ projectId).success(function($data) {
					$scope.invoice = $data['invoices'];
					if($scope.invoice.invoiceDate)
						$scope.invoice.invoiceDate = $scope.invoice.invoiceDate.date;

					console.log("scope.invoice");
					//console.log($data);
					console.log($scope.invoice);
				});

				$scope.project.types = ProjectType.find($scope.project.types.sort())

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

                jQuery.extend($scope.tempProject, $scope.project);
            });


    }

	$scope.saveTaxandDiscount = function ( ) {
		console.log("scope.project");
		console.log($scope.project);
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
	$scope.quoteAccepted = function ( ) {
		var updateInvoiceDate= $http.put("/api/admin/project/" + $scope.project.id + "?action=2", $scope.project)
		.success( function ( $data ) {
			//show tap
			location.reload();
			//$project.status = ProjectStatus.get(2);
		});
	}
	$scope.setinvoiceDate = function ( ){


				//var d = new Date($scope.invoice.invoiceDate_tmp);
				var dt  = $scope.invoice.invoiceDate_tmp.split(/\-|\s/);
				d = new Date(dt.slice(0,3).reverse().join('/')+' '+dt[3]);

				//var d = new Date.parseDate($scope.invoice.invoiceDate_tmp, "d-m-Y g:i");
				$scope.invoice.invoiceDate = d;
				var dd = d.getDate()
				if (dd<10) dd= '0'+dd;
				var mm = d.getMonth() + 1  // now moths are 1-12
				if (mm<10) mm= '0'+mm;
				var yy = d.getFullYear();

				$scope.invoice.invoice_no = "INV-" +  yy + mm + dd  + Math.floor((Math.random()*9000) + 1000);
				$scope.invoice.dueDate = new Date(new Date(d).setMonth(d.getMonth()+1));
				console.log($scope.invoice);
				//return;
				var updateinvoiceDate = $http.put("/api/admin/invoice/" + $scope.invoice.id + "?action=1", $scope.invoice)
					.success( function ( $data ) {
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
					Itemr[j].rate_tmp = Itemr[j].rate;
					Itemr[j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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
            var fields = ['client', 'pm', 'sale', 'priority', 'reference', 'field'];
            var data = getOnlyFields($scope.tempProject, fields);

            ProjectApi.update($scope.project.id, data, function () {
                jQuery.extend($scope.project, $scope.tempProject);
                jQuery("#edit_project").collapse("toggle");
            });
        }
    }
    $scope.showEdit = showEdit;
    $scope.update = update;

    init();
});


angularApp.controller("ProjectTasksController", function($scope, TaskStatus, ProjectType, TaskApi){
    var templateFeedback = {
        quality: 3,
        turnAroundTime: 3,
        message: "Describe your feedback in details to improve quality of service.",
        buttonTitle: "Update",
    };

    $scope.newTask = {};

    $scope.setItemApi(TaskApi);

    function attachData($task){
        $task.type = ProjectType.get($task.type);
        $task.status = TaskStatus.get($task.status);
        $task.files = [];
        $task.feedback = Object.create(templateFeedback);
    }

    function createTask(){
        if(jQuery("#tasks form").valid()){
            var newTask = $scope.newTask;
            newTask.project_id = $scope.project.id;
            newTask.status = TaskStatus.unassigned;

            TaskApi.create(newTask, function($newTask){
                attachData($newTask);
                $scope.newTask = {};
                $scope.items.push($newTask);
                $scope.project.tasksNum = $scope.items.length;
            });
        }
    }

    function afterLoadItems($tasks){
        for(var i = 0; i < $tasks.length; i++){
            attachData($tasks[i]);
        }
        $scope.project.tasksNum = $tasks.length;
        $scope.project.tasks = $tasks;
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
        update($task, {is_specialism_pool: 1});
    }
    $scope.sendToSpecialismPool = sendToSpecialismPool;

    function sendToClientPool($task){
        update($task, {is_client_pool: 1});
    }
	function viewtaskdetail($task){
		console.log("redirect");
		console.log($task);
        location.href = '/' + LANG_CODE + "/admin/task/detail?id="+$task.id;
    }
	 $scope.viewtaskdetail = viewtaskdetail;
    $scope.sendToClientPool = sendToClientPool;

    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        }
    });
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

angularApp.controller("ProjectFeedbackController", function($scope, FeedbackApi){
    var fb_dump = [];

    var prepare = function(feedback){
        feedback.buttonTitle = "Update";
        feedback.qualityTitle = $scope.q_values[Number(feedback.quality)-1].name;
        feedback.timeTitle = $scope.q_values[Number(feedback.turnAroundTime)-1].name;
        // console.log($scope.q_values[feedback.quality].name);
        fb_dump[feedback.task.id] = feedback;
    };

    var templateFeedback = {
        quality: 3,
        turnAroundTime: 3,
        message: "Describe your feedback in details to improve quality of service."
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
                console.log($newFeedback);
                newFeedback.buttonTitle = "Updated!";
            });
        } else {
            FeedbackApi.update(newFeedback.id , newFeedback, function($newFeedback){
                // $scope.newFeedback = Object.create(templateFeedback);
                // $scope.items.push($newFeedback);
                console.log($newFeedback);
                newFeedback.buttonTitle = "Feedback updated";
            });
        }

    }

    $scope.custom.afterLoadItems = function($feedbacks){
        $scope.project.tasks.forEach(function(task){
            if(!$feedbacks.some(function(fb){
                if(fb.task.id == task.id){
                    return true;
                }
            })){
                var mockFb = Object.create(templateFeedback);
                mockFb.language = task.language;
                mockFb.task = task;
                mockFb.project_id = $scope.project.id;
                mockFb.needToCreate = true;
                $feedbacks.push(mockFb);
            }
        });

        $feedbacks.forEach(prepare);
    }

    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        }
    });

    function attachTaskFeedbacks(){
        if(fb_dump !== "done" && fb_dump.length !== 0){
            $scope.project.tasks.forEach(function(task) {
                task.feedback = fb_dump[task.id];
            });
            fb_dump = "done";
        }
    }

    $scope.$watch(function(){
        return !!($scope.project.tasks && $scope.project.tasks.length && fb_dump.length && fb_dump !== "done");
    }, function(){
        attachTaskFeedbacks();
    });
});

angularApp.controller("ProjectFilesController", function($scope, $http, $window, TaskApi, FeedbackApi){
    $scope.sendFeedback = function(task){
        //var newFeedback = $scope.newFeedback;
        task.feedback.task = task;
        task.feedback.buttonTitle = "Sending...";
        task.feedback.project_id = $scope.project.id;

        TaskApi.update(task.id, { 'status_id' : 1 }, function($res){
            console.log($res);
        });

        FeedbackApi.create(task.feedback, function($newFeedback){
            // $scope.newFeedback = Object.create(templateFeedback);
            // $scope.items.push($newFeedback);
            console.log($newFeedback);
            task.feedback.buttonTitle = "Updated!";
            //location.reload();
        });
    }

    $scope.files = [];
    $scope.taskFiles = [];

    var projectId = PROJECT_ID;

    function attachTaskFiles(){
        $scope.taskFiles.forEach(function(file) {
            $scope.project.tasks.some(function(t){
                if(t.id == file.task.id){
                    t.files.push(file);
                    return true;
                }
            });
        });
    }

    function init(){
        $http.get("/" + LANG_CODE + "/admin/project/getFilesList?project_id="+projectId)
            .success( function ( $data ) {
                $scope.files = $data.filter(function(file){
                    return !file.task;
                });
                $scope.taskFiles = $data.filter(function(file){
                    return file.task;
                });
            });
    }

    $scope.downloadFile = function(token){
        // alert("DWD");
        $window.open("/" + LANG_CODE + "/admin/project/downloadFile?token="+token, '_blank');
    };


    $scope.$watch(function(){
        return !!($scope.project.tasks && $scope.project.tasks.length && $scope.taskFiles && $scope.taskFiles.length);
    }, function(){
        attachTaskFiles();
    });

    init();
});
