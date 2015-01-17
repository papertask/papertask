angularApp.run( function ($rootScope) {    
    $(".summernote").summernote();
    $("form[name='newStaffForm']").validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {
            confirmpwd: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function( form ) {
            angular.element('#StaffController').scope().submit();
        }
    });
}); 

angularApp.service('sharedInstance', function() {
	var cvfiles = new Array();
    var stafftypes = new Array();
	return {
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

angularApp.controller('newStaffController', function($scope, $http, $timeout, $q, sharedInstance){
    $scope.userInfo = {
        gender: '',
        type: null,
        isActive: null,
        cellphone: null,
        phone: null
    };
    $scope.pagetype='new';
    $scope.resume = {};
    $scope.bankInfo = {};
    $scope.countries = [];
    $scope.types = [];
    
    $scope.init = function () {
        $scope.getCountriesList();
    }

    $scope.getCountriesList = function() {
        $http.get('/api/common/country').success(function($data){
            $scope.countries = $data['countries'];
        });
    }
    
    $scope.openFileDialog = function () {
        $("#objFile").click();
    }
    
    $scope.submit = function () {
        $http.post("/api/user/staff", $scope.userInfo).success( function( $data ){
            if ( $data.length == 0 ) {
                bootbox.alert('Failed to save');
                return;
            }
            var strUserId = $data.id;
			console.log(strUserId);
			console.log($data);
        	$scope.bankInfo.user_id = $data.id;
            $scope.resume.user_id = $data.id;
            $scope.resume.cvfiles = sharedInstance.getcvfiles();
        	var ajaxPaymentInfo = $http.post( "/api/user/bankinfo", $scope.bankInfo );
        	var ajaxResume = $http.post( "/api/user/resume", $scope.resume );
        	
        	$q.all([ajaxPaymentInfo, ajaxResume])
            	.then(function(){
            	   location.href="/" + LANG_CODE + "/admin/staff/view?id=" + strUserId;
            		// bootbox.alert("Saved successfully!" );
            });
        });
    }
    
    $scope.setStaffType = function ( rid ) {
        $scope.userInfo.type = rid;
    }
});

angularApp.controller('AppController', ['$scope', 'FileUploader', '$http', '$timeout', 'sharedInstance', function($scope, FileUploader, $http, $timeout, sharedInstance) {
    var uploader = $scope.uploader = new FileUploader({
        url: "/" + LANG_CODE + '/admin/staff/uploadFile'
    });
    $scope.cvfiles = new Array();
    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
    $scope.init = function () {}
    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        
    };
    
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.upload();
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        // console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        // console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        // console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        // console.info('onProgressAll', progress);
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
                    $http.get("/" + LANG_CODE + "/admin/staff/deleteFile?fid=" + cid);
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
            strLabel =  "<label class='btn btn-sm btn-outline btn-primary staffrole' rid='"+arrTypes[i].id+"'><i class='fa '></i>" +
                            "<input type='radio' class='required' name='translator' style='width: 0px;height: 0px;'> " + arrTypes[i].type +
                        "&nbsp;</label>";
            //strHtml +=  strLabel;
            if ( nSubtype != arrTypes[i].subtype ) {
                nSubtype = arrTypes[i].subtype;
                strHtml += strBr + strBr + strLabel;
            } else {
                strHtml += strNbsp + strNbsp + strLabel;
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
            });
        }
    }
});