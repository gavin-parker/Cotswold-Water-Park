app.controller('PopoverCtrl', function ($scope, Scopes) {
  Scopes.store('PopoverCtrl', $scope);
  $scope.controlLayers = function(toggledLayer){
  	console.log('popover tog: ', toggledLayer);
    Scopes.get('MapCtrl').controlLayers(toggledLayer);
  };
});