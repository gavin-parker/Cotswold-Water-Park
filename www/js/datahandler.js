var app = angular.module('datahandler');
app.factory('parkDataService', function(){
  var boatHire = [
    {
      name : "South Cerney Outdoor",
      number : "01285 860 388",
      email : "southcerneyoutdoor@prospects.co.uk",
      url : "www.southcerneyoutdoor.co.uk",
      info : "South Cerney Outdoor Centre offers great facilities and activities for all the community to enjoy. New! Pay and Play ( with one off safety induction) available"
    }
  ]
  var watersports = {
    this.boatHire = boatHire;
  };
  var activities = {
    this.watersports = watersports;
  }
  console.log(activities);
  return watersports;
});
