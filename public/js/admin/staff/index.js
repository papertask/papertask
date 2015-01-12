/**
 * Created by gao on 12/14/2014.
 */
angularApp.controller('listStaffController', function($scope, $http, $timeout, $q){
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
        'idStaff': null,
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
    
    // delete staff
    $scope.deleteStaff = function($id){
        bootbox.confirm(DELETE_CONFIRM_TEXT, function(result) {
            if(result == true){
                $http.delete('/api/user/'+$id+'/staff').success(function($data){
                    console.log('Deleted user with id %s', $id);
                    selectPage($scope.pages.current);
                });
            }
        });
    };
    $scope.init = function(){
        $scope.selectPage( 1 );
    }
    
    $scope.advancedSearch = function() {
        $scope.selectPage( 1 );
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
            console.log('search');
        }else{
            var $params = {page: $page};
            console.log('no search');
        }

        $http.get("/api/user/staff", {
            params: $params
        }).success(function($data){
            console.log ( $data );
            $scope.list = $data['staffList'];
            $scope.pages = $data['pages'];
            if($data['pages']){
                var N = $scope.pages.pageCount;
                $scope.rangeCustom = Array.apply(null, {length: N}).map(Number.call, Number);
            }
            console.log($data);
        });
    }
});