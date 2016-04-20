

//function to control activities tab
app.controller('ActivitiesCtrl', function($scope, parkDataService,$ionicLoading){
  console.log('IN ACTIVITIES CTRL');
  $scope.activities = [];
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });

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
    $ionicLoading.hide();
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

  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
try{
  var copy = JSON.parse(window.localStorage['activities']);
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

}catch(err){
  console.log(err);
}

  $scope.isSelected = function(activity) {
    var result = false;
    for(var i in activity.Type) {
      if(activity.Type[i] == $scope.selectedActivity) {
        result = true;
      }
    }
    return result;
  }

  $scope.openCordovaWebView = function(site)
  {
    console.log(site);
   // Open cordova webview if the url is in the whitelist otherwise opens in app browser
   window.open(site,'_self');

  };
});
