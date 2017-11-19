angular.module('formify')
.controller('loginCtrl', ['$scope', '$location', 'busyService', 'userService', 'notifyService',
	function($scope, $location, busyService, userService, notifyService){
		$scope.data = {}

		//window.scope = $scope
		$scope.create = false

		$scope.initCreate = () =>{
			$scope.create = !$scope.create
		}

		$scope.save = () =>{
			if (!validate()) return;
			
			busyService.wrap(userService.create($scope.data).then(function(did){
				if(did.msg) notifyService.notify('danger', 'Erro', did.msg)
				else
					$scope.login()
			})

				)

		}

		$scope.login = () => {
			if (!validate()) return;

			busyService.wrap(
				userService.getUserByLogin($scope.data.email, $scope.data.password)
				.then((data) => {
					if(!data.data){
						notifyService.notify('danger', 'Erro', 'Usuário ou senha incorretos')
						return;
					}

					$location.path('/event')
				})
			)
		}

		function validate(){
			if($scope.data.email == undefined){
				notifyService.notify('danger', 'Erro', 'Preencha seu Email')
				return false
			}
			if($scope.data.password == undefined){
				notifyService.notify('danger', 'Erro', 'Preencha sua senha')
				return false
			}

			if($scope.create && $scope.data.name == undefined){
				notifyService.notify('danger', 'Erro', 'Preencha seu nome')
				return false
			}

			return true
		}

}]);