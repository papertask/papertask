angularApp.run( function ( $rootScope ) {
	$("#form").validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {            
            submitHandler: function ( form ) {
                angular.element('#EmployerController').scope().submit();
            }
        }
    });
}) 
angularApp.controller('PapertaskEmployerProfileController', function($scope, $http, $timeout, $q) {
	$scope.companies 	= [];
	$scope.countries 	= [];
	$scope.employer = {};
	$scope.userId = '';
    $scope.userInfo = {};
	$scope.employerId = '';
	$scope.init = function (str_uid, str_empid, str_country_select, str_company_id) {
		$http.get("/api/common/country").success(function($data){
	            $scope.countries = $data['countries'];
	          
	            var i = 0;
	            angular.forEach($scope.countries, function(v, k){
	            	if ( v.name == str_country_select ) {
	            		$scope.employer.country = $scope.countries[i];
	            	}
	            	i ++;
	            });
	            setModalControllerData('countries', $scope.countries);
	    });
		$scope.userId = str_uid;
		$scope.employerId = str_empid;
		$http.get("/api/common/company").success(function($data){
	            $scope.companies = $data['companies'];
	            var i = 0;
	            angular.forEach($scope.companies, function(v, k){
	            	if ( v.id == str_company_id ) {
	            		$scope.employer.company = $scope.companies[i];
	            	}
	            	i ++;
	            });
	    });
		$http.get('/api/user/' + str_uid + "").success( function ( $data ) {
		  $scope.userInfo = $data['user'];
		});
        
        $http.get('/api/user/' + str_uid + "/employer").success( function ( $data ) {
            $scope.employer = $data['employer'];
        });
	}
	
	$scope.saveCompany = function(company){
        var $data = jQuery.extend(true, {}, company);
        $data.country = $data.country.name;
        $http.post("/api/common/company", $data)
            .success(function($data){
                jQuery("#modal-company").modal("hide");
                $scope.companies.push($data['company']);                
            });
    }
	$scope.setGender = function( bGender ) {
		$scope.employer.gender = bGender;
	}
	$scope.submit = function(){
		var pParam = new Array();
        
		pParam = {
			firstName: $scope.userInfo.firstName,
			lastName: $scope.userInfo.lastName,
			name: $scope.employer.name,
			city: $scope.userInfo.city,
			position: $scope.uerInfo.position,
			country: $scope.employer.country,
			company: $scope.employer.company.id,
			phone: $scope.userInfo.phone,
			user_id: $scope.userId,
			defaultServiceLevel: $("#defaultServiceLevel").val(),
			gender: $scope.employer.gender
		}                     
        
		$http.put("/api/user/"+$scope.userId,pParam).success(function(){
			
		});
		$http.put("/api/user/" + $scope.employerId + "/employer?user_id="+$scope.userId, pParam).success(function(){});
	}
});