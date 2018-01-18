angular.module('sportsApp.core', []);

(function() {
  'use strict';

  angular
  .module('sportsApp.core')
  .filter('dateFormat', dateFormat)

  function dateFormat() {
    return function(input, type) {
      input = input || '';

      // Calculates the UTC Offset to display events at the right time.
      var offset = moment().utcOffset();

      switch(type) {
        case 'long':
        return moment(input).utcOffset(offset).format("MMM D, YYYY ");
        break;
        case 'month':
        return moment(input).utcOffset(offset).format("MMM").toUpperCase();
        break;
        case 'day':
        return moment(input).utcOffset(offset).format("D");
        break;
        case 'weeekday':
        return moment(input).utcOffset(offset).format("ddd");
        break;
        case 'short':
        return moment(input).utcOffset(offset).format("MM.DD.YY");
        break;
        case 'hours':
        return moment(input).utcOffset(offset).format("hh:mm");
        break;
      }
    }
  };

})();
