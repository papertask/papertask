angularApp.controller('OrderTranslationController', function($scope, $http, $timeout, $q, $sce, CurrentUser,
		TableItemListService, ProjectServiceLevel, ProjectStatus, ProjectPriority,  ProjectType, CurrentcyRate){
	$scope.files = [];
	
	 $scope.project = {
				
		        types: [],
				files: []	
	};

	
	 $scope.init = function(){
		 $scope.test = 'Hello';
		 
		 $http.get("/api/data/project/")
         .success(function($data){
				console.log($data);
             jQuery.extend(true, $scope, $data);  // copy data to scope
             var shareData = ['interpretingUnits', 'engineeringUnits', 'dtpUnits'];
             for(var i = 0; i < shareData.length; i++){
                 var key = shareData[i];
                 setModalControllerData(key, $scope[key]);
             }
             console.log('scope');
             console.log($scope);	

             $scope.project.targetLanguages = [];
             $timeout(function(){
                 //jQuery("select.multiselect").multiselect("destroy").multiselect();
             });
         });
		 console.log( $scope.languages);
	 };
	 
	 $scope.change = function(){
		 //alert('change');
	 }
	 
	 $scope.init();
	 
	 $scope.add_targetLanguage = function(){
		 
		 $scope.project.targetLanguages.push($scope.project.targetLanguage);
		 console.log($scope.project);
	 }
	 
	 $scope.removeTargetLang = function(lang){
		 var index = $scope.project.targetLanguages.indexOf(lang);
		  $scope.project.targetLanguages.splice(index, 1);  
		  console.log($scope.project);
	 }	 

	 $scope.ProjectServiceLevel = ProjectServiceLevel.all(); 
	 
	 //$scope.project.client = CurrentUser.info;
	
	 
	 $scope.orderTranslation = function(){
		 $scope.project.client = $scope.clients[0];
		 $scope.project.status = ProjectStatus.get(1);
		 $scope.project.reference = 'reference not null';
		 $scope.project.dueDate = "11-04-2015 15:07";
		 $scope.project.duration = '5';
		 $scope.project.startDate = "11-04-2015 15:07";
		 $scope.project.priority = ProjectPriority.get(1);
		 
		 console.log('$scope.project');
		 console.log($scope.project);
		 
		 $http.post("/api/admin/project/", $scope.project)
         .success(function($data){
				
             if($data.success){
                 location.href = "/" + LANG_CODE + "/admin/project/detail/?id=" + $data.project.id;
             } else {
                 location.href = "/" + LANG_CODE + "/admin/quote/detail/?id=" + $data.project.id;
             }
         })
         .error(function($data){

         });
	 }
});


angularApp.factory("TableItemListService", function(){
    var $scopes = [];
    var listener;
    var isNew = false;
    var modalId = "#modal-interpreting";
    var vars = {
        item: {}
    };
	var vartms = {
        itemtm: {}
    };
	
    var itemCloned = {};
    function setListener($scope){
        listener = $scope;
    }
    return {
        addScope: function($scope){
            if($scopes.indexOf($scope) === -1){
                $scopes.push($scope);
            }
        },
        data: function(){
            var data = [];
            for(var i = 0; i < $scopes.length; i++){
                var scopeData = $scopes[i].data();
                if(scopeData !== false){
                    data.push($scopes[i].data());
                }
            }
            return data;
        },
        cancel: function(){
            jQuery.extend(true, vars.item, itemCloned);
            $(modalId).modal("hide");
        },
        save: function(){
            $(modalId).find("form").validate();
            if(!$(modalId).find("form").valid()){
                return;
            }
            if(isNew){
                listener.add(vars.item);
            }
            $(modalId).modal("hide");
        },
        setModalId: function(id){
            modalId = id;
        },
        showModal: function($scope, $item){
            if($item === false){
                $item = {};
                isNew = true;
            } else {
                isNew = false;
            }
			
            setListener($scope);
            vars.item = $item;
			if(modalId == "#modal-translation-noTM")
			{
				//find rate
				vars.item.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
			}
            itemCloned = {};
            jQuery.extend(true, itemCloned, $item);
            $(modalId).modal("show");
        },
		savetm: function(){
            $(modalId).find("form").validate();
            if(!$(modalId).find("form").valid()){
                return;
            }
            if(isNew){
                listener.addtm(vartms.itemtm);
            }
            $(modalId).modal("hide");
        },
		showModalTM: function($scope, $itemtm){
            if($itemtm === false){
                $itemtm = {};
                isNew = true;
            } else {
                isNew = false;
            }
			
            setListener($scope);
            vartms.itemtm = $itemtm;
			if(modalId == "#modal-translation-TM")
			{
				//find rate
				vartms.itemtm.rate = Number($scope.TableItemListService.translationPrices[$scope.identifier[1].id]);
			}
            itemCloned = {};
            jQuery.extend(true, itemCloned, $itemtm);
            $(modalId).modal("show");
        },
		getRateDtp : function($scope){
			listener.getRateDtp(vars.item);
		},
		getRateEng : function($scope){
			listener.getRateEng(vars.item);
		},
		getRateInt : function($scope){
			listener.getRateInt(vars.item);
		},
        vars: vars,
		vartms: vartms
    }
});

angularApp.controller('AppController', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {
    var uploader = $scope.uploader = new FileUploader({
        url: "/" + LANG_CODE + "/admin/project/uploadFile"
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