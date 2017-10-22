angular.module('formify')
.service('busyService', [function(){
	var elem = $("#global-busy")
	return {
		hide: function(){
			$("#global-busy").animate({ opacity: 0 },400, function(){
				elem.hide()
			})
		},
		show: function(){
			elem.show()
			$("#global-busy").animate({ opacity: 0.6 },400)
		}
	}

}])