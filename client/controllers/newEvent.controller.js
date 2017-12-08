angular.module('formify')
.controller('newEventCtrl',['$scope', 'eventBusiness', 'LocalStorage', 'globalFactory', '$location', 'notifyService', 'notificationBusiness',
function ($scope, eventBusiness, LocalStorage, globalFactory, $location, notifyService, notificationBusiness) {

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

		eventBusiness.createEvent($scope.data)
	}
}])