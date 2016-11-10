angular
	.module('FLOKsports')
	.controller('NuevaReunionCtrl', function NuevaReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.reunion = {};
		
		this.buscar = "";
		this.opcion = {};
		this.opcion.participantes = [];
		this.registrados = "";
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
				if($stateParams.reunionId){
					var reunion = Reuniones.findOne($stateParams.reunionId);
					
					_.each(rc.registrados, function(registrado, index){
						_.each(rc.reunion.users, function(invitado){
							if(registrado._id == invitado.user){
								registrado.estatus = invitado.estatus;
							}
							if(registrado._id == Meteor.owner){
								rc.registrados.splice(index, 1);
							}
						})
					});
					return reunion;
				}else{
					this.reunion={users:[{user:Meteor.userId(), estatus : 2}]};
					this.reunion.createdAt = new Date();
					this.reunion.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
					this.reunion.username = (Meteor.userId() != undefined) ? Meteor.user().username : "";
					this.reunion.estatus = 1;
					this.reunion.fecha = new Date();
					this.reunion.horaInicio = new Date();
					this.reunion.horaFin = new Date();
				}
			}
		});
			
		if(!this.reunion){
			
		}else{
			
			
		}

		this.agregarParticipante = function(participante, $index){
			if(participante.estatus == true){
				this.reunion.users.push({user:participante._id, estatus : 1});
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

		this.sendNotification =function (meeting) {
			var participans =[]
			_.each(meeting.users, function(participan){
				if(participan.user!=meeting.owner)
					participans.push(participan.user)
			});
			console.log(participans);
			Push.send({
				from: 'Mis Reuniones',
				title: meeting.titulo,
				text: 'Invitacion a participar a la Reunion\nTitulo: '+meeting.titulo+'\nFecha: '+meeting.temas+"\nTemas: "+meeting.temas,
				badge: 1,
				sound: 'airhorn.caf',
				
	            payload: {
	                title: meeting.titulo,
	            },
				query: {userId:{$in:participans}}
			});
		}
		
		this.save	= function(){
			console.log(this.reunionId);
			this.quitarhk(this.reunion);
			console.log(this.reunion)
	
			if(this.reunionId){
				delete this.reunion._id
				Reuniones.update({_id:this.reunionId},{$set:this.reunion});
			}
			else{
					Reuniones.insert(this.reunion);
			}
			this.sendNotification(this.reunion);
			$ionicHistory.goBack();
		}
		
		$ionicModal.fromTemplateUrl('client/templates/participantes/modalSelParticipantes.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		
		this.selParticipantes = function() {
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
				if(usuario.estatus == 6){
					rechazados++;
				}
			})
			return rechazados;
		}
	  
	  this.cambiarEstatus = function(reunion, estatus){
			var idTemp = reunion._id;
			delete reunion._id;
			if(estatus == 3){
				
			}else if(estatus == 5){
				
			}
			console.log(idTemp, estatus, reunion);
			Reuniones.update(idTemp, { $set : { estatus : estatus }});
			
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
		
