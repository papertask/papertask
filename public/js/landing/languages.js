angularApp.controller('languagesController', function($scope, $rootScope, $http, $timeout, $q) {
    $scope.translation = [];
    $scope.sourceLanguages = [];
    $scope.targetLanguages = [];
    $scope.languages = [];
    $scope.params = {
        sourceLanguage: null,
        targetLanguage: null,
        wordCount: 1000,
        currency: 'CNY'
    };
    $scope.price = [];
    function init(){
        $('form').validate();

        // show price
        $scope.showPrice = function(){
            var validate = $('form[name=showPriceForm]').valid();
            if(validate == true){
                $.each($scope.translation, function(){
                    if(this.sourceLanguage == $scope.params.sourceLanguage && this.targetLanguage == $scope.params.targetLanguage){
                        $scope.price = this;
                    }
                });
                console.log($scope.price);
                $('#features').removeClass('hidden');
                $('body, html').animate({
                    scrollTop: $('#features').position().top
                }, 500);
            }
        }
    }

    function getListTranslation(){
        $http.get("/api/papertask/translation").success(function($data){
            $scope.translation = $data['translation'];
            console.log($data['translation']);

            // get list languages
            $http.get("/api/common/language").success(function($data){
			$scope.languages = $data;
			console.log(LANG_CODE);
			if(LANG_CODE == 'zh-CN')
			{
				$rootScope.currentLanguage = 'zh-CN';
				//$scope.languages = convert_to_zh($data);
			}
			else {
				$rootScope.currentLanguage = 'en-US';
                
			}	
                console.log($data);
            });

            // get list source languages
            $.each($scope.translation, function(){
                if($scope.sourceLanguages.indexOf(this.sourceLanguage.toString()) == -1){
                    $scope.sourceLanguages.push(this.sourceLanguage.toString());
                }
            });
            console.log($scope.sourceLanguages);

            $scope.updateTargetLanguages = function(){
                $.each($scope.translation, function(){
                    if(this.sourceLanguage == $scope.params.sourceLanguage){
                        $scope.targetLanguages.push(this.targetLanguage);
                    }
                });
            }
            console.log($scope.targetLanguages);
        }).error(function($e){
            alert('error');
        });
    }

    getListTranslation();
    init();
    $('select[name=sourceLanguage]').on('change', function(){
        $scope.targetLanguages = [];
        $scope.params.targetLanguage = null;
        var that = $(this);
        $.each($scope.translation, function(){
            if(this.sourceLanguage == that.val()){
                $scope.targetLanguages.push(this.targetLanguage);
            }
        });
    });
});

angularApp.filter('i18n', ['$rootScope', function($rootScope) {
    return function (input) {
        var translations = {
            'zh-CN' : {
                'Danish' : '丹麦',
                'English' : '英语',
                'Afrikaans' : '南非荷兰语',
            },
            'en-US' : {
                'Danish' : 'Danish',
                'English' : 'English',
                'Afrikaans' : 'Afrikaans',
            }
        },
        currentLanguage = $rootScope.currentLanguage || 'en-US';
    
        return translations[currentLanguage][input];
    }
}]);