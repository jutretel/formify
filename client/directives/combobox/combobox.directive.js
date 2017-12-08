angular.module('formify')
.directive('combobox',[function(){
	return {
		restrict: 'E',
		scope:{
			source:'=',
			selectedItem:'=',
			displayProperty:'@',
			callback:'&'
		},
		templateUrl:'directives/combobox/combobox.template.html',
		link: function(scope, element, attrs){

			scope.selectedText = scope.selectedItem ? scope.selectedItem[scope.displayProperty] : "Selecione"
			scope.$watch('selectedItem', function(){
 				if(scope.selectedItem)
 					scope.selectedText = scope.selectedItem[scope.displayProperty]
 			})

			//select event
			scope.select = function (item) {
				scope.selectedItem = item
				scope.selectedText = item[scope.displayProperty]

				//callbacks
				var func = scope.callback()
				if(func)
					func(item)
			}

		}
	};
}]);