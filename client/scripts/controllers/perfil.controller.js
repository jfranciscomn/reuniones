angular
  .module('FLOKsports')
  .controller('PerfilCtrl', function AcuerdosCtrl($scope, $meteor, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.user = {};
		this.editar = false;
		this.helpers({
	    user: function(){
	      return Meteor.users.findOne(Meteor.userId());
	    },
	  });	  
	
		this.takePicture = function(){
			this.editar = true;

	    $meteor.getPicture({width:200, height: 200, quality: 100}).then(function(picture, ){

	      rc.user.profile.picture = picture;
	      Meteor.users.update({_id: rc.user._id}, {$set:{profile: rc.user.profile}});
				console.log(rc.user);
	    });

	  };
	  
	  this.getPicture = function(){
	    return rc.user.profile.picture;
	  }
	  
	  this.actualizar = function(){
	    Meteor.users.update({_id: rc.user._id}, {$set:{profile: rc.user.profile}});
	    this.edit = false;
	  };
});

// roberto@masoft.mx