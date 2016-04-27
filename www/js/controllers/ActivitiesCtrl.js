

//function to control activities tab
app.controller('ActivitiesCtrl', function($scope, parkDataService,$ionicLoading,$ionicPopover){



  var init = function(){
    console.log('IN ACTIVITIES CTRL');
    $scope.activities = [];
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
      duration: 5000,
      scope: $scope
    });
    var template = '<ion-popover-view><ion-header-bar><h2>Activities</h2></ion-header-bar><ion-content><p>This page shows all the activities available in the waterpark. <br/>\
    Tap on an activity for more information.</p></ion-content></ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template,{
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
      $scope.num = parkDataService.activities.length;


      //$ionicLoading.hide();
    });
  }



  function firstLoad(){
    var dat = window.localStorage['actLoad'];
    if(dat == 1){
      return 0;
    }else{
      window.localStorage['actLoad'] = 1;
      return 1;
    }
  }


  $scope.showInfo = function(){
    $scope.popover.show();
  };



  $scope.$on('$ionicView.enter', function() {
    checkFavourites();
    console.log("hi");
    if(firstLoad()){
      $scope.showInfo();
    }

  });

  $scope.toggleGroup = function(activity) {
    console.log(activity);
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
  $scope.getStyle = function(activity){
    if($scope.selectedActivity == activity){
      return {'background-color':'#9CCC65'};
    }else{
      return "";
    }
  }

  $scope.select = function(activity){
    $scope.selectedActivity = activity;
    console.log(activity.style);
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
  init();
});
