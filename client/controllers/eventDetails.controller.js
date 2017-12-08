angular.module('formify')
.controller('eventDetailsCtrl',['$scope', 'eventBusiness', 'userService', 'LocalStorage', 'globalFactory', '$routeParams', '$route', '$location',
	function ($scope, eventBusiness, userService, LocalStorage, globalFactory, $routeParams, $route, $location) {
	
	$scope.onInit = function () {
		$scope.user_id = LocalStorage.getValue(globalFactory.userKey).id

		$scope.data = {}
		$scope.myEvent = false
		$scope.isPublic = true
		$scope.showComments = false
		$scope.showRate = true
		$scope.parts = []

		$scope.optionsRated = [{name:'Dono do Evento'}, {name:'Evento'}]
		$scope.optionsRate = [{name:'1'}, {name:'2'}, {name:'3'}, {name:'4'}, {name:'5'}]

		eventBusiness.getComments($routeParams.eventId)
		.then(function (comment) {
			if (comment.data) {
				$scope.comments = comment.data
			}
		})



		eventBusiness.getEventById($routeParams.eventId)
		.then(function (event) {
			if (event.data) {
				$scope.event = event.data
				$scope.data.event_id = $scope.event.id
				if ($scope.event.is_public == false) 
					$scope.isPublic = false
				
				eventBusiness.getParticipationType($scope.user_id, $routeParams.eventId)
				.then(function (participation) {
					if (participation.data || ($scope.event.user_id == $scope.user_id)) {
						$scope.showComments = true
					}
					
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

						// scope.event.user_id CRIADOR DO EVENTO
						// scope.user_id USUARIO LOGADO

						if ($scope.event.user_id == $scope.user_id) {
							$scope.myEvent = true
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
				})
			}
		})	
	}
	$scope.comment = function () {
		if ($scope.data.content == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o comentário')
			return;
		}
		else{
			eventBusiness.createComment($scope.data)
			var comma = ', '
			$scope.parts = $scope.data.mention.split(comma)
			$route.reload()	
		}
	}
	$scope.rate = function () {
		if ($scope.data.selectRating == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha quem irá avaliar')
			return;
		}
		if ($scope.data.selectRate == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha a nota')
			return;
		}
		if($scope.data.selectRating.name == 'Dono do Evento'){
			$scope.user.rating = ($scope.user.rating/2 + $scope.data.selectRate.name/2)
			eventBusiness.setUserRating($scope.user.id, $scope.user.rating)
		}
		else if($scope.data.selectRating.name == 'Evento'){
			$scope.event.rating = ($scope.event.rating/2 + $scope.data.selectRate.name/2)
			eventBusiness.setEventRating($scope.event.id, $scope.event.rating)
		}
		$route.reload()
	}
	$scope.deleteEvent = function () {
		eventBusiness.deleteEvent($routeParams.eventId)
		$location.path('/')
	}

	$scope.editEvent = function () {
		$location.path('/event/edit/' + $routeParams.eventId)
	}
}])