app.controller('FavsCtrl', function($scope,$ionicLoading){
  $scope.favourites = [];
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>'
  });
  $scope.$on('$ionicView.enter', function() {
    $scope.favourites = JSON.parse(window.localStorage['favs'] || {});
    console.log("hi");
    $ionicLoading.hide();
  });
  console.log($scope.favourites);
  $scope.toggleGroup = function(activity) {
    if ($scope.isGroupShown(activity)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = activity;
    }
  };
  $scope.isGroupShown = function(activity) {
    return $scope.shownGroup === activity;
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
        $scope.favourites.splice(i,1);
      }
    }
    window.localStorage['favs'] = JSON.stringify(favs);
  }

  $scope.showOnMap = function(coords) {
    console.log("Pressed show on map");
    $scope.removeMarkersAndShowActivity(coords);
  };
  $scope.openCordovaWebView = function(site)
  {
    console.log(site);
   // Open cordova webview if the url is in the whitelist otherwise opens in app browser
   window.open(site,'_self');

  };

});
