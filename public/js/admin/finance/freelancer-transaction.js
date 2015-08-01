angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('FreelancerTransaction', function($scope, $http, $timeout, $q, StaffApi, TaskStatus, ProjectType, ProjectStatus,ProjectField, DateFormatter) {
	
	//$scope.staskStatuses = TaskStatus.all();
	$scope.filter = {
			bsearch : null,
			taskId : null,
			outtrId : null,
			payMonth : null
	};

	$scope.searchParams = {
	        'search': null,
	        'bsearch': null,
	        'taskId': null,
	        'outtrId': null,
	        'payMonth': null,
	    };
	
	function init(){		
		//var $params = $scope.searchParams;
		
  		$http.get("/" + LANG_CODE + "/admin/finance/getFreelancerOutTransactionList?page="+'1', {
            //params: $params
        }).success(function($data){
        	$scope.outtrs_tmp = $data.outtrs;
 			$scope.outtrs = [];
 			angular.forEach($scope.outtrs_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var outtr =  [];
 				outtr = element;
 				$scope.outtrs.push(outtr);
 			});

            $scope.pages = $data.pages;
        });
  	}
  	
	
	$scope.View = function(task_id){
		location.href = "/" + LANG_CODE + "/admin/finance/outtransactiondetail/?id=" + task_id;
	}
	

	
	
	$scope.selectPage = function($page){
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/finance/getFreelancerOutTransactionList?page="+$page, {
            params: $params
        }).success(function($data){
        	$scope.outtrs_tmp = $data.outtrs;
 			$scope.outtrs = [];
 			angular.forEach($scope.outtrs_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var outtr =  [];
 				outtr = element;
 				$scope.outtrs.push(outtr);
 			});

            $scope.pages = $data.pages;
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/finance/getFreelancerOutTransactionList?page="+$scope.pages.previous, {
            params: $params
        }).success(function($data){
        	$scope.outtrs_tmp = $data.outtrs;
 			$scope.outtrs = [];
 			angular.forEach($scope.outtrs_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var outtr =  [];
 				outtr = element;
 				$scope.outtrs.push(outtr);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/finance/getFreelancerOutTransactionList?page="+ (int_index*1 + 1) , {
            params: $params
        }).success(function($data){
        	$scope.outtrs_tmp = $data.outtrs;
 			$scope.outtrs = [];
 			angular.forEach($scope.outtrs_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var outtr =  [];
 				outtr = element;
 				$scope.outtrs.push(outtr);
 			});

            $scope.pages = $data.pages;
        });
	}
	$scope.onBtnNextClicked = function () {
		var $params = $scope.searchParams;
		$http.get("/" + LANG_CODE + "/admin/finance/getFreelancerOutTransactionList?page="+ $scope.pages.next , {
            params: $params
        }).success(function($data){
        	$scope.outtrs_tmp = $data.outtrs;
 			$scope.outtrs = [];
 			angular.forEach($scope.outtrs_tmp, function(element) {
 				  //$scope.tasks.push(element);
 				var outtr =  [];
 				outtr = element;
 				$scope.outtrs.push(outtr);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	 $scope.search = function () {
	    	//alert($scope.filter.email);
		 $scope.searchParams = {
			        'search': 1,
			        'bsearch': $scope.filter.bsearch,
			        'taskId': null,
			        'outtrId': null,
			        'payMonth': null,
		 };
		 
	        $scope.selectPage( 1 );
	 }
	 
	 $scope.advancedSearch = function () {
			 $scope.searchParams = {
				        'search': 1,
				        'bsearch': null,
				        'taskId':  $scope.filter.taskId,
				        'outtrId':  $scope.filter.outtrId,
				        'payMonth':  $scope.filter.payMonth,
			 };
			 
	        $scope.selectPage(1);
	}
	
	 $scope.reset = function () {
	        $scope.searchParams = {
	        		'search': null,
	    	        'bsearch': null,
	    	        'taskId': null,
	    	        'outtrId': null,
	    	        'payMonth': null,
	        };
	        
	        if(typeof $scope.filter != "undefined"){
		        angular.forEach($scope.filter, function(key,value){
		        	$scope.filter.key = null;
		        });
		        
		        $scope.filter.bsearch = null;
		        $scope.filter.taskId = null;
		        $scope.filter.outtrId = null;
		        $scope.filter.payMonth = null;	
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