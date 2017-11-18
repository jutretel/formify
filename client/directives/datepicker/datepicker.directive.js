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
			    dateFormat: 'd/M/y',
			    onChange: function(selectedDates, dateStr, instance) {
			    	scope.selectedDate = selectedDates[0]
			    	scope.$apply()
	    		}
		  	});

		}
	};
}]);