app.controller('SubmitCtrl', function($scope, $cordovaCamera, $http, $cordovaToast){
    $scope.pictureUrl = 'http://placehold.it/300x300';
    $scope.takePicture = function() {
      var options = {
        destinationType : Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300
      };
      $cordovaCamera.getPicture(options).then(function(data){
        console.log('camera data: ' + angular.toJson(data));
        $scope.pictureUrl = "data:image/jpeg;base64," + data;
      }, function(err){
        // there was an error
      })
    };

    
    $scope.showToast = function(message, duration, location) {
      $cordovaToast.show(message, duration, location).then(function(success) {
        console.log("The toast was shown");
      }, function (error) {
         console.log("The toast was not shown due to " + error);
      });
    }


    $scope.submit = function(sighting){
      console.log("submit");
      $scope.sighting = angular.copy(sighting);
      console.log($scope.sighting);
      postSighting($scope.sighting);
    };

    var yay = function(){
      console.log("yay");
    }
    var nay = function(){
      console.log("nay");
    }

    var postSighting = function(sighting){
      $http.get('http://localhost:8080').then(yay,nay);
    };
   // }
});
