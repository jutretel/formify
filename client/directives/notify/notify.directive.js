angular.module('formify').directive('notifyBoard', ['globalFactory', '$rootScope',
	function (globalFactory, $rootScope){
		return {
			restrict:'E',
			templateUrl:'directives/notify/notify.template.html',
			link: function(scope, element, attrs){
				//global array of notifications
				scope.messages = []

				//closes the notification
				scope.closeNotification = function(id){
					$('#notify-id-' +id).fadeOut(400, function(){
						scope.messages.splice(id, 1)
					})
				}

				scope.$on(globalFactory.notifyEventKey, function(args, data){
					//add a notification
					scope.messages.push(data)
					var index = scope.messages.length - 1

					//closes the notification
					setTimeout(function(){
						scope.closeNotification(index);
						scope.$apply();
					}, data.time || 5000);
				})

			}
		};
}]);