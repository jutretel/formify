angular.module('formify')
.service("eventBusiness", ['$http', 'busyService', 'globalFactory' ,
	function($http, busyService, globalFactory) {

		this.getAll = () => {
			return $http.get(globalFactory.mainUrl + 'events')
		}

		this.getEventById = (id) => {
			return $http.get(globalFactory.mainUrl + 'events/' + id)
		}
	}
])
