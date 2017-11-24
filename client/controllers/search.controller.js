angular.module('formify')
.controller('searchCtrl',['$scope', 'eventBusiness', 'LocalStorage', 'globalFactory', 'notifyService', 
	function ($scope, eventBusiness, LocalStorage, globalFactory, notifyService) {
	$scope.data = {}

	$scope.$watch('data.selectedOption', function(){
		if($scope.data.selectedOption){
			if ($scope.data.selectedOption.name == 'Nome'){
				$scope.eventName = false
				$scope.eventLocation = $scope.eventDate = !$scope.eventName
			}
				 
			if ($scope.data.selectedOption.name == 'Data'){
				$scope.eventDate = false
				$scope.eventLocation = $scope.eventName = !$scope.eventDate 
			}

			if ($scope.data.selectedOption.name == 'Local'){
				$scope.eventLocation = false
				$scope.eventName = $scope.eventDate = !$scope.eventLocation 
			}
		}
	})

	$scope.onInit = function () {
		$scope.userId = LocalStorage.getValue(globalFactory.userKey).id
		eventBusiness.getLocations().then((locations) => {
			$scope.locations = locations.data
		})

		$scope.options = [{name:'Nome', route:'events/name/'}, {name:'Data', route:'events/date/'}, {name:'Local', route:'events/location/'}]

		$scope.eventLocation = $scope.eventDate = $scope.eventName = true
	}

	$scope.search = function () {
		if ($scope.data.selectedOption == undefined) {	
			notifyService.notify('danger', 'Erro', 'Selecione uma tipo de busca.')
			return;
		}

		if ($scope.data.selectedOption.name == 'Local') {
			$scope.data.search = $scope.data.search.name
		}
		
		eventBusiness.searchEvent($scope.data.selectedOption.route, $scope.data.search).then((events) => {
			$scope.items = events.data
		})
	}

	$scope.open = function (event) {
		 $location.path('event/' + event.id)
	}
}])