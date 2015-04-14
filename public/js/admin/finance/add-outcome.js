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
            angular.element('#AddOutcomeController').scope().submit();
        }
    });
}) 

angularApp.controller('AddOutcomeController', function($scope, $http, $timeout, $q, StaffApi, ProjectStatus,ProjectField, DateFormatter) {
	$scope.DateFormatter = DateFormatter;
	$scope.ProjectStatus = ProjectStatus;
	$scope.StaffApi = StaffApi;
	$scope.ProjectField = ProjectField;
	$scope.companies 	= [];
	$scope.countries 	= [];
	$scope.pages 		= [];
	$scope.employers 	= [];
	$scope.outtransaction = {
		tasklist : [],
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
		$scope.outtransaction.userid = USER_ID;
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
		//get task list
		var ajaxProjectUnpaidlist = $http.get("/" + LANG_CODE + "/admin/finance/getFreelancerUnpaid?id="+ USER_ID)
            .success( function ( $data ) {
                $scope.tus_tmp = $data.tasklist;
				$scope.tus = [];
				angular.forEach($scope.tus_tmp, function(element) {
				  $scope.tus.push(element);
				});	
				console.log($scope.tus);
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
                // Get freelancer Information
                $scope.getFreelancerInfo();
            });
	}		
	$scope.getFreelancerInfo = function () {
		$http.get("/api/user/" + USER_ID + "/freelancer")
			.success( function ( $data ) {
				$scope.freelancer = {
						username: $data.freelancer.name,
						defaultServiceLevel: $data.freelancer.defaultServiceLevel,
						comments: $data.freelancer.comments,
						freelancerId: $data.freelancer.id,
						country: $data.freelancer.country,
						address: $data.freelancer.address,
						city: $data.freelancer.city,
						telephone: $data.freelancer.telephone,
					};
					console.log($scope.freelancer);
				});
		}

	/**
	 * cal total
	 */
	$scope.toggleResource = function($id){
	
        console.log($scope.outtransaction.itemlist);
        var $index = $scope.outtransaction.itemlist.indexOf($id);
		
        if($index == -1){
            $scope.outtransaction.itemlist.push($id);
        } else {
            $scope.outtransaction.itemlist.splice($index, 1);
        }
		var subtotal = 0;
		var total = 0;
		
		for(var i = 0; i < $scope.outtransaction.itemlist.length; i++){
			subtotal += Number($scope.outtransaction.itemlist[i].total);
			
		}
		$scope.outtransaction.subtotal = subtotal;
		$scope.outtransaction.subtotal = subtotal;
		$scope.outtransaction.subtotal_show = $scope.userInfo.currency + " " + subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
		total = subtotal - Number($scope.outtransaction.transactionfee);
		$scope.outtransaction.total = total;
		$scope.outtransaction.total_show = $scope.userInfo.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
		console.log($scope.outtransaction.tasklist);
	}
	//
	$scope.changefee = function(){
		//check input first
		
		//
		$scope.outtransaction.total = $scope.outtransaction.subtotal - Number($scope.outtransaction.transactionfee);
		var total = Number($scope.outtransaction.total);
		$scope.outtransaction.total_show = $scope.userInfo.currency + " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		
	}
	$scope.SaveIntrans= function ( str_empid ) {
		//check field
		
	}
	/**
     * Submit the form
     */
    $scope.submit = function(){
    	console.log($scope.outtransaction);
		//return;
		$scope.outtransaction.typeStatus = 2; 
    	$http.post("/api/admin/transaction", $scope.outtransaction)
        	.success(function($data){
	            location.href="/" + LANG_CODE + "/admin/finance/freelancer-unpaid";
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