
//controller manipulating map
app.controller('MapCtrl', function($scope, parkDataService, markersDataService){

  var activityLayer = new L.layerGroup();
  var waterLayer = new L.layerGroup();
  var foodLayer = new L.layerGroup();
  var groupLayer = new L.layerGroup();

  var map = new L.Map('map', {
    layers: [activityLayer, waterLayer, foodLayer, groupLayer]
  });

  //Layer Options
  var overlayMaps = {
    "General Activities": activityLayer,
    "Water Activities": waterLayer,
    "Food": foodLayer,
    "Group Activities": groupLayer
  };

  var x = 51.65; //Temporary start location, change to user location
  var y = -1.91; //

  var control = null;
  var markerIcon = L.Icon.extend({
    options: {
      iconSize:     [45, 45],
      iconAnchor:   [10, 40],
      popupAnchor:  [10, -20]
    }
  });

  var blueIcon = new markerIcon({iconUrl: 'img/blueMarker.png'});
  var greenIcon = new markerIcon({iconUrl: 'img/greenMarker.png'});
  var redIcon = new markerIcon({iconUrl: 'img/redMarker.png'});
  var foodIcon = new markerIcon({iconUrl: 'img/restaurant.png'})
  var pinPoint = new markerIcon({iconUrl: 'img/pinpoint.png'});
  var getLoc = function(position) {
    /*
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    */

    map.setView(new L.LatLng(x, y), 13);
    L.marker([x,y], {icon: pinPoint}).addTo(map).bindPopup('You Are Here');
  };

  var routeTo = function(e){
    if(control == null){
    control = L.Routing.control({
      waypoints: [
        L.latLng(x, y), //change x,y to user location
        e.latlng
      ],
      routeWhileDragging: true
    }).addTo(map);
  }else{
    control.spliceWaypoints(1,1, e.latlng);
  }
    console.log("Added routing control to map");
    L.Routing.errorControl(control).addTo(map);
  };



  function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
  };

//Adds all the activities and food locations to the map from the JSON file
  var addAllActivitiesToMap = function(){
    parkDataService.activities().then(function(result){
      $scope.activities = result;
      console.log("yay");
      for(var i = 0;i < result.length;i++) {
          console.log(result[i].Name);
          var loc = JSON.parse(result[i].Location);
          switch(result[i].Type){
            case "Food":
              foodLayer.addLayer(L.marker(loc, {icon: foodIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)).on('click', routeTo));
              break;

            case "Angling":
              waterLayer.addLayer(L.marker(loc, {icon: blueIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)).on('click', routeTo));
              break;

            case "Boat":
              waterLayer.addLayer(L.marker(loc, {icon: blueIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)).on('click', routeTo));
              break;            

            case "Groups":
              groupLayer.addLayer(L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)).on('click', routeTo));
              break;

            default:
              activityLayer.addLayer(L.marker(loc, {icon: redIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)).on('click', routeTo));
          }
      }
    })


  };

  //Layer tobble for activities and sites
  L.control.layers("",overlayMaps).addTo(map);


  var init = function(){
    //navigator.geolocation.getCurrentPosition(getLoc, onError);
    getLoc();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});
    map.setView(new L.LatLng(x, y), 13);
    var bounds = map.getBounds();
    //map.setMaxBounds(bounds);
    map.addLayer(osm);
    //var activities = parkDataService.activities();
  };

  init();
  console.log("Map initialized");
  //map.on('contextmenu', routeTo);
  console.log("added event handler");
  addAllActivitiesToMap();
  addMarkersToMap();

});
//function to control activities tab
app.controller('ActivitiesCtrl', function($scope, parkDataService){
  $scope.activities = [];
  parkDataService.activities().then(function(result){
    console.log(result);
    $scope.activities = result;
  })
  $scope.num = parkDataService.activities.length;
  //console.log($scope.activities);

  $scope.toggleGroup = function(activity) {
    if ($scope.isGroupShown(activity)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = activity;
    }
    $scope.shownEntry = null;
  };

  $scope.isGroupShown = function(activity) {
    return $scope.shownGroup === activity;
  };

  $scope.toggleEntry = function(entry) {
    if($scope.isEntryShown(entry)) {
      $scope.shownEntry = null;
    } else {
      $scope.shownEntry = entry;
    }
  }

  $scope.isEntryShown = function(entry) {
    return $scope.shownEntry === entry;
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
