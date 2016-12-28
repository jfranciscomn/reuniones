angular
  .module('FLOKsports')
  .controller('PerfilCtrl', function PerfilCtrl($scope, $meteor, $reactive, $state, $stateParams, $ionicPopup) {
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
			var options = {
			      quality: 100,
			      destinationType: Camera.DestinationType.DATA_URL,
			      sourceType: Camera.PictureSourceType.CAMERA,
			      allowEdit: true,
			      encodingType: Camera.EncodingType.JPEG,
			      targetWidth: 300,
			      targetHeight: 300,
			      popoverOptions: CameraPopoverOptions,
			      saveToPhotoAlbum: false,
			      correctOrientation:true
			};
	    $meteor.getPicture(options).then(function(picture){
	      rc.user.profile.picture = picture;
	      Meteor.users.update({_id: rc.user._id}, {$set:{profile: rc.user.profile}});
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