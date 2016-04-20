//controls birds tab
app.controller('BirdsCtrl', function($scope, birdService,$ionicLoading){
  console.log('IN BIRDS CTRL');
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });
  function initialize(){

    /*
    birdService.Feed().then(function(result){
      $scope.birds = result.feed.entries;
      console.log($scope.birds);
    });
    */
    birdService.Import().then(function(result){
      $scope.birds = result;
      console.log($scope.birds);
      //console.log($scope.birds[0]["postedon_link/_text"]);
      $ionicLoading.hide();
    });
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

});
