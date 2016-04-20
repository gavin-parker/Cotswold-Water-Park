var app = angular.module('starter', ['ionic','ionic-material', 'ngCordova'])

app.config(['$ionicConfigProvider', function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.scrolling.jsScrolling(false);

}]);




//Setup functions
app.run(function($ionicPlatform,$ionicLoading, $rootScope) {

  console.log("RUN");
  $ionicLoading.show({
    template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
    duration: 5000
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      console.log("state change");
      $rootScope.$broadcast('loading:show');
    });
    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });
    $rootScope.$on('$stateChangeSuccess', function () {
    console.log('done');
    $rootScope.$broadcast('loading:hide');
  });

    $rootScope.$on('loading:show', function () {
      console.log("LOADING");
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-positive" icon="android"></ion-spinner>',
        duration: 5000
      });
});



    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //$rootScope.$broadcast('loading:hide');



    // onError Callback receives a PositionError object
    //
  });
});



app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller:"FacebookCtrl"
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
  .state('tabs.watersports', {
    url: "/watersports",
    views: {

      'watersports-tab': {
        templateUrl: "templates/watersports.html",
        controller : "WatersportsCtrl"
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
  .state('tabs.submit', {
    url: "/submit",
    views: {
      'submit-tab': {
        templateUrl: "templates/submit.html",
        controller : "SubmitCtrl"
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
  .state('tabs.facebook', {
    url: "/facebook",
    views: {

      'facebook-tab': {
        templateUrl: "templates/facebook.html",
        controller : "FacebookCtrl"
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
