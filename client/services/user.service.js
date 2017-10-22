angular.module('formify')
.service('userService', 
	['constantsFactory', '$http', 'AuthService', 'busyService',
	function(constantsFactory, $http, AuthService, busyService){
		service = {}

		var constantUrl = constantsFactory.debugUrl

		//get a user by his login and password
		service.getUserByLogin = function(login, password, callback){
			busyService.show()
			$http.get(constantUrl + 'usuario/' + login + '/' + password)
			.then((res) => {
				console.log(res)
				//check the return
				if(res.data){
					if(res.data.status)
						AuthService.SetCredentials(res.data.response[0].login, res.data.response[0].senha)

					//returns the user
					if(callback)
						callback(res.data)
				}
				//returns null in case of error
				else if(callback)
					callback(null)
			})
			.finally(()=>{
				busyService.hide()
			})
		}

		return service
	}]);