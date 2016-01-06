/**
 * Created by eastagile on 11/11/14.
 */

angularApp.controller('DashboardProjectController', function($scope, ProjectServiceLevel,$q,
                                                         ProjectStatus, ProjectType, DateFormatter, CurrentUser, PayStatus,
                                                         ProjectField, $http){

    $scope.CurrentUser = CurrentUser;
    $scope.DateFormatter = DateFormatter;
    $scope.ProjectServiceLevel = ProjectServiceLevel;
    $scope.ProjectStatus = ProjectStatus;
    $scope.PayStatus = PayStatus;
    $scope.ProjectField = ProjectField;
    $scope.ProjectType = ProjectType;

    /** This is for listing item controller **/
	 
	//get 
	$http.get("/api/admin/project/?quote=1&number=5&page=1")
	    .success(function($data){
	        $scope.quoteprojects = $data.projects;
	            
	});
	
	$http.get("/api/admin/project/?statusproject=3&number=5&page=1")
	    .success(function($data){
	        $scope.ongoingprojects = $data.projects;
	            
	});
	
	$http.get("/api/admin/project/?statusproject=4&number=5&page=1")
	    .success(function($data){
	        $scope.reviewprojects = $data.projects;
	            
	});
	
	$http.get("/api/admin/project/?statusproject=6&number=5&page=1")
    .success(function($data){
        $scope.rejectedprojects = $data.projects;
            
});
	
	$http.get("/api/admin/project/?unpay=1&number=5&page=1")
	    .success(function($data){
	        //$scope.unpayprojects = $data.projects;
			
			
			$scope.projects_tmp = $data.projects;
 			$scope.unpayprojects = [];
 			angular.forEach($scope.projects_tmp, function(element) {
			var project =  [];
			project = element;
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
					$scope.unpayprojects.push(project);
				});
				
 			});
	            
	});

	function getTotalItem(Itemr, project) {
		$scope.subtotal_tmp = 0;
		for(var j = 0; j < Itemr.length; j++){
			$scope.subtotal_tmp = $scope.subtotal_tmp + parseFloat(Itemr[j].total);
		}
		
        return $scope.subtotal_tmp;
    }

    $scope.goToQuote = function($project){
        location.href = "/" + LANG_CODE + "/admin/project/quote-detail?id=" + $project.id;
    };
	
    $scope.goToDetail = function($project){
        location.href = "/" + LANG_CODE + "/admin/project/detail?id=" + $project.id;
    };
	
	$scope.gotoQuotingProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-quotes/";
    };
    $scope.gotoOngoignProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-ongoing-projects/";
    };
	$scope.gotoReviewProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-review-projects/";
    };
	$scope.gotoCompleteProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-completed-projects/";
    };
	
    $scope.gotoRejectedProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/index/";
    };
	
    $scope.gotoUnpaidProject = function(){
        location.href = "/" + LANG_CODE + "/admin/finance/client-unpaid-project/";
    };
	
	
	
	$scope.quoteAccepted= function ($project) {
		var updateInvoiceDate = $http.put("/api/admin/project/" + $project.id + "?action=2&lang_code=" + LANG_CODE, $project)
		.success( function ( $data ) {
			//show tap
			location.reload();
			//$project.status = ProjectStatus.get(2);
		});	
	}

});
