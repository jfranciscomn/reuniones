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
			var titulo = "";
			if(estatus == 1 ){
				mensaje = "Pendiente";
				titulo = "Pendiente"
			}				
			else if(estatus == 2){
				mensaje = "Aceptada";
				titulo = "Aceptar";
				reunion.estatus = 2;
			}				
			else if(estatus == 6){
				mensaje = "Rechazada";
				titulo = "Rechazar";
			}
				
			var confirmPopup = $ionicPopup.confirm({
				title: titulo,
				template: "Está seguro de poner como " + mensaje
			});
			
			confirmPopup.then(function(res) {
				if(res) { 
					_.each(reunion.users, function(usuario){
						if(usuario.user == Meteor.userId()){
							console.log(estatus);
							usuario.estatus = estatus;
						}
					})
					Reuniones.update({ _id : reunion._id}, { $set : { users: reunion.users }});
				}
			});
		}
});