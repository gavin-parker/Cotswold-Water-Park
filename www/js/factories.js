
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
    }
  }
});

//gets live event data via RSS feed (superfeedr API)
app.factory('eventService', function($q){
  return{
    Feed : function(){
      var feed =  new superfeedr.Feed("http://www.waterpark.org/events/feed/");
      var events;
      var defer = $q.defer();
      feed.load(function(result){
        if(!result.error){
          events = result;
          console.log(events.feed);
          defer.resolve(result);
        }else{
          console.log(result);
          console.log("feed error");
        };
      });

      return defer.promise;
    }
  }

});

//gets live news data via RSS feed (superfeedr API)
app.factory('newsService', function($q){
  return{
    Feed : function(){
      var feed =  new superfeedr.Feed("http://www.waterpark.org/feed/");
      var news;
      var defer = $q.defer();
      feed.load(function(result){
        if(!result.error){
          news = result;
          console.log(news.feed);
          defer.resolve(result);
        }else{
          console.log(result);
          console.log("feed error");
        };
      });
      return defer.promise;
    }
  }
});
