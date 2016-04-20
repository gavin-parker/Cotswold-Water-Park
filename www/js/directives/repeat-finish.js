
app.directive('repeatFinish', function($ionicLoading){
return function(scope,element, attrs){
  if(scope.$last){
    $ionicLoading.hide();
  }
};
});
