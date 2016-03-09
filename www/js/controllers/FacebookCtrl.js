
app.controller('FacebookCtrl', function($scope){
	$scope.openCordovaWebView = function()
	{
	 // Open cordova webview if the url is in the whitelist otherwise opens in app browser
	 window.open('https://www.facebook.com/CotswoldWaterParkTrust','_self', hardwareback = 'yes', toolbar = 'yes'); 

	};
});
