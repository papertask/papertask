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
	$scope.itermnotmsnews = [];	
	$scope.itemtms = [];	
	$scope.itermdtpmacs = [];	
	$scope.itermdtppcs = [];	
	$scope.itermengineerings = [];	
	$scope.iterminterpretings = [];
	function init(){		
		//var $params = $scope.searchParams;
		
  		$http.get("/" + LANG_CODE + "/admin/project/getClientProjectList?payStatus=1&page="+'1', {
            //params: $params
        }).success(function($data){
        	$scope.projects_tmp = $data.projects;
 			$scope.projects = [];
			/*var total_itermnotmsnews=[];
			var total_itemtms=[];
			var total_itermdtpmacs=[];
			var total_itermdtppcs=[];
			var total_itermengineerings=[];
			var total_iterminterpretings=[];*/
 			angular.forEach($scope.projects_tmp, function(element) {
 				var project =  [];
 				project = element;
			/*$scope.itermnotmsnews = 0;
			$scope.itemtms = 0;
			$scope.itermdtpmacs = 0;
			$scope.itermdtppcs = 0;
			$scope.itermengineerings = 0;
			$scope.iterminterpretings = 0;*/
			

 				project['status'] = ProjectStatus.get(element.status);
				var  projectId = project.id; 
				var total_itermnotmsnews = $http.get('/api/admin/projectitermnotm?projectId='+ projectId).success(function($data) {
					$scope.itermnotmsnews = getTotalItem($data['Itermnotms'],project);
					//console.log($scope.itermnotmsnews);
				});
				var total_itemtms = $http.get('/api/admin/projectitermtm?projectId='+ projectId).success(function($data) {
					$scope.itemtms = getTotalItem($data['Itermtms'],project);
				});
				var total_itermdtpmacs = $http.get('/api/admin/projectitermdtpmac?projectId='+ projectId).success(function($data) {
					$scope.itermdtpmacs = getTotalItem($data['Itermdtpmacs'], project);
				});
				var total_itermdtppcs = $http.get('/api/admin/projectitermdtppc?projectId='+ projectId).success(function($data) {
					$scope.itermdtppcs = getTotalItem($data['Itermdtppcs'], project);
				});
				var total_itermengineerings = $http.get('/api/admin/projectitermengineering?projectId='+ projectId).success(function($data) {
					$scope.itermengineerings = getTotalItem($data['Itermengineerings'], project);
				});
				var total_iterminterpretings = $http.get('/api/admin/projectiterminterpreting?projectId='+ projectId).success(function($data) {
					$scope.iterminterpretings = getTotalItem($data['Iterminterpretings'], project);
				});
				
				$q.all([total_itermnotmsnews, total_itemtms, total_itermdtpmacs, total_itermdtppcs, total_itermengineerings, total_iterminterpretings])
					.then(function(){
					var subtotal_tmp = $scope.itermnotmsnews + $scope.itemtms + $scope.itermdtpmacs
					+ $scope.itermdtppcs + $scope.itermengineerings + $scope.iterminterpretings;
					var total = Number(subtotal_tmp - project.discount + (subtotal_tmp - project.discount)* project.tax/100);
					project.total_tmp = total.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");;
					/*
					console.log(total);
					console.log("dsdsfsfs");
					console.log($scope.itermnotmsnews );
					console.log($scope.itemtms );
					console.log($scope.itermdtpmacs );
					console.log($scope.itermdtppcs );
					console.log($scope.itermengineerings );
					console.log($scope.iterminterpretings );
					console.log(project.total_tmp);*/
					
					
					//return total;
					//console.log(project.total_tmp);
					$scope.projects.push(project);
				});
				
				//console.log(project);
				//console.log(project);
 				
 			});
			//console.log($scope.projects);	
            $scope.pages = $data.pages;
        });
  	}
  		
	function getTotal(project){
		var  projectId = project.id; 
		var total_itermnotmsnews = $http.get('/api/admin/projectitermnotm?projectId='+ projectId).success(function($data) {
			$scope.itermnotmsnews = getTotalItem($data['Itermnotms'],project);
			//console.log($scope.itermnotmsnews);
		});
		var total_itemtms = $http.get('/api/admin/projectitermtm?projectId='+ projectId).success(function($data) {
			$scope.itemtms = getTotalItem($data['Itermtms'],project);
		});
		var total_itermdtpmacs = $http.get('/api/admin/projectitermdtpmac?projectId='+ projectId).success(function($data) {
			$scope.itermdtpmacs = getTotalItem($data['Itermdtpmacs'], project);
		});
		var total_itermdtppcs = $http.get('/api/admin/projectitermdtppc?projectId='+ projectId).success(function($data) {
			$scope.itermdtppcs = getTotalItem($data['Itermdtppcs'], project);
		});
		var total_itermengineerings = $http.get('/api/admin/projectitermengineering?projectId='+ projectId).success(function($data) {
			$scope.itermengineerings = getTotalItem($data['Itermengineerings'], project);
		});
		var total_iterminterpretings = $http.get('/api/admin/projectiterminterpreting?projectId='+ projectId).success(function($data) {
			$scope.iterminterpretings = getTotalItem($data['Iterminterpretings'], project);
		});
		
		$q.all([total_itermnotmsnews, total_itemtms, total_itermdtpmacs, total_itermdtppcs, total_itermengineerings, total_iterminterpretings])
            .then(function(){
			var total = $scope.itermnotmsnews + $scope.itemtms + $scope.itermdtpmacs + $scope.itermdtppcs + $scope.itermengineerings + $scope.iterminterpretings;
			
			return total;
		});
		
	}
	function getTotalItem(Itemr, project) {
		$scope.subtotal_tmp = 0;
		for(var j = 0; j < Itemr.length; j++){
			$scope.subtotal_tmp = $scope.subtotal_tmp + parseFloat(Itemr[j].total);
		}
		
        return $scope.subtotal_tmp;
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