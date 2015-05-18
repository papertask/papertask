angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('DashboardFreelancerTaskControler', function($scope, $http, $timeout, $q, StaffApi, TaskStatus, ProjectType, 
											ProjectStatus,ProjectField, DateFormatter) {
	$scope.ProjectType = ProjectType;
	$scope.DateFormatter = DateFormatter;
	$scope.TaskStatus = TaskStatus;
	$scope.staskStatuses = TaskStatus.all();
	$scope.filter = {
			bsearch : null,
			taskId : null,
			reference : null,
			dueMonth : null,
	};

	$scope.searchParams = {
	        'search': null,
	        'bsearch': null,
	        'task_id': null,
	        'reference': null,
	        'dueMonth': null,
	    };
	
	function init(){	
		//get assinging task
  		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?statustask=6&page="+'1'+"&freelancer_id="+FREELANCER_ID, {
            //params: $params
        }).success(function($data){
        	$scope.assigingtasks = $data.tasks;
			console.log($scope.assigingtasks);
        });
		
		//get ongoing task
  		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?statustask=2&page="+'1'+"&freelancer_id="+FREELANCER_ID, {
            //params: $params
        }).success(function($data){
        	$scope.ongoingtasks = $data.tasks;
        });
		
		//get reviewing task
  		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?statustask=7&page="+'1'+"&freelancer_id="+FREELANCER_ID, {
            //params: $params
        }).success(function($data){
        	$scope.reviewingtasks = $data.tasks;
        });
		
		//get unpaid tasks
		$http.get("/" + LANG_CODE + "/admin/task/getFreelancerTaskList?paystatus=1&page="+'1'+"&freelancer_id="+FREELANCER_ID, {
            //params: $params
        }).success(function($data){
        	$scope.unpaidtasks = $data.tasks;
        });
		
  	}
  	
	
	$scope.View = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/task/detail/?id=" + task_id;
	}
	
	$scope.gotoWaitingTask = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/task/freelancer-task-view";
	}
	$scope.gotoReviewTask = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/task/freelancer-task-view";
	}
	$scope.gotoOngoingTask = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/task/freelancer-task-view";
	}
	
	$scope.Accept = function(task_id){
		$http.get("/" + LANG_CODE + "/admin/task/FreelancerAcceptTask?id="+ task_id, {
           // params: $params
        }).success(function($data){
        	location.reload();
        });
	}
	
	
	
	
  	init();
	
});