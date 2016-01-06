angularApp.run( function ( $rootScope ) {    
	$("#form").validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {
            confirmpwd: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function( form ) {
            angular.element('#AddIncomeController').scope().submit();
        }
    });
}) 

angularApp.controller('OutgoingDetailController', function($scope, $http, $timeout, $q, StaffApi, ProjectStatus,ProjectField, DateFormatter) {
	$scope.DateFormatter = DateFormatter;
	$scope.ProjectStatus = ProjectStatus;
	$scope.StaffApi = StaffApi;
	$scope.ProjectField = ProjectField;
	$scope.companies 	= [];
	$scope.countries 	= [];
	$scope.pages 		= [];
	$scope.employers 	= [];
	$scope.intransaction = {
		itemlist : [],
		total : 0,
		subtotal : 0,
		transactionfee : 0,
	}
	$scope.searchParams = {
        'search': null,
        'name': null,
        'idEmployer': null,
        'email': null,
        'country': null,
        'includeInactive': null,
        'currency': null,
        'page': null,
        'company': null
    };
	$scope.init = function () {
		// get transaction
		var ajaxTransaction = $http.get("/" + LANG_CODE + "/admin/finance/getTransactionTask?id="+TRANSID)
            .success( function ( $data ) {
			
			$scope.transaction = $data.transaction;
			
			//if()
			$scope.subtotal_show =  format2n(Number($scope.transaction.subtotal));
			
			$scope.fee_show =  format2n(Number($scope.transaction.fee));
			$scope.total_show =  format2n(Number($scope.transaction.total));
			$scope.tasks = $data.tasks;
			
        });
		//get company info 
		var companyinfo = $http.get("/api/papertask/companyinfo").success(function($data){
            $scope.companyinfo = $data['companyinfo'];
			$scope.companyinfo1 = $scope.companyinfo[0];
			
	        }).error(function($e){
            alert('error');
        });	
		//get bank info
		$http.get("/api/papertask/bankinfo").success(function($data){
            $scope.bankinfos = $data['bankinfo'];
			
        }).error(function($e){
            alert('error');
        });		
		

	}
	function format2n(n) {
		return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	
});