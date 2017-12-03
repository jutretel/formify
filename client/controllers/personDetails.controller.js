angular.module('formify')
.controller('userDetailsCtrl', [
	'userService', 'busyService', '$scope', '$location', '$routeParams', 
	'eventBusiness', 'notificationBusiness', 'notifyService',
	function(userService, busyService, $scope, $location, $routeParams, 
		eventBusiness, notificationBusiness, notifyService){
		$scope.myEvents = []

		$scope.invite = () => {
			if(!$scope.selectedEvent){
				notifyService.notify('danger', 'Erro', 'Selecione um evento')
				return
			}

			busyService.wrap(
				notificationBusiness.createEventNotification($scope.selectedEvent.id, $routeParams.personId)
			)
		}

		busyService.wrap(
			userService.get($routeParams.personId)
			.then(function(data){
				if(data.data)
					$scope.user = data.data
			})
		)

		busyService.wrap(
			eventBusiness.getMyEvents()
			.then((data) => {
				if(data.data)
					$scope.myEvents = data.data
			})
		)
	}
])