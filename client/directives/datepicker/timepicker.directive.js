angular.module('formify')
.directive('timepicker',[function(){
	return {
		restrict: 'A',
		scope:{
			selectedDate:'='
		},
		link: function(scope, element, attrs){
			$("#" + attrs.id).flatpickr({
			  	noCalendar: true,
			    dateFormat: 'h:m',
			    enableTime: true,
			    onChange: function(selectedDates, dateStr, instance) {
			    	scope.selectedDate = selectedDates[0]
			    	scope.$apply()
	    		}
		  	});

		}
	};
}]);