app.controller('SubmitCtrl', function($scope, $cordovaCamera, $http){
    console.log('IN SUBMIT CTRL');
    $scope.sighting = {};
   // document.addEventListener("deviceready", function () {
    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log("succeddddd");
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.submit = function(sighting, $cordovaEmailComposer){
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
      var email = {
         to: 'gp14958@bristol.ac.uk',
         cc: sighting.Email,
         bcc: [],
         attachments: [
         ],
         subject: 'Bird Sighting:' + sighting.Name,
         body: sighting.Text,
         isHtml: true
 };

      $cordovaEmailComposer.open(email);
      alert(email);
    };
   // }
});
