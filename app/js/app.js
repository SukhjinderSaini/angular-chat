var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $timeout) {
	$scope.messageCounter = 0;
	$scope.ai = [];
	$scope.messages = [];
	$scope.aiLength = 0;
	$http({
        method : "GET",
        url : "./app/js/messages.json"
    }).then(
			function mySucces(response) {
				$scope.ai = response.data.messages;
				$scope.messages.push($scope.ai[$scope.messageCounter]);
				$scope.aiLength = response.data.messages.length - 1;
			},
			function myError(response) {
				$scope.messages = "Error Fetching Data.";
    });
	
	$scope.sendMessage = function(){
			if($scope.messageText !="" || $scope.messageText != " "){
				$scope.messages.push($scope.messageText);
				$scope.messageText = "";
				if($scope.messageCounter < $scope.aiLength){
					$scope.messageCounter++;
					$timeout(function(){
						$scope.messages.push($scope.ai[$scope.messageCounter]);
						}
					,3000);
				}		
			}
	}
	
	$scope.showChat = false;
	
	$scope.toggleChat = function(){
			$scope.showChat = ! $scope.showChat;
	}
	
});
