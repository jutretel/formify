angular.module('formify')
.service("eventBusiness", ['$http', 'busyService', 'globalFactory' , 'LocalStorage',
	function($http, busyService, globalFactory, LocalStorage) {
		this.getAll = () => {
			return $http.get(globalFactory.mainUrl + 'events')
		}

		this.getMyEvents = () => {
			var userid = LocalStorage.getValue(globalFactory.userKey).id
			return $http.get(globalFactory.mainUrl + 'events/user/' + userid)
		}

		this.getFollowedEvents = () => {
			var userid = LocalStorage.getValue(globalFactory.userKey).id
			return $http.get(globalFactory.mainUrl + 'events/followed/' + userid)
		}

		this.getEventById = (id) => {
			return $http.get(globalFactory.mainUrl + 'events/' + id)
		}
	}
])
