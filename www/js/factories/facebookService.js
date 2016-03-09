app.factory('facebookService', function($q, $http){
  return{
    Import : function(){
     // console.log("IAMHEREEE");
      var defer = $q.defer();
      $http.get("https://graph.facebook.com/v2.5/1580592965597214/posts?access_token=CAACEdEose0cBAC4lYUaSLsTzNe6AT1PTOgVj1NZAaju2h7YKC1ZAu8fZCNgqWOtt2bM7ct5gYeZA3C6fvRf8jhj6tZCyZBfyFgZAX7IMEzWhAMpt5YZAUeZAoYdNslbAx2pym1LOzUFnp1dxmMG7V3vf9GYLBIahmczQe8FqMSExntZConsZA4sPD2QyHLmFXAmOoRvxftgERvp7EHnrbW0H490")
      /*FB.api(
      '/1580592965597214/feed',
      'GET',
      {},*/
      .success(function(response) {
          //console.log("Got Here");
          defer.resolve(response.data);
          console.log(response.data);
          // Insert your code here
      }
    );
     return defer.promise;
  },
  Page : function(){
    var defer = $q.defer();
    $http.get("https://graph.facebook.com/v2.5/137518789602829/feed")
    /*FB.api(
    '/1580592965597214/feed',
    'GET',
    {},*/
    .success(function(response) {
        //console.log("Got Here");
        defer.resolve(response);
        console.log(response);
        // Insert your code here
    }
  );
   return defer.promise;
  }
}});
