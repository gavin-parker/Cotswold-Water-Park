//controls news tab
app.controller('NewsCtrl', function($scope, newsService,$ionicLoading){
  console.log('IN NEWS CTRL');

  function initialize(){
    newsService.Feed().then(function(result){
      $scope.news = result.feed.entries;
      console.log($scope.news);
    });
    $ionicLoading.hide();

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
