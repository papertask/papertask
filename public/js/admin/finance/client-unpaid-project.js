angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('ClientUnpaidProject', function($scope, $http, $timeout, $q, StaffApi, TaskStatus, ProjectType, ProjectStatus,ProjectField, DateFormatter) {
	
	//$scope.staskStatuses = ProjectStatus.all();
	$scope.filter = {
			bsearch : null,
			projectId : null,
			reference : null,
			startDate : null,
			dueDate : null,
	};

	$scope.searchParams = {
	        'search': null,
	        'bsearch': null,
	        'projectId': null,
	        'reference': null,
	        'startDate': null,
	        'dueDate': null,
	    };
	
	function init(){		
		//var $params = $scope.searchParams;
		
  		$http.get("/" + LANG_CODE + "/admin/project/getClientProjectList?payStatus=1&page="+'1', {
            //params: $params
        }).success(function($data){
        	$scope.projects_tmp = $data.projects;
 			$scope.projects = [];
 			angular.forEach($scope.projects_tmp, function(element) {
 				var project =  [];
 				project = element;
 				project['status'] = ProjectStatus.get(element.status);
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
  	}
  		
	
	
	$scope.selectPage = function($page){
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/project/getClientProjectList?payStatus=1&page="+$page, {
            params: $params
        }).success(function($data){
        	$scope.projects_tmp = $data.projects;
 			$scope.projects = [];
 			angular.forEach($scope.projects_tmp, function(element) {
 				var project =  [];
 				project = element;
 				project['status'] = ProjectStatus.get(element.status);
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/project/getClientProjectList?payStatus=1&page="+$scope.pages.previous, {
            params: $params
        }).success(function($data){
        	$scope.projects_tmp = $data.projects;
 			$scope.projects = [];
 			angular.forEach($scope.projects_tmp, function(element) {
 				var project =  [];
 				project = element;
 				project['status'] = ProjectStatus.get(element.status);
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/project/getClientProjectList?payStatus=1&page="+ (int_index*1 + 1), {
            params: $params
        }).success(function($data){
        	$scope.projects_tmp = $data.projects;
 			$scope.projects = [];
 			angular.forEach($scope.projects_tmp, function(element) {
 				var project =  [];
 				project = element;
 				project['status'] = ProjectStatus.get(element.status);
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
	}
	$scope.onBtnNextClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/project/getClientProjectList?payStatus=1&page="+ $scope.pages.next, {
            params: $params
        }).success(function($data){
        	$scope.projects_tmp = $data.projects;
 			$scope.projects = [];
 			angular.forEach($scope.projects_tmp, function(element) {
 				var project =  [];
 				project = element;
 				project['status'] = ProjectStatus.get(element.status);
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	 $scope.search = function () {
	    	//alert($scope.filter.email);
		 $scope.searchParams = {
			        'search': 1,
			        'bsearch': $scope.filter.bsearch,
			        'projectId': null,
			        'reference': null,
			        'startDate': null,
			        'dueDate': null,
		 };
		 console.info('params',$scope.searchParams)
	        $scope.selectPage( 1 );
	 }
	 
	 $scope.advancedSearch = function () {
			 $scope.searchParams = {
				        'search': 1,
				        'bsearch': null,
				        'projectId': $scope.filter.projectId,
				        'reference': $scope.filter.reference,
				        'startDate': $scope.filter.startDate,
				        'dueDate': $scope.filter.dueDate,
			 };
			 console.info('params',$scope.searchParams)
	        $scope.selectPage(1);
	}
	
	 $scope.reset = function () {
	        $scope.searchParams = {
	            'search': null,
		        'bsearch': null,
		        'projectId': null,
		        'reference': null,
		        'startDate': null,
		        'dueDate': null,
	        };
	        
	        if(typeof $scope.filter != "undefined"){
		        angular.forEach($scope.filter, function(key,value){
		        	$scope.filter.key = null;
		        });
		        
		        $scope.filter.bsearch = null;
		        $scope.filter.projectId = null;
		        $scope.filter.reference = null;	
		        $scope.filter.startDate = null;
		        $scope.filter.dueDate = null;

	        }
	        
	        $scope.selectPage(1);
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