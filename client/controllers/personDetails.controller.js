angular.module('formify')
.controller('userDetailsCtrl', [
	'userService', 'busyService', '$scope', '$location', '$routeParams', 'eventBusiness',
	function(userService, busyService, $scope, $location, $routeParams, eventBusiness){
		$scope.myEvents = []

		$scope.invite = () => {

		}

		busyService.wrap(
			userService.get($routeParams.personId)
			.then(function(data){
				if(data.data)
					$scope.user = data.data
			})
		)

		busyService.wrap(
			eventBusiness.getMyEvents()
			.then((data) => {
				if(data.data)
					$scope.myEvents = data.data
			})
		)
	}
])