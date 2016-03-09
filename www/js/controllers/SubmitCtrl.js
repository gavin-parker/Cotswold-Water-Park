app.controller('SubmitCtrl', function($scope, $cordovaCamera, $http, $cordovaToast, $cordovaEmailComposer){
    $scope.pictureUrl = 'http://placehold.it/300x300';

      $cordovaEmailComposer.isAvailable().then(function() {
         // is available
         alert("available");
       }, function () {
         // not available
         alert("not available");
       });

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
      }, function(err){
        // there was an error
        console.log("error");
      });
    };


    $scope.showToast = function(message, duration, location) {
      $cordovaToast.show(message, duration, location).then(function(success) {
        console.log("The toast was shown");
      }, function (error) {
         console.log("The toast was not shown due to " + error);
      });
    };


    $scope.submit = function(sighting){
      console.log("submit");
      $scope.sighting = angular.copy(sighting);
      console.log($scope.sighting);
      postSighting($scope.sighting);
    };

    var yay = function(){
      console.log("yay");
    };
    var nay = function(){
      console.log("nay");
    };

    var postSighting = function(sighting){
      console.log("posting a signting");
      /*var email = {
         to: 'gp14958@bristol.ac.uk',
         cc: sighting.Email,
         bcc: [],
         attachments: [
         ],
         subject: 'Bird Sighting:' + sighting.Name,
         body: sighting.Text,
         isHtml: true
    }; */
     $cordovaEmailComposer.open().then(null, function(){
       console.log("user cancelled mail");
     });
    };
});
