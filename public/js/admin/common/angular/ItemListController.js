/**
 * Created by eastagile on 11/16/14.
 */
angularApp.controller('ItemListController', function($scope, $location, $timeout){
    $scope.pages = {};
    $scope.maxSize = 7;
    $scope.page = 1;
    $scope.filter = {};
    $scope.custom = {};

    function setItemApi($Api){
        $scope.ItemApi = $Api;
    }
    $scope.setItemApi = setItemApi;

    function remove($index){
        var item = $scope.items[$index];
        bootbox.confirm("Are you sure to delete?", function(value){
            if(value){
                $scope.ItemApi.delete(item.id, function(){
                    $timeout(function(){
                        $scope.items.splice($index, 1);
                    }, 1);
                });
            }
        });
    }

    function loadItems(page, func){
        var params = $scope.filter;
        //console.info('params',params);
        params.page = page;
        $scope.items = [];
        $scope.ItemApi.list(params, function($items, $pages){
            $scope.items = $items;
            $scope.pages =$pages;
            if(typeof(func) == 'function'){
                func();
            }
            if(typeof($scope.custom.afterLoadItems) == 'function'){
                $scope.custom.afterLoadItems($items, $pages);
            }
        });
    }

    function search(){
        $scope.loadItems(1);
    }

    function reset($quote){
    	$scope.filter = {
    			page : 1,
    			quote : $quote,
    	}
    	$scope.loadItems(1);
    }

    function pageChanged(){
        $scope.loadItems($scope.page);
        //console.log("Change to page " + $scope.page);
    }

    function simpleLoad(btn, state){
        if (state) {
            btn.children().addClass('fa-spin');
            btn.contents().last().replaceWith(" Loading");
        } else {
            btn.children().removeClass('fa-spin');
            btn.contents().last().replaceWith(" Refresh");
        }
    }

    function refresh(){
        $scope.items = [];
        var btn = $('#loading-example-btn');
        simpleLoad(btn, true);
        $scope.loadItems(function(){
            simpleLoad(btn, false);
        });
    }

    $scope.pageChanged = pageChanged;
    $scope.remove = remove;
    $scope.search = search;
    $scope.reset = reset;
    $scope.loadItems = loadItems;
    $scope.refresh = refresh;

    $scope.$watch(function(){
        return $scope.ItemApi;
    }, function(){
		//console.log("$scope.ItemApi");
		//console.log($scope.ItemApi);
        if(typeof($scope.ItemApi) != 'undefined'){
			if($scope.ItemApi.statusproject)
				$scope.filter.statusproject = $scope.ItemApi.statusproject
			if($scope.ItemApi.quote)	
				$scope.filter.quote  = $scope.ItemApi.quote
			$scope.loadItems($scope.page);
        }
    });
});