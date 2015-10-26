angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('TaskPool', function($scope, $http, $timeout, $q, StaffApi, TaskStatus, ProjectType, ProjectStatus,ProjectField, DateFormatter) {
	
	$scope.staskStatuses = TaskStatus.all();
	
	function init(){		
		//var $params = $scope.searchParams;
		
  		$http.get("/" + LANG_CODE + "/admin/task/getTaskPoolList?page="+'1', {
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
 				//alert(task);
 				
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
  	}
  	
	
	$scope.View = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/task/detail/?id=" + task_id;
	}
	
	$scope.Accept = function(task_id){
		$http.get("/" + LANG_CODE + "/admin/task/FreelancerAcceptPoolingTask?id="+ task_id, {
           // params: $params
        }).success(function($data){
        	angular.forEach($scope.tasks, function(element,key) {
				 if(element.id==task_id){
					 $scope.tasks[key]["status"] = TaskStatus.get(2);
				 } 

			});
        });
	}
	
	$scope.refresh = function(){
		$scope.selectPage($scope.pages.current);
	}
	
	$scope.selectPage = function($page){
		//var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getTaskPoolList?page="+$page, {
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
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		//var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getTaskPoolList?page="+$scope.pages.previous, {
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
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		//var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getTaskPoolList?page="+ (int_index*1 + 1), {
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
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
	}
	$scope.onBtnNextClicked = function () {
		//var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/task/getTaskPoolList?page="+ $scope.pages.next , {
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
 				$scope.tasks.push(task);
 			});

            $scope.pages = $data.pages;
        });
	}
	
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