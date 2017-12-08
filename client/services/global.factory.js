angular.module('formify')
.factory("globalFactory", [function() {
	return {
		mainUrl: "http://localhost:3000/",
		localUrl: "http://localhost:3020/",
		userKey: 'loggedUserKey',
		notifyEventKey: 'notifyEventSave'
	}
}])
