
//controller manipulating map
app.controller('MapCtrl', function($scope, parkDataService){

  var map = new L.Map('map');
  var x = 51.659611;
  var y = -1.913410;
  var markerIcon = L.Icon.extend({
    options: {
      iconSize:     [45, 45],
      iconAnchor:   [10, 40],
      popupAnchor:  [10, -20]
    }
  });

  var blueIcon = new markerIcon({iconUrl: 'img/blueMarker.png'});
  var greenIcon = new markerIcon({iconUrl: 'img/greenMarker.png'});
  var pinPoint = new markerIcon({iconUrl: 'img/pinpoint.png'});
  var getLoc = function(position) {
    /*
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    */
    var x = 51.65;
    var y = -1.91;
    map.setView(new L.LatLng(x, y), 13);
    addMarker([x,y], pinPoint, 'You Are Here' );


  };

  var routeTo = function(e){
    L.Routing.control({
      waypoints: [
        L.latLng(x, y),
        e.latlng
      ],
      routeWhileDragging: true
    }).addTo(map);

  };



  function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
  };


  var addAllActivitiesToMap = function(){
    var  activities = parkDataService.activities();
    for(var a in activities) {
      for(var d in activities[a].data) {
        addMarker(activities[a].data[d].location, blueIcon, activities[a].data[d].name)
      }
    };
  };

  //adds hardcoded example markers to the map
  var addMarkersToMap = function(){
    addMarker([51.670395, -1.914003], greenIcon, 'Lakeside');
    addMarker([51.665163, -1.909227], greenIcon, 'Bridge');
    addMarker([51.655372, -1.932596], greenIcon, 'Clayhill');
    addMarker([51.650716, -1.974765], greenIcon, 'Neigh Bridge Lake');
  }

  var addMarker = function(location, icon, name){
    L.marker(location, {icon: icon}).addTo(map).bindPopup(name);
  }

  var init = function(){

    navigator.geolocation.getCurrentPosition(getLoc, onError);
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(x, y), 13);
    var bounds = map.getBounds();

    //map.setMaxBounds(bounds);
    map.addLayer(osm);
    map.on('contextmenu', routeTo);



    //var activities = parkDataService.activities();
  };
  init();
  addAllActivitiesToMap();
  addMarkersToMap();
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
