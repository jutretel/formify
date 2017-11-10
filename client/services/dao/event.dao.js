angular.module('formify')
.service("eventDao", ['$http', 'busyService', 'globalFactory', function($http, busyService, globalFactory) {
	this.getAll = (callback) => {
		$http.get(globalFactory.globalUrl + 'events').then(callback)
	}
}])
