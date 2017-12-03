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

		this.create = (notification) =>{
			return $http.post(globalFactory.mainUrl + baseUrl, {notification : notification})
		}

		this.allByUser = () => {
			return $http.get(globalFactory.mainUrl + baseUrl + 'user/' + LocalStorage.getValue(globalFactory.userKey).id)
		}
	}]
)