
//service to get hardcoded activity data
<<<<<<< HEAD
app.factory('parkDataService', function($http, $q){
=======
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
        info: "Head 4 Heights, the only high ropes activity centre in the Cotswold Water Park, is open to families, individuals and all groups. With many exciting activity packages from as little as 30 minutes up to a full day, this is the perfect place to be Tarzan or Jane of The Jungle!",
        location: [51.659611, -1.913410]
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
        location: [51.659611, -1.923410]
      },
      {
        name: "Tackle Den",
        number: "01285 862 716",
        email: "thetackleden@hotmail.co.uk",
        url: "www.facebook/com/tackleden",
        info: "Now bigger and better! Carp and coarse fishing specialist. The no. 1 tackle shop in the Cotswold Water Park, selling numerous brands of angling equipment and bait",
        location: [51.658611, -1.943410]
      },
      {
        name: "Lechlade & Bushyleaze Trout Fisheries",
        number: "01367 253 266",
        email: "tim@timtrout.co.uk",
        url: "www.lechladetrout.co.uk",
        info: "Lechlade and Bushyleaze Trout Fisheries - excellent day ticket fly fishing in beautiful Cotswold countryside. Tuition available. Large fishing tackle shop on site. Corporate hospitality available. ",
        location: [51.650611, -1.943410]
      },
      {
        name: "South Cerney Angling Club",
        number: "01285 861 876 / 07989 973 217",
        email: "info@scac.org.uk",
        url: "www.scac.org.uk",
        info: "With our main waters set in the heart of the Cotswold Water Park, we have waters to suit the match, pleasure and specimen angler.",
        location: [51.651611, -1.943410]
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
        location: [51.669611, -1.923410]
      }
    ]
  },
  {
    name: "Boat Trips",
    info: "no info",
    data: [
      {
        name: "Cotswold Canals Trust Boat Trips",
        number: "07787 485 294",
        email: "mail@cotswoldcanals.com",
        url: "www.lechladetripboat.com",
        info: "Enjoy the gentle meadering River Thames aboard the beautiful launch 'Inglesham' departing from Riverside Park. GL7 3AG . All proceeds invested in the restoration of the Cotswold canals.",
        location: [51.649611, -1.923410]
      }
    ]
  },
  {
    name: "Farm Visits",
    info: "no info"
  },
  {
    name: "Golf",
    info: "no info"
  },
  {
    name: "Horse Riding",
    info: "no info",
    data: [
      {
        name: "Rein and Shine",
        number: "01666 860 068",
        email: "info@reinandshine.co.uk",
        url: "www.reinandshine.co.uk",
        info: "Superb facilities, wide range of ponies and horses, with highly qualified riding instructors. For inexperienced and experienced riders, all ages from 4 upwards. Private and group lessons.",
        location: [51.652611, -1.943410]
      }
    ]
  },
  {
    name: "Paintballing",
    info: "no info"
  },
  {
    name: "Rally Driving",
    info: "With so much gravel in the Cotswold Water Park, it’s only natural that there is rally driving on offer – have a go at some power slides, handbrake turns and hairpin bends, and learn to skid like a pro!",
    data: [
      {
        name: "Gloucestershire Rally School",
        number: "01793 752 281",
        email: "info@glosrallyschool.co.uk",
        url: "www.glosrallyschool.co.uk",
        info: "Gloucestershire Rally School offers drivers aged just 10 years old and above the opportunity to experience the demanding, exciting sport of rally driving. Our purpose built 100% gravel track and rally-prepped cars enable us to give you a truly memorable day out that make ideal birthday or Christmas gifts, or the ultimate group event for corporate days or stag and hen parties.",
        location: [51.653611, -1.943410]
      }
    ]
  },
  {
    name: "Shooting",
    info: "Clay pigeon and air rifle shooting are popular country sports, and are becoming more accessible for all. No previous experience is necessary, so why not try something new today, or brush up on your skills.",
    data: [
      {
        name: "Old Downs Pursuits",
        number: "07597 093 708",
        email: "olddownspursuits@live.co.uk",
        url: "www.old-downs-pursuits.co.uk",
        info: "Clay target and air rifle shooting are popular country sports. No previous experience is necessary, so why not try something new today, or brush up on your skills.",
        location: [51.654611, -1.943410]
      }
    ]
  },
  {
    name: "Wilderness Skills",
    info: "A great way to engage with nature and the wonderful surroundings of the Cotswold Water Park is to learn all about survival techniques, whilst having some fun at the same time.",
    data: [
      {
        name: "South Cerney Outdoor",
        number: "01285 860 388",
        email: "southcerneyoutdoor@prospects.co.uk",
        url: "www.southcerneyoutdoor.co.uk",
        info: "South Cerney Outdoor Centre offers great facilities and activities for all the community to enjoy. New! Pay and Play ( with one off safety induction) available ",
        location: [51.655611, -1.943410]
      },
      {
        name: "Waterland",
        number: "01285 861 202",
        email: "admin@ukwatersports.co.uk",
        url: "www.ukwatersports.co.uk",
        info: "Waterland Outdoor Pursuits provides activities to companies, schools & Youth Organisations. You can participate in Windsurfing, Archery, Raftbuilding, Low Ropes, Sailing, Kayaking, Orienteering, Problem Solving and Canoeing",
        location: [51.656611, -1.943410]
      },
      {
        name: "Cotswold Forest School",
        number: "07738 708 880",
        email: "enquiries@.cotswoldforestschool.co.uk",
        url: "www.cotswoldforestschool.co.uk",
        info: "Get back to basics and learn to embrace the outdoors through various hand on survival techniques, such as bushcraft, fire lighting, shelter building and more! The programme is educational, inspirational and designed to increase nature awareness for all ages",
        location: [51.657611, -1.943410]
      }
    ]
  }
  ];
  
>>>>>>> 3d32a1a8c40c882e5bd4d6ddfdd3e71e0103b6cc
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
