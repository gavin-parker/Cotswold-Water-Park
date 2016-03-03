

app.factory('tweetService', function($q){
  return{
    Tweets : function(){
      var defer = $q.defer();
      $http.get('https://stream.twitter.com/1/statuses/sample.json')
      .success(function(data){

      });

    }
  }

});
