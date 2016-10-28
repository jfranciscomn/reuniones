angular
  .module('FLOKsports')
  .controller('LoginCtrl', function LoginCtrl($meteor, $scope, $reactive, $ionicPopup, $state) {
  	rc = $reactive(this).attach($scope);
  	
  	if(Meteor.userId()){
	  	$state.go("tabs.home");
  	}
  	
		this.credentials = {
			email: "roberto@masoft.mx",
			password: "123"
		};

		this.slideIndex = 0;
	
	  this.login = function () {
			  $meteor.loginWithPassword({email:this.credentials.email},this.credentials.password).then(
		      function () {
		          $state.go('tabs.profile');
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
	
	  this.facebook = function(){
			Meteor.loginWithFacebook({
			 requestPermissions: ['user_friends', 'public_profile', 'email', 'user_location'] 
			}, function(err){
				if (err) {
				    throw new Meteor.Error("Facebook login failed");
				}else{
				  $state.go('tabs.profile');
				}
      });
	  }
	    
	   
});