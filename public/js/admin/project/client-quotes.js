/**
 * Created by eastagile on 11/11/14.
 */

angularApp.controller('ProjectIndexController', function($scope, StaffApi, LanguageApi, ProjectApi, ProjectServiceLevel,
                                                         ProjectStatus, DateFormatter, CurrentUser, PayStatus,
                                                         ProjectField, $http){

    $scope.CurrentUser = CurrentUser;
    $scope.DateFormatter = DateFormatter;
    $scope.ProjectApi = ProjectApi;
    $scope.ProjectServiceLevel = ProjectServiceLevel;
    $scope.ProjectStatus = ProjectStatus;
    $scope.PayStatus = PayStatus;
    $scope.ProjectField = ProjectField;
    $scope.StaffApi = StaffApi;

    /** This is for listing item controller **/
	 
	//console.log($scope.listgoing);
    $scope.ItemApi = ProjectApi;
	$scope.ItemApi.quote = 1;

    $scope.languages = {};
    $scope.pms = {};
    $scope.sales = {};

    $scope.goToQuote = function($project){
        location.href = "/" + LANG_CODE + "/admin/project/quote-detail?id=" + $project.id;
    };

	
	$scope.quoteAccepted= function ($project) {
		console.log($project);
		var updateInvoiceDate = $http.put("/api/admin/project/" + $project.id + "?action=2", $project)
		.success( function ( $data ) {
			//show tap
			location.reload();
			//$project.status = ProjectStatus.get(2);
		});	
	}

    StaffApi.list({
        type: 2
    }, function($pms){
        $scope.pms = $pms;
    });

    StaffApi.list({
        type: 1
    }, function($sales){
        $scope.sales = $sales;
    });

    LanguageApi.list({}, function($languages){
        $scope.languages = $languages;
    })
});