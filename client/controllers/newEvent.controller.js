angular.module('formify')
.controller('newEventCtrl',['$scope', 'eventBusiness', 'LocalStorage', 'globalFactory', '$location', 'notifyService',
function ($scope, eventBusiness, LocalStorage, globalFactory, $location, notifyService) {

	$scope.data = {}
	$scope.sugestions = false

	$scope.onInit = function () {
		eventBusiness.getLocations().then((locations) => {
			$scope.locations = locations.data
		})

		eventBusiness.getEventTypes().then((types) => {
			$scope.types = types.data
		})

	}

	$scope.create = function () {
		$scope.data.status = "Open"
		$scope.data.rating = 5
		$scope.data.user_id = LocalStorage.getValue(globalFactory.userKey).id

		if ($scope.data.name == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o nome do evento')
			return;
		}
		
		if ($scope.data.selectedType == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o local do evento')
			return;
		}

		if ($scope.data.selectedLocation == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o tipo de evento')
			return;
		}

		if ($scope.data.start_date == undefined || $scope.data.end_date == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha as datas do evento')
			return;
		}

		eventBusiness.verifyLocations($scope.data.start_date, $scope.data.end_date)
		.then((locations) => {
			$scope.availablesLocations = locations.data

			location_ids = $scope.availablesLocations.map(function(location) {
				return location.id
			})

			location_names = $scope.availablesLocations.map(function(location) {
				return location.name
			})

			if (!location_ids.includes($scope.data.selectedLocation.id)) {
				notifyService.notify('danger', 'Erro', 'Local indisponível para essa data, ver sugestões')
				$scope.sugestions = true
				$('#locationSugestions').text("Sugestões: " + location_names.join(", "))
				return;
			}

			$scope.data.event_type_id = $scope.data.selectedType.id
			$scope.data.location_id = $scope.data.selectedLocation.id
			eventBusiness.createEvent($scope.data)

			$location.path('/')
		})
	}
}])