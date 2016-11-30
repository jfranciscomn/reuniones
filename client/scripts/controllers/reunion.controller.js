angular
  .module('FLOKsports')
  .controller('ReunionCtrl', function ReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.verReunion = "";
		this.helpers({
			reunion : function() {
				var reunion = Reuniones.findOne($stateParams.reunionId);
				
				if(reunion.users.length > 0){
					_.each(reunion.users, function(invitado){
						invitado.invitado = Meteor.users.findOne(invitado.user);
					})
					reunion.createdBy = Meteor.users.findOne(reunion.owner);
				}
				console.log(reunion);
				return reunion;
			}
		});
		
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
				notification = "Confirmó"
				reunion.estatus = 2;
			}				
			else if(estatus == 6){
				var confirmPopup = $ionicPopup.confirm({
					title: "Rechazar",
					template: "Está seguro de Rechazar"
				});
				notification = "Rechazó"
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
			$ionicHistory.goBack();
		}
		
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
});