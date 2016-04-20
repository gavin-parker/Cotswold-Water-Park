app.controller('FavsCtrl', function($scope,$ionicLoading,$ionicPopover){
  $scope.favourites = [];
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });

  var template = '<ion-popover-view><ion-header-bar><h2>Favourites</h2></ion-header-bar><ion-content><p>This page shows your favourite activities. Add as many as you like from the activity page!</p></ion-content></ion-popover-view>';
  $scope.popover = $ionicPopover.fromTemplate(template,{
    scope: $scope
  });

  function firstLoad(){
    var dat = window.localStorage['favLoad'];
    if(dat == 1){
      return 0;
    }else{
      window.localStorage['favLoad'] = 1;
      return 1;
    }
  }


  $scope.showInfo = function(){
    $scope.popover.show();
  };


  $scope.$on('$ionicView.enter', function() {
    $scope.favourites = JSON.parse(window.localStorage['favs'] || {});
    console.log("hi");
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

if(firstLoad()){
  $scope.showInfo();
}
});
