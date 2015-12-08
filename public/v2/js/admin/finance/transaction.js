angularApp.run( function ( $rootScope ) {
	
}) 

angularApp.controller('ClientUnpaidController', function($scope, $http, $timeout, $q, StaffApi, PayStatus, ProjectStatus,ProjectField, DateFormatter, Currency) {
	$scope.DateFormatter = DateFormatter;
	$scope.ProjectStatus = ProjectStatus;
	$scope.StaffApi = StaffApi;
	$scope.PayStatus = PayStatus;
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
				
				
				

				
				$scope.pages = $data.pages;
				
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
	
	function format2n(n) {
		return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
	$scope.gotodetail = function ( transaction ) {  
		
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
            'trans_no': $scope.filter.key,
			'trans_id' : $scope.filter.trans_id,
            'fapiao_no': $scope.filter.fapiao_no,
            'typeStatus': $scope.filter.typeStatus.id,
            'clientId': $scope.filter.clientId,
            'payDate': $scope.filter.payDate,
            'currency': $scope.filter.currency,
            'company': $scope.filter.company,
            'payer': $scope.filter.payer,
            'payee':  $scope.filter.payee,
        };
		
		//return;
        $scope.selectPage( 1 );
    }
    
    $scope.reset = function () {
        $scope.searchParams = {
            'trans_no': null,
			'trans_id' : null,
            'fapiao_no': null,
            'typeStatus': null,
            'clientId': null,
            'payDate': null,
            'currency': null,
            'company': null,
            'payer': null,
            'payee': null
        };
        $scope.selectPage(1);
    }
	$scope.search = function () {
        $scope.searchParams = {
            'trans_no':  $scope.filter.key,
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

        $http.get("/" + LANG_CODE + "/admin/finance/getTransactionList", {
            params: $params
        }).success(function($data){
            $scope.transactionlist = $data.transactionlist;
			$scope.pages = $data.pages;
            if($data['pages']){
                var N = $scope.pages.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
        });
    }
	$scope.onBtnPreviousClicked = function () {
		$http.get("/" + LANG_CODE + "/admin/finance/getTransactionList?page="+ $scope.pages.previous)
	        .success(function($data){
	            $scope.transactionlist = $data.transactionlist;
				$scope.pages = $data.pages;
	    });
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		$http.get("/" + LANG_CODE + "/admin/finance/getTransactionList?page="+ (int_index*1 + 1))
	        .success(function($data){
	            $scope.transactionlist = $data.transactionlist;
				$scope.pages = $data.pages;	

	    });
	}
	$scope.onBtnNextClicked = function () {
		$http.get("/" + LANG_CODE + "/admin/finance/getTransactionList?page="+ $scope.pages.next)
	        .success(function($data){
	            $scope.transactionlist = $data.transactionlist;
				$scope.pages = $data.pages;
	    });
	}
	
});