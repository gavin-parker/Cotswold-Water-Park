


app.controller('SubmitCtrl', function($scope, $cordovaCamera, $http,$ionicLoading, $cordovaEmailComposer, $ionicPopup){

    $scope.pictureUrl = 'http://placehold.it/300x300';
    $scope.takePicture = function() {
      console.log("taking pic");
      var options = {
        destinationType : Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300
      };
      $cordovaCamera.getPicture(options).then(function(data){
        console.log('camera data: ' + angular.toJson(data));
        $scope.pictureUrl = "data:image/jpeg;base64," + data;
        console.log($scope.pictureUrl);
        console.log(data);
      }, function(err){
        // there was an error
        console.log("error");
      });
    };

    $scope.submit = function(sighting){
      console.log("submit");
      $scope.sighting = angular.copy(sighting);
      console.log($scope.sighting);

      var confirmPopup = $ionicPopup.confirm({
        title: 'Submit Sighting?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          console.log('submitted');
          postSighting($scope.sighting);
          clearSighting(sighting);
        } else {
          console.log('Cancel');
        }
      });
    };

    var yay = function(){
      console.log("yay");
    };
    var nay = function(){
      console.log("nay");
    };

    var postSighting = function(sighting){
      console.log("posting a signting");
      var body = decodeURIComponent(sighting.Text);
      var Subject = "Bird%20Sighting";
      window.location.href = 'mailto:gp14958@my.bristol.ac.uk?subject=' + Subject + '&body=' + body + '<html><body><img src=" ' +  $scope.pictureUrl +  '" /> </body></html>';



    };

    var clearSighting = function(sighting ) {
        sighting.Email = "",
        sighting.Name = "",
        sighting.Text = "",
        sighting.Date = ""
    };
    $ionicLoading.hide();

});
