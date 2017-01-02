angular
	.module('FLOKsports')
	.controller('NuevaReunionCtrl', function NuevaReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, $cordovaCalendar) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.reunion = {};
		this.buscar = "";
		this.opcion = {};
		this.opcion.participantes = [];
		this.registrados = "";
		this.fechaInicio = "";
		this.horaInicio = "";
		this.ubicacion = "";
		
		this.subscribe('usuarios',()=>{
			return [{}]
		});
		this.subscribe('AllCategorias',()=>{
			return [{}]
		});
		this.subscribe('AllReuniones',()=>{
			return [{}]
		});
		
		this.subscribe('preferenciasReunion',()=>{
			return [{owner : Meteor.userId()}]
		});
		
		this.quitarhk=function(obj){
			if(Array.isArray(obj)){
				for (var i = 0; i < obj.length; i++) {
					obj[i] =this.quitarhk(obj[i]);
				}
			}
			else if(obj !== null && typeof obj === 'object'){
				delete obj.$$hashKey;
				for (var name in obj) {
						obj[name] = this.quitarhk(obj[name]);
				}	
			}
			return obj;
		}
		
		this.helpers({
			registrados : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			},
			categorias : function() {
				return Categorias.find();
			},
			reunion : function() {
				console.log("state", $stateParams)
				if($stateParams.reunionId != undefined && $stateParams.siguiente == undefined){
					var reunion = Reuniones.findOne($stateParams.reunionId);	
					rc.fechaInicio = reunion.fecha;
					rc.horaInicio = reunion.horaInicio;
					rc.ubicacion = reunion.ubicacion;
				}else if($stateParams.reunionId != undefined && $stateParams.siguiente != undefined){
					var reunion = Reuniones.findOne($stateParams.reunionId);	
					delete reunion._id;
					reunion.estatus = 1;
					reunion.notas = "";
					reunion.fecha = new Date();
					delete reunion.fechaIniciada;
					_.each(reunion.users, function(participante){
						if(participante.user != reunion.owner){
							participante.asistio = false;
							participante.estatus = 1;
						}						
					});
					console.log("reunionSiguiente", reunion);
				}else{
					reunion={users:[{user:Meteor.userId(), estatus : 2, invitado : true}]};
					reunion.createdAt = new Date();
					reunion.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
					reunion.username = (Meteor.userId() != undefined) ? Meteor.user().username : "";
					reunion.estatus = 1;
					reunion.fecha = new Date();
					reunion.horaInicio = moment().format("hh:mm a");					
					reunion.convoca = Meteor.user().profile.name;
					var preferenciasReunion = PreferenciasReunion.findOne({owner : Meteor.userId()});
					console.log("preferencias", preferenciasReunion);
					if(preferenciasReunion != undefined && preferenciasReunion.duracionReunion != undefined){
						reunion.horaFin = moment().add(preferenciasReunion.duracionReunion, "minutes").format("hh:mm a");
					}else{
						reunion.horaFin = moment().format("hh:mm a");
					}
				}
				return reunion;
			}
		});

		this.agregarParticipante = function(participante, $index){
			if(participante.invitado == true){
				this.reunion.users.push({user : participante._id, estatus : 1, invitado : true});
			}
			else{
				_.each(rc.reunion.users, function(invitado, index){
					if(invitado.user == participante._id){
						console.log("index", index);
						rc.reunion.users.splice(index, 1);
					}
				})
			}
			console.log(rc.reunion.users);
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

		this.sendNotification =function (meeting, tipo) {
			var participans =[]
			_.each(meeting.users, function(participan){
				if(participan.user!=meeting.owner)
					participans.push(participan.user)
			});
			console.log(participans);
			if(tipo == "insert"){
				Push.send({
					from: 'Mis Reuniones',
					title: meeting.titulo,
					text: 'Invitación a participar a la Reunión\nTítulo: '+meeting.titulo+'\nFecha: '+moment(meeting.fecha).format("DD-MMM-YYYY")+"\nTemas: "+meeting.temas,
					badge: 1,
					sound: 'airhorn.caf',
		            payload: {
		                title: meeting.titulo,
		            },
					query: {userId:{$in:participans}}
				});
			}else if(tipo == "update"){
				Push.send({
					from: 'Mis Reuniones',
					title: meeting.titulo,
					text: 'Se modificó la Reunión\nTítulo: '+meeting.titulo+'\nFecha: '+ moment(meeting.fecha).format("DD-MM-YYYY") +"\nTemas: "+meeting.temas,
					badge: 1,
					sound: 'airhorn.caf',
          payload: {
              title: meeting.titulo,
          },
					query: { userId : { $in : participans} }
				});
			}
		}
		
		this.save	= function(){
			this.quitarhk(this.reunion);
			console.log("state save", $stateParams);
			if($stateParams.reunionId != undefined && $stateParams.siguiente == undefined){
				delete this.reunion._id
				this.quitarhk(this.reunion);
				if(rc.fechaInicio != rc.reunion.fecha || rc.horaInicio != rc.reunion.horaInicio || rc.ubicacion != rc.reunion.ubicacion){
					_.each(this.reunion.users, function(invitado){
						delete invitado.objeto;
						if(invitado.user != Meteor.userId()){
							invitado.estatus = 1;
						}
					})
					this.reunion.estatus = 1;
				}
				
				Reuniones.update({ _id : $stateParams.reunionId },{ $set : this.reunion });
				this.sendNotification(this.reunion, "update");
			}
			else{
				Reuniones.insert(this.reunion);
				this.sendNotification(this.reunion, "insert");
				this.saveDate(this.reunion);
			}
			
			$ionicHistory.goBack();
		}
		
		$ionicModal.fromTemplateUrl('client/templates/participantes/modalSelParticipantes.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		
		this.selParticipantes = function() {
			_.each(rc.registrados, function(registrado, index){
				console.log(index, "registrado", registrado);
				_.each(rc.reunion.users, function(invitado, indexInvitado){
					console.log(indexInvitado, "invitado", invitado)
					if(registrado._id == invitado.user){
						registrado.invitado = invitado.invitado;
						registrado.estatus = invitado.estatus;
					}
				})
				if(Meteor.userId() == registrado._id){
					rc.registrados.splice(index, 1);
				}
			});
			console.log(rc.registrados);
			$scope.modal.show();
		};
		
		this.cerrarModalParticipantes = function() {
			$scope.modal.hide();
		};
		
		this.getConfirmados = function(usuarios){
			var confirmados = 0;
			_.each(usuarios, function(usuario){
				if(usuario.estatus == 2){
					confirmados++;
				}
			})
			return confirmados;
		}
		
		this.getPendientes = function(usuarios){
			var pendientes = 0;
			_.each(usuarios, function(usuario){
				if(usuario.estatus == 1){
					pendientes++;
				}
			})
			return pendientes;
		}
		
		this.getRechazados = function(usuarios){
			var rechazados = 0;
			_.each(usuarios, function(usuario){
				if(usuario.estatus == 7){
					rechazados++;
				}
			})
			return rechazados;
		}
	  
	  this.cambiarEstatus = function(reunion, estatus){
			var idTemp = reunion._id;
			delete reunion._id;
			if(estatus == 3){
				var isIPad = ionic.Platform.isIPad();
				//if(isIPad){
					$state.go("app.iniciarReunionIpad", {reunionId : idTemp});
				/*}else{
					$state.go("app.iniciarReunionCel", {reunionId : idTemp});
				}*/
			}else if(estatus == 5){
				
			}
			console.log(idTemp, estatus, reunion);
			Reuniones.update(idTemp, { $set : { estatus : estatus }});
			
		}
		
		this.continuar = function(reunion){
			var isIPad = ionic.Platform.isIPad();
			//if(isIPad){
				$state.go("app.iniciarReunionIpad", {reunionId : reunion._id});
			/*}else{
				$state.go("app.iniciarReunionCel", {reunionId : reunion._id});
			}*/
		}
		
		this.aumentarHoraFin = function(horaInicio){
			var preferenciasReunion = PreferenciasReunion.findOne({owner : Meteor.userId()});
			if(preferenciasReunion != undefined){
				console.log(preferenciasReunion.duracionReunion);
				rc.reunion.horaInicio = moment(horaInicio).format("hh:mm a");
				rc.reunion.horaFin = moment(horaInicio).add(preferenciasReunion.duracionReunion, 'minutes').format("hh:mm a");
			}else{
				rc.reunion.horaFin = rc.reunion.horaInicio;
			}
			
		}
		
});



/*
	
	Siendo el creador (owner)
	
	Agendada = 1
		Se puede reprogramar = 4 -> esto es sólo modificando la fecha y ubicación
		Se puede cancelar = 5
	Confirmada = 2
		Se puede iniciar = 3
		Se puede cancelar = 5
		Se puede reprogramar = 4
	Iniciada = 3
		Se puede finalizar = 6 -> se genera la minuta
	Reprogramada = 4
		Se puede cancelar = 5
		Se manda correo
	Cancelada = 5
		Se manda correo
	
	
	
	
	
	Siendo el participante o invitado
	
	Agendada = 1
		Se puede confirmar = 2 -> esto es cuando un participante acepta la reunión
		Se puede rechazar = 7
		
		1 Agendada
		2 Confirmada
		3 Iniciada
		4 Reprogramada
		5 Cancelada
		6 Finalizada cuando se registra la minuta de reunión (iPad)
		7 Rechazada
		
*/
		
