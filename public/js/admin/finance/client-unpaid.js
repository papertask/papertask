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
		var ajaxProjectUnpaidlist = $http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList")
            .success( function ( $data ) {
			$scope.pages = $data.pages;
                $scope.pus_tmp = $data.pus;
				$scope.pus = [];
				angular.forEach($scope.pus_tmp, function(element) {
				  $scope.pus.push(element);
				});	
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
        $scope.selectPage( 1 );
    }
    
    $scope.reset = function () {
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
        $scope.selectPage(1);
    }
	$scope.selectPage = function($page){
        // check search
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
        }

        $http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList", {
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
		$http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+ $scope.pages.previous)
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
		$http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+ (int_index*1 + 1))
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
		$http.get("/" + LANG_CODE + "/admin/finance/getProjectUnpaidList?page="+ $scope.pages.next)
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