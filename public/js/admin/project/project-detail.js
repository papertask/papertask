/**
 * Created by eastagile on 11/11/14.
 */
angularApp.controller('ProjectDetailController', function($scope, $location, ProjectApi, DateFormatter, ProjectStatus,
                                                          ProjectServiceLevel, ProjectPriority, StaffApi, ClientApi,
                                                          FieldApi){

    $scope.DateFormatter = DateFormatter;
    $scope.ProjectStatus = ProjectStatus;
    $scope.ProjectServiceLevel = ProjectServiceLevel;
    $scope.ProjectPriority = ProjectPriority;
    $scope.FieldApi = FieldApi;

    $scope.tempProject = {};
    $scope.clients = [];
    $scope.sales = [];
    $scope.pms = [];
    $scope.fields = [];

    var params = $location.search();
    var projectId = params['id'];
    function init(){
        ProjectApi.get(projectId, function($project){
            $scope.project = $project;

            $scope.tempProject = {};
            jQuery.extend(true, $scope.tempProject, $scope.project);
        });

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

        ClientApi.list({}, function($clients){
            $scope.clients = $clients;
        });

        FieldApi.list({}, function($fields){
            $scope.fields = $fields;
        });
    }

    function showEdit(){
        jQuery("#edit_project").collapse("toggle");
    }

    $scope.showEdit = showEdit;

    init();
});