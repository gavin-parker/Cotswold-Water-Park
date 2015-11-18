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
    var lc  =  L.control.locate().addTo(map);
    lc.start();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	  var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(51.644224, -1.965172), 13);
    map.addLayer(osm);
  };
  init();
});
app.controller('ActivitiesCtrl', function(parkDataService){
  watersports = parkDataService.watersports;

});
