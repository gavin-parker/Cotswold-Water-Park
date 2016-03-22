app.controller('WatersportsCtrl', function($scope, parkDataService) {
  console.log('IN watersports CTRL');
  $scope.watersports = [];
  parkDataService.watersports().then(function(result){
    console.log(result);
    $scope.watersports = result;
    if($scope.watersports == {} || $scope.watersports == null){
      $scope.watersports = JSON.parse(window.localStorage['watersports']);
    }else{
    window.localStorage['watersports'] = JSON.stringify($scope.watersports);
  }
    checkFavourites();

    $scope.$on('$ionicView.enter', function() {
      checkFavourites();
      console.log("hi");
    });
  });

  $scope.num = parkDataService.watersports.length;

  $scope.toggleGroup = function(activity) {
    if ($scope.isGroupShown(activity)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = activity;
    }
    $scope.shownEntry = null;
  };

  $scope.addToFavourites = function(fav){
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    if(Object.keys(favs).length === 0){
      console.log("no favourites");
      favs = [];
    }
    favs.push(fav);
    for(var i=0;i<$scope.watersports.length;i++){
      if($scope.watersports[i].Name == fav.Name){
        $scope.watersports[i].fav = true;
      }
    }
    window.localStorage['favs'] = JSON.stringify(favs);
  };
  $scope.removeFromFavourites = function(fav){
    console.log("Removing from favourites");
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    if(Object.keys(favs).length == 0){
      return;
    }
    for(var i =0; i < favs.length;i++){
      if(favs[i].Name == fav.Name){
        favs.splice(i, 1);
      }
    }
    for(var i=0;i<$scope.watersports.length;i++){
      if($scope.watersports[i].Name == fav.Name){
        $scope.watersports[i].fav = false;
      }
    }

    window.localStorage['favs'] = JSON.stringify(favs);
  }

  checkFavourites = function(){
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    for(var i=0;i<$scope.watersports.length;i++){
      $scope.watersports[i].fav = false;
      for(var j=0;j<favs.length;j++){
        if($scope.watersports[i].Name == favs[j].Name){
          $scope.watersports[i].fav = true;
        }
      }
    }
  };

  $scope.isGroupShown = function(activity) {
    return $scope.shownGroup === activity;
  };

  $scope.showOnMap = function(coords) {
    console.log("Pressed show on map");
    $scope.removeMarkersAndShowActivity(coords);
  };

  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  var copy = JSON.parse(window.localStorage['watersports'])
  $scope.activityOptions = [];
  for(var i in copy) {
    for(var j = 0; j < copy[i].Type.length; j++) {
      if(!(isInArray(copy[i].Type[j], $scope.activityOptions))) { 
        $scope.activityOptions.push(copy[i].Type[j]);
      }
    }
  }
  $scope.activityOptions.sort();
  $scope.activityOptions.unshift("All");
  $scope.selectedActivity = "All";

  $scope.isSelected = function(activity) {
    var result = false;
    for(var i in activity.Type) {
      if(activity.Type[i] == $scope.selectedActivity) {
        result = true;
      }
    }
    return result;
  }
});