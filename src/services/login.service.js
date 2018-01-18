(function () {
  'use strict';

  angular
    .module('sportsApp.services')
    .constant('API_URL', 'http://localhost:63410/api/')
    .config(appConfig)
    .factory('LoginService', LoginService);

  appConfig.$inject = ['$httpProvider'];

  function appConfig($httpProvider) {
    $httpProvider.defaults.cache = false;
    $httpProvider.defaults.headers.common['Accept'] = 'application/json; odata=verbose';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; odata=verbose';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json; odata=verbose';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; odata=verbose';
  };

  LoginService.$inject = ['$http', 'API_URL', '$log'];

  function LoginService($http, API_URL, $log) {
    var data = {
      'get': get
    };
    function get() {
      return 'service ok';
    }

    function dataServiceError(errorResponse) {
      $log.error('XHR Failed for Material Service');
      $log.error(errorResponse);
      return errorResponse;
    }
    return data;
  }

})();
