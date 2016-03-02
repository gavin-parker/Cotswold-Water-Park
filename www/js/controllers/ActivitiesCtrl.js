

//function to control activities tab
app.controller('ActivitiesCtrl', function($scope, parkDataService){
  console.log('IN ACTIVITIES CTRL');
  $scope.activities = [];
  parkDataService.activities().then(function(result){
    console.log(result);
    $scope.activities = result;
    if($scope.activities == {} || $scope.activities == null){
      $scope.activities = JSON.parse(window.localStorage['activities']);
    }else{
    window.localStorage['activities'] = JSON.stringify($scope.activities);
  }
    checkFavourites();

    $scope.$on('$ionicView.enter', function() {
      checkFavourites();
      console.log("hi");
    });
  });

  $scope.num = parkDataService.activities.length;

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
    for(var i=0;i<$scope.activities.length;i++){
      if($scope.activities[i].Name == fav.Name){
        $scope.activities[i].fav = true;
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
    for(var i=0;i<$scope.activities.length;i++){
      if($scope.activities[i].Name == fav.Name){
        $scope.activities[i].fav = false;
      }
    }

    window.localStorage['favs'] = JSON.stringify(favs);
  }

  checkFavourites = function(){
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    for(var i=0;i<$scope.activities.length;i++){
      $scope.activities[i].fav = false;
      for(var j=0;j<favs.length;j++){
        if($scope.activities[i].Name == favs[j].Name){
          $scope.activities[i].fav = true;
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

  $scope.activityOptions = ['All', 'Aerial', 'Angling', 'Beach\n', 'Boat ', 'Groups', 'Horse v', 'Rally', 'Shooting', 'Wilderness', 'Food'];
  $scope.selectedActivity = "All";
});