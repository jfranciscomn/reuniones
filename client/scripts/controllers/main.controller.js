angular
  .module('FLOKsports')
  .controller('MainCtrl', function MainCtrl($scope, $reactive, $state) {
  $reactive(this).attach($scope);
  
  this.start = function() {
	  $state.go("anon.login")
  }
  
});

