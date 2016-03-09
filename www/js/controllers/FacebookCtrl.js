
app.controller('FacebookCtrl', function($scope){
	$scope.openCordovaWebView = function()
	{
	 // Open cordova webview if the url is in the whitelist otherwise opens in app browser
	 window.open('https://www.facebook.com/CotswoldWaterParkTrust','_self'); 

	};
	$scope.openCordovaWebViewTwitter = function()
	{
	 // Open cordova webview if the url is in the whitelist otherwise opens in app browser
	 window.open('https://twitter.com/cwpbirds','_self'); 

	};
});
