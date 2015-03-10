/**
 * Created by eastagile on 11/11/14.
 */
angularApp.controller('QuotePrintController', function($scope, $http, $location, ProjectApi, DateFormatter, ProjectStatus,
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
	$scope.telephone = [];
	
	$scope.itermtm = [];
	$scope.subtotal_tmp = 0;
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
			$scope.currency = $scope.project.currency;
			console.log("scope.project");
			console.log($scope.project);

            jQuery.extend($scope.tempProject, $scope.project);
        });
		
		
        
		var pm_listener = $http.get("/" + LANG_CODE + "/admin/staff/getPmList")
            .success( function ( $data ) {
                $scope.pms = $data.pmlist;
            });

        var sales_listener = $http.get("/" + LANG_CODE + "/admin/staff/getSalesList")
            .success( function ( $data ) {
                $scope.sales = $data.saleslist;
            });
		//get company info
		 var companyinfo = $http.get("/api/papertask/companyinfo").success(function($data){
            $scope.companyinfo = $data['companyinfo'];
			$scope.companyinfo1 = $scope.companyinfo[0];
			console.log("companyinfo");
			console.log($scope.companyinfo1);
        }).error(function($e){
            alert('error');
        });	
		//get bank info
		$http.get("/api/papertask/bankinfo").success(function($data){
            $scope.bankinfo = $data['bankinfo'];
			$scope.bankinfo1 = $scope.bankinfo[0];
			$scope.bankinfo2 = $scope.bankinfo[1];
			
			console.log("bankinfo");
			console.log($scope.bankinfo1);
			console.log($scope.bankinfo2);
        }).error(function($e){
            alert('error');
        });		
		
        var client_listener = ClientApi.list({}, function($clients){
            $scope.clients = $clients;
        });

        var field_listener = FieldApi.list({}, function($fields){
            $scope.fields = $fields;
        });

        $q.all([project_listener, field_listener, pm_listener, sales_listener, client_listener, companyinfo])
            .then(function(){
                $scope.project.field = search_by_id($scope.fields, $scope.project.field.id);
				console.log("project.pm");	
				console.log($scope.project.pm);	
				console.log($scope.pms);	
                $scope.project.pm = search_by_id($scope.pms, $scope.project.pm.id);
				if($scope.project.sale)
					$scope.project.sale = search_by_id($scope.sales, $scope.project.sale.id);
				
                $scope.project.client = search_by_id($scope.clients, $scope.project.client.id);
				console.log("$scope.project.client");	
				console.log($scope.project.client);	
                var itemnotm_listener = $http.get('/api/admin/projectitermnotm?projectId='+ projectId).success(function($data) {
					$scope.itermnotms = $data['Itermnotms'];
					
					// arrange itermnotms based language
					
					$scope.itermnotmsnews = arrangeItem($data['Itermnotms']);
					console.log("scope.itermnotms");
					console.log($scope.itermnotms);	
					
					console.log("scope.itermnotmsnews");
					console.log($scope.itermnotmsnews);			
				});
				var itemtm_listener = $http.get('/api/admin/projectitermtm?projectId='+ projectId).success(function($data) {
					$scope.itemtms = arrangeItem($data['Itermtms']);
					console.log("scope.itemtms");
					console.log($scope.itemtms);		
				});
				
				var itermdtpmacs_listener = $http.get('/api/admin/projectitermdtpmac?projectId='+ projectId).success(function($data) {
					$scope.itermdtpmacs = arrangeItem($data['Itermdtpmacs'], 'dtpUnits');
					console.log("scope.itermdtpmacs");
					console.log($scope.itermdtpmacs);		
				});
				
				var itermdtppcs_listener = $http.get('/api/admin/projectitermdtppc?projectId='+ projectId).success(function($data) {
					$scope.itermdtppcs = arrangeItem($data['Itermdtppcs'], 'dtpUnits');
					console.log("scope.itermdtppcs");
					console.log($scope.itermdtppcs);			
				});
				
				var itermengineerings_listener = $http.get('/api/admin/projectitermengineering?projectId='+ projectId).success(function($data) {
					$scope.itermengineerings = arrangeItem($data['Itermengineerings'], 'engineeringUnits');
					console.log("scope.itermengineerings");
					console.log($scope.itermengineerings);			
				});
				
				var iterminterpretings_listener = $http.get('/api/admin/projectiterminterpreting?projectId='+ projectId).success(function($data) {
					$scope.iterminterpretings = arrangeItem($data['Iterminterpretings'], 'interpretingUnits');
					console.log("scope.iterminterpretings");
					console.log($scope.iterminterpretings);			
				});
				
				var invoice_listener = $http.get('/api/admin/invoice?projectId='+ projectId).success(function($data) {
					$scope.invoice = $data['invoices'];
					if($scope.invoice.invoiceDate)
					$scope.invoice.invoiceDate = $scope.invoice.invoiceDate.date;
					
					console.log("scope.invoice");
					//console.log($data);	
					console.log($scope.invoice);			
				});
				
				$scope.project.types = ProjectType.find($scope.project.types.sort())
				
				/** order information condition **/
				$scope.hasTypeTranslationNoTM = function(){
					return existsIdInArray($scope.project.types, 1);
				};
				$scope.hasTypeTranslationUseTM = function(){
					return existsIdInArray($scope.project.types, 2);
				};
				$scope.hasTypeTranslationShow = function(){
					return $scope.hasTypeTranslationUseTM() || $scope.hasTypeTranslationNoTM();
				};
				$scope.hasTypeDesktopPublishingMacOrWin = function(){
					return $scope.hasTypeDesktopPublishingMac() || $scope.hasTypeDesktopPublishingWin();
				};
				$scope.hasTypeDesktopPublishingMac = function(){
					return existsIdInArray($scope.project.types, 4)
				};
				$scope.hasTypeDesktopPublishingWin = function(){
					return existsIdInArray($scope.project.types, 5)
				};
				$scope.hasTypeDesktopPublishingEngineer = function(){
					return existsIdInArray($scope.project.types, 6);
				};
				
                jQuery.extend($scope.tempProject, $scope.project);
				$q.all([itemnotm_listener, itemtm_listener, itermdtpmacs_listener, itermdtppcs_listener, itermengineerings_listener, iterminterpretings_listener, invoice_listener])
				.then(function(){
					window.print();
				});
            });
			
			
    }

	
	function existsIdInArray(arr, id){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].id == id){
                return true;
            }
        }
        return false;
    }
	
	
	function arrangeItem(Itemr, unit) {
		$scope.itermtmnew = [];
		for(var i = 0; i < $scope.project.targetLanguages.length; i++)
		{
			$scope.itermtmnew[$scope.project.targetLanguages[i].id] = [];
			for(var j = 0; j < Itemr.length; j++){
				if(Itemr[j].language.id == $scope.project.targetLanguages[i].id){
					$scope.subtotal_tmp = $scope.subtotal_tmp + parseFloat(Itemr[j].total);
					var total = Number(Itemr[j].total);
					var rate = Number(Itemr[j].rate);
					var subtotal_tmp = Number($scope.subtotal_tmp);
					console.log(total);					
					Itemr[j].total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
					console.log(Itemr[j].total);
					Itemr[j].rate_tmp = Itemr[j].rate;
					Itemr[j].rate = $scope.currency + " " + rate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					//set unit
					if(unit == 'interpretingUnits'){
						if(Itemr[j].unit == 1) 
							Itemr[j].unit = 'Day';
						else Itemr[j].unit = 'Half Day';
					}	
					else if(unit == 'engineeringUnits'){
						if(Itemr[j].unit == 1) 
							Itemr[j].unit = 'Page';
						else if(Itemr[j].unit == 2) 
							Itemr[j].unit = 'Graphic';
						else if(Itemr[j].unit == 3) 
							Itemr[j].unit = 'Hour';
						else  if(Itemr[j].unit == 4) 
							Itemr[j].unit = 'Day';		
						else Itemr[j].unit = 'Month';
					}		
					else if(unit == 'dtpUnits'){
						if(Itemr[j].unit == 1) 
							Itemr[j].unit = 'Hour';
						else Itemr[j].unit = 'Page';
					}
					$scope.subtotal = $scope.currency + " " + subtotal_tmp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					var tax = Number((subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
					$scope.tax = $scope.currency + " " + tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					
					var total = Number(subtotal_tmp - $scope.project.discount + (subtotal_tmp - $scope.project.discount)* $scope.project.tax/100);
					$scope.total = $scope.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					$scope.itermtmnew[$scope.project.targetLanguages[i].id].push(Itemr[j]);
				}	
			}
		}
        return $scope.itermtmnew;
    }

    function getOnlyFields($object, $fields){
        var data = {};
        for(var i = 0; i < $fields.length; i++){
            var field = $fields[i];
            data[field] = $object[field];
        }
        return data;
    }

   

    init();
});
