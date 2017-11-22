angular.module('formify')
.controller('personListCtrl', ['$scope', 'userService', 'busyService', '$location',
	function($scope, userService, busyService, $location){
		$scope.data = {}
		$scope.data.name = ''
		$scope.users = []

		$scope.search = () =>{
			busyService.wrap(
				userService.searchByName($scope.data.name)
				.then(function(data){
					if(data.data)
						$scope.users = data.data
				})
			)
		}

		$scope.details = (user) =>{
			$location.path('/' + user.id)
		}

		$scope.search()
	}
]);