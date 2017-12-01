angular.module('formify')
.controller('eventDetailsCtrl',['$scope', 'eventBusiness', 'userService', 'LocalStorage', 'globalFactory', '$routeParams', '$route',
	function ($scope, eventBusiness, userService, LocalStorage, globalFactory, $routeParams, $route) {
	
	$scope.onInit = function () {
		$scope.user_id = LocalStorage.getValue(globalFactory.userKey).id

		$scope.data = {}
		$scope.myEvent = true

		eventBusiness.getEventById($routeParams.eventId)
		.then(function (event) {
			if (event.data) {
				$scope.event = event.data
				$scope.data.event_id = $scope.event.id
				
				eventBusiness.getLocation($scope.event.location_id)
				.then(function (location) {
					if (location.data) {
						$scope.location = location.data
					}
				})

				userService.get($scope.event.user_id)
				.then(function(user) {
					if (user.data) {
						$scope.user = user.data
						$scope.data.user_id = $scope.user_id

						// scope event user_id CRIADOR DO EVENTO
						// scope user_id USUARIO LOGADO

						if ($scope.event.user_id == $scope.user_id) {
							$scope.myEvent = false
						}
					}

					eventBusiness.getParticipationType($scope.user_id, $scope.event.id)
					.then(function (eventUser) {
						if(eventUser.data) {
							$scope.participation = eventUser.data.participation_type

							if ($scope.participation == 'Interest') {
								$('#button-interest').text("Remover Interesse")
							}

							if($scope.participation == 'Subscription') {
								$('#button-subscribe').text("Remover Inscrição")
								$('#button-interest').hide()
							}

							if($scope.participation == "Confirmed") {
								$('#button-confirmed').text("Remover Confirmação")
							}

						}
					})

					$scope.interest = function () {
						if ($scope.participation != "Interest") {
							$scope.data.participation_type = "Interest"
							eventBusiness.setEventUser($scope.data, false)
						}
						else {
							eventBusiness.setEventUser($scope.data, true)
						}
						
						$route.reload()
					}

					$scope.subscription = function () {
						if ($scope.participation != "Subscription") {
							$scope.data.participation_type = "Subscription"
							eventBusiness.setEventUser($scope.data, false)
						}
						else {
							eventBusiness.setEventUser($scope.data, true)
						}

						$route.reload()
					}

					$scope.confirmation = function () {
						if ($scope.participation != "Confirmed") {
							$scope.data.participation_type = "Confirmed"
							eventBusiness.setEventUser($scope.data, false)
						}
						else {
							eventBusiness.setEventUser($scope.data, true)
						}
						$route.reload()
					}
				})

			}
		})
	}

}])