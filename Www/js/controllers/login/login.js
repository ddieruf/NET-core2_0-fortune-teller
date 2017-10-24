'use strict';

angular.module('mean').controller('loginCtrl',['$scope','user','message','session', '$state','$rootScope', function($scope, user, message, session, $state, $rootScope){
	//Scope Functions
	$scope.login = function(formData){
		message.clear($scope);

		var btnTxt = disableButton($('#btnLogin'), '<div class="ball-pulse-sync"><div></div><div></div><div></div></div>');

		user.login($rootScope.getUrl(), formData.email, formData.password).then(function(account){
			console.log(account);
			if(!angular.isDefined(account) || account === null){
				addNotification($scope, 'No account exists with that info');
				enableButton($('#btnLogin'), btnTxt);
				return;
			}

			session.create(account);
			$state.go('partials.home');
		}, function(err){
			message.addError($scope, err);
			enableButton($('#btnLogin'), btnTxt);
		});
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
	$scope.formData = {};

	//Initialize Page
	init();
}]);