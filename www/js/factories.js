
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

//service for markers
app.factory('markersDataService', function(){
  var markers =
  [
    {
      name: "Restaurants",
      info: "Places to eat",
      food: [
        {
          name: "The Old Boathouse Pub",
          number: "01285 864 111",
          email: "oldboathouse@four-pillars.co.uk",
          url: "www.oldboathousepub.co.uk",
          info: "Pub food served all day every day with a lakeside setting",
          location: [51.6719228,-1.9008366]
        },
        {
          name: "Royal Oak South Cerney",
          number: "01285 860 900",
          email: "",
          url: "www.royaloakatsouthcerney.co.uk",
          info: "The Royal Oak is a 300 year old pub offering fantastic food and drinks. Please see our website for more details.",
          location: [51.6858004,-1.9093466]
        },
        {
          name: "White Hart Inn",
          number: "01285 861 247",
          email: "enquiries@whitehartak.com",
          url: "www.whitehartak.com",
          info: "Super village inn on Thames Path. Fantastic food, belting beers and wonderful wines.",
          location: [51.6438034,-1.9370136]
        },
        {
          name: "White Hart Cricklade",
          number: "01793 750 206",
          email: "info@thewhitehartakcricklade.com",
          url: "www.thewhitehartakcricklade.co.uk",
          info: "A family run hotel in the Saxon town of Cricklade, with accomodation and an open plan bar & restaurant offering traditional classics, using fresh locally sourced ingredients.",
          location: [51.6438034,-1.9370136]
        }
      ]
    },

    {
      name: "Sites",
      info: "Places to visit",
      sites: [
        {
          name: "Lakeside",
          location: [51.670395, -1.914003]
        },
        {
          name: "Bridge",
          location: [51.665163, -1.909227]
        },
        {
          name: "Clayhill",
          location: [51.655372, -1.932596]
        },
        {
          name: "Neigh Bridge Hall",
          location: [51.650716, -1.974765]
        },
        {
          name: "Water Hay",
          location: [51.637943, -1.913938]
        }
      ]
    }
  ]

    return {
    markers : function(){
      return markers;
    },
    gMarkers : function(){

      return markers;
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
