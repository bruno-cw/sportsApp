(function () {
  'use strict';

  angular
    .module('sportsApp.core')
    .controller('IndexController', IndexController);

    IndexController.$inject = [];

  function IndexController() {
    var vm = this;
    vm.message = "index ok"
  }

})();
