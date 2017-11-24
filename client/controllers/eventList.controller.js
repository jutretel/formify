angular.module('formify')
.controller('eventListCtrl',['$scope', 'eventBusiness', 'LocalStorage', 'globalFactory', '$location',
	function ($scope, eventBusiness, LocalStorage, globalFactory, $location) {

	$scope.onInit = function () {
		$scope.userId = LocalStorage.getValue(globalFactory.userKey).id
		eventBusiness.getAll().then((events) => {
			$scope.items = events.data
			
		})
	}

	$scope.open = function (event) {
		 $location.path('event/' + event.id)
	}

}])