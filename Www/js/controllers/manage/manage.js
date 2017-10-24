'use strict';

angular.module('mean').controller('manageCtrl',['message','$scope','fortune','modal', function(message, $scope, fortune, modal){
	//Scope Functions
	$scope.showAdd = function(){
		message.clear($scope);

		modal.open(null, 'views/partials/manage/add.html', 'addFortuneCtrl', 400, null, function(newFortune){
			message.addSuccess($scope, 'Successfully added fortune');
			$scope.fortunes.push(newFortune);
		});
	};
	$scope.remove = function(fortuneId){
		message.clear($scope);

		var success = function(result){
			message.addSuccess($scope, 'Successfully removed fortune');

			angular.forEach($scope.fortunes,function(fortune, idx){
				if(fortune.id == fortuneId){
					$scope.fortunes.slice(idx,1);
				}
			});
		};
		var error = function(err){
			message.addError($scope, err);
		};

		if(confirm('Sure you want to remove?') === true)
			fortune.remove(fortuneId).then(success,error);
	};

	//Local Functions
	var init = function () {
		message.clear($scope);

		var success = function(result){
			$scope.fortunes = result;
		};
		var error = function(err){
			message.addError($scope, err);
		};

		fortune.list().then(success,error);
	};

	//Destroy Scope
	$scope.$on('$destroy', function () {
	});

	//Local  Variables

	//Scope  Variables
	$scope.text = '';
	$scope.fortunes = [];

	//Initialize Page
	init();
}])
.controller('addFortuneCtrl',['message','$scope','fortune',function(message, $scope, fortune){
	//Scope Functions
	$scope.add = function(newFortune){
		message.clear($scope);

		var success = function(result){
			$scope.closeThisDialog(result);
		};
		var error = function(err){
			message.addError($scope, err);
		};

		fortune.add(newFortune).then(success,error);
	};

	//Local Functions
	var init = function () {
		message.clear($scope);
	};

	//Destroy Scope
	$scope.$on('$destroy', function () {
	});

	//Local  Variables

	//Scope  Variables

	//Initialize Page
	init();
}]);