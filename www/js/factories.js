
//service to get hardcoded activity data
app.factory('parkDataService', function(){
  var activities =
  [
    {
    name: "Aerial Adventure",
    info: "Aerial adventure is one of the fastest growing activities in the UK, and in a part of the country where hills are in short supply why not climb up and get a different view of life?",
    data: [
      {
        name: "Head 4 Heights Ltd",
        number: "01285 770 007",
        email: "info@head4heights.net",
        url: "www.head4heights.net",
        info: "Head 4 Heights, the only high ropes activity centre in the Cotswold Water Park, is open to families, individuals and all groups. With many exciting activity packages from as little as 30 minutes up to a full day, this is the perfect place to be Tarzan or Jane of The Jungle!"
      }
    ]
  },
  {
    name: "Angling",
    info: "Fishing takes place on more than 70 lakes in the Cotswold Water Park, with the clear waters and peaceful locations making this an ideal spot for both coarse and fly fishing. Day tickets and club membership facilities are available from fisheries and tackle shops in the area and nearby.",
    data: [
      {
        name: "Lake Pochard",
        number: "01793 751 513",
        email: "contact@lakepochard.co.uk",
        url: "www.lakepochard.co.uk",
        info: "Fully equipped Scandinavian-style Lodges, all with verandas and views across the 10-acre lake. Available for short or week breaks. Top quality carp fishing and large, airy Waterside Café on site.",
      },
      {
        name: "Tackle Den",
        number: "01285 862 716",
        email: "thetackleden@hotmail.co.uk",
        url: "www.facebook/com/tackleden",
        info: "Now bigger and better! Carp and coarse fishing specialist. The no. 1 tackle shop in the Cotswold Water Park, selling numerous brands of angling equipment and bait"
      }
    ]
  },
  {
    name: "Beach",
    info: "Cotswold Country Park and Beach is a great place to take the family, with plenty of activities from boat hire, BBQ hire, cafe, lakeside walks, and even more during the summer months. Many thousands of people come to the beach on hot sunny days in the summer, so make sure you arrive early!",
    data: [
      {
        name: "Cotswold Country Park and Beach",
        number: "01285 868 096",
        email: "info@cotswoldcountrypark.co.uk",
        url: "www.cotswoldcountrypark.co.uk",
        info: "Open daily from 10am - 8pm during the summer with the largest inland bathing beach in the UK, lifeguarded during week-ends and school holidays from April. Adventure playgrounds, cafes and wonderful lakeside walks. Activities include: WMSki System 2 Cable, open water swimming, peddalo, row boat and kayak hire, stand up paddle boarding, zorbing and crazy golf",
      }
    ]
  },
  {
    name: "Boat Trips",
    info: "",
    data: [
      {
        name: "Cotswold Canals Trust Boat Trips",
        number: "07787 485 294",
        email: "mail@cotswoldcanals.com",
        url: "www.lechladetripboat.com",
        info: "Enjoy the gentle meadering River Thames aboard the beautiful launch 'Inglesham' departing from Riverside Park. GL7 3AG . All proceeds invested in the restoration of the Cotswold canals."
      }
    ]
  },
  ];

  return {
    activities : function(){
      return activities;
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
