'use strict';

angular.module('mean').controller('registerCtrl',['$scope', 'message', 'user','session', '$rootScope',function($scope, message, user, session,$rootScope){
	//Scope Functions
	$scope.register = function (o) {
		message.clear($scope);

		var btnTxt = disableButton($('#btnReg'), '<div class="ball-pulse-sync"><div></div><div></div><div></div></div>');
		var successCb = function(newUser){
			session.create(newUser);
			$state.go('partials.home');
		};
		var errorCb = function(err){
			message.addError($scope, err);
			enableButton($('#btnReg'), btnTxt);
		};

		user.add($rootScope.getUrl(), o).then(successCb, errorCb);
	};

	//Local Functions
	var init = function () {
		message.clear($scope);
		$scope.formData = {
			firstName: 'David',
			lastName: 'Dieruf',
			email: 'david@dierufventures.com',
			password: '123asd!',
			password2: '123asd!'
		};
	};

	//Destroy Scope
	$scope.$on('$destroy', function () {
	});

	//Local  Variables

	//Scope  Variables
	$scope.formData = {};

	//Initialize Page
	init();
}]);