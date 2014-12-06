/**
 * Created by eastagile on 11/11/14.
 */
angularApp.run(function($rootScope){
    jQuery("#edit_project form").validate();
});

angularApp.controller('ProjectDetailController', function($scope, $location, ProjectApi, DateFormatter, ProjectStatus,
                                                          ProjectServiceLevel, ProjectPriority, StaffApi, ClientApi,
                                                          FieldApi, $q){

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

    function search_by_id($array, $id){
        for(var i = 0; i < $array.length; i++){
            if($array[i].id == $id){
                return $array[i];
            }
        }
    }

    var params = $location.search();
    var projectId = params['id'];
    function init(){
        var project_listener = ProjectApi.get(projectId, function($project){
            $project.priority = ProjectPriority.get($project.priority);
            $project.serviceLevel = ProjectServiceLevel.get($project.serviceLevel);
            $project.status = ProjectStatus.get($project.status);


            $scope.project = $project;

            jQuery.extend($scope.tempProject, $scope.project);
        });

        var pm_listener = StaffApi.list({
            type: 2
        }, function($pms){
            $scope.pms = $pms;
        });

        var sales_listener = StaffApi.list({
            type: 1
        }, function($sales){
            $scope.sales = $sales;
        });

        var client_listener = ClientApi.list({}, function($clients){
            $scope.clients = $clients;
        });

        var field_listener = FieldApi.list({}, function($fields){
            $scope.fields = $fields;
        });

        $q.all([project_listener, field_listener, pm_listener, sales_listener, client_listener])
            .then(function(){
                $scope.project.field = search_by_id($scope.fields, $scope.project.field.id);
                $scope.project.pm = search_by_id($scope.pms, $scope.project.pm.id);
                $scope.project.sale = search_by_id($scope.sales, $scope.project.sale.id);
                $scope.project.client = search_by_id($scope.clients, $scope.project.client.id);

                jQuery.extend($scope.tempProject, $scope.project);
            });
    }

    function showEdit(){
        jQuery("#edit_project").collapse("toggle");
    }

    function getOnlyFields($object, $fields){
        var data = {};
        for(var i = 0; i < $fields.length; i++){
            var field = $fields[i];
            data[field] = $object[field];
        }
        return data;
    }

    function update(){
        if(jQuery("#edit_project form").valid()) {
            var fields = ['client', 'pm', 'sale', 'priority', 'reference', 'field'];
            var data = getOnlyFields($scope.tempProject, fields);

            ProjectApi.update($scope.project.id, data, function () {
                jQuery.extend($scope.project, $scope.tempProject);
                jQuery("#edit_project").collapse("toggle");
            });
        }
    }

    $scope.showEdit = showEdit;
    $scope.update = update;

    init();
});