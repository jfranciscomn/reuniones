angular
  .module('FLOKsports')
  .controller('EditarPerfilCtrl', function EditarPerfilCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		
		this.usuarioActual = {};
		this.usuarioId = Meteor.userId();
		window.rc = this;			
		this.helpers({
			usuarioActual () {
				return Meteor.users.findOne(Meteor.userId());
			}
		});
	
		this.actualizar  = function(){

			delete this.usuarioActual._id;
			console.log(this.usuarioActual)
			console.log(this.usuarioId);
			Meteor.users.update({_id:this.usuarioId},{$set: {profile : this.usuarioActual.profile}});
			$ionicHistory.goBack();
		}
});