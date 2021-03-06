/**
 * Created by eastagile on 11/11/14.
 */

angularApp.controller('DashboardProjectController', function($scope, ProjectServiceLevel,
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
	
	//Unassigned Projects  unassigned=7 + pooling=8
	$http.get("/api/admin/project/?statusproject=7and8&number=5&page=1")
    .success(function($data){
        $scope.unassignedprojects = $data.projects;
    });
	
	//rejectedprojects
	$http.get("/api/admin/project/?statusproject=6&number=5&page=1")
    .success(function($data){
        $scope.rejectedprojects = $data.projects;
    });
	
	
	
	$http.get("/api/admin/project/?unpay=1&number=5&page=1")
	    .success(function($data){
	        $scope.unpayprojects = $data.projects;
	});

    $scope.goToQuote = function($project){
        location.href = "/" + LANG_CODE + "/admin/project/quote-detail?id=" + $project.id;
    };
	
	$scope.gotoQuotingProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-quotes/";
    };
	$scope.gotoReviewProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-review-projects/";
    };
	$scope.gotoCompleteProject = function(){
        location.href = "/" + LANG_CODE + "/admin/project/client-completed-projects/";
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
