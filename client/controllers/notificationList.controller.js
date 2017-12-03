angular.module('formify')
.controller('notificationListCtrl', ['$scope', 'notificationBusiness', 'busyService', '$location',
	function($scope, notificationBusiness, busyService, $location){
		$scope.data = {}
		$scope.data.name = ''
		$scope.nots = []

		$scope.search = () =>{
			busyService.wrap(
				notificationBusiness.allByUser()
				.then(function(data){
					if(data.data)
						$scope.nots = data.data
				})
			)
		}

		$scope.search()
	}
]);