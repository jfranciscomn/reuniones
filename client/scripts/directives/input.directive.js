/*
	angular
  .module('FLOKsports')
  .directive('input', input);
 
// The directive enable sending message when tapping return
// and expose the focus and blur events to adjust the view
// when the keyboard opens and closes
function input ($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: link
  };
 
  ////////////
 
  function link (scope, element, attrs) {
    element.bind('focus', function (e) {
      if (!scope.onFocus) return;
 
      $timeout(function () {
        scope.onFocus();
      });
    });
 
    element.bind('blur', function (e) {
      if (!scope.onBlur) return;
 
      $timeout(function () {
        scope.onBlur();
      });
    });
 
    element.bind('keydown', function (e) {
      if (e.which != 13) return;
 
      if (scope.returnClose) {
        element[0].blur();
      }
 
      if (scope.onReturn) {
        $timeout(function () {
          scope.onReturn();
        });
      }
    });
  }
}
*/
angular
  .module('FLOKsports').directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) { 
          console.log('value=',value);
          //$timeout(function() {
            element[0].focus();
            scope[attrs.focusMe] = false;
          //});
        }
      });
    }
  };
});


angular
  .module('FLOKsports').directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
});

angular
  .module('FLOKsports').factory('focus', function ($rootScope, $timeout) {
  return function(name) {
    $timeout(function (){
      $rootScope.$broadcast('focusOn', name);
    });
  }
});