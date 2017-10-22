	
angular.module('formify')
.factory('notifyService', [ 'constantsFactory', '$rootScope',
function (constantsFactory, $rootScope){
	var service = {};
	service.notify = notify;

	function notify(type, title, message){
		$rootScope.$emit(constantsFactory.notifyEventKey, 
			{
				type: type,
				body: message,
				title:title
			}
		);
	}

	return service;
}]);