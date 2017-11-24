angular.module('formify').directive('myEvents', [function(){
	return{
		restrict:'E',
		templateUrl:'directives/my-events/my-events.template.html',
		controller: ['$scope', '$location', 'eventBusiness', '$rootScope',
		function($scope, $location, eventBusiness, $rootScope){
			var following = true
			//registra  um watcher pra ver quando o usuario logou
			$rootScope.$watch('globals.currentUser', function() {
				if($rootScope.globals){
					eventBusiness.getFollowedEvents().
					then(function(data){
						if(data.data)
							$scope.events = data.data	
					})
				}
			})

			$scope.myEvents = () =>{
				following = false
				$("#following").removeClass('is-active')
				$("#my-events").addClass('is-active')

				$("#following>a").addClass('event-tab__text')
				$("#my-events>a").removeClass('event-tab__text')

				eventBusiness.getMyEvents().
					then(function(data){
						if(data.data)
							$scope.events = data.data	
					})
			}

			$scope.open = function (event) {
				 $location.path('event/' + event.id)
			}

			$scope.following = () => {
				following = true
				$("#my-events").removeClass('is-active')
				$("#following").addClass('is-active')

				$("#following>a").removeClass('event-tab__text')
				$("#my-events>a").addClass('event-tab__text')

				eventBusiness.getFollowedEvents().
					then(function(data){
						if(data.data)
							$scope.events = data.data	
					})
			}

		}]
	}
}])