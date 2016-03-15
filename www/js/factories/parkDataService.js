//service to get hardcoded activity data
app.factory('parkDataService', function($http, $q){

  return {
    activities : function(){
      var activities;
      var defer = $q.defer();
      $http.get('js/activities.json')
           .success(function(res){
              defer.resolve(res);
              console.log(res);
            });
      return defer.promise;
    },
    lakes : function(){
      var activities;
      var defer = $q.defer();
      $http.get('js/lakes.json')
           .success(function(res){
              defer.resolve(res);
            });
      return defer.promise;
    }
  };
});
