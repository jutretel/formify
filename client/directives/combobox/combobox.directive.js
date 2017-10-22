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

			//select event
			scope.select = function (item) {
				scope.selectedItem = item
				scope.selectedText = item[scope.displayProperty]

				console.log(item)

				//callbacks
				var func = scope.callback()
				if(func)
					func(item)
			}

		}
	};
}]);