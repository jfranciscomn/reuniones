angular
  .module('FLOKsports')
  .controller('LoginCtrl', function LoginCtrl($meteor, $scope, $reactive, $ionicPopup, $state, $ionicModal, $ionicSlideBoxDelegate) {
  	rc = $reactive(this).attach($scope);
  	
  	if(Meteor.userId()){
	  	$state.go("tabs.home");
  	}
  	
  	setTimeout(function(){
	  	var beenHereBefore = LocalStore.get('BeenHereBefore',  {reactive: true});
		  if (beenHereBefore !== true){
		    LocalStore.set('BeenHereBefore', true, {reactive: true})
				rc.showTutorial();
		  }
	  }, 1000); 

/*
		this.credentials = {
			email: "roberto@masoft.mx",
			password: "123"
		};
*/
		this.slideIndex = 0;
	
		this.startApp = function() {
			rc.slideIndex = 0;
			console.log($state);
			$scope.modalTutorial.hide();
			$scope.modal.hide();
			console.log(rc.slideIndex);
	  };
	  this.next = function() {
		  console.log(rc.slideIndex);
		  rc.slideIndex += 1;
	    $ionicSlideBoxDelegate.next();
	  };
	  this.previous = function() {
		  rc.slideIndex -= 1;
		  console.log(rc.slideIndex);
	    $ionicSlideBoxDelegate.previous();
	  };
	  
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
	    
	  $ionicModal.fromTemplateUrl('client/templates/howToPlay.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  
	  $ionicModal.fromTemplateUrl('client/templates/tutorial.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modalTutorial) {
	    $scope.modalTutorial = modalTutorial;
	  });
	  
	  $ionicModal.fromTemplateUrl('client/templates/terms.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modalTerms) {
	    $scope.modalTerms = modalTerms;
	  });
	  
	  
	  this.showTutorial = function() {
	    $scope.modalTutorial.show();
	  };
	  
	  this.show = function() {
	    $scope.modal.show();
	  };
	  
	  this.showTerms = function() {
	    $scope.modalTerms.show();
	  };	  
});