angular.module('formify')
.directive('datepicker',[function(){
	return {
		restrict: 'A',
		scope:{
			selectedDate:'='
		},
		link: function(scope, element, attrs){
			$("#" + attrs.id).flatpickr({
			  	noCalendar: false,
			    dateFormat: 'd/m/y H:i',
			    enableTime: true,
			    minDate: Date.now(),
			    onChange: function(selectedDates, dateStr, instance) {
			    	scope.selectedDate = selectedDates[0]
			    	scope.$apply()
	    		}
		  	});
		}
	};
}]);