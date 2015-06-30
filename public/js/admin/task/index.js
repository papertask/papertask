angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('TaskIndex', function($scope, $http, $timeout, $q, TaskApi, StaffApi, 
				TaskStatus, ProjectType, ProjectStatus,ProjectField, DateFormatter,
				PayStatus, ProjectField, LanguageApi) {
	$scope.tasks = [];
	$scope.staskStatuses = TaskStatus.all();
	$scope.PayStatus = PayStatus;
    $scope.ProjectField = ProjectField;
    $scope.languages = {};
    $scope.pms = {};
    LanguageApi.list({}, function($languages){
        $scope.languages = $languages;
    });
    
    StaffApi.list({
        type: 2
    }, function($pms){
        $scope.pms = $pms;
    });

    
	$scope.filter = {
			bsearch : null,
			taskId : null,
			startDate : null,
			reference : null,
			dueDate : null,
			taskStatus : null
	};

	$scope.searchParams = {
	        'search': null,
	        'id': null,
	        'startDate': null,
	        'reference': null,
	        'dueDate': null,
	        'status' : null,
	        'payStatus' : null,
	        'source' : null,
	        'target' : null,
	        'field' : null,
	        'pm' : null,
	    };
	
	function init(){		
		//var $params = $scope.searchParams;
		
		$scope.selectPage(1);
  	}
	
	$scope.viewtaskdetail = function($task){
		console.log("redirect");
		console.log($task);
        location.href = '/' + LANG_CODE + "/admin/task/detail?id="+$task.id;
    }
	
	$scope.remove = function(task){
		$http.delete("/api/admin/task/"+task['id'], {
           // params: $params
        }).success(function($data){
        	var index = $scope.tasks.indexOf(task);
        	  $scope.tasks.splice(index, 1);
        });
	}
	
	$scope.sendToSpecialismPool = function ($task){
        update($task, {is_specialism_pool: 1});
    }
	
	$scope.sendToClientPool = function ($task){
        update($task, {is_client_pool: 1});
    }
	
	function update($task, $data){
        TaskApi.update($task.id, $data, function($updateTask){
            attachData($updateTask);
            jQuery.extend($task, $updateTask);
        });
    }
	
	
  	
	
	$scope.View = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/task/detail/?id=" + task_id;
	}
	
	$scope.Accept = function(task_id){
		$http.get("/" + LANG_CODE + "/admin/task/FreelancerAcceptTask?id="+ task_id, {
           // params: $params
        }).success(function($data){
        	angular.forEach($scope.tasks, function(element,key) {
				 if(element.id==task_id){
					 $scope.tasks[key]["status"] = TaskStatus.get(2);
				 } 

			});
        });
	}
	
	
	$scope.selectPage = function($page){
		var $params = $scope.searchParams;
		$http.get("/api/admin/task/?page="+$page, {
            params: $params
        }).success(function($data){
        	$scope.tasks = $data.tasks;
        	for(var i = 0; i<$scope.tasks.length; i++){        		
        		$scope.tasks[i]["status"] = TaskStatus.get($scope.tasks[i].status);
        		$scope.tasks[i]["type"] = ProjectType.get($scope.tasks[i].type);
        	}
			console.info('$scope.tasks',$scope.tasks);

            $scope.pages = $data.pages;
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/api/admin/task/?page="+$scope.pages.previous, {
            params: $params
        }).success(function($data){
        	$scope.tasks = $data.tasks;
        	for(var i = 0; i<$scope.tasks.length; i++){        		
        		$scope.tasks[i]["status"] = TaskStatus.get($scope.tasks[i].status);
        		$scope.tasks[i]["type"] = ProjectType.get($scope.tasks[i].type);
        	}
			console.info('$scope.tasks',$scope.tasks);

            $scope.pages = $data.pages;
        });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		var $params = $scope.searchParams;
		$http.get("/api/admin/task/?page="+ (int_index*1 + 1), {
            params: $params
        }).success(function($data){
        	$scope.tasks = $data.tasks;
        	for(var i = 0; i<$scope.tasks.length; i++){        		
        		$scope.tasks[i]["status"] = TaskStatus.get($scope.tasks[i].status);
        		$scope.tasks[i]["type"] = ProjectType.get($scope.tasks[i].type);
        	}
			console.info('$scope.tasks',$scope.tasks);
            $scope.pages = $data.pages;
        });
	}
	$scope.onBtnNextClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/api/admin/task/?page="+ $scope.pages.next, {
            params: $params
        }).success(function($data){
        	$scope.tasks = $data.tasks;
        	for(var i = 0; i<$scope.tasks.length; i++){        		
        		$scope.tasks[i]["status"] = TaskStatus.get($scope.tasks[i].status);
        		$scope.tasks[i]["type"] = ProjectType.get($scope.tasks[i].type);
        	}
			console.info('$scope.tasks',$scope.tasks);

            $scope.pages = $data.pages;
        });
	}
	
	 $scope.search = function () {
	    	//alert($scope.filter.email);
		 $scope.searchParams = {
			        'search': 1,
			        'bsearch': $scope.filter.bsearch,
			        'task_id': null,
			        'startDate': null,
			        'reference': null,
			        'dueDate': null,
			        'status' : null,
		 };
		 console.info('params',$scope.searchParams)
	        $scope.selectPage( 1 );
	 }
	 
	 $scope.advancedSearch = function () {
			 $scope.searchParams = {
					 	'search': 1,
				        'task_id': $scope.filter.taskId,
				        'startDate': $scope.filter.startDate,
				        'reference': $scope.filter.reference,
				        'dueDate': $scope.filter.dueDate,
				        'status' : $scope.filter.taskStatus,
				        'payStatus' : $scope.filter.payStatus,
				        'source' : $scope.filter.source,
				        'target' : $scope.filter.target,
				        'field' : $scope.filter.field,
				        'pm' : $scope.filter.pm,
			 };
			 console.info('params',$scope.searchParams)
	        $scope.selectPage(1);
	}
	
	 $scope.reset = function () {
	        $scope.searchParams = {
	        		 'search': null,
	     	        'task_id': null,
	     	        'startDate': null,
	     	        'reference': null,
	     	        'dueDate': null,
	     	        'status' : null,
	     	        'payStatus' : null,
	     	        'source' : null,
	     	        'target' : null,
	     	        'field' : null,
	     	        'pm' : null,
	        };
	        
	        $scope.filter.taskId = null;
	        $scope.filter.startDate = null;
	        $scope.filter.reference = null;
	        $scope.filter.dueDate = null;
	        $scope.filter.taskStatus = null;
	        $scope.filter.payStatus = null;
	        $scope.filter.source = null;
	        $scope.filter.target = null;
	        $scope.filter.field = null;
	        $scope.filter.pm = null;
	        
	        $scope.selectPage(1);
	    }
	 
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
	
  	init();
	
});