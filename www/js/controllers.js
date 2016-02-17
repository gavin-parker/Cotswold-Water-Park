app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('tabs.map', {
    url: "/map",
    views: {
      'map-tab': {
        templateUrl: "templates/map.html",
        controller : "MapCtrl"
      }
    }
  })

  .state('tabs.activities', {
    url: "/activities",
    views: {

      'activities-tab': {
        templateUrl: "templates/activities.html",
        controller : "ActivitiesCtrl"
      }
    }
  })
  .state('tabs.events', {
    url: "/events",
    views: {

      'events-tab': {
        templateUrl: "templates/events.html",
        controller : 'EventsCtrl'
      }
    }
  })
  .state('tabs.birds', {
    url: "/birds",
    views: {

      'birds-tab': {
        templateUrl: "templates/birds.html",
        controller : "BirdsCtrl"
      }
    }
  })
  .state('tabs.news', {
    url: "/news",
    views: {

      'news-tab': {
        templateUrl: "templates/news.html",
        controller : "NewsCtrl"
      }
    }
  })
  .state('tabs.favs', {
    url: "/favs",
    views: {

      'favs-tab': {
        templateUrl: "templates/favs.html",
        controller : "FavsCtrl"
      }
    }
  });
  $urlRouterProvider.otherwise('/tab/map');
});


