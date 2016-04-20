//controls news tab
app.controller('NewsCtrl', function($scope, newsService,$ionicLoading,$ionicPopover){
  console.log('IN NEWS CTRL');
  var template = '<ion-popover-view><ion-header-bar><h2>News</h2></ion-header-bar><ion-content><p>This page shows the latest news updates from <hyper>waterpark.org</hyper></p></ion-content></ion-popover-view>';
  $scope.popover = $ionicPopover.fromTemplate(template,{
    scope: $scope
  });

  function firstLoad(){
    var dat = window.localStorage['newsLoad'];
    if(dat == 1){
      return 0;
    }else{
      window.localStorage['newsLoad'] = 1;
      return 1;
    }
  }


  $scope.showInfo = function(){
    $scope.popover.show();
  };
  function initialize(){
    newsService.Feed().then(function(result){
      $scope.news = result.feed.entries;
      console.log($scope.news);
    });
    $ionicLoading.hide();
    if(firstLoad()){
      $scope.showInfo();
    }
  }
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
