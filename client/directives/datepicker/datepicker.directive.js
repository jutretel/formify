angular.module('formify')
.directive('datepicker',[function(){
	return {
		restrict: 'A',
		scope:{
			selectedDate:'='
		},
		link: function(scope, element, attrs){
			var elem = $("#" + attrs.id),
				setDate = null

			
			var picker = elem.flatpickr({
			  	noCalendar: false,
			    dateFormat: 'd/m/y H:i',
			    enableTime: true,
			    minDate: Date.now(),
			    onChange: function(selectedDates, dateStr, instance) {
			    	debugger
			    	scope.selectedDate = selectedDates[0]
			    	scope.$apply()
	    		},
	    		/*onReady: function(){
	    			debugger
	    		}*/
		  	})

			window.pick = picker
			window.scope = scope

			scope.$watch('selectedDate', () =>{
				//verifica se esta setado
				if(scope.selectedDate && typeof(scope.selectedDate) == 'string'){
					let date = scope.selectedDate
					date = new Date(date)
					$("#" + attrs.id).val(date.getDate() + '/' +  date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() +':'+ date.getMinutes())
				}
			})
		  	
		}
	};
}]);