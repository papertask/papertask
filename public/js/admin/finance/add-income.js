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

angularApp.controller('AddIncomeController', function($scope, $http, $timeout, $q, StaffApi, ProjectStatus,ProjectField, DateFormatter) {
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
		//get info client
		$scope.intransaction.userid = USER_ID;
		$scope.getUserInfo();
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
            $scope.bankinfos = $data['bankinfo'];
			console.log("bankinfo");
			console.log($scope.bankinfo);
        }).error(function($e){
            alert('error');
        });		
		//get project list
		var ajaxProjectUnpaidlist = $http.get("/" + LANG_CODE + "/admin/finance/getClientUnpaid?id="+ USER_ID)
            .success( function ( $data ) {
                $scope.pus_tmp = $data.projectlist;
				$scope.pus = [];
				angular.forEach($scope.pus_tmp, function(element) {
				  $scope.pus.push(element);
				});	
				console.log($scope.pus);
            });

	}
	$scope.getUserInfo = function() {
        $http.get("/api/user/" + USER_ID + "")
            .success(function ( $data ) {
                $scope.userInfo = {
                    isActive: $data.user.isActive,
                    profileUpdated: $data.user.profileUpdated,
                    email: $data.user.email,
                    firstName: $data.user.firstName,
                    lastName: $data.user.lastName,
                    gender: $data.user.gender,
                    city: $data.user.city,
                    phone: $data.user.phone,
                    country: $data.user.country,
                    currency: $data.user.currency,
                    alias: $data.user.alias
                };
				console.log($scope.userInfo);
                // Get Employer Information
                $scope.getClientInfo();
            });
	}		
	$scope.getClientInfo = function () {
		$http.get("/api/user/" + USER_ID + "/employer")
			.success( function ( $data ) {
				$scope.client = {
						username: $data.employer.name,
						defaultServiceLevel: $data.employer.defaultServiceLevel,
						comments: $data.employer.comments,
						company: $data.employer.company,
						employerId: $data.employer.id,
						position: $data.employer.position,
						contracted: $data.employer.contracted,
						pm: $data.employer.pm,
						sales: $data.employer.sales
					};
					console.log($scope.client);
				});
		}

	/**
	 * cal total
	 */
	$scope.toggleResource = function($id){
	
        console.log($scope.intransaction.itemlist);
        var $index = $scope.intransaction.itemlist.indexOf($id);
		
        if($index == -1){
            $scope.intransaction.itemlist.push($id);
        } else {
            $scope.intransaction.itemlist.splice($index, 1);
        }
		var subtotal = 0;
		var total = 0;
		
		for(var i = 0; i < $scope.intransaction.itemlist.length; i++){
			subtotal += Number($scope.intransaction.itemlist[i].total_tmp);
			
		}
		$scope.intransaction.subtotal = subtotal;
		$scope.intransaction.subtotal = subtotal;
		$scope.intransaction.subtotal_show = $scope.userInfo.currency + " " + subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
		total = subtotal - Number($scope.intransaction.transactionfee);
		$scope.intransaction.total = total;
		$scope.intransaction.total_show = $scope.userInfo.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
		console.log($scope.intransaction.itemlist);
	}
	//
	$scope.changefee = function(){
		//check input first
		
		//
		$scope.intransaction.total = $scope.intransaction.subtotal - Number($scope.intransaction.transactionfee);
		var total = Number($scope.intransaction.total);
		$scope.intransaction.total_show = $scope.userInfo.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
	}
	$scope.SaveIntrans= function ( str_empid ) {
		//check field
		
	}
	/**
     * Submit the form
     */
    $scope.submit = function(){
    	
		//return;
		$scope.intransaction.typeStatus = 1; 
		//console.log($scope.intransaction);
		//return;
    	$http.post("/api/admin/transaction", $scope.intransaction)
        	.success(function($data){
	            location.href="/" + LANG_CODE + "/admin/finance/client-unpaid";
        });
    };
	
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
    
    
	
});