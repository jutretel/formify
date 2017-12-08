angular.module('formify')
.service("eventBusiness", ['$http', 'busyService', 'globalFactory' , 'LocalStorage', 'notifyService', '$location',
	function($http, busyService, globalFactory, LocalStorage, notifyService, $location) {
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

		this.getLocation = (id) => {
			return $http.get(globalFactory.mainUrl + 'locations/' + id)
		}

		this.getEventTypes = () => {
			return $http.get(globalFactory.mainUrl + 'event_types')
		}

		this.getEventType = (id) => {
			return $http.get(globalFactory.mainUrl + 'event_types/' + id)
		}

		this.createEvent = (event) => {
			if (event.name == undefined) {
				notifyService.notify('danger', 'Erro', 'Preencha o nome do evento')
				return;
			}
			
			if (event.selectedType == undefined) {
				notifyService.notify('danger', 'Erro', 'Preencha o local do evento')
				return;
			}

			if (event.selectedLocation == undefined) {
				notifyService.notify('danger', 'Erro', 'Preencha o tipo de evento')
				return;
			}

			if (event.start_date == undefined || event.end_date == undefined) {
				notifyService.notify('danger', 'Erro', 'Preencha as datas do evento')
				return;
			}
			
			this.verifyLocations(event.start_date, event.end_date).then((locations) => {

				availablesLocations = locations.data

				location_ids = availablesLocations.map(function(location) {
					return location.id
				})

				location_names = availablesLocations.map(function(location) {
					return location.name
				})

				if (!location_ids.includes(event.location_id)) {
					notifyService.notify('danger', 'Erro', 'Local indisponível para essa data, sugestões: ' + location_names.join(', '))
					return;
				}

				$http.post(globalFactory.mainUrl + 'events', {event:event})
				$location.path("/")
			})
		}

		this.setEventUser = (eventUser, is_delete) => {
			if (is_delete) {
				return $http.delete(globalFactory.mainUrl + 'event_users/'+ eventUser.user_id + '/' + eventUser.event_id)
			}
			else {
				return $http.post(globalFactory.mainUrl + 'event_users', {event_user:eventUser})
			} 
		}

		this.getParticipationType = (user_id, event_id) => {
			return $http.get(globalFactory.mainUrl + 'event_users/' + user_id + '/' + event_id)
		}

		this.searchEvent = (route, search) => {
			return $http.get(globalFactory.mainUrl + route + search)
		}

		this.createComment = (comment) => {
			return $http.post(globalFactory.mainUrl + 'comments', {comment:comment})
		}

		this.getComments = (id) => {
			return $http.get(globalFactory.mainUrl + 'comments/event/' + id)
		}
		
		this.verifyLocations = (start, end) => {
			return $http.get(globalFactory.mainUrl + 'locations/' + start + '/' + end)
		}

		this.deleteEvent = (id) => {
			return $http.delete(globalFactory.mainUrl + 'events/' + id)
		}

		this.editEvent = (event) => {
			return $http.put(globalFactory.mainUrl + 'events/' + event.event_id, {event:event})
		}
	}
])
