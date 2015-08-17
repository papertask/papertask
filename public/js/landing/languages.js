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
                        if( $scope.params.currency=='CNY')
							$scope.price = this;
						else 	{
							$scope.price.premiumPrice = this.premiumPrice/$scope.CurrentcyRate;
							$scope.price.businessPrice = this.businessPrice/$scope.CurrentcyRate;
							$scope.price.professionalPrice = this.professionalPrice/$scope.CurrentcyRate;
						}	
						
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
                'Afrikaans' : 'å�—é�žè�·å…°è¯­',
                'Arabic' : 'é˜¿æ‹‰ä¼¯è¯­',
                'Belarusian' : 'ç™½ä¿„ç½—æ–¯è¯­',
                'Bosnian' : 'æ³¢æ–¯å°¼äºšè¯­',
                'Bulgarian' : 'ä¿�åŠ åˆ©äºšè¯­',
                'Burmese' : 'ç¼…ç”¸è¯­',
                'Chinese (Hong Kong)' : 'ç¹�ä½“ä¸­æ–‡ï¼ˆé¦™æ¸¯ï¼‰',
                'Chinese (Simplified)' : 'ç®€ä½“ä¸­æ–‡',
                'Chinese (Traditional)' : 'ç¹�ä½“ä¸­æ–‡ï¼ˆå�°æ¹¾ï¼‰',
                'Croatian' : 'å…‹ç½—åœ°äºšè¯­',
                'Czech' : 'æ�·å…‹è¯­',
                'Danish' : 'ä¸¹éº¦è¯­',
                'Dinka' : 'ä¸�å�¡è¯­',
                'Dutch' : 'è�·å…°è¯­',
                'Dutch (Belgium)' : 'è�·å…°è¯­ï¼ˆæ¯”åˆ©æ—¶ï¼‰',
                'English' : 'è‹±è¯­',
                'English (British)' : 'è‹±è¯­ï¼ˆè‹±å›½ï¼‰',
                'English (United States)' : 'è‹±è¯­ï¼ˆç¾Žå›½ï¼‰',
                'Estonian' : 'çˆ±æ²™å°¼äºšè¯­',
                'Finnish' : 'èŠ¬å…°è¯­',
                'Flemish' : 'ä½›å…°èŠ’è¯­',
                'French' : 'æ³•è¯­',
                'French (Algeria)' : 'æ³•è¯­ï¼ˆé˜¿å°”å�Šåˆ©äºšï¼‰',
                'French (Belgium)' : 'æ³•è¯­ï¼ˆæ¯”åˆ©æ—¶ï¼‰',
                'French (Canada)' : 'æ³•è¯­ï¼ˆåŠ æ‹¿å¤§ï¼‰',
                'French (Switzerland)' : 'æ³•è¯­ï¼ˆç‘žå£«ï¼‰',
                'German' : 'å¾·è¯­',
                'German (Austria)' : 'å¾·è¯­ï¼ˆå¥¥åœ°åˆ©ï¼‰',
                'German (Switzerland)' : 'å¾·è¯­ï¼ˆç‘žå£«ï¼‰',
                'Greek' : 'å¸Œè…Šè¯­',
                'Hebrew' : 'å¸Œä¼¯æ�¥è¯­',
                'Hindi' : 'å�°åœ°è¯­',
                'Hmong' : 'è‹—è¯­',
                'Hungarian' : 'åŒˆç‰™åˆ©è¯­',
                'Icelandic' : 'å†°å²›è¯­',
                'Indonesian' : 'å�°åº¦å°¼è¥¿äºšè¯­',
                'Italian' : 'æ„�å¤§åˆ©è¯­',
                'Japanese' : 'æ—¥æœ¬è¯­',
                'Javanese' : 'çˆªå“‡è¯­',
                'Kazakh' : 'å“ˆè�¨å…‹è¯­',
                'Khmer' : 'é«˜æ£‰è¯­',
                'Korean' : 'éŸ©å›½è¯­',
                'Laothian' : 'è€�æŒ�è¯­',
                'Latvian' : 'æ‹‰è„±ç»´äºšè¯­',
                'Lithuanian' : 'ç«‹é™¶å®›è¯­',
                'Macedonian' : 'é©¬å…¶é¡¿è¯­',
                'Malay' : 'é©¬æ�¥è¯­',
                'Maltese' : 'é©¬è€³ä»–è¯­',
                'Maori' : 'æ¯›åˆ©è¯­',
                'Mongolian' : 'è’™å�¤è¯­',
                'Norwegian' : 'æŒªå¨�è¯­',
                'Persian/Farsi' : 'æ³¢æ–¯è¯­',
                'Polish' : 'æ³¢å…°è¯­',
                'Portuguese' : 'è‘¡è�„ç‰™è¯­',
                'Portuguese (Brazil)' : 'è‘¡è�„ç‰™è¯­ï¼ˆå·´è¥¿ï¼‰',
                'Romanian' : 'ç½—é©¬å°¼äºšè¯­',
                'Russian' : 'ä¿„ç½—æ–¯è¯­',
                'Samoan' : 'è�¨æ‘©äºšè¯­',
                'Serbian' : 'å¡žå°”ç»´äºšè¯­',
                'Slovak' : 'æ–¯æ´›ä¼�å…‹è¯­',
                'Slovenian' : 'æ–¯æ´›æ–‡å°¼äºšè¯­',
                'Somali' : 'ç´¢é©¬é‡Œè¯­',
                'Spanish' : 'è¥¿ç�­ç‰™è¯­',
                'Spanish (Chile)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆæ™ºåˆ©ï¼‰',
                'Spanish (Colombia)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆå“¥ä¼¦æ¯”äºšï¼‰',
                'Spanish (International)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆå›½é™…ï¼‰',
                'Spanish (Latin America)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆæ‹‰ä¸�ç¾Žæ´²ï¼‰',
                'Spanish (Mexico)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆå¢¨è¥¿å“¥ï¼‰',
                'Spanish (Panama)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆå·´æ‹¿é©¬ï¼‰',
                'Spanish (Peru)' : 'è¥¿ç�­ç‰™è¯­ï¼ˆç§˜é²�ï¼‰',
                'Sundanese' : 'å·½ä»–è¯­',
                'Swedish' : 'ç‘žå…¸è¯­',
                'Tagalog' : 'è�²å¾‹å®¾å¡”åŠ æ´›è¯­',
                'Tamil' : 'æ³°ç±³å°”è¯­',
                'Thai' : 'æ³°å›½è¯­',
                'Tibetan' : 'è—�è¯­',
                'Tonga' : 'æ±¤åŠ è¯­',
                'Turkish' : 'åœŸè€³å…¶è¯­',
                'Ukrainian' : 'ä¹Œå…‹å…°è¯­',
                'Uzbek' : 'ä¹Œå…¹åˆ«å…‹è¯­',
                'Vietnamese' : 'è¶Šå�—è¯­',
                'Welsh' : 'å¨�å°”å£«è¯­',
                'Xhosa' : 'ç§‘è�¨è¯­',
                'Zulu' : 'ç¥–é²�è¯­',
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