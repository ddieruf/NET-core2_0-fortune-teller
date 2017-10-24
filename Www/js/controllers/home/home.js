'use strict';

angular.module('mean').controller('homeCtrl',['message','$scope','fortune', function(message, $scope, fortune){
	//Scope Functions
	//$scope.XXX = function(){
	//};

	//Local Functions
	var init = function () {
		message.clear($scope);

		var success = function(result){
			$scope.text = result.text;
		};
		var error = function(err){
			message.addError($scope, err);
		};

		fortune.getRandom().then(success, error);
	};

	//Destroy Scope
	$scope.$on('$destroy', function () {
	});

	//Local  Variables

	//Scope  Variables
	$scope.text = '';

	//Initialize Page
	init();
}]);