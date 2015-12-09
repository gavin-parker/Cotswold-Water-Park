
//controller manipulating map
app.controller('MapCtrl', function(parkDataService){
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
    var blueIcon = new markerIcon({iconUrl: 'img/marker.png'});

    var activities = parkDataService.activities();

    for(var a in activities) {
      for(var d in activities[a].data) {
         L.marker(activities[a].data[d].location, {icon: blueIcon}).addTo(map).bindPopup(activities[a].data[d].name);
      }
    }
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
