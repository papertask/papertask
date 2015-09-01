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
		$http.get("/api/papertask/currencyrate").success(function($data){
			$scope.profileservice = $data['profileservice'];
			$scope.currencyrate_t = $scope.profileservice[0];
			$scope.CurrentcyRate = Number($scope.currencyrate_t.currencyRate);
			
        }).error(function($e){
            alert('error');
        });
		
        $('form').validate();
		
        // show price
        $scope.showPrice = function(){
            var validate = $('form[name=showPriceForm]').valid();
            if(validate == true){
                $.each($scope.translation, function(){
                    if(this.sourceLanguage == $scope.params.sourceLanguage && this.targetLanguage == $scope.params.targetLanguage){
						console.log(this);
                        if( $scope.params.currency == 'CNY'){
							$scope.price.premiumPrice = this.premiumPrice;
							$scope.price.businessPrice = this.businessPrice;
							$scope.price.professionalPrice = this.professionalPrice;
							}
						else 	{
							$scope.price.premiumPrice = this.premiumPrice/$scope.CurrentcyRate;
							$scope.price.businessPrice = this.businessPrice/$scope.CurrentcyRate;
							$scope.price.professionalPrice = this.professionalPrice/$scope.CurrentcyRate;
						}	
						console.log($scope.price);
						
                    }
                });
                
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
            

            // get list languages
            $http.get("/api/common/language").success(function($data){
			$scope.languages = $data;
			
			if(LANG_CODE == 'zh-CN')
			{
				$rootScope.currentLanguage = 'zh-CN';
				//$scope.languages = convert_to_zh($data);
			}
			else {
				$rootScope.currentLanguage = 'en-US';
                
			}	
                
            });

            // get list source languages
            $.each($scope.translation, function(){
                if($scope.sourceLanguages.indexOf(this.sourceLanguage.toString()) == -1){
                    $scope.sourceLanguages.push(this.sourceLanguage.toString());
                }
            });
            

            $scope.updateTargetLanguages = function(){
                $.each($scope.translation, function(){
                    if(this.sourceLanguage == $scope.params.sourceLanguage){
                        $scope.targetLanguages.push(this.targetLanguage);
                    }
                });
            }
            
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
                'Afrikaans' : '南非荷兰语',
                'Arabic' : '阿拉伯语',
                'Belarusian' : '白俄罗斯语',
                'Bosnian' : '波斯尼亚语',
                'Bulgarian' : '保加利亚语',
                'Burmese' : '缅甸语',
                'Chinese (Hong Kong)' : '繁体中文（香港）',
                'Chinese (Simplified)' : '简体中文',
                'Chinese (Traditional)' : '繁体中文（台湾）',
                'Croatian' : '克罗地亚语',
                'Czech' : '捷克语',
                'Danish' : '丹麦语',
                'Dinka' : '丁卡语',
                'Dutch' : '荷兰语',
                'Dutch (Belgium)' : '荷兰语（比利时）',
                'English' : '英语',
                'English (British)' : '英语（英国）',
                'English (United States)' : '英语（美国）',
                'Estonian' : '爱沙尼亚语',
                'Finnish' : '芬兰语',
                'Flemish' : '佛兰芒语',
                'French' : '法语',
                'French (Algeria)' : '法语（阿尔及利亚）',
                'French (Belgium)' : '法语（比利时）',
                'French (Canada)' : '法语（加拿大）',
                'French (Switzerland)' : '法语（瑞士）',
                'German' : '德语',
                'German (Austria)' : '德语（奥地利）',
                'German (Switzerland)' : '德语（瑞士）',
                'Greek' : '希腊语',
                'Hebrew' : '希伯来语',
                'Hindi' : '印地语',
                'Hmong' : '苗语',
                'Hungarian' : '匈牙利语',
                'Icelandic' : '冰岛语',
                'Indonesian' : '印度尼西亚语',
                'Italian' : '意大利语',
                'Japanese' : '日本语',
                'Javanese' : '爪哇语',
                'Kazakh' : '哈萨克语',
                'Khmer' : '高棉语',
                'Korean' : '韩国语',
                'Laothian' : '老挝语',
                'Latvian' : '拉脱维亚语',
                'Lithuanian' : '立陶宛语',
                'Macedonian' : '马其顿语',
                'Malay' : '马来语',
                'Maltese' : '马耳他语',
                'Maori' : '毛利语',
                'Mongolian' : '蒙古语',
                'Norwegian' : '挪威语',
                'Persian/Farsi' : '波斯语',
                'Polish' : '波兰语',
                'Portuguese' : '葡萄牙语',
                'Portuguese (Brazil)' : '葡萄牙语（巴西）',
                'Romanian' : '罗马尼亚语',
                'Russian' : '俄罗斯语',
                'Samoan' : '萨摩亚语',
                'Serbian' : '塞尔维亚语',
                'Slovak' : '斯洛伐克语',
                'Slovenian' : '斯洛文尼亚语',
                'Somali' : '索马里语',
                'Spanish' : '西班牙语',
                'Spanish (Chile)' : '西班牙语（智利）',
                'Spanish (Colombia)' : '西班牙语（哥伦比亚）',
                'Spanish (International)' : '西班牙语（国际）',
                'Spanish (Latin America)' : '西班牙语（拉丁美洲）',
                'Spanish (Mexico)' : '西班牙语（墨西哥）',
                'Spanish (Panama)' : '西班牙语（巴拿马）',
                'Spanish (Peru)' : '西班牙语（秘鲁）',
                'Sundanese' : '巽他语',
                'Swedish' : '瑞典语',
                'Tagalog' : '菲律宾塔加洛语',
                'Tamil' : '泰米尔语',
                'Thai' : '泰国语',
                'Tibetan' : '藏语',
                'Tonga' : '汤加语',
                'Turkish' : '土耳其语',
                'Ukrainian' : '乌克兰语',
                'Uzbek' : '乌兹别克语',
                'Vietnamese' : '越南语',
                'Welsh' : '威尔士语',
                'Xhosa' : '科萨语',
                'Zulu' : '祖鲁语',
            },
            'en-US' : {
                'Afrikaans' : 'Afrikaans',
                'Arabic' : 'Arabic',
                'Belarusian' : 'Belarusian',
                'Bosnian' : 'Bosnian',
                'Bulgarian' : 'Bulgarian',
                'Burmese' : 'Burmese',
                'Chinese (Hong Kong)' : 'Chinese (Hong Kong)', 
                'Chinese (Simplified)' : 'Chinese (Simplified)',
                'Chinese (Traditional)' : 'Chinese (Traditional)',
                'Croatian' : 'Croatian',
                'Czech' : 'Czech',
                'Danish' : 'Danish',
                'Dinka' : 'Dinka',
                'Dutch' : 'Dutch',
                'Dutch (Belgium)' : 'Dutch (Belgium)',
                'English' : 'English',
                'English (British)' : 'English (British)',
                'English (United States)' : 'English (United States)',
                'Estonian' : 'Estonian',
                'Finnish' : 'Finnish',
                'Flemish' : 'Flemish',
                'French' : 'French',
                'French (Algeria)' : 'French (Algeria)',
                'French (Belgium)' : 'French (Belgium)',
                'French (Canada)' : 'French (Canada)',
                'French (Switzerland)' : 'French (Switzerland)',
                'German' : 'German',
                'German (Austria)' : 'German (Austria)',
                'German (Switzerland)' : 'German (Switzerland)',
                'Greek' : 'Greek',
                'Hebrew' : 'Hebrew',
                'Hindi' : 'Hindi',
                'Hmong' : 'Hmong',
                'Hungarian' : 'Hungarian',
                'Icelandic' : 'Icelandic',
                'Indonesian' : 'Indonesian',
                'Italian' : 'Italian',
                'Japanese' : 'Japanese',
                'Javanese' : 'Javanese',
                'Kazakh' : 'Kazakh',
                'Khmer' : 'Khmer',
                'Korean' : 'Korean',
                'Laothian' : 'Laothian',
                'Latvian' : 'Latvian',
                'Lithuanian' : 'Lithuanian',
                'Macedonian' : 'Macedonian',
                'Malay' : 'Malay',
                'Maltese' : 'Maltese',
                'Maori' : 'Maori',
                'Mongolian' : 'Mongolian',
                'Norwegian' : 'Norwegian',
                'Persian/Farsi' : 'Persian/Farsi',
                'Polish' : 'Polish',
                'Portuguese' : 'Portuguese',
                'Portuguese (Brazil)' : 'Portuguese (Brazil)',
                'Romanian' : 'Romanian',
                'Russian' : 'Russian',
                'Samoan' : 'Samoan',
                'Serbian' : 'Serbian',
                'Slovak' : 'Slovak',
                'Slovenian' : 'Slovenian',
                'Somali' : 'Somali',
                'Spanish' : 'Spanish',
                'Spanish (Chile)' : 'Spanish (Chile)',
                'Spanish (Colombia)' : 'Spanish (Colombia)',
                'Spanish (International)' : 'Spanish (International)',
                'Spanish (Latin America)' : 'Spanish (Latin America)',
                'Spanish (Mexico)' : 'Spanish (Mexico)',
                'Spanish (Panama)' : 'Spanish (Panama)',
                'Spanish (Peru)' : 'Spanish (Peru)',
                'Sundanese' : 'Sundanese',
                'Swedish' : 'Swedish',
                'Tagalog' : 'Tagalog',
                'Tamil' : 'Tamil',
                'Thai' : 'Thai',
                'Tibetan' : 'Tibetan',
                'Tonga' : 'Tonga',
                'Turkish' : 'Turkish',
                'Ukrainian' : 'Ukrainian',
                'Uzbek' : 'Uzbek',
                'Vietnamese' : 'Vietnamese',
                'Welsh' : 'Welsh',
                'Xhosa' : 'Xhosa',
                'Zulu' : 'Zulu',
            }
        },
        currentLanguage = $rootScope.currentLanguage || 'en-US';
    
        return translations[currentLanguage][input];
    }
}]);