app.controller('FacebookCtrl', function($scope, facebookService){
  console.log('IN FACE CTRL');
  function initialize(){
      facebookService.Import().then(function(result){
      $scope.facebook = result;
      console.log($scope.facebook);
      //console.log($scope.birds[0]["postedon_link/_text"]);
    });
  }
  initialize();
});