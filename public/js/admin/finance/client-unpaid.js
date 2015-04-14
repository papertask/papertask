angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('ClientUnpaidController', function($scope, $http, $timeout, $q, StaffApi, ProjectStatus,ProjectField, DateFormatter) {
	$scope.DateFormatter = DateFormatter;
	$scope.ProjectStatus = ProjectStatus;
	$scope.StaffApi = StaffApi;
	$scope.ProjectField = ProjectField;
	$scope.companies 	= [];
	$scope.countries 	= [];
	$scope.pages 		= [];
	$scope.employers 	= [];
	$scope.searchParams = {
        'search': null,
        'email': null,
        'project_id': null,
        'startDate': null,
        'clientId': null,
        'pm': null,
        'reference': null,
        'dueDate': null,
        'company': null,
        'sale': null,
        'field': null,
        'status': null,       
    };
	$scope.bfilter = {'search' : null};
	$scope.init = function () {
		var ajaxProjectUnpaidlist = $http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList")
            .success( function ( $data ) {
			$scope.pages = $data.pages;
                $scope.pus_tmp = $data.pus;
				$scope.pus = [];
				angular.forEach($scope.pus_tmp, function(element) {
				  $scope.pus.push(element);
				});	
				$scope.pages = $data.pages;
				console.log($scope.pus);
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
		
		$http.get("/api/common/country")
	        .success(function($data){
	            $scope.countries = $data['countries'];
	    });
        var ajaxCompanyInfo = $http.get("/api/common/company")
            .success(function($data){
                $scope.companies = $data['companies'];
            });
	}
	
	/**
	 * Get country from country id
	 */
	$scope.getCountry = function ( str_countryid ) {
		if ( $scope.countries.length == 0 || str_countryid == null)
			return '';
		
		var str_label = '';
		
		angular.forEach($scope.countries, function ( v, k ) {
			if ( v.select == str_countryid ) {
				str_label = v.name;
			}
		});
		
		return str_label;
	}
	
	$scope.gotodetail = function ( id ) {
		document.location.href = "/" + LANG_CODE + "/admin/finance/add-incomming?id=" + id;
	}
    
    $scope.advancedSearch = function () {
    	$scope.searchParams = {
    	        'search': 1,
    	        'email': $scope.filter.email,
    	        'project_id': $scope.filter.project_id,
    	        'startDate': $scope.filter.startDate,
    	        'clientId': $scope.filter.clientId,
    	        'pm': $scope.filter.pm,
    	        'reference': $scope.filter.reference,
    	        'dueDate': $scope.filter.dueDate,
    	        'company': $scope.filter.company,
    	        'sale': $scope.filter.sale,
    	        'field': $scope.filter.field,
    	        'status': $scope.filter.status,       
    	    };    	
        $scope.selectPage( 1 );
    }
    
    $scope.search = function () {
    	//alert($scope.filter.email);
    	$scope.searchParams = {
    	        'search': 1,
    	        'email': $scope.filter.email,
    	        'project_id': null,
    	        'startDate': null,
    	        'clientId': null,
    	        'pm': null,
    	        'reference': null,
    	        'dueDate': null,
    	        'company': null,
    	        'sale': null,
    	        'field': null,
    	        'status': null,      
    	    };
        $scope.selectPage( 1 );
    }
    
    $scope.reset = function () {
        $scope.searchParams = {
            'search': null,
            'email': null,
    		        'project_id': null,
    		        'startDate': null,
    		        'clientId': null,
    		        'pm': null,
    		        'reference': null,
    		        'dueDate': null,
    		        'company': null,
    		        'sale': null,
    		        'field': null,
    		        'status': null,     
        };
         
    	 if(typeof $scope.filter != "undefined"){
	         angular.forEach($scope.filter, function(key,value){
	         	$scope.filter.key = null;
	         })
	         
	         $scope.filter.email = null;
	         $scope.filter.project_id = null;
	         $scope.filter.startDate = null;
	         $scope.filter.clientId = null;
	         $scope.filter.pm = null;
	         $scope.filter.reference = null;
	         $scope.filter.dueDate = null;
	         $scope.filter.company = null;
	         $scope.filter.sale = null;
	         $scope.filter.field = null;
	         $scope.filter.status = null;  
    	 }
         
          

        $scope.selectPage(1);
    }
    
    
	$scope.selectPage = function($page){
        // check search
		/*
        var search = 0;
        for(var key in $scope.searchParams) {
            var obj = $scope.searchParams[key];
            if (obj != null) {
                search++;
            }
        };
        if(search > 0){
            $scope.searchParams.page = $page;
            $scope.searchParams.search = 1;
            var $params = $scope.searchParams;
        }else{
            var $params = {page: $page};
        } */
		
		var $params = $scope.searchParams;	
		console.log($params)

        $http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+$page, {
            params: $params
        }).success(function($data){
            $scope.pus_tmp = $data.pus;
			$scope.pus = [];
			angular.forEach($scope.pus_tmp, function(element) {
			  $scope.pus.push(element);
			});
            $scope.pages = $data.pages;
            if($data['pages']){
                var N = $scope.pages.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
        });
    }
	$scope.onBtnPreviousClicked = function () {
		
		var $params = $scope.searchParams;
		console.log($params);  
		
		$http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+ $scope.pages.previous, {
            params: $params
        })
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.pus_tmp = $data.pus;
				$scope.pus = [];
				angular.forEach($scope.pus_tmp, function(element) {
				  $scope.pus.push(element);
				});

	    });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		
		var $params = $scope.searchParams;
		console.log($params);  
		
		$http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+ (int_index*1 + 1), {
            params: $params
        })
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.pus_tmp = $data.pus;
				$scope.pus = [];
				angular.forEach($scope.pus_tmp, function(element) {
				  $scope.pus.push(element);
				});	

	    });
	}
	$scope.onBtnNextClicked = function () {
		
		var $params = $scope.searchParams;
		console.log($params);  
		
		$http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+ $scope.pages.next, {
            params: $params
        })
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.pus_tmp = $data.pus;
				$scope.pus = [];
				angular.forEach($scope.pus_tmp, function(element) {
				  $scope.pus.push(element);
				});

	    });
	}
	

});