angular.module('formify')
.controller('eventCtrl',['$scope', 'eventBusiness', function ($scope, eventBusiness) {
	$scope.onInit = function () {
		
		eventBusiness.getEventById(1).then((event) => {
			$scope.item = event.data	
		})
	}
}])