app.controller('PopoverCtrl', function ($scope, Scopes) {
  Scopes.store('PopoverCtrl', $scope);

  $scope.langToggle = {
 		Act: true,
 	  WaterAct: true,
 	  GroupAct: true,
 	  food: true, 
 	  birds: true, 
 	  lakes:true,
 	  offline:false
  };

  $scope.toggleShowLocat = function(){
  		$scope.langToggle.Act =  false 
  		$scope.langToggle.GroupAct =  false
  		$scope.langToggle.WaterAct =  false
  		$scope.langToggle.food =  false
  		$scope.langToggle.birds =  false
  };

  //control layers of map 
  $scope.controlLayers = function(toggledLayer){
  	console.log('popover tog: ', toggledLayer);
    Scopes.get('MapCtrl').controlLayers(toggledLayer);
  };
});		