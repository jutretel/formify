	
angular.module('formify')
.factory('notifyService', [ 'globalFactory', '$rootScope',
function (globalFactory, $rootScope){
	var service = {};
	service.notify = notify;

	function notify(type, title, message){
		$rootScope.$emit(globalFactory.notifyEventKey, 
			{
				type: type,
				body: message,
				title:title
			}
		);
	}

	return service;
}]);