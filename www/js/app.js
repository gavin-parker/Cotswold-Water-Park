// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

}]);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });



});

app.controller('MapCtrl', function(){
  var init = function(){
    var map = new L.Map('map');

    var markerIcon = L.Icon.extend({
    options: {
        iconSize:     [45, 45],
        iconAnchor:   [10, 40],
        popupAnchor:  [10, -20]
    }
});
    //var lc  =  L.control.locate().addTo(map);  //Will have to disable for the time being, geolocation should only be an option if person is within map bounds.
    //lc.start();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	  var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(51.635434, -1.935172), 13);
    var bounds = map.getBounds();
    map.setMaxBounds(bounds);
    map.addLayer(osm);
    var blueIcon = new markerIcon({iconUrl: '/img/marker.png'});
    L.marker([51.659611, -1.913410], {icon: blueIcon}).addTo(map).bindPopup("Lake Pochard Lodges");
  };
  init();
});

//function in case want to add information
app.controller('InfoCtrl', function(){
});

app.controller('ActivitiesCtrl', function($scope, parkDataService){
  $scope.activities = parkDataService.activities();
  $scope.num = parkDataService.activities.length;

  $scope.toggleGroup = function(activity) {
    if ($scope.isGroupShown(activity)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = activity;
    }
  };
  $scope.isGroupShown = function(activity) {
    return $scope.shownGroup === activity;
  };
});


app.controller('EventsCtrl', function($scope, eventService){
  function initialize(){
      eventService.Feed().then(function(result){
      $scope.events = result.feed.entries;
      console.log($scope.events);
    });
  }
  superfeedr.auth('gp14958','df172f3202b13c654d4777881720c9cd');
  superfeedr.setOnLoadCallback(initialize);

  $scope.toggleGroup = function(activity) {
    if ($scope.isGroupShown(activity)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = activity;
    }
  };
  $scope.isGroupShown = function(activity) {
    return $scope.shownGroup === activity;
  };

});

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