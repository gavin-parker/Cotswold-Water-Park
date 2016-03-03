
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
          window.localStorage['birds'] = JSON.stringify(data.results);
          defer.resolve(data.results);
        }, function(err){
          var res = JSON.parse(window.localStorage['birds']);
          defer.resolve(res);
        });
        return defer.promise;
  },
  Locations : function(){
    var defer = $q.defer();
    $http.get('https://api.import.io/store/connector/151993b5-0f48-4be1-b513-2cff6099a83d/_query?input=webpage/url:https%3A%2F%2Fcotswoldwaterpark.wordpress.com%2F&&_apikey=c8fff4d639294119aa3fe88c54b0306f79fe93ec766825859542a396ca869e7614165739e8be6992c090978ce35d1ed7b5cd46e8f0b1754f0ee5b867d4c73f0d5d887d6fab9ceae324d7fa61e16674b2')
      .success(function(data){
        console.log("hello");
        for(var i=0;i< data.results.length;i++){
          var res = data.results[i];
          var content = res["entry_content"];
          content = content.replace(".", ".<br/>");
          var expression = /CWP[]?[0-9]+/g;
          var lakes = expression.exec(content);

          console.log("lake:");
          console.log(lakes);
        }

        defer.resolve(data.results);
      });
      return defer.promise;

  }
}});
