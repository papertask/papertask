/**
 * Created by antiprovn on 11/1/14.
 */

angularApp.factory("CurrentUser", function($http) {
    var $user = {};
    $http.get("/api/user/current")
        .success(function($data){
            jQuery.extend(true, $user, $data['user']);
        });

    function price($price,$currency){
	console.log("CurrentUser");
		console.log($price);
		console.log($currency);
		if($price)
		{
			if($currency)
			{
				return format2($price,$currency);
				
			}	
			else 			
				return format2($price,$user.currency);
		}	
		else return null;	
    }
	function format2(n, currency) {
		return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	}
    return {
        info: $user,
        is_admin: function(){
            return true;
        },
        price: price
    };
});