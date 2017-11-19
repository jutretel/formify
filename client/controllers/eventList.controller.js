angular.module('formify')
.controller('eventListCtrl',['$scope', 'eventBusiness', 'LocalStorage', 'globalFactory', 
	function ($scope, eventBusiness, LocalStorage, globalFactory) {
	$scope.onInit = function () {
		$scope.userId = LocalStorage.getValue(globalFactory.userKey).id
		eventBusiness.getAll().then((events) => {
			$scope.items = events.data
			
		})
	}
}])