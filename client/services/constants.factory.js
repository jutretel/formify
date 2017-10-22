angular.module('formify')
.service('constantsFactory', [function(){
	return {
		notifyEventKey:'addNotification',
		debugUrl:'http://agendamento-yuribonifacio.c9users.io:8080/api/'
	}
}]);