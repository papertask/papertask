angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('ReportController', function($scope, $http, $timeout, $q, StaffApi, PayStatus, LanguageApi, 
		ProjectType, ProjectStatus,ProjectField, DateFormatter, Currency, FieldApi) {
	$scope.DateFormatter = DateFormatter;
	$scope.ProjectStatus = ProjectStatus.all();
	$scope.StaffApi = StaffApi;
	$scope.LanguageApi = LanguageApi;
	$scope.FieldApi = FieldApi;
	$scope.PayStatus = PayStatus.all();
	$scope.Currency = Currency;
	$scope.ProjectField = ProjectField;
	$scope.companies 	= [];
	$scope.countries 	= [];
	$scope.pages 		= [];
	$scope.employers 	= [];
	$scope.count_pu = {};
	$scope.count_pp = {};
	$scope.currency = 'USD';
	$scope.searchParams = {
        'search': null,
        'advSearch': null,
        'project_id': null,
        'reference': null,
        'field': null,
        'source': null,
        'target': null,
        'status': null,
        'startDate': null,
        'dueDate': null,        
        'payStatus': null,
        'clientId': null,
        'company': null,
        'invoiceDate': null,
        'pm': null,
        'sales': null,
        'reportStart': null,
        'reportEnd': null,
        'monthSelect': null,
    };
	
	$scope.filter = {
	        'search': null,
	        'advSearch': null,
	        'project_id': null,
	        'reference': null,
	        'field': null,
	        'source': null,
	        'target': null,
	        'status': null,
	        'startDate': null,
	        'dueDate': null,        
	        'payStatus': null,
	        'clientId': null,
	        'company': null,
	        'invoiceDate': null,
	        'pm': null,
	        'sales': null,
	        'reportStart': null,
	        'reportEnd': null,
	        'monthSelect': null,
	    };
	
	
	$scope.init = function () {
	console.log($scope.currency);
		var getCurrencyRate =  $http.get("/api/papertask/currencyrate").success(function($data){
			$scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.CurrentcyRate = Number($scope.currencyrate_t.currencyRate);
			
        }).error(function($e){
            alert('error');
        });	
		
		// get transaction list
		var ajaxTransactionlist = $http.get("/" + LANG_CODE + "/admin/finance/getTransactionList")
            .success( function ( $data ) {
                $scope.transactionlist = $data.transactionlist;
				$scope.count_pu_cny = $data.count_pu_cny[0];
				if(!$scope.count_pu_cny.balance_pu)
					$scope.count_pu_cny.balance_pu = 0;
				$scope.count_pu_usd = $data.count_pu_usd[0];
				if(!$scope.count_pu_usd.balance_pu)
					$scope.count_pu_usd.balance_pu = 0;
				
				$scope.count_pp_cny = $data.count_pp_cny[0];
				if(!$scope.count_pp_cny.balance_pp)
					$scope.count_pp_cny.balance_pp = 0;
				$scope.count_pp_usd = $data.count_pp_usd[0];
				if(!$scope.count_pp_usd.balance_pp)
					$scope.count_pp_usd.balance_pp = 0;
				
				
				console.log($scope.count_pu_cny);
				console.log($scope.count_pu_usd);
				console.log($scope.count_pp_cny);
				console.log($scope.count_pp_usd);

				
				$scope.pages = $data.pages;
				console.log($data);
            });
		$q.all([getCurrencyRate, ajaxTransactionlist])
            .then(function(){
				//total balance
				$scope.count_pu.balance_pu = Number($scope.count_pu_cny.balance_pu)/$scope.CurrentcyRate +  Number($scope.count_pu_usd.balance_pu);
				$scope.count_pp.balance_pp = Number($scope.count_pp_cny.balance_pp)/$scope.CurrentcyRate +  Number($scope.count_pp_usd.balance_pp);

				$scope.balance_pu = ($scope.currency == 'USD')?format2n(Number($scope.count_pu.balance_pu)):format2n(Number($scope.count_pu.balance_pu)*$scope.CurrentcyRate);
				$scope.balance_pp = ($scope.currency == 'USD')?format2n(Number($scope.count_pp.balance_pp)):format2n(Number($scope.count_pp.balance_pp)*$scope.CurrentcyRate);
				//total project
				$scope.count_pu.num_pu =  Number($scope.count_pu_cny.num_pu) + Number($scope.count_pu_usd.num_pu);
				$scope.count_pp.num_pp =  Number($scope.count_pp_cny.num_pp)  + Number($scope.count_pp_usd.num_pp);
			 
			
			});
		StaffApi.list({
			type: 7
		}, function($pms){
			$scope.pms = $pms;
		});

		StaffApi.list({
			type: 1
		}, function($sales){
			$scope.sales = $sales;
		});
		
		LanguageApi.list({
		}, function($languages){
			$scope.languages = $languages;
			//console.info('languages',$scope.languages );
		});
		
		FieldApi.list({
		}, function($fields){
			$scope.Fields = $fields;
			//console.info('$scope.Fields',$scope.Fields );
		});
		
		$http.get("/api/common/country")
	        .success(function($data){
	            $scope.countries = $data['countries'];
	    });
        var ajaxCompanyInfo = $http.get("/api/common/company")
            .success(function($data){
                $scope.companies = $data['companies'];
            });
        
        $scope.selectPage(1);
       // $scope.getListProject();
		
	}
	
	
	$scope.getListProject = function(){
		$http.get("/api/admin/project")
        .success(function($data){

 			$scope.projects = [];
 			angular.forEach($data.projects, function(element) {
 				  //$scope.tasks.push(element);
 				var project =  [];
 				project = element;
 				
 				project["status"] = ProjectStatus.get(element.status);
 				
 				for(var i=0; i < element.types.length ; i++){
 					project['types'][i] = ProjectType.get(element.types[i]);
 				}
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
            
            //console.info('projects',$scope.projects);
            //console.info('pages', $scope.pages);
            
    });
	}
	
	
	$scope.selectPage = function($page){
		var $params = $scope.searchParams;
		$params['page']=1;
		//console.info('$params',$params);
		//console.info('jQuery.param($params)',jQuery.param($params));

		$http.get("/api/admin/project/?"+jQuery.param($params), {
            
        }).success(function($data){
        	$scope.projects = [];
 			angular.forEach($data.projects, function(element) {
 				  //$scope.tasks.push(element);
 				var project =  [];
 				project = element;
 				
 				project["status"] = ProjectStatus.get(element.status);
 				
 				for(var i=0; i < element.types.length ; i++){
 					project['types'][i] = ProjectType.get(element.types[i]);
 				}
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		var $params = $scope.searchParams;
		$params['page']=$scope.pages.previous;
		$http.get("/api/admin/project/?"+jQuery.param($params), {
            
        }).success(function($data){
        	$scope.projects = [];
 			angular.forEach($data.projects, function(element) {
 				  //$scope.tasks.push(element);
 				var project =  [];
 				project = element;
 				
 				project["status"] = ProjectStatus.get(element.status);
 				
 				for(var i=0; i < element.types.length ; i++){
 					project['types'][i] = ProjectType.get(element.types[i]);
 				}
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		var $params = $scope.searchParams;
		$params['page']=(int_index*1 + 1);
		$http.get("/api/admin/project/?"+jQuery.param($params), {
            
        }).success(function($data){
        	$scope.projects = [];
 			angular.forEach($data.projects, function(element) {
 				  //$scope.tasks.push(element);
 				var project =  [];
 				project = element;
 				
 				project["status"] = ProjectStatus.get(element.status);
 				
 				for(var i=0; i < element.types.length ; i++){
 					project['types'][i] = ProjectType.get(element.types[i]);
 				}
 				$scope.projects.push(project);
 			});

            $scope.pages = $data.pages;
        });
	}
	$scope.onBtnNextClicked = function () {
		var $params = $scope.searchParams;
		$params['page']=$scope.pages.next;
		$http.get("/api/admin/project/?"+jQuery.param($params), {
            
        }).success(function($data){
        	$scope.projects = [];
 			angular.forEach($data.projects, function(element) {
 				  //$scope.tasks.push(element);
 				var project =  [];
 				project = element;
 				
 				project["status"] = ProjectStatus.get(element.status);
 				
 				for(var i=0; i < element.types.length ; i++){
 					project['types'][i] = ProjectType.get(element.types[i]);
 				}
 				$scope.projects.push(project);
 			});
            $scope.pages = $data.pages;
        });
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
	
	function format2n(n) {
		return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	$scope.gotodetail = function ( transaction ) {  
		//console.log(transaction);return;
		if(transaction.typeStatus == 1)
			document.location.href = "/" + LANG_CODE + "/admin/finance/incomming-detail?id=" + transaction.id;
		else 	
			document.location.href = "/" + LANG_CODE + "/admin/finance/outgoing-detail?id=" + transaction.id;
	}
	/**
	 * change currency
	 */
	$scope.changeCurrency = function ( currency ) {
		$scope.currency = currency;
		$scope.balance_pu = ($scope.currency == 'USD')?format2n(Number($scope.count_pu.balance_pu)):format2n(Number($scope.count_pu.balance_pu)*$scope.CurrentcyRate);
		$scope.balance_pp = ($scope.currency == 'USD')?format2n(Number($scope.count_pp.balance_pp)):format2n(Number($scope.count_pp.balance_pp)*$scope.CurrentcyRate);
		//get rate currency
	}
	
	
    
    $scope.advancedSearch = function () {
    	$scope.searchParams = {
    	        'search': null,
    	        'advSearch': 1,
    	        'project_id': $scope.filter.project_id,
    	        'reference': $scope.filter.reference,
    	        'field': $scope.filter.field,
    	        'source': $scope.filter.source,
    	        'target': $scope.filter.target,
    	        'status': $scope.filter.status,
    	        'startDate': $scope.filter.startDate,
    	        'dueDate': $scope.filter.dueDate,        
    	        'payStatus': $scope.filter.payStatus,
    	        'clientId': $scope.filter.clientId,
    	        'company': $scope.filter.company,
    	        'invoiceDate': $scope.filter.invoiceDate,
    	        'pm': $scope.filter.pm,
    	        'sale': $scope.filter.sale,
    	        'reportStart': $scope.filter.reportStart,
    	        'reportEnd': $scope.filter.reportEnd,
    	        'monthSelect': $scope.filter.monthSelect,
    	    };
		//console.log($scope.filter.typeStatus);
		//return;
        $scope.selectPage( 1 );
    }
    
    $scope.reset = function () {
        $scope.searchParams = {
        		'search': null,
    	        'advSearch': 1,
    	        'project_id': null,
    	        'reference': null,
    	        'field': null,
    	        'source': null,
    	        'target': null,
    	        'status': null,
    	        'startDate': null,
    	        'dueDate': null,        
    	        'payStatus': null,
    	        'clientId': null,
    	        'company': null,
    	        'invoiceDate': null,
    	        'pm': null,
    	        'sale': null,
    	        'reportStart': null,
    	        'reportEnd': null,
    	        'monthSelect': null,
        };
        
			        $scope.filter.search = null;
			        $scope.filter.project_id = null;
			        $scope.filter.reference = null;
			        $scope.filter.field = null;
			        $scope.filter.source = null;
			        $scope.filter.target = null;
			        $scope.filter.status = null;
			        $scope.filter.startDate = null;
			        $scope.filter.dueDate = null;        
			        $scope.filter.payStatus = null;
			        $scope.filter.clientId = null;
			        $scope.filter.company = null;
			        $scope.filter.invoiceDate = null;
			        $scope.filter.pm = null;
			        $scope.filter.sale = null;
			        $scope.filter.reportStart = null;
			        $scope.filter.reportEnd = null;
			        $scope.filter.monthSelect = null;
        
        $scope.selectPage(1);
    }
	$scope.search = function () {
		
        $scope.searchParams = {
            'reference':  $scope.filter.search,
        };		
        $scope.selectPage(1);
    }
	
	
});