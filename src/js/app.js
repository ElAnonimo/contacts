angular.module('ContactsApp', [
  'ContactsApp.controllers',
  'ContactsApp.services',
  'ContactsApp.filters',
  'ngRoute',
  'firebase',
  'angularUtils.directives.dirPagination'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/main", {templateUrl: "partials/main.html", controller: "mainController"}).
	otherwise({redirectTo: '/main'});
}]);
