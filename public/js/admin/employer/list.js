angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('PapertaskEmployerListController', function($scope, $http, $timeout, $q) {
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
		$http.get("/api/user/employer?page=1")
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.employers = $data.employers;
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
	
	$scope.onViewClicked = function ( str_empid ) {
		document.location.href = "/" + LANG_CODE + "/admin/employer/detail?id=" + str_empid;
	}
	$scope.onEditClicked = function ( str_empid ) {
		document.location.href = "/" + LANG_CODE + "/admin/employer/edit?userId=" + str_empid;
	}
	$scope.onDeleteClicked = function ( str_empid ) {
        bootbox.confirm ( DELETE_CONFIRM_TEXT, function ( bflag ) {
            if ( bflag ) {
                var delEmp = $http.delete("/api/user/" + str_empid + "/employer", {id: str_empid});
                $q.all([delEmp])
                .then(function(result){
                    $http.get("/api/user/employer?page=1")
                        .success(function($data){
                            $scope.pages = $data.pages;
                            $scope.employers = $data.employers;
                    });
                });      
            }
        })		
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

        $http.get("/api/user/employer", {
            params: $params
        }).success(function($data){
            $scope.employers = $data.employers;
            $scope.pages = $data.pages;
            if($data['pages']){
                var N = $scope.pages.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
        });
    }
	$scope.onBtnPreviousClicked = function () {
		$http.get("/api/user/employer?page="+ $scope.pages.previous)
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.employers = $data.employers;
	    });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		$http.get("/api/user/employer?page="+ (int_index*1 + 1))
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.employers = $data.employers;
	    });
	}
	
	$scope.onBtnNextClicked = function () {
		$http.get("/api/user/employer?page="+ $scope.pages.next)
	        .success(function($data){
	            $scope.pages = $data.pages;
	            $scope.employers = $data.employers;
	    });
	}
	
});