
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
//gets live bird data via import.io feed
app.factory('birdService', function($q, $http){
  return{
    Import : function(){
      var defer = $q.defer();
      $http.get('https://api.import.io/store/connector/151993b5-0f48-4be1-b513-2cff6099a83d/_query?input=webpage/url:https%3A%2F%2Fcotswoldwaterpark.wordpress.com%2F&&_apikey=c8fff4d639294119aa3fe88c54b0306f79fe93ec766825859542a396ca869e7614165739e8be6992c090978ce35d1ed7b5cd46e8f0b1754f0ee5b867d4c73f0d5d887d6fab9ceae324d7fa61e16674b2')
        .success(function(data){
          for(var i=0;i< data.results.length;i++){
            var res = data.results[i];
            var content = res["entry_content"];
            content = content.replace(".", ".<br/>");
            content = content.replace(/CWP[]?[0-9]*/g, "<br/><b>$&</b>");

            data.results[i].entry_content = content;

          }

          defer.resolve(data.results);
        });
        return defer.promise;
  }
}});

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
