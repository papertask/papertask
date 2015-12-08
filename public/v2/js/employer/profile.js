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
    $scope.pagetype = "edit-profile";
	$scope.companies 	= [];
	$scope.countries 	= [];
    $scope.userInfo = {
        isActive: null,
        profileUpdated: null,
        email: null,
        firstName: null,
        lastName: null,
        gender: null,
        city: null,
        phone: null,
        country: null,
        company: null,
        currency: null,
        tmRatios: null
    };
    $scope.employer = {
        username: null,
        defaultServiceLevel: null,
        comments: null,
        company: null,
        employerId: null,
        position: null
    };
	$scope.init = function () {
		var ajaxCountryInfo = $http.get("/api/common/country").success(function($data){
	            $scope.countries = $data['countries'];
	            setModalControllerData('countries', $scope.countries);
	    });

		var ajaxCompanyInfo = $http.get("/api/common/company").success(function($data){
	            $scope.companies = $data['companies'];
	    });
		var ajaxUserInfo = $http.get('/api/user/' + USER_ID + "").success( function ( $data ) {
		    $scope.userInfo = $data['user'];
		});
        
        var ajaxEmployerInfo = $http.get('/api/user/' + USER_ID + "/employer").success( function ( $data ) {
            $scope.employer = $data['employer'];
            EMPLOYER_ID = $scope.employer.id;
        });

        $q.all( [ajaxCompanyInfo, ajaxEmployerInfo] )
            .then(function() {
                $scope.employer.company = findOptionByName( $scope.companies, $scope.employer.company);
            });

        $q.all( [ajaxCountryInfo, ajaxUserInfo] )
            .then( function () {
                if ( $scope.userInfo )
                    $scope.userInfo.country = findOptionByName( $scope.countries, $scope.userInfo.country );
            })
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
		$scope.userInfo.gender = bGender;
	}
	$scope.submit = function(){
		var pParam = new Array();
        
		pParam = {
			firstName: $scope.userInfo.firstName,
			lastName: $scope.userInfo.lastName,
			name: $scope.employer.name,
			city: $scope.userInfo.city,
			position: $scope.employer.position,
			country: $scope.userInfo.country,
			company: $scope.employer.company.id,
			phone: $scope.userInfo.phone,
			user_id: USER_ID,
			defaultServiceLevel: $scope.employer.defaultServiceLevel,
			gender: $scope.userInfo.gender
		}                     
        
		$http.put("/api/user/"+USER_ID, pParam).success(function(){
			$http.put("/api/user/" + EMPLOYER_ID + "/employer?user_id="+USER_ID, pParam).success(function(){
				location.reload();
			
		});
		});
		
	}
});