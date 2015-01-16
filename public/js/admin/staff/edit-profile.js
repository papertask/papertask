angularApp.run( function ($rootScope) {    
    $(".summernote").summernote();
    $("form[name='editProfileForm']").validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {
            country: {valueNotEquals: "?"},
            confirmpwd: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function( form ) {
            angular.element('#editProfile').scope().editProfile();
        }
    });
}); 

angularApp.service('sharedInstance', function() {
	var cvfiles = new Array();
    var stafftypes = new Array();
	return {
        setCvFiles: function ( cvfileList ) {
            cvfiles = cvfileList;
        },
		addcvfile: function ( fileItem ) {
			cvfiles.push( fileItem );
		},
		removecvfile: function ( id ) {
			for ( var i = 0; i < cvfiles.length; i ++ ) {
				if ( cvfiles[i].id == id) {
					cvfiles.splice( i, 1 );
					break;
				}
			}
		},        
		getcvfiles: function () {
			return cvfiles;
		}
	};
});
angularApp.controller('editProfileController', function($scope, $http, $timeout, $q, sharedInstance){
    $scope.userInfo = {
        'type': null,
        'isActive': null,
        'country': null
    };
    $scope.cvfiles = [];
    $scope.staff = {};
    $scope.resume = {
        'user_id': USER_ID
    };
    $scope.countries = [];

    $scope.getBankInfo = function(){
        $http.get('/api/user/' + USER_ID + '/bank-info').success(function($data){
            if($data['bankInfo']){
                $scope.bankInfo = $data['bankInfo'];
            }
        });
    }
    
    $scope.getStaff = function () {
        $http.get('/api/user/' + USER_ID + 'staff').success( function ( $data ) {
            if ( $data['staff']) {
                $scope.staff = $data['staff'];
                $scope.userInfo.type = $scope.staff.type.id;
                $scope.userInfo.name = $scope.staff.name;
                $scope.loadStaffType();
            }
        });
    }

    $scope.getCountriesList = function(){
        $http.get('/api/common/country').success(function($data){
            $scope.countries = $data['countries'];

        });
    }

    // get user
    $scope.getUser = function(){
        $http.get('/api/user/' + USER_ID).success(function($data){
            $scope.userInfo = $data['user'];
            $scope.getStaff();
        });
    }

    $scope.getStaffResume = function(){
        $http.get('/api/user/' + USER_ID + '/resume').success(function($data){
            if($data['resume']){
                $scope.resume = $data['resume'];
            }
        });
    }
    
    
    $scope.init = function () {
        $scope.getStaffResume();
        $scope.getBankInfo();
        var ajaxUserInfo = $http.get('/api/user/' + USER_ID).success(function($data){
            $scope.userInfo = $data['user'];
            $scope.getStaff();
        });

        var ajaxCountryInfo = $http.get('/api/common/country').success(function($data){
            $scope.countries = $data['countries'];

        });
        $q.all([ajaxUserInfo, ajaxCountryInfo])
            .then(function(){
                $scope.userInfo.country = findOptionByName($scope.countries, $scope.userInfo.country);
            });
    }
    // submit
    $scope.editProfile = function(){
        $('form[name=editProfileForm]').validate();
        var validate = $('form[name=editProfileForm]').valid();
        if(validate == true){
            // $scope.userInfo.type = $scope.staff.type.id;
            // update user info
            var ajaxUpdateUser = $http.put('/api/user/'+USER_ID+'', $scope.userInfo).success(function($data){
            });

            var ajaxUpdateStaff = $http.put('/api/user/'+USER_ID+'/staff', $scope.userInfo).success(function($data){
            });
            var ajaxUpdateBank = $http.put('/api/user/'+USER_ID+'/bank-info', $scope.bankInfo).success(function($data){
            });

            // update resume
            if($scope.resume.user_id){
                // create
                $http.post('/api/user/'+USER_ID+'/resume', $scope.resume).success(function($data){
                    $q.all([ajaxUpdateUser, ajaxUpdateStaff, ajaxUpdateBank])
                        .then ( function () {
                        location.href = "/admin/staff/view/?id=" + USER_ID;
                    });
                });
            }else{
                // Update
                $http.put('/api/user/'+USER_ID+'/resume', $scope.resume).success(function($data){
                    $q.all([ajaxUpdateUser, ajaxUpdateStaff, ajaxUpdateBank])
                        .then ( function () {
                        location.href = "/admin/staff/view/?id=" + USER_ID;
                    });
                });
            }
            
        }
    }   
    
    $scope.loadStaffType = function () {
        if ( $scope.staff.type ) {
            $("label.staffrole").removeClass('active');
            $("label.staffrole").each(function () {
                if ($(this).attr('rid') * 1 == $scope.staff.type.id * 1 ) {
                    $(this).addClass('active');
                }
            });
        }
    } 
    
    $scope.setStaffType = function ( rid ) {
        $scope.userInfo.type = rid;
    }
    
    $scope.openFileDialog = function () {
        $("#objFile").click();
    }

    $scope.active_class = function(a, b){
        return a == b ? 'active' : '';
    };

    $scope.setActive = function ( str_flag ) {
        $scope.userInfo.isActive = str_flag;
    }
});
angularApp.controller('AppController', ['$scope', 'FileUploader', '$http', '$timeout', 'sharedInstance', function($scope, FileUploader, $http, $timeout, sharedInstance) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/admin/staff/uploadFile'
    });
    $scope.cvfiles = new Array();
    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
    $scope.getStaffCVFiles = function() {
        $http.get('/api/user/' + USER_ID + '/cv-files').success(function ($data) {
            if ( $data['cvfiles'] ) {
                for ( var i = 0; i < $data['cvfiles'].length; i ++ ) {
                    $scope.cvfiles.push({
                        id: $data['cvfiles'][i].id,
                        name: $data['cvfiles'][i].name,
                        path: $data['cvfiles'][i].path
                    });
                    sharedInstance.addcvfile ( {
                        id: $data['cvfiles'][i].id,
                        name: $data['cvfiles'][i].name,
                        path: $data['cvfiles'][i].path
                    });
                }
                
            }
        });
    }
    $scope.init = function () {
        $scope.getStaffCVFiles();
    }
    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        
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
        fileItem.cvFile = {
            name: fileItem.file.name,
            id: response.file.id,
            path: fileItem.file.path
        };
        $scope.cvfiles.push( fileItem.cvFile );
        
        sharedInstance.addcvfile( fileItem.cvFile );
        $http.put('/api/user/'+USER_ID+'/cv-files', new Array({id: fileItem.cvFile.id, userid: USER_ID})).success(function(){ });
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    };
    uploader.onCompleteAll = function() {
        //console.info($scope.cvfiles);
    };
    
    $scope.deleteFile = function ( cid ) 
    {
        bootbox.confirm('Are you sure!', function ( bFlag ) {
            if ( bFlag ) {
                $timeout(function(){                
                    sharedInstance.removecvfile( cid );       
                    for ( var i = 0; i < $scope.cvfiles.length; i ++ ) 
                    {
                        if ( $scope.cvfiles[i].id == cid) 
                        {
                            $scope.cvfiles.splice(i, 1);                        
                            break;
                        }
                    }
                    $http.get("/admin/staff/deleteFile?fid=" + cid);
                    // $http.delete("/api/user/" + cid + "/cv-files");
                }, 100);                    
            }
        });
            
    };

    // -------------------------------

    var controller = $scope.controller = {
        isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|png|jpg|jpeg|gif|'.indexOf(type) !== -1;
        },
        isDocument: function ( item ) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|doc|docx|odt|pdf|'.indexOf(type) !== -1;
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

angularApp.directive('stafftype', function($http, $compile){
    var getTemplateUrl = function (arrTypes) {
        var nSubtype = '0';
        var strLabel =  '';
        var strBr = "<br/>";
        var strNbsp = "&nbsp;";
        var strHtml = "";
        
        for ( var i = 0; i < arrTypes.length; i ++) {
            strLabel =  "<label class='btn btn-sm btn-outline btn-primary staffrole required' rid='"+arrTypes[i].id+"' required><i class='fa fa-circle'></i>" +
                            "<input type='radio' name='translator' style='width: 0px;height: 0px;' > " + arrTypes[i].type +
                        "</label>";
            //strHtml +=  strLabel;
            if ( nSubtype != arrTypes[i].subtype ) {
                nSubtype = arrTypes[i].subtype;
                strHtml += strBr + strBr + strLabel;
            } else {
                strHtml += strNbsp + strLabel;
            }
            
        }
        
        return strHtml;
    }
    
    return {
        controller: 'AppController',
        restrict: 'E',
        link: function (scope, element, attributes) {
            $http.get('/api/admin/roles').success(function( $data ) {
                element.html( getTemplateUrl($data['types']) );
                
                element.bind('mousedown', function(e) {
                    scope.setStaffType( $(e.target).attr('rid') );
                });
                
                scope.loadStaffType();
            });
        }
    }
});