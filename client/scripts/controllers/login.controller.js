angular
  .module('FLOKsports')
  .controller('LoginCtrl', function LoginCtrl($meteor, $scope, $reactive, $ionicPopup, $state) {
  	rc = $reactive(this).attach($scope);
  	
  	if(Meteor.userId()){
	  	$state.go("app.home");
  	}
  	
  	this.credenctials = {};
  	

  	
  	this.login = function () {
			  $meteor.loginWithPassword({email:this.credentials.email},this.credentials.password).then(
		      function () {
		          $state.go('app.home');        

		      },
		      function (error) {
		        if(error.reason == "Match failed"){
				      $ionicPopup.alert({
					      title: "Credenciales",
					      template: "Escriba su correo y contraseña para iniciar",
					      okType: 'button button-positive button-full'
					    });
			      }else if(error.reason == "User not found"){
				      $ionicPopup.alert({
					      title: "Usuario",
					      template: "Usuario no encontrado",
					      okType: 'button button-positive button-full'
					    });
			      }else if(error.reason == "Incorrect password"){
				      $ionicPopup.alert({
					      title: "Contraseña",
					      template: "Contraseña incorrecta",
					      okType: 'button button-positive button-full'
					    });
			      } 
		      }
		    );
	
	    
	  }
	

});