angular.module('mean').provider('fortune',[function () {
	this.$get = ['$q', '$timeout','$resource', 'ApiUrl', function ($q, $timeout, $resource, ApiUrl) {
		var timeoutWait = 400;
		var list = function (url) {
			var deferred = $q.defer();

			$timeout(function () {
				$resource(ApiUrl + 'fortunes').list(null,function(result){
																						deferred.resolve(result);
																					}, function(err){
																						deferred.reject(err);
																					});
			}, timeoutWait);

			return deferred.promise;
		};
		var getRandom = function () {
			var deferred = $q.defer();

			$timeout(function () {
				$resource(ApiUrl + 'random').get(null,function(result){
																						deferred.resolve(result);
																					}, function(err){
																						deferred.reject(err);
																					});
			}, timeoutWait);

			return deferred.promise;
		};
		var add = function (fortune) {
			var deferred = $q.defer();

			$timeout(function () {
				var a = new $resource(ApiUrl);
				a.post(fortune).$promise.then(function(result){
																						deferred.resolve(result);
																					}, function(err){
																						deferred.reject(err);
																					});
				
			}, timeoutWait);

			return deferred.promise;
		};

		var remove = function (fortuneId) {
			var deferred = $q.defer();

			$timeout(function () {
				$resource(ApiUrl +fortuneId).delete(null,function(result){
																						deferred.resolve(result);
																					}, function(err){
																						deferred.reject(err);
																					});
			}, timeoutWait);

			return deferred.promise;
		};
		var get = function (fortuneId) {
			var deferred = $q.defer();

			$timeout(function () {
				$resource(ApiUrl + fortuneId).get(null,function(result){
																						deferred.resolve(result);
																					}, function(err){
																						deferred.reject(err);
																					});
			}, timeoutWait);

			return deferred.promise;
		};

		return {
			list: list,
			getRandom: getRandom,
			add: add,
			remove: remove,
			get: get
		}
	}];

	this.init = function () {

	};
}]);