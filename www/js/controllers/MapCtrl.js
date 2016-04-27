//controller manipulating map
app.controller('MapCtrl', function($scope, $rootScope, parkDataService, birdService, $ionicPopover, Scopes,$ionicLoading){
  //Saving scopes -- important : used for sharing scope functions with other controllers
  Scopes.store('MapCtrl', $scope);
  //Initialize new layers and map

    var template = '<ion-popover-view><ion-header-bar><h2>The Map</h2></ion-header-bar><ion-content><p>The Map shows all the activites in the waterpark. Tap on a marker for more information\
    and to get directions. Click the button at the top to filter activities and enable offline mode. </p></ion-content></ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template,{
      scope: $scope
    });

    function firstLoad(){
      var dat = window.localStorage['mapLoad'];
      if(dat == 1){
        return 0;
      }else{
        window.localStorage['mapLoad'] = 1;
        return 1;
      }
    }


    $scope.showInfo = function(){
      $scope.popover.show();
    };

  var activityLayer = new L.layerGroup();
  var waterLayer = new L.layerGroup();
  var foodLayer = new L.layerGroup();
  var groupLayer = new L.layerGroup();
  var birdLayer = new L.layerGroup();
  var lakeLayer = new L.layerGroup();
  var markers = new L.layerGroup();
  var local='img/mapTiles/{z}/{x}/{y}.jpg';
  var offlineLayer = new L.TileLayer(local, {minZoom: 12, maxZoom: 16});
  var map = new L.Map('map', {
    layers: [activityLayer, waterLayer, foodLayer, groupLayer, birdLayer, lakeLayer]
  });
  var lc = L.control.locate().addTo(map);

  //Layer Options
  var overlayMaps = {
    "General Activities": activityLayer,
    "Water Activities": waterLayer,
    "Food and Hotels": foodLayer,
    "Group Activities": groupLayer,
    "Birds": birdLayer,
    "Offline" : offlineLayer,
    "Lake numbers" : lakeLayer
  };

  //boundaries for the map
  var southWest = L.latLng(51.56, -2.08);
  var northEast = L.latLng(51.77, -1.58);
  bounds = L.latLngBounds(southWest, northEast)

  var x = 51.65; //Temporary start location, change to user location
  var y = -1.91; //

  var control = null;
  var markerIcon = L.Icon.extend({
    options: {
      iconSize:     [30, 30],
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

  //get current location, if not in water park then set view to default location
  var getLoc = function(position) {
      map.setView(new L.LatLng(x, y), 13);
      L.marker([x,y], {icon: pinPoint}).addTo(map).bindPopup('You Are Here');
  };

  $rootScope.routeTo = function(e){
    //if you are not in the water park then routing is switched off
    if(bounds.contains(new L.latLng(x,y))) {
      if(e.latlng == null){
        e.latlng = e.target.latlng;
      }
      if(control == null){
        console.log(e);
        control = L.Routing.control({
          waypoints: [
            L.latLng(x, y), //change x,y to user location
            e.latlng
          ],
          routeWhileDragging: false,
          createMarker: function() { return null; }   //remove waypoints markers
        }).addTo(map);
      }else{
        control.spliceWaypoints(1,1, e.latlng);
      }
      //control.setWaypoints(waypoints);
      //console.log("ROUTE: ", control.options.summaryTemplate);
      console.log(e.latlng);
      console.log("Added routing control to map");
      L.Routing.errorControl(control).addTo(map);
    }
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
      console.log(result.length);
      for(var i = 0;i < result.length;i++) {

          console.log(result[i].Name);
          var loc = JSON.parse(result[i].Location);
          //Create marker popup
          var container = L.DomUtil.create('div');
          container.innerHTML = '<h4>' + result[i].Name + '</h4> <p>' + result[i].Description + '</p>';
          //Create marker directions button
          var btn  = L.DomUtil.create('button', 'button', container);
          btn.setAttribute('type', 'button');
          btn.innerHTML = "Directions";
          btn.latlng = loc;
          L.DomEvent.on(btn, 'click', $scope.routeTo);
          console.log(result[i].Type[0]);
          switch(result[i].Type[0]){
            case "Food":
              //foodLayer.addLayer(L.marker(loc, {icon: foodIcon}).addTo(map).bindPopup((result[i].Name)+'</br>'+(result[i].Description)+button).on('click', $scope.routeTo));
              foodLayer.addLayer(L.marker(loc, {icon: foodIcon}).addTo(map).bindPopup(container));
              break;

            case "Hotel":
              foodLayer.addLayer(L.marker(loc, {icon: foodIcon}).addTo(map).bindPopup(container));
              break;

            case "Angling":
              waterLayer.addLayer(L.marker(loc, {icon: blueIcon}).addTo(map).bindPopup(container));
            break;
            case "Boat Trips":
              waterLayer.addLayer(L.marker(loc, {icon: blueIcon}).addTo(map).bindPopup(container));
              break;

            case "Corporate & Groups":
              groupLayer.addLayer(L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup(container));
              break;

            case "Bird":
              birdLayer.addLayer(L.marker(loc, {icon: birdIcon}).addTo(map).bindPopup(container));
              break;

            default:
              activityLayer.addLayer(L.marker(loc, {icon: redIcon}).addTo(map).bindPopup(container));
          }
      }
    });

  };
  var addLakesToMap = function(){
    parkDataService.lakes().then(function(result){
      for(var i = 0; i < result.length;i++){
          var lakeIcon = L.divIcon({className: 'lakeIcon', html : JSON.parse(result[i].Lake), iconSize : [24,24], iconAnchor : [12,12]});
        if(result[i].Loc != "[]"){
        lakeLayer.addLayer(L.marker(JSON.parse(result[i].Loc), {icon : lakeIcon}).addTo(map));
      }
    }
    addBirdsToMap(result);
    });
  };

  var addBirdsToMap = function(lakes){
    birdService.Locations().then(function(birds){
      console.log(birds);
      for(var i=0;i< birds.length;i++){
      var container = L.DomUtil.create('div');
      //console.log(birds[i]);
      var text = birds[i].input;
      if(birds[i+1] !== null){
        try{
        text = text.substring( birds[i].index, birds[i+1].index);
      }catch(err){
        console.log(err);
        text = "a bird was seen here";
      }
      }
      container.innerHTML = '<h4>' + birds[i][0] + '</h4> <p>' + text + '</p>';
      var btn  = L.DomUtil.create('button', 'button', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = "Directions";
      var lakeNum = birds[i][0].replace( /^\D+/g, '');
      var loc = 0;
      try{
      loc = JSON.parse(lakes[lakeNum].Loc);
    }catch(err){
      loc = JSON.parse(lakes[2].Loc);
    }
      if(loc.length === 0){
        loc = JSON.parse(lakes[2].Loc);
      }
      btn.latlng = loc;
      L.DomEvent.on(btn, 'click', $scope.routeTo);
      birdLayer.addLayer(L.marker(loc, {icon: birdIcon}).addTo(map).bindPopup(container));

    }
      });
    };

  var show_location_markers = [];
  $rootScope.removeMarkersAndShowActivity = function(e){ // removes all other markers from map and shows activity marker
    console.log('IN remove marker act : ', e);
    // Automatically Removes layers controls only if they need to be removed
    if (map.hasLayer( foodLayer )) $scope.controlLayers('foodLayer');
    if (map.hasLayer( waterLayer )) $scope.controlLayers('waterLayer');
    if (map.hasLayer( activityLayer )) $scope.controlLayers('activityLayer');
    if (map.hasLayer( groupLayer )) $scope.controlLayers('groupLayer');
    if (map.hasLayer( birdLayer )) $scope.controlLayers('birdLayer');

    // Turns of the viewable toggles
    Scopes.get('PopoverCtrl').toggleShowLocat();

    markers.clearLayers();
    console.log(e.Name);
    var loc = JSON.parse(e.Location);
    //Create marker popup
    var container = L.DomUtil.create('div');
    container.innerHTML = '<h4>' + e.Name + '</h4> <p>' + e.Description + '</p>';
    //Create marker directions button
    var btn  = L.DomUtil.create('button', 'button', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = "Directions";
    btn.latlng = loc;
    L.DomEvent.on(btn, 'click', $scope.routeTo);
    var marker = L.marker(loc, {icon: redIcon}).addTo(map).bindPopup(container);
    show_location_markers.push(marker);
    markers.addLayer(marker);
    map.addLayer(markers);
    map.panTo( loc );
    map.zoomIn( 10 );
    control.spliceWaypoints(1,1, e.latlng);
  };

  var activityToggle  = false;
  var waterToggle     = false;
  var birdToggle      = false;
  var lakeToggle      = false;
  var offlineToggle   = true;
  var foodToggle      = false;
  var groupToggle     = false;
  //Layer toggle for activities and sites
  //L.control.layers("",overlayMaps).addTo(map);
  $scope.controlLayers = function(toggledLayer){
    var toToggle = activityLayer;
    var toggle   = activityToggle;

    // remove all show_location markers
    console.log('show locations : ', show_location_markers  );
    if (show_location_markers.length > 0){
      for ( var i = 0; i < show_location_markers.length; i++){
        map.removeLayer(show_location_markers[i]);
      }
    }

    //getting toggle id and correct layer
    if (toggledLayer === 'waterLayer') {
      toToggle = waterLayer;
      toggle = waterToggle;
    }else if (toggledLayer === 'foodLayer') {
      toToggle = foodLayer;
      toggle = foodToggle;
    }else if (toggledLayer === 'birdLayer') {
      toToggle = birdLayer;
      toggle = birdToggle;
    }else if (toggledLayer === 'lakeLayer') {
      toToggle = lakeLayer;
      toggle = lakeToggle;
    }else if (toggledLayer === 'offlineLayer') {
      toToggle = offlineLayer;
      toggle = offlineToggle;
    }
    else if (toggledLayer === 'groupLayer') {
      toToggle = groupLayer;
      toggle = groupToggle;
    }

    //Controlling the layers
    if(!toggle) {
      map.removeLayer(toToggle);
    } else {
      map.addLayer(toToggle);
    }

    //Setting the toggle to correct value
    if (toggledLayer === 'waterLayer') waterToggle = !toggle;
    else if (toggledLayer === 'foodLayer') foodToggle = !toggle;
    else if (toggledLayer === 'birdLayer') birdToggle = !toggle;
    else if (toggledLayer === 'lakeLayer') lakeToggle = !toggle;
    else if (toggledLayer === 'offlineLayer') offlineToggle = !toggle;
    else if (toggledLayer === 'groupLayer') groupToggle = !toggle;
    else activityToggle = !toggle;
    //console.log(!toggle)
  };

  var init = function(){
    //add button which finds current location
    //&target;
    L.easyButton('<span class="star">&current;</span>', function(btn, map){
      map.setView([x, y]);
    }).addTo(map);
    //navigator.geolocation.getCurrentPosition(getLoc, onError);
    lc.start();
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='locals';
    //var offlineLayer = new L.TileLayer(local, {minZoom: 12, maxZoom: 16, attribution: osmAttrib});
    var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 16, attribution: osmAttrib});
    map.setMaxBounds(bounds);
    //map.addLayer(offlineLayer);
    map.addLayer(osm);
    osm.on("load",function() {
      console.log("loaded tiles");
      $ionicLoading.hide();
     });
     map.on('zoomend', function(){
       if(map.getZoom() <= 13){
         if(map.hasLayer(lakeLayer)){
         map.removeLayer(lakeLayer);
       }
       }else{
         if(!map.hasLayer(lakeLayer)){
         map.addLayer(lakeLayer);
       }
       }
     });
    getLoc();

    //Settings the toggle = true
    //var activities = parkDataService.activities();
  };
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000,
    scope: $scope
  });

  init();
  if(firstLoad()){
    $scope.showInfo();
  }
  console.log("Map initialized");
  //map.on('contextmenu', routeTo);
  console.log("added event handler");
  addAllActivitiesToMap();
  addLakesToMap();
  console.log("control of layers set");

  //Popover display
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

});


app.run(function ($rootScope) {
  $rootScope.$on('scope.stored', function (event, data) {
    console.log("scope.stored", data);
  });
});
