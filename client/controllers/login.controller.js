angular.module('formify')
.controller('loginCtrl', ['$scope', '$location', 'busyService', 'userService', 'notifyService',
	function($scope, $location, busyService, userService, notifyService){
		$scope.data = {}


		$scope.login = () => {
			if($scope.data.login == undefined){
				notifyService.notify('danger', 'Erro', 'Preencha seu login')
				return;
			}
			if($scope.data.password == undefined){
				notifyService.notify('danger', 'Erro', 'Preencha sua senha')
				return;
			}

			busyService.wrap(
				userService.getUserByLogin($scope.data.login, $scope.data.password)
				.then((data) => {
					if(!data.data){
						notifyService.notify('danger', 'Erro', 'Usuário ou senha incorretos')
						return;
					}

					$location.path('/event')
				})
			)
		}

}]);