//controls birds tab
app.controller('BirdsCtrl', function($scope, birdService,$ionicLoading,$ionicPopover){
  console.log('IN BIRDS CTRL');
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });
  var template = '<ion-popover-view><ion-header-bar><h2>The Bird Feed</h2></ion-header-bar><ion-content><p>The Bird Feed shows user-uploaded bird sightings from <hyper>cotswoldwaterpark.wordpress.com. <br/>\
  </hyper> You can upload your own bird sighting using the red button</p></ion-content></ion-popover-view>';
  $scope.popover = $ionicPopover.fromTemplate(template,{
    scope: $scope
  });

  function firstLoad(){
    var dat = window.localStorage['birdLoad'];
    if(dat == 1){
      return 0;
    }else{
      window.localStorage['birdLoad'] = 1;
      return 1;
    }
  }


  $scope.showInfo = function(){
    $scope.popover.show();
  };


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
      if(firstLoad()){
      $scope.showInfo();
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
