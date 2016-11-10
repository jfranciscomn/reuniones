angular
	.module('FLOKsports')
	.controller('NuevaReunionCtrl', function NuevaReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.reunionId = $stateParams.reunionId;
		this.reunion = Reuniones.findOne(this.reunionId);
		
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
			}
		});
			
		if(!this.reunion){
			this.reunion={users:[{user:Meteor.userId(), estatus : 2}]};
			this.reunion.createdAt = new Date();
			this.reunion.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
			this.reunion.username = (Meteor.userId() != undefined) ? Meteor.user().username : "";
			this.reunion.estatus = 1;
			this.reunion.fecha = new Date();
			this.reunion.horaInicio = new Date();
			this.reunion.horaFin = new Date();
		}else{
			_.each(rc.registrados, function(registrado, index){
				_.each(rc.reunion.users, function(invitado){
					if(registrado._id == invitado.user){
						registrado.estatus = true;
					}
					if(registrado._id == Meteor.owner){
						rc.registrados.splice(index, 1);
					}
				})
			});
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
		
});