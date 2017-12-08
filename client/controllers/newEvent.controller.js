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
		$scope.data.event_type_id = $scope.data.selectedType.id
		$scope.data.location_id = $scope.data.selectedLocation.id

		event = eventBusiness.createEvent($scope.data)
	}
}])