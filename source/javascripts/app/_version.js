//= require ../lib/_jquery

;(function () {
  'use strict';

  $(function() {
    $(".version-selector select").on("change", function() {
      window.location = '/docs/v' + this.value + '/';
    });
  });
})();
