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
        iconSize:     [50, 50],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

/*    var markerIcon = L.icon({
    iconUrl: '/Users/aatina/Cotswold-Water-Park/www/img/marker.png',

    iconSize:     [45, 45], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});*/

    //var lc  =  L.control.locate().addTo(map);  //Will have to disable for the time being, geolocation should only be an option if person is within map bounds.
    //lc.start();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	  var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(51.635434, -1.935172), 13);
    var bounds = map.getBounds();
    map.setMaxBounds(bounds);
    map.addLayer(osm);
    var blueIcon = new markerIcon({iconUrl: '/Users/aatina/Cotswold-Water-Park/www/img/marker.png'});
    L.marker([51.635434, -1.935172], {icon: blueIcon}).addTo(map).bindPopup("Hi.");
  };
  init();
});

//function in case want to add information
app.controller('InfoCtrl', function(){
});

app.controller('ActivitiesCtrl', function($scope, parkDataService){
  $scope.boatHireCompanies = parkDataService.boatHire();
  $scope.num = parkDataService.boatHire.length;

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

app.factory('parkDataService', function(){
  var boatHire =
  [{
    name : "South Cerney Outdoor",
    number : "01285 860 388",
    email : "southcerneyoutdoor@prospects.co.uk",
    url : "www.southcerneyoutdoor.co.uk",
    info : "South Cerney Outdoor Centre offers great facilities and activities for all the community to enjoy. New! Pay and Play ( with one off safety induction) available"
  },
  {
    name : "Cotswold Country Park and Beach",
    number : "01285 868 096",
    email : "info@cotswoldcountrypark.co.uk",
    url : "www.cotswoldcountrypark.co.uk",
    info : "poo"
  }];

  var watersports = {
    boatHire : boatHire
  };
  var activities = {
    watersports : watersports
  }

  return {
    boatHire : function(){
      return boatHire;
    }
  }
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
