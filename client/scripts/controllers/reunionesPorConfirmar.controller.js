angular
  .module('FLOKsports')
  .controller('ReunionesConfirmarCtrl', function ReunionesConfirmarCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.listCanSwipe = true;
		window.rc = rc;
		this.helpers({
			reunionesPorConfirmar() {
				var reuniones = Reuniones.find({users:{ $elemMatch: {user: Meteor.userId(), estatus : 1} }}).fetch();
				if(reuniones.length > 0){
					_.each(reuniones, function(reunion){
						reunion.ownerObj = Meteor.users.findOne(reunion.owner);
					})
				}
				console.log(reuniones);
				return reuniones;
			}
		});
		
		this.cambiarEstatus = function(reunion, estatus){
			var mensaje = "";
			var titulo = "";
			if(estatus == 1 ){
				var confirmPopup = $ionicPopup.confirm({
					title: "Pendiente",
					template: "Está seguro de ponerla como Pendiente"
				});
			}				
			else if(estatus == 2){
				var confirmPopup = $ionicPopup.confirm({
					title: "Confirmar",
					template: "Está seguro de Confirmar"
				});

				reunion.estatus = 2;
			}				
			else if(estatus == 6){
				var confirmPopup = $ionicPopup.confirm({
					title: "Rechazar",
					template: "Está seguro de Rechazar"
				});
			}
			
			confirmPopup.then(function(res) {
				if(res) { 
					_.each(reunion.users, function(usuario){
						if(usuario.user == Meteor.userId()){
							usuario.estatus = estatus;
						}
					})
					Reuniones.update({ _id : reunion._id}, { $set : { users: reunion.users, estatus : 2 }});
				}
			});
		}
		
		this.detalleReunion = function(reunion){
			if(reunion.owner == Meteor.userId()){
				$state.go("app.editarReunion", {reunionId : reunion._id});
			}else{
				$state.go("app.verReunion", {reunionId : reunion._id});
			}
		}
});