
//gets live bird data via import.io feed
app.factory('birdService', function($q, $http){
  return{
    Import : function(){
      var defer = $q.defer();
      $http.get('https://api.import.io/store/connector/56825a80-85c7-415a-9c63-d1ce5e2c1fd5/_query?input=webpage/url:https%3A%2F%2Fcotswoldwaterpark.wordpress.com%2F&&_apikey=c8fff4d639294119aa3fe88c54b0306f79fe93ec766825859542a396ca869e7614165739e8be6992c090978ce35d1ed7b5cd46e8f0b1754f0ee5b867d4c73f0d5d887d6fab9ceae324d7fa61e16674b2')
        .success(function(data){
          console.log(data);




          /*
          for(var i=0;i< data.results.length;i++){
            var res = data.results[i];
            var content = res["entry_content"];
            content = content.replace(".", ".<br/><br/>");
          /*content = content.replace(/CWP[ ]?[0-9]*/ /*g, function(a){
              console.log(a);
              if(a.match(/\d+/g) !== null){
              return '<b>' + a + '</b>';
            }else{
              return a;
            }
          });

            data.results[i].entry_content = content;

          }*/

          for(var i=0;i < data.results.length;i++){
            var res = data.results[i];
            if(typeof res['ENTRYCONTENT_DESCRIPTIONS']  === 'string'){
              var str = res['ENTRYCONTENT_DESCRIPTIONS'];
            data.results[i]['ENTRYCONTENT_DESCRIPTIONS'] = [];
            data.results[i]['ENTRYCONTENT_DESCRIPTIONS'].push(str);
          }
          }


          if(data.results != null){
          window.localStorage['birds'] = JSON.stringify(data.results);
        }else{
          var res = JSON.parse(window.localStorage['birds']);
          defer.resolve(res);
        }
          defer.resolve(data.results);
        }, function(err){
          var res = JSON.parse(window.localStorage['birds']);
          console.log(err);
          console.log("loading cached data instead");
          defer.resolve(res);
        });
        return defer.promise;
  },
  Locations : function(){
    var defer = $q.defer();
    $http.get('https://api.import.io/store/connector/151993b5-0f48-4be1-b513-2cff6099a83d/_query?input=webpage/url:https%3A%2F%2Fcotswoldwaterpark.wordpress.com%2F&&_apikey=c8fff4d639294119aa3fe88c54b0306f79fe93ec766825859542a396ca869e7614165739e8be6992c090978ce35d1ed7b5cd46e8f0b1754f0ee5b867d4c73f0d5d887d6fab9ceae324d7fa61e16674b2')
      .success(function(data){
        var sightings = [];
        for(var i=0;i< data.results.length;i++){
          var res = data.results[i];
          var content = res["entry_content"];
          content = content.replace(".", ".<br/>");
          var expression = /CWP[/\s]?[0-9]+/g;
          while((lakes = expression.exec(content)) !== null){
            sightings.push(lakes);
          }
        }

        defer.resolve(sightings);
      });
      return defer.promise;

  }
}});
