(function () {
  'use strict';

  angular
    .module('sportsApp.core')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService', 'resolveme'];

  function LoginController(LoginService, resolveme) {
    var vm = this;
    vm.message = 'controller ok';
    vm.serviceMessage = LoginService.get();
  }
})();
