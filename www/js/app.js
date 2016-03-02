var app = angular.module('starter', ['ionic','ionic-material', 'ngCordova'])

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
