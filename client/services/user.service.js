angular.module('formify')
.service('userService', 
	['$http', 'AuthService', 'LocalStorage', 'globalFactory',
	function($http, AuthService, LocalStorage, globalFactory){
		var prefix = 'users/'

		//get a user by his login and password
		this.getUserByLogin = function(login, password){
			return $http.post(globalFactory.mainUrl + prefix + '/login', {
				email: login,
				password: password
			}).then((data)=>{
				if(data.data != undefined){
					//Salva os dados do usuario no cookie
					AuthService.SetCredentials(login, password, data.data.id)
					//salva os dados no localstorage para facilitar as requisições mais tarde
					LocalStorage.setValue(globalFactory.userKey,
		                {
		                    id : data.data.id,
		                    username: login
		                })
				}
				return data
			})
		}
	}]);