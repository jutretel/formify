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

		this.getLocations = () => {
			return $http.get(globalFactory.mainUrl + 'locations')
		}

		this.getEventTypes = () => {
			return $http.get(globalFactory.mainUrl + 'event_types')
		}

		this.createEvent = (event) => {
			return $http.post(globalFactory.mainUrl + 'events', {event:event})
		}

		this.searchEvent = (route, search) => {
			console.log(globalFactory.mainUrl + route + search)
			return $http.get(globalFactory.mainUrl + route + search)
		}
	}
])
