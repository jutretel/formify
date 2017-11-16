angular.module('formify')
.controller('eventCtrl',['$scope', 'eventBusiness', function ($scope, eventBusiness) {
	$scope.onInit = function () {
		window.scope = $scope
		eventBusiness.getEventById(1).then((event) => {
			$scope.item = event.data	
		})
	}
}])