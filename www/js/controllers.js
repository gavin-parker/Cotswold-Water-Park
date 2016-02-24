
app.controller('SubmitCtrl', function($scope){
  console.log("hello");

  $scope.submit(){
    console.log("submit");
  }
});
app.directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function(value){
        $rootScope.hideTabs = value;
      });

      scope.$on('$destroy', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
});
