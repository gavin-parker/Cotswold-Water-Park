
app.controller('FacebookCtrl', function($scope){
	$scope.openCordovaWebView = function(site)
	{
	 // Open cordova webview if the url is in the whitelist otherwise opens in app browser
	 window.open(site,'_self'); 

	};
});
