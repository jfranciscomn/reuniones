angular
  .module('FLOKsports')
  .controller('ReunionesConfirmarCtrl', function ReunionesConfirmarCtrl($scope, $reactive, $state, $stateParams, $ionicPopup,$cordovaCalendar) {
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
		
		
		this.sendNotification =function (meeting,message) {

			Push.send({
				from: 'Mis Reuniones',
				title: meeting.titulo,
				text: Meteor.user().profile.name+" "+message+' su asistencia a la reunión "'+meeting.titulo+'"',
				badge: 1,
				sound: 'airhorn.caf',
				query: {userId:meeting.owner}
			});
		}

		this.saveDate=function(meeting){
			var year = meeting.fecha.getFullYear()
			var month = meeting.fecha.getMonth()
			var date = meeting.fecha.getDate()
			var ihour = meeting.horaInicio.getHours()
			var iminute = meeting.horaInicio.getMinutes()
			var fhour = meeting.horaFin.getHours()
			var fminute = meeting.horaFin.getMinutes()
			$cordovaCalendar.createEvent({
			    title: meeting.titulo,
			    location: meeting.ubicacion,
			    notes: meeting.temas,
			    startDate: new Date(year,month,date,ihour,iminute,0,0),
			    endDate:  new Date(year,month,date,fhour,fminute,0,0)
			  }).then(function (result) {
			  	console.log(" // success",result);
			  }, function (err) {
			    console.log(" // Error",err);
			  });

		}

		this.cambiarEstatus = function(reunion, estatus){
			var mensaje = "";
			var notification =""
			var titulo = "";
			if(estatus == 1 ){
				var confirmPopup = $ionicPopup.confirm({
					title: "Pendiente",
					template: "Está seguro de ponerla como Pendiente"
				});
				notification = "no ha confirmado"
			}				
			else if(estatus == 2){
				var confirmPopup = $ionicPopup.confirm({
					title: "Confirmar",
					template: "Está seguro de Confirmar"
				});
				notification = "confirmó"
				reunion.estatus = 2;
			}				
			else if(estatus == 6){
				var confirmPopup = $ionicPopup.confirm({
					title: "Rechazar",
					template: "Está seguro de Rechazar"
				});
				notification = "rechazó"
			}			
	
			confirmPopup.then(function(res) {
				if(res) { 
					_.each(reunion.users, function(usuario){
						if(usuario.user == Meteor.userId()){
							usuario.estatus = estatus;
						}
					})
					Reuniones.update({ _id : reunion._id}, { $set : { users: reunion.users, estatus : 2 }});
					rc.sendNotification(reunion,notification)
					if(reunion.estatus==2){
						rc.saveDate(reunion)
					}
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