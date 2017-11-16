angular.module('formify')
.controller('eventListCtrl',['$scope', 'eventBusiness', function ($scope, eventBusiness) {
	$scope.onInit = function () {
		window.scope = $scope
		eventBusiness.getAll().then((events) => {
			$scope.items = events.data
			
		})
	}
}])