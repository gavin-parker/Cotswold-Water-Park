//controls events tab
app.controller('EventsCtrl', function($scope, eventService){
  console.log('IN EVENTS CTRL');

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
