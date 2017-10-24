'use strict';

angular.module('mean').controller('loadTestCtrl',['message','$scope','user','$interval', '$q', '$timeout','$http','$rootScope','codebase', function(message, $scope, user, $interval, $q, $timeout, $http, $rootScope, codebase){
	var frequencyInterval = undefined;

	//Scope Functions
	$scope.runTest = function(formData){
		message.clear($scope);
		$scope.data = data = [];

		var btnTxt = disableButton($('#btnRun'), '<div class="ball-pulse-sync"><div></div><div></div><div></div></div>');

		message.addNotification($scope, 'Starting test');
		//console.log('Start',formData);

		frequencyInterval = $interval(function(frequencyCount) {
			//console.log('test ' + frequencyCount);
			runTest(frequencyCount).then(function(){}, function(err){
				$scope.cancel();
				message.addError($scope, err);
			});
		}, (1000/formData.frequency),(formData.runtime*formData.frequency));

		frequencyInterval.then(function(succ){
			message.clear($scope);
			message.addSuccess($scope, 'Test completed');
			enableButton($('#btnRun'), btnTxt);
		}, function(err){
			enableButton($('#btnRun'), btnTxt);
		});
	};
	$scope.cancel = function(){
		if(angular.isDefined(frequencyInterval)){
			$interval.cancel(frequencyInterval);
      frequencyInterval = undefined;
		}

		message.clear($scope);
		message.addNotification($scope, 'Cancelled test');
	};
	$scope.reset = function(){
		init();
		$scope.data = data = [];
	};

	//Local Functions
	var init = function () {
		message.clear($scope);

		$scope.formData = {
			frequency: 1,
			runtime: 1
		};
		$scope.logdata = true;
	};
	var runTest = function(testNumber){
		var deferred = $q.defer();

		$timeout(function () {
			var newUser = {};
			var testData = {
				testNumber: testNumber,
				starttime: Date.now(),
				endtime: null,
				isPCF: (codebase.current.pcf === true),
				averagetime: 0
			};

			var addSuccess = function(result){
				if(result !== null && angular.isDefined(result.errorMessage)){
					error(result);
					return;
				}

				//console.log('add success', result);
				result.password = newUser.password;
				newUser = result;

				user.login($rootScope.getUrl(), newUser.email, newUser.password).then(loginSuccess, error);
			};
			var loginSuccess = function(result){
				if(result !== null && angular.isDefined(result.errorMessage)){
					error(result);
					return;
				}

				//console.log('update success', result);
				user.logout($rootScope.getUrl(), newUser.userId).then(logoutSuccess, error)
			};
			var logoutSuccess = function(result){
				if(result !== null && angular.isDefined(result.errorMessage)){
					error(result);
					return;
				}

				//done
				testData.endtime = Date.now();
				testData.averagetime = calcAverage(testData);

				if($scope.logdata === true){
					data.push(testData);
				}

				deferred.resolve();
			};
			var error = function(err){
				deferred.reject(err);
			};

			$http.get('https://randomuser.me/api/?format=json&nat=us,gb').then(function(result){
				//console.log('random result', result);
				newUser = {
					firstName: result.data.results[0].name.first,
					lastName: result.data.results[0].name.last,
					email: result.data.results[0].email,
					password: result.data.results[0].login.password
				};

				//console.info('starting test', newUser);

				user.add($rootScope.getUrl(), newUser).then(addSuccess, error);
			}, function(err){
				error(err);
			});

		}, 300);

		return deferred.promise;
	};
	var calcAverage = function(d){
		var tot = 0;
		for(var i=0;i<data.length;i++){
			tot += (data[i].endtime - data[i].starttime);
		}
		tot += (d.endtime - d.starttime)

		return (tot/(data.length+1));//haven't added the new entry to collection yet
	};

	//Destroy Scope
	$scope.$on('$destroy', function () {
		$scope.cancel();
	});

	//Local  Variables
	var data = [], totalPoints = 300;

	//Scope  Variables
	$scope.formData = {
		frequency: 1,
		runtime: 1
	};
	$scope.data = data;
	$scope.logdata = true;

	//Initialize Page
	init();
}]);