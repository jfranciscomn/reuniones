angular
  .module('FLOKsports')
  .controller('LoginCtrl', function LoginCtrl($meteor, $scope, $reactive, $ionicPopup, $state) {
  	rc = $reactive(this).attach($scope);
  	
  	if(Meteor.userId()){
	  	$state.go("app.home");
  	}
  	

  	
  	this.login = function () {
			  $meteor.loginWithPassword({email:this.credentials.email},this.credentials.password).then(
		      function () {
		          $state.go('app.home');        

		      },
		      function (error) {
		        console.log(error);
		        $ionicPopup.alert({
				      title: error.reason,
				      template: error.message,
				      okType: 'alex-button alex-button-positive button-full'
				    });
		      }
		    );
	
	    
	  }
	

});