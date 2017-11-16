angular.module('formify')
.factory("globalFactory", [function() {
	return {
		mainUrl: "http://localhost:3000/",
		userKey: 'loggedUserKey',
		notifyEventKey: 'notifyEventSave'
	}
}])