//controller manipulating map
app.controller('MapCtrl', function($scope, $rootScope, parkDataService, markersDataService){
  //Initialize new layers and map
  var activityLayer = new L.layerGroup();
  var waterLayer = new L.layerGroup();
  var foodLayer = new L.layerGroup();
  var groupLayer = new L.layerGroup();
  var birdLayer = new L.layerGroup();
  var markers = new L.layerGroup();
  var local='img/mapTiles/{z}/{x}/{y}.jpg';
  var offlineLayer = new L.TileLayer(local, {minZoom: 12, maxZoom: 16});
  var map = new L.Map('map', {
    layers: [activityLayer, waterLayer, foodLayer, groupLayer, birdLayer]
  });

  //Layer Options
  var overlayMaps = {
    "General Activities": activityLayer,
    "Water Activities": waterLayer,
    "Food and Hotels": foodLayer,
    "Group Activities": groupLayer,
    "Birds": birdLayer,
    "offline" : offlineLayer

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
  var foodIcon = new markerIcon({iconUrl: 'img/restaurant.png'});
  var hotelIcon = new markerIcon({iconUrl: 'img/hotel.png'});
  var birdIcon = new markerIcon({iconUrl: 'img/bird.png'});
  var pinPoint = new markerIcon({iconUrl: 'img/pinpoint.png'});
  var getLoc = function(position) {
    /*
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    */

    map.setView(new L.LatLng(x, y), 13);
    L.marker([x,y], {icon: pinPoint}).addTo(map).bindPopup('You Are Here');
  };

  $rootScope.routeTo = function(e){
    if(control == null){
      console.log(e);
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

  function saveLocations(locs){
    window.localStorage['locs'] = JSON.stringify(locs);
  }
  function loadLocations(){
    var locs = JSON.parse(window.localStorage['locs'] || '{}');

  }

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
          var button = '</br><button class="button">Directions</button>';
          switch(result[i].Type){
            case "Food":
              foodLayer.addLayer(L.marker(loc, {icon: foodIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
              break;

            case "Hotel":
              foodLayer.addLayer(L.marker(loc, {icon: hotelIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+'Phone: '+(result[i].Number)+'</br>'+'Website: '+(result[i].URL)+'</br>'+'Email: '+(result[i].Email)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
              break;

            case "Angling":
            case "Boat":
              waterLayer.addLayer(L.marker(loc, {icon: blueIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
              break;    

            case "Groups":
              groupLayer.addLayer(L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
              break;

            case "Bird":
              birdLayer.addLayer(L.marker(loc, {icon: birdIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
              break;

            default:
              activityLayer.addLayer(L.marker(loc, {icon: redIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
          }
      }
    });

  };
  $rootScope.removeMarkersAndShowActivity = function(e){ // removes all other markers from map and shows activity marker
    map.removeLayer(foodLayer); 
    map.removeLayer(waterLayer);
    map.removeLayer(activityLayer);
    map.removeLayer(groupLayer);
    map.removeLayer(birdLayer);
    markers.clearLayers();
    console.log(e.Name);
    var marker = L.marker(JSON.parse(e.Location), {icon: redIcon}).addTo(map).bindPopup((e.Name)+'</br>'+(e.Description)).on('dblclick', $scope.routeTo);
    markers.addLayer(marker);
    map.addLayer(markers);
  };
  //Layer toggle for activities and sites
  L.control.layers("",overlayMaps).addTo(map);


  var init = function(){
    //navigator.geolocation.getCurrentPosition(getLoc, onError);
    getLoc();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='locals';
    //var offlineLayer = new L.TileLayer(local, {minZoom: 12, maxZoom: 16, attribution: osmAttrib});
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 16, attribution: osmAttrib});
    map.setView(new L.LatLng(x, y), 14);
    var bounds = map.getBounds();
    map.setMaxBounds(bounds);
    //map.addLayer(offlineLayer);
    map.addLayer(osm);

    //var activities = parkDataService.activities();
  };

  init();
  console.log("Map initialized");
  //map.on('contextmenu', routeTo);
  console.log("added event handler");
  addAllActivitiesToMap();
  console.log("control of layers set");

});

//function to control activities tab
app.controller('ActivitiesCtrl', function($scope, parkDataService){
  console.log('IN ACTIVITIES CTRL');
  $scope.activities = [];
  parkDataService.activities().then(function(result){
    console.log(result);
    $scope.activities = result;
    checkFavourites();
    $scope.$on('$ionicView.enter', function() {
      checkFavourites();
      console.log("hi");
    });
  });

  $scope.num = parkDataService.activities.length;

  $scope.toggleGroup = function(activity) {
    if ($scope.isGroupShown(activity)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = activity;
    }
    $scope.shownEntry = null;
  };

  $scope.addToFavourites = function(fav){
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    if(Object.keys(favs).length === 0){
      console.log("no favourites");
      favs = [];
    }
    favs.push(fav);
    for(var i=0;i<$scope.activities.length;i++){
      if($scope.activities[i].Name == fav.Name){
        $scope.activities[i].fav = true;
      }
    }
    window.localStorage['favs'] = JSON.stringify(favs);
  };
  $scope.removeFromFavourites = function(fav){
    console.log("Removing from favourites");
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    if(Object.keys(favs).length == 0){
      return;
    }
    for(var i =0; i < favs.length;i++){
      if(favs[i].Name == fav.Name){
        favs.splice(i, 1);
      }
    }
    for(var i=0;i<$scope.activities.length;i++){
      if($scope.activities[i].Name == fav.Name){
        $scope.activities[i].fav = false;
      }
    }

    window.localStorage['favs'] = JSON.stringify(favs);
  }

  checkFavourites = function(){
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    for(var i=0;i<$scope.activities.length;i++){
      $scope.activities[i].fav = false;
      for(var j=0;j<favs.length;j++){
        if($scope.activities[i].Name == favs[j].Name){
          $scope.activities[i].fav = true;
        }
      }
    }
  };

  $scope.isGroupShown = function(activity) {
    return $scope.shownGroup === activity;
  };

  $scope.showOnMap = function(coords) {
    console.log("Pressed show on map");
    $scope.removeMarkersAndShowActivity(coords);
  };

  $scope.activityOptions = ['All', 'Aerial', 'Angling', 'Beach\n', 'Boat ', 'Groups', 'Horse v', 'Rally', 'Shooting', 'Wilderness', 'Food'];
  $scope.selectedActivity = "All";
});

//controls events tab
app.controller('EventsCtrl', function($scope, eventService){
  console.log('IN EVENTS CTRL');
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

app.controller('FavsCtrl', function($scope){
  $scope.favourites = [];
  $scope.$on('$ionicView.enter', function() {
    $scope.favourites = JSON.parse(window.localStorage['favs'] || {});
    console.log("hi");
  });
  console.log($scope.favourites);
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
  $scope.removeFromFavourites = function(fav){
    console.log("Removing from favourites");
    var favs = JSON.parse(window.localStorage['favs'] || '{}');
    if(Object.keys(favs).length == 0){
      return;
    }
    for(var i =0; i < favs.length;i++){
      if(favs[i].Name == fav.Name){
        favs.splice(i, 1);
        $scope.favourites.splice(i,1);
      }
    }
    window.localStorage['favs'] = JSON.stringify(favs);
  }

  $scope.showOnMap = function(coords) {
    console.log("Pressed show on map");
    $scope.removeMarkersAndShowActivity(coords);
  };

});

//controls birds tab
app.controller('BirdsCtrl', function($scope, birdService){
  console.log('IN BIRDS CTRL');
  function initialize(){
    /*
    birdService.Feed().then(function(result){
      $scope.birds = result.feed.entries;
      console.log($scope.birds);
    });
    */
    birdService.Import().then(function(result){
      $scope.birds = result;
      console.log($scope.birds);
      //console.log($scope.birds[0]["postedon_link/_text"]);
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
  console.log('IN NEWS CTRL');
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

app.directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function(value){
        $rootScope.hideTabs = value;
      });

      scope.$on('$destroy', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
});
