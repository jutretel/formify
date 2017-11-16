angular.module('formify')
.service('busyService', [function(){
	var elem = $("#global-busy")
	var context = this

	this.hide = function(){
		$("#global-busy").animate({ opacity: 0 },400, function(){
			elem.hide()
		})
	}
	this.show = function(){
		elem.show()
		$("#global-busy").animate({ opacity: 0.6 },400)
	}
	
	//recebe uma promise e registra a abertura e fechamento do busy
	this.wrap = (prom) => {
		context.show()
		prom.finally(() => {context.hide()})
	}
}])