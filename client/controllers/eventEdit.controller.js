angular.module('formify')
.controller('eventEditCtrl',['$scope', 'eventBusiness', 'userService', 'LocalStorage', 'globalFactory', '$location', '$routeParams',
function ($scope, eventBusiness, userService, LocalStorage, globalFactory, $location, $routeParams) {
	$scope.onInit = function () {
		$scope.user_id = LocalStorage.getValue(globalFactory.userKey).id
		$scope.data = {}
		
		eventBusiness.getLocations().then((locations) => {
			$scope.locations = locations.data
		})

		eventBusiness.getEventTypes().then((types) => {
			$scope.types = types.data
		})

		eventBusiness.getEventById($routeParams.eventId)
		.then(function (event) {
			if (event.data) {
				if (event.data.user_id != $scope.user_id) {
					$location.path('/event/' + $routeParams.eventId)
				}

				$scope.event = event.data
				$scope.data.event_id = $scope.event.id

				$scope.data.name = $scope.event.name
				$scope.data.description = $scope.event.description
				$scope.data.is_public = $scope.event.is_public

				$scope.data.start_date = $scope.event.start_date
				$scope.data.end_date = $scope.event.end_date
				
				eventBusiness.getLocation($scope.event.location_id)
				.then(function (location) {
					if (location.data) {
						$scope.data.selectedLocation = location.data
					}
				})

				eventBusiness.getEventType($scope.event.event_type_id)
				.then(function (type) {
					if (type.data) {
						$scope.data.selectedType = type.data
					}	
				})
			}
		})
	}

	$scope.editEvent = function () {
		eventBusiness.editEvent($scope.data)
		$location.path('/event/' + $routeParams.eventId)
	}
}])