
//gets live news data via RSS feed (superfeedr API)
app.factory('newsService', function($q){
  return{
    Feed : function(){
      var feed =  new superfeedr.Feed("http://www.waterpark.org/feed/");
      var news;
      var defer = $q.defer();
      var regex = /href="([^"']*")/g;
      feed.load(function(result){
        if(!result.error){
          news = result;
          console.log(news);
          var item;
          //this doesn't work -- will replace with single link for page
          for(var i=0;i < result.feed.entries.length;i++){
          item = result.feed.entries[i].contentSnippet;
          item = item.replace(regex, function(a,b){
            console.log(a);
            console.log(b);
            return 'ng-click="openCordovaWebView(\'' + b.slice(0,-1) + '\')"';
          });
          result.feed.entries[i].contentSnippet = item;
        }
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
