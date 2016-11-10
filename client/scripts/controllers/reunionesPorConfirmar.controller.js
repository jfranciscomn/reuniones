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
		this.sendNotification =function (meeting,message) {
			
			Push.send({
				from: 'Mis Reuniones',
				title: meeting.titulo,
				text: Meteor.user().profile.name+" "+message+' su asistencia a la reunion "'+meeting.titulo+'"',
				badge: 1,
				sound: 'airhorn.caf',
				
				query: {userId:meeting.owner}
			});
		}
		
		
		this.cambiarEstatus = function(reunion, estatus){
			var mensaje = "";
			var notification =""
			var titulo = "";
			if(estatus == 1 ){
				mensaje = "Pendiente";
				titulo = "Pendiente"
				notification = "no ha confirmado"
			}				
			else if(estatus == 2){
				mensaje = "Aceptada";
				titulo = "Aceptar";
				notification = "Confirmo"
				reunion.estatus = 2;
			}				
			else if(estatus == 6){
				mensaje = "Rechazada";
				titulo = "Rechazar";
				notification = "Rechazo"
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
					rc.sendNotification(reunion,notification)
				}
			});
		}
});