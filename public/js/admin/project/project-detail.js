/**
 * Created by eastagile on 11/11/14.
 */
angularApp.run(function($rootScope){
    jQuery("#edit_project form").validate();
    jQuery("#tasks form").validate();
});

angularApp.controller('ProjectDetailController', function($scope, $location, ProjectApi, DateFormatter, ProjectStatus,
                                                          ProjectServiceLevel, ProjectPriority, StaffApi, ClientApi,
                                                          FieldApi, ProjectType, TaskApi, TaskStatus, $q){

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
    $scope.project = {
        task: []
    }
    function search_by_id($array, $id){
        for(var i = 0; i < $array.length; i++){
            if($array[i].id == $id){
                return $array[i];
            }
        }
    }

    var projectId = PROJECT_ID;
    function init(){
        var project_listener = ProjectApi.get(projectId, function($project){
            $project.priority = ProjectPriority.get($project.priority);
            $project.serviceLevel = ProjectServiceLevel.get($project.serviceLevel);
            $project.status = ProjectStatus.get($project.status);
            $project.tasks = [];

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
                $scope.project.types = ProjectType.find($scope.project.types.sort())

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


angularApp.controller("ProjectTasksController", function($scope, TaskStatus, ProjectType, TaskApi){
    $scope.newTask = {};

    $scope.setItemApi(TaskApi);

    function attachData($task){
        $task.type = ProjectType.get($task.type);
        $task.status = TaskStatus.get($task.status);
    }

    function createTask(){
        if(jQuery("#tasks form").valid()){
            var newTask = $scope.newTask;
            newTask.project_id = $scope.project.id;
            newTask.status = TaskStatus.unassigned;

            TaskApi.create(newTask, function($newTask){
                attachData($newTask);
                $scope.newTask = {};
                $scope.project.tasks.push($newTask);
            });
        }
    }

    function afterLoadItems($tasks){
        for(var i = 0; i < $tasks.length; i++){
            attachData($tasks[i]);
        }
    }
    $scope.custom.afterLoadItems = afterLoadItems;

    $scope.createTask = createTask;

    function sendToSpecialismPool($task){
        TaskApi.update($task.id, {
            is_specialism_pool: 1
        }, function(){
            alert(1);
        });
    }
    $scope.sendToSpecialismPool = sendToSpecialismPool;

    $scope.$watch(function(){
        return $scope.project;
    }, function(){
        if(typeof($scope.project.id) != 'undefined'){
            $scope.filter.project_id = $scope.project.id;
            $scope.refresh();
        }
    });
});