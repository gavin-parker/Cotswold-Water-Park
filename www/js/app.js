var app = angular.module('starter', ['ionic'])

app.config(['$ionicConfigProvider', function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

}]);

//Setup functions
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


    // onError Callback receives a PositionError object
    //



  });
});
//controller manipulating map
app.controller('MapCtrl', function(){
  var map = new L.Map('map');
  var x = 51.659611;
  var y = -1.913410;

  var getLoc = function(position) {
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    map.setView(new L.LatLng(x, y), 13);
  };

  function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
  };

  var init = function(){

    var markerIcon = L.Icon.extend({
      options: {
        iconSize:     [45, 45],
        iconAnchor:   [10, 40],
        popupAnchor:  [10, -20]
      }
    });
    navigator.geolocation.getCurrentPosition(getLoc, onError);
    var osmUrl='http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(x, y), 13);
    var bounds = map.getBounds();

    map.setMaxBounds(bounds);
    map.addLayer(osm);
    var blueIcon = new markerIcon({iconUrl: '/img/marker.png'});
    L.marker([51.659611, -1.913410], {icon: blueIcon}).addTo(map).bindPopup("Lake Pochard Lodges");
  };
  init();
});
//function to control activities tab
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

//controls events tab
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
//controls news tab
app.controller('NewsCtrl', function($scope, newsService){
  function initialize(){
    newsService.Feed().then(function(result){
      $scope.news = result.feed.entries;
      console.log($scope.news);
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

//service to get hardcoded activity data
app.factory('parkDataService', function(){
  var activities =
  [
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
