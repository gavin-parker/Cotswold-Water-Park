// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

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
    //var lc  =  L.control.locate().addTo(map);
    //lc.start();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	  var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    //var southWest = L.latLng(51.59275, -2.04329),
    //var northEast = L.latLng(51.67798, -1.82699),
    map.setView(new L.LatLng(51.635434, -1.935172), 13);
    var bounds = map.getBounds();
    map.setMaxBounds(bounds);
    /*var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    //var bounds = L.latLngBounds(southWest, northEast);*/
    //console.log(ne.toString());
    //console.log(sw.toString());
    map.addLayer(osm);
  };
  init();
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

app.controller('EventsCtrl', function($scope, parkDataService){
  $scope.boatHireCompanies = parkDataService.boatHire();
  $scope.num = parkDataService.boatHire.length;
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

app.factory('eventService', function(){
var feed = new google.feeds.Feed("http://www.waterpark.org/events/feed/");
feed.load(function(result){
if(!result.error){
  return result.feed.entries;
}else{
  console.log("Error getting feed");
};


})

});
