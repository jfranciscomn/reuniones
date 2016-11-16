angular
	.module('FLOKsports')
	.controller('IniciarReunionCtrl', function NuevaReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, $ionicActionSheet, $timeout) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.reunion = {};
		this.buscar = "";
		this.opcion = {};
		this.opcion.participantes = [];
		this.registrados = "";
		this.miReuniones = {};
		
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
				console.log($stateParams)
				var reunion = {};
				if($stateParams.reunionId != undefined){
					rc.miReunion = Reuniones.findOne($stateParams.reunionId);
					if(this.getReactively("miReunion")){
						_.each(rc.miReunion.users, function(invitado){
							invitado.asistio = true;
							invitado.invitado = Meteor.users.findOne(invitado.user);
							_.each(rc.registrados, function(registrado, index){
							
								if(registrado._id == invitado.user){
									registrado.estatus = invitado.estatus;
								}
								if(registrado._id == Meteor.owner){
									rc.registrados.splice(index, 1);
								}
							})
						});
						
						if(rc.miReunion.notas == undefined)
							rc.miReunion.notas = "";
						rc.miReunion.todosTemas = rc.miReunion.temas.split('.');

					}	
				}				
				console.log(reunion);
				return rc.miReunion;
			},
			acuerdos : function() {
				return Acuerdos.find({reunion_id : $stateParams.reunionId});
			},
			registrados : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			},
		});
			
		//Action Sheet Participantes
		this.mostrarOpcionesParticipantes = function(participante) {
	   	var hideSheet = $ionicActionSheet.show({
		    buttons: [
						{ text: 'Agregar Acción' },
						{ text: 'Agregar a Notas' }
					],
					destructiveText: (participante.asistio == 1 ) ? 'Asistió' : 'Faltó',
					titleText: participante.invitado.profile.name,
					cancelText: 'Cancelar',
					cancel: function() {
	        	console.log("canceló");
		      },
					buttonClicked: function(index) {
						if(index == 0){
							//Si Agrega acción
							
						}else if(index == 1){
							//Si Agrega a notas
							rc.reunion.notas += "\n " + participante.invitado.profile.name + " (" + participante.invitado.profile.email + ")";
						}
						console.log(index);
						return true;
					},
					destructiveButtonClicked: function() {
						if(participante.asistio == false)
							participante.asistio = true;
						else if(participante.asistio == true)
							participante.asistio = false;
						
						return true;
					}
	   	});
		};
		
		//Action Sheet Medios
		this.mostrarMedios = function(participante) {
	   	var hideSheet = $ionicActionSheet.show({
		    buttons: [
						{ text: 'Foto' },
						{ text: 'Audio' },
						{ text: 'Video' }
					],
					titleText: "Agregar Medio",
					cancelText: 'Cancelar',
					cancel: function() {
		      },
					buttonClicked: function(index) {
						if(index == 0){
							//Si Agrega Foto
							
						}else if(index == 1){
							//Si Agrega Audio
							
						}else if(index == 2){
							//Si Agrega Video
							
						}
						console.log(index);
						return true;
					}
	   	});
		};
		
		//Tomar Asistencia
		this.asistencia = function(participante){
			console.log("asistio", participante);
			if(participante.asistio == false)
				participante.asistio = true;
			else if(participante.asistio == true)
				participante.asistio = false;
		}
	 
	 	this.expandText = function(){
			var element = document.getElementById("notas");
			element.style.height =  element.scrollHeight + "px";
		}
		
		this.tiempoTranscurrido = function(){
				
			return duration.humanize()
		}
		
		this.agregarNotas = function(participante){
			rc.reunion.notas += "\n " + participante.invitado.profile.name + " (" + participante.invitado.profile.email + ")";
		}
		
		//Agregar participante
		this.agregarParticipante = function(participante, $index){
			console.log(participante);
			if(participante.estatus == true){
				participante.invitado = Meteor.users.findOne(participante._id);
				this.reunion.users.push({user:participante._id, invitado:participante.invitado, asistio : false, estatus : 1});
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
		
		//Modal de participantes
		$ionicModal.fromTemplateUrl('client/templates/participantes/modalAgregarParticipantes.html', {
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
});

//TODO me quedé haciendo el agregar participantes



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

