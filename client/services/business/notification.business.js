angular.module('formify')
.service('notificationBusiness', ['$http', 'busyService', 'globalFactory' , 'LocalStorage','userService',
	function($http, busyService, globalFactory , LocalStorage, userService){
		var baseUrl = 'notifications/'
		this.createEventNotification = (eventId, invitedUserId)=>{
			var notification = {}
			//pega o usuario logado
			return userService.get(LocalStorage.getValue(globalFactory.userKey).id)
			.then((user) => {
				if(!user.data)
					return;

				user = user.data
				//cria a string de convite
				notification.description = 
				user.name + ' te convidou para seu evento em ' + globalFactory.localUrl + '#!/' + 'event/' + eventId
				notification.user_id = invitedUserId

				//cria a notificação
				return this.create(notification)
			})
		}

		this.invitationNotification = (eventName, invitedUserEmail) => {
			var notification = {}
			//pega o usuario logado
			return userService.get(LocalStorage.getValue(globalFactory.userKey).id)
			.then((user) => {
				if(!user.data)
					return;

				user = user.data

				//cria a string de convite
				notification.description = 
				user.name + ' te convidou para seu evento ' + eventName
				notification.user_email = invitedUserEmail

				//cria a notificação
				return this.createByEmail(notification)
			})
		}

		this.notifyDeleted = (userId, eventId) => {
			var notification = {}

			notification.description = "O evento " + globalFactory.localUrl + '#!/' + 'event/' + eventId + " foi cancelado :("
			notification.user_id = userId

			return $http.post(globalFactory.mainUrl + baseUrl, {notification: notification})
		}

		this.notifyEdited = (userId, event) => {
			var notification = {}

			notification.description = "O evento " + event.name + " foi alterado!"
			notification.user_id = userId

			return $http.post(globalFactory.mainUrl + baseUrl, {notification: notification})
		}

		this.createByEmail = (notification) => {
			return $http.post(globalFactory.mainUrl + baseUrl + "email", {notification: notification})
		}

		this.create = (notification) =>{
			return $http.post(globalFactory.mainUrl + baseUrl, {notification : notification})
		}

		this.allByUser = () => {
			return $http.get(globalFactory.mainUrl + baseUrl + 'user/' + LocalStorage.getValue(globalFactory.userKey).id)
		}
	}]
)