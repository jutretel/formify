angular.module('formify')
.service("eventBusiness", ['$http', 'busyService', 'eventDao', function($http, busyService, eventDao) {
	this.getAll = (callback) => {
		$http.get(globalFactory.globalUrl + 'events').then(callback)
	}
}])
