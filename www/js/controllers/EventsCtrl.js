//controls events tab
app.controller('EventsCtrl', function($scope, eventService,$ionicLoading){
  console.log('IN EVENTS CTRL');
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });
  function initialize(){
    eventService.Feed().then(function(result){
      $scope.events = result.feed.entries;
      console.log($scope.events);
      if($scope.events == {} || $scope.events == null){
        $scope.events = JSON.parse(window.localStorage['events']);
      }else{
      window.localStorage['events'] = JSON.stringify($scope.events);

    }
    });
    $ionicLoading.hide();

  }
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000
  });
  superfeedr.auth('gp14958','df172f3202b13c654d4777881720c9cd');
  superfeedr.setOnLoadCallback(initialize);

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
  $scope.openCordovaWebView = function(site)
	{
	 // Open cordova webview if the url is in the whitelist otherwise opens in app browser
	 window.open(site,'_self');

	};
});
