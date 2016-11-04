angular
  .module('FLOKsports')
  .controller('ReunionesConfirmarCtrl', function ReunionesConfirmarCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.listCanSwipe = true;
		window.rc = rc;
		this.helpers({
			reunionesPorConfirmar() {
				return Reuniones.find({users:{ $elemMatch: {user: Meteor.userId(), estatus : 1} }});
			}
		});
		
		this.cambiarEstatus = function(reunion, estatus){
			var mensaje = "";
			if(estatus == 1 )
				mensaje = "pendiente";
			else if(estatus == 2)
				mensaje = "aceptada";
			else if(estatus == 6)
				mensaje = "rechazada"
			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirmar',
				template: "Está seguro de poner como " + mensaje
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					_.each(reunion.users, function(usuario){
						if(usuario.user == Meteor.userId()){
							Reuniones.update({ _id : reunion._id, 'users.user' : Meteor.userId() }, { $set : { "users.$.estatus" : estatus }});
						}
					})
				}
			});
		}
});