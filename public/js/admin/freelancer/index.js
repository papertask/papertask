/**
 * Created by hat.dao on 10/14/2014.
 */
angularApp.controller('listFreelancerController', function($scope, $http, $timeout, $q){
    $scope.list = [];
    $scope.pages = [];
    $scope.rangeCustom = [];

    $scope.catTools = [];
    $scope.operatingSystems = [];
    $scope.resources = [];
    $scope.specialisms = [];
    $scope.ratings = [];
    $scope.sources = [];
    $scope.countries = [];

    $scope.searchParams = {
        'search': null,
        'name': null,
        'idFreelancer': null,
        'email': null,
        'type': null,
        'source': null,
        'target': null,
        'rate': null,
        'specialism': null,
        'country': null,
        'includeInactive': null,
        'specialismTested': null,
        'senior': null,
        'page': null
    };

    function init(){
        $scope.selectPage(1);
        jQuery(document).ready(function(){
           $('.pager.btn-group button').click(function(){
              $scope.selectPage(parseInt($(this).data('page')));
           });
        });

        // delete freelancer
        $scope.deleteFreelancer = function($id){
            bootbox.confirm(DELETE_CONFIRM_TEXT, function(result) {
                if(result == true){
                    $http.delete('/api/user/'+$id+'/freelancer').success(function($data){
                        console.log('Deleted user with id %s', $id);
                        $scope.selectPage($scope.pages.current);
                    });
                }
            });
        };

        // get freelancer data
        getFreelancerData();


    }

    $scope.selectPage = function($page){
        // check search
        var search = 0;
            var $params = $scope.searchParams;
        $params.page = $page;
        console.info('$params',$params);

        $http.get("/api/user/freelancer", {
            params: $params
        }).success(function($data){
            $scope.list = $data['freelancerList'];
            $scope.pages = $data['pages'];
            if($data['pages']){
                var N = $scope.pages.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
            console.log($data);
        });
    }
	
	$scope.onBtnPreviousClicked = function () {
		// check search
        var search = 0;
        
            
            var $params = $scope.searchParams;
            $params.page = $scope.pages.previous;
            console.info('$params',$params);
            
			$http.get("/api/user/freelancer",{
				params: $params
			}).success(function($data){
					$scope.pages = $data['pages'];
					$scope.list = $data['freelancerList'];
					if($data['pages']){
		                var N = $scope.pages.pageCount;
		                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
        }
			});
		
	}
	
	$scope.onBtnGoto = function ( int_index ) {
		// check search
     
            var $params = $scope.searchParams;
            $params.page =  int_index*1 + 1;
            console.info('$params',$params);

			$http.get("/api/user/freelancer",{
            params: $params
			}).success(function($data){
	            $scope.pages = $data['pages'];
	            $scope.list = $data['freelancerList'];
	            if($data['pages']){
	                var N = $scope.pages.pageCount;
	                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
        }
			});
       
		
	}
	
	$scope.onBtnNextClicked = function () {
            var $params = $scope.searchParams;
            $params.page =  $scope.pages.next;
            console.info('$params',$params);
            
			$http.get("/api/user/freelancer",{
            params: $params
			}).success(function($data){
	            $scope.pages = $data['pages'];
	            $scope.list = $data['freelancerList'];
	            if($data['pages']){
	                var N = $scope.pages.pageCount;
	                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
		}
			});
		}	

    function getFreelancerData(){
        $http.get('/api/user/freelancer-data').success(function($data){
            $scope.catTools = $data['catTools'];
            $scope.operatingSystems = $data['operatingSystems'];
            $scope.resources = $data['resources'];
            $scope.specialisms = $data['specialisms'];
            $scope.ratings = $data['ratings'];
            $scope.countries = $data['countries'];
            $.each($scope.resources, function(){
                $.each(this.resources, function(){
                    $scope.sources.push(this);
                });
            });
            console.log($data);
            console.log($scope.sources);
        });
    }

    $scope.advancedSearch = function(){
    	$scope.searchParams = {
    	        'search': 1,
    	        'name': $scope.filter.name,
    	        'idFreelancer': $scope.filter.idFreelancer,
    	        'email': $scope.filter.email,
    	        'type': $scope.filter.type,
    	        'source': $scope.filter.source,
    	        'target': $scope.filter.target,
    	        'rate': $scope.filter.rate,
    	        'specialism': $scope.filter.specialism,
    	        'country': $scope.filter.country,
    	        'includeInactive': $scope.filter.includeInactive,
    	        'specialismTested': $scope.filter.specialismTested,
    	        'senior': $scope.filter.senior,
    	        'page': null
    	    };
    	
    	$scope.selectPage(1);
    }
    
    $scope.reset = function(){
    	$scope.searchParams = {
    	        'search': null,
    	        'name': null,
    	        'idFreelancer': null,
    	        'email': null,
    	        'type': null,
    	        'source': null,
    	        'target': null,
    	        'rate': null,
    	        'specialism': null,
    	        'country': null,
    	        'includeInactive': null,
    	        'specialismTested': null,
    	        'senior': null,
    	        'page': null
    	    };
    	$scope.filter.name = null;
        $scope.filter.idFreelancer = null;
        $scope.filter.email = null;
        $scope.filter.type = null;
        $scope.filter.source = null;
        $scope.filter.target = null;
        $scope.filter.rate = null;
        $scope.filter.specialism = null;
        $scope.filter.country = null;
        $scope.filter.includeInactive = null;
        $scope.filter.specialismTested = null;
        $scope.filter.senior = null;
        
        $scope.selectPage(1);
    	
    }

    // init
    init();
});