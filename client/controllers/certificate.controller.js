angular.module('formify')
.controller('certificateCtrl',['$scope', 'eventBusiness', 'LocalStorage', 'globalFactory', 'notifyService', 
	function ($scope, eventBusiness, LocalStorage, globalFactory, notifyService) {

	$scope.data = {}

	$scope.$watch('data.selectedType', function(){
	if($scope.data.selectedType){
		if ($scope.data.selectedType.name == 'Outro'){
			$scope.eventType = false
		}
		else
			$scope.eventType = true
	}
	})

	$scope.onInit = function () {
		$scope.eventType = true
		eventBusiness.getEventTypes().then((types) => {
			$scope.types = types.data
		})
	}

	$scope.create = function () {

		if ($scope.data.name == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o nome do evento')
			return;
		}
		
		if ($scope.data.participants == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o nome dos participantes')
			return;
		}

		if ($scope.data.selectedType == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha o tipo de evento')
			return;
		}

		if ($scope.data.time == undefined) {
			notifyService.notify('danger', 'Erro', 'Preencha a duração do evento')
			return;
		}
	}
}])