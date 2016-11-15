angular
	.module('FLOKsports')
	.controller('IniciarReunionCtrl', function NuevaReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, $ionicSideMenuDelegate) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.reunion = {};
		this.buscar = "";
		this.opcion = {};
		this.opcion.participantes = [];
		this.registrados = "";
		
		this.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  };
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
				if($stateParams.reunionId != undefined){
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
					
					reunion.todosTemas = reunion.temas.split('.');
				}else{
					reunion={users:[{user:Meteor.userId(), estatus : 2}]};
					reunion.createdAt = new Date();
					reunion.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
					reunion.username = (Meteor.userId() != undefined) ? Meteor.user().username : "";
					reunion.estatus = 1;
					reunion.fecha = new Date();
					reunion.horaInicio = new Date();
					reunion.horaFin = new Date();
					
				}
				return reunion;
			}
		});
		
		this.onDrag = function(){
			console.log("estoy arrastrando");
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

