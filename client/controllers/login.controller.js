angular.module('formify')
.controller('loginCtrl', ['$scope', 'notifyService', 'userService', 'notifyService', '$location',
	function($scope, notifyService, userService, notifyService, $location){

		$scope.login = function(){
			userService.getUserByLogin($scope.loginText, $scope.password, (res) => {
				if(!res.status)
					notifyService.notify('danger', 'Erro', res.err)

			})
		}

}]);