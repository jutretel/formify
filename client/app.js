angular.module('formify',['ngRoute', 'ngCookies'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.hashPrefix('!');
	
	$routeProvider
    .when('/login',{templateUrl:'templates/login.html', controller:'loginCtrl'})
    .when('/event',{templateUrl:'templates/event-list.html', controller:'eventCtrl'})
    .when('/',{templateUrl:'templates/event-list.html', controller:'eventListCtrl'})

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
