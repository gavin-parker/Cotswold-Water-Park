//controls events tab
app.controller('EventsCtrl', function($scope, eventService,$ionicLoading,$ionicPopover){
  console.log('IN EVENTS CTRL');
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });

  var template = '<ion-popover-view><ion-header-bar><h2>The Events Feed</h2></ion-header-bar><ion-content><p>The Events Feed shows the latest events on <hyper>waterpark.org<br/>\
  </hyper> </p></ion-content></ion-popover-view>';
  $scope.popover = $ionicPopover.fromTemplate(template,{
    scope: $scope
  });

  function firstLoad(){
    var dat = window.localStorage['eventLoad'];
    if(dat == 1){
      return 0;
    }else{
      window.localStorage['eventLoad'] = 1;
      return 1;
    }
  }


  $scope.showInfo = function(){
    $scope.popover.show();
  };

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
    if(firstLoad()){
      $scope.showInfo();
    }
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
