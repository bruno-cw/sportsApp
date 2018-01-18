(function() {
  'use strict';

  angular
  .module('sportsApp.routes', ['ngRoute'])
  .config(routes);

   routes.$inject = ["$routeProvider", "$locationProvider", "$compileProvider"];

  function routes($routeProvider, $locationProvider, $compileProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider.
    when('/', {
      templateUrl: 'sections/login/login.tpl.html',
      controller: 'LoginController',
      controllerAs: 'lg',
      resolve: {
        resolveme: ["LoginService",  function( LoginService ) {
          return;

        }]
      }
  })
  .otherwise({
      redirectTo: '/'
    });

    // Makes typical hyperlinks safe during app run
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|mailto|sip|tel):/);
  
  }  

})();
