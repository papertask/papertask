angularApp.controller('editProfileController', function($scope, $http, $timeout, $q){
    $scope.userInfo = {};
    $scope.resume = {
        'user_id': USER_ID
    };
    $scope.countries = [];

    function getBankInfo(){
        $http.get('/api/user/' + USER_ID + '/bank-info').success(function($data){
            if($data['bankInfo']){
                $scope.bankInfo = $data['bankInfo'];
                console.log($scope.bankInfo);
            }
        });
    }

    function getCountriesList(){
        $http.get('/api/common/country').success(function($data){
            $scope.countries = $data['countries'];
            console.log($scope.countries)
        });
    }

    // get user
    function getUser(){
        $http.get('/api/user/' + USER_ID).success(function($data){
            $scope.userInfo = $data['user'];
            console.log($scope.userInfo);
        });
    }

    function getFreelancerResume(){
        $http.get('/api/user/' + USER_ID + '/resume').success(function($data){
            if($data['resume']){
                $scope.resume = $data['resume'];
                console.log($scope.resume);
            }
        });
    }
	function getFreelancerData(){
        $http.get('/api/user/freelancer-data').success(function($data){
            $scope.freelancerData = $data;
            console.log($scope.freelancerData);
            // get resource group
            $.each($scope.freelancerData.resources, function(){
                var that = this;
                $.each(this.resources, function(){
                    if($scope.freelancer.Resources.indexOf(this.id) >= 0){
                        $scope.resourcesType[that.group.name] = 1;
                    }
                });
            });
            // get translation specialism
            $scope.TranslationSpecialisms = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.TranslationSpecialisms);
            // get desktop translation cat tools
            $scope.TranslationCatTools = findOptions($scope.freelancerData.catTools,
                $scope.freelancer.TranslationCatTools);
            // get operating systems
            $scope.operatingSystems = findOptions($scope.freelancerData.operatingSystems,
                $scope.freelancer.DesktopOperatingSystems);
            // get desktop cat tools
            $scope.DesktopCatTools = findOptions($scope.freelancerData.catTools,
                $scope.freelancer.DesktopCatTools);
            // get interpreting specialism
            $scope.InterpretingSpecialisms = findOptions($scope.freelancerData.specialisms,
                $scope.freelancer.InterpretingSpecialisms);
			// get rating
            $scope.Ratings = findOptions($scope.freelancerData.ratings,
                $scope.freelancer.Ratings);	

            console.log($scope.InterpretingSpecialisms);
        });
    }
    function init(){
        // submit
        $scope.editProfile = function(){
            $('form[name=editProfileForm]').validate();
            var validate = $('form[name=editProfileForm]').valid();
            if(validate == true){
                // update user info
                $http.put('/api/user/'+USER_ID+'', $scope.userInfo).success(function($data){
                    console.log('Updated user', $data);
                });

                // update resume
                if($scope.resume.user_id){
                    // create
                    $http.post('/api/user/'+USER_ID+'/resume', $scope.resume).success(function($data){
                        console.log("Created resume");
                    });
                }else{
                    // Update
                    $http.put('/api/user/'+USER_ID+'/resume', $scope.resume).success(function($data){
                        console.log("Updated resume");
                    });
                }
                getFreelancerResume();
                console.log('Resume', $scope.resume);
            }
        }
        getUser();
        getFreelancerResume();
        getCountriesList();
		getFreelancerData();
    }
	/**
     * Display activate class
     */
    $scope.active_class = function(a, b){
        return a == b ? 'active' : '';
    };
    
    $scope.setActive = function ( str_flag ) {
    	$scope.userInfo.isActive = str_flag;
    }
    $scope.setGender = function ( str_gender ) {
    	$scope.userInfo.gender = str_gender;
    }
    $scope.setCurrency = function ( str_currency ) {
    	$scope.userInfo.currency = str_currency;
    } 
    $scope.setProfileUploaded = function ( str_flag ) {
    	$scope.userInfo.profileUploaded = str_flag;
    }
    init();
});

angularApp.controller('AppController', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/admin/project/uploadFile'
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });


    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.upload();
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        if(!response.success){
            fileItem.file.name += " - Uploading error";
            $timeout(function(){
                fileItem.remove();
            }, 1000);
            return;
        }
        fileItem.projectFile = {
            name: fileItem.file.name,
            id: response.file.id
        };
        $scope.project.files.push(fileItem.projectFile);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);


    // -------------------------------


    var controller = $scope.controller = {
        isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    $scope.removeItem = function(item){
        if(item.isSuccess){
            var id = item.projectFile.id;
            for(var i = 0; i < $scope.project.files.length; i++){
                if($scope.project.files[i].id == id){
                    $scope.project.files.splice(i, 1);
                    break;
                }
            }
        };
        item.remove();
    };
}]);