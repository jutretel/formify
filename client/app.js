angular.module('formify',['ngRoute', 'ngCookies'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.hashPrefix('!');
	
	$routeProvider
    .when('/login',{templateUrl:'templates/login.html', controller:'loginCtrl'})
    
    .when('/event',{templateUrl:'templates/event-list.html', controller:'eventCtrl'})
    .when('/event/new',{templateUrl:'templates/new-event.html', controller:'newEventCtrl'})
    .when('/event/:eventId',{templateUrl:'templates/event-details.html', controller:'eventDetailsCtrl'})
    .when('/event/edit/:eventId',{templateUrl:'templates/edit-event.html', controller:'eventEditCtrl'})
    
    .when('/search',{templateUrl:'templates/search.html', controller:'searchCtrl'})
    .when('/certificate',{templateUrl:'templates/certificate.html', controller:'certificateCtrl'})
    .when('/',{templateUrl:'templates/event-list.html', controller:'eventListCtrl'})

    .when('/person/list',{templateUrl:'templates/person-list.html', controller:'personListCtrl'})
    .when('/person/list/:personId',{templateUrl:'templates/person-details.html', controller:'userDetailsCtrl'})
    .when('/notification/list',{templateUrl:'templates/notification-list.html', controller:'notificationListCtrl'})
    

	$routeProvider.otherwise({redirectTo: '/'})

}]).run(['$rootScope', '$location', '$cookies', '$http', 
function($rootScope, $location, $cookies, $http){
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
 
         $rootScope.$on('$locationChangeStart', function (event, next, current) {
             // redirect to login page if not logged in and trying to access a restricted page
             //var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
             var loggedIn = $rootScope.globals.currentUser;
             if (!loggedIn) {
                 $location.path('/login');
             }
         });

}]);
