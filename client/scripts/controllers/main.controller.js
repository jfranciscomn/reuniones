angular
  .module('FLOKsports')
  .controller('MainCtrl', function MainCtrl($scope, $reactive, $state, $window) {
  $reactive(this).attach($scope);
  $scope.calculateDimensions=function(gesture){
  		$scope.dev_width=$window.innerWidth;
  		$scope.dev_height=$window.innerHeight;
  }
  angular.element($window).bind('resize',function () {
  	$scope.apply(function () {
  		$scope.calculateDimensions();
  	})
  })
  this.start = function() {

		$state.go("anon.login")
  }
  
});