angular
  .module('FLOKsports')
  .controller('NuevoAcuerdoCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal,$cordovaCalendar) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.acuerdoId = $stateParams.acuerdoId;
		this.acuerdo = Acuerdos.findOne(this.acuerdoId)
		this.quitarhk=function(obj){
			if(Array.isArray(obj)){
				for (var i = 0; i < obj.length; i++) {
					obj[i] =this.quitarhk(obj[i]);
				}
			}
			else if(obj !== null && typeof obj === 'object')
			{
				delete obj.$$hashKey;
				for (var name in obj) {
		  			obj[name] = this.quitarhk(obj[name]);
				}
			}
			return obj;
		}
		
		this.helpers({
			categorias() {
				return Categorias.find();
			},
			responsables : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			},
			seguidores : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			}
		});
	   
		if(!this.acuerdo){
			this.acuerdo = {};
			this.acuerdo.responsables = [{user:Meteor.userId()}];
			this.acuerdo.seguidores = [{user:Meteor.userId()}];
			this.acuerdo.prioridad = 0;
			this.acuerdo.createdAt = new Date();
  		this.acuerdo.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
  		this.acuerdo.username = (Meteor.userId() != undefined) ? Meteor.user().username : "";
  		this.acuerdo.estatus = 1;
  		this.acuerdo.fechaInicio = new Date();
  		this.acuerdo.fechaLimite = new Date();
		}else{
			_.each(rc.responsables, function(registrado, index){
				if(registrado._id == rc.acuerdo.owner){
					rc.responsables.splice(index, 1);
				}
				_.each(rc.acuerdo.responsables, function(invitado){
					if(registrado._id == invitado.user){
						registrado.estatus = true;
					}
				})
			});
			
			_.each(rc.seguidores, function(registrado, index){
				if(registrado._id == rc.acuerdo.owner){
					rc.seguidores.splice(index, 1);
				}
				_.each(rc.acuerdo.seguidores, function(invitado){
					if(registrado._id == invitado.user){
						registrado.estatus = true;
					}
				})
			});
		}
		
		this.agregarResponsable = function(participante, $index){
			if(participante.estatus == true){
				this.acuerdo.responsables.push({user:participante._id});
			}
			else{
				_.each(rc.acuerdo.responsables, function(invitado, index){
					if(invitado.user == participante._id){
						console.log("index", index);
						rc.acuerdo.responsables.splice(index, 1);
					}
				})
			}
		}
		
		this.agregarSeguidor = function(participante, $index){
			if(participante.estatus == true){
				this.acuerdo.seguidores.push({user:participante._id});
			}
			else{
				_.each(rc.acuerdo.seguidores, function(invitado, index){
					if(invitado.user == participante._id){
						console.log("index", index);
						rc.acuerdo.seguidores.splice(index, 1);
					}
				})
			}
		}
		this.saveDate=function(){
			
			$cordovaCalendar.createEvent({
			    title: 'Space Race',
			    location: 'The Moon',
			    notes: 'Bring sandwiches',
			    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
			    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
			  }).then(function (result) {
			    // success
			  }, function (err) {
			    // error
			  });


		}
		
		this.save  = function(){
			this.quitarhk(this.acuerdo);
	
			if(this.acuerdoId){
				delete this.acuerdo._id
				Acuerdos.update({_id:this.acuerdoId},{$set:this.acuerdo});
			}
			else{
				
				this.acuerdo.createdAt = new Date();
    			this.acuerdo.owner = Meteor.userId();
    			this.acuerdo.username = Meteor.user().username;
    			Acuerdos.insert(this.acuerdo);
    			if(this.acuerdo.calendario)
	      			this.saveDate()
			}
			console.log($ionicHistory)	
			$ionicHistory.goBack();		
		}
		
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
		
		$ionicModal.fromTemplateUrl('client/templates/participantes/modalSelResponsables.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modalResponsables = modal;
	  });
	  
	  this.selResponsables = function() {
	    $scope.modalResponsables.show();
	  };
	  
	  this.cerrarModalResponsables = function() {
	    $scope.modalResponsables.hide();
	  };
	  
	  $ionicModal.fromTemplateUrl('client/templates/participantes/modalSelSeguidores.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modalSeguidores = modal;
	  });
	  
	  this.selSeguidores = function() {
	    $scope.modalSeguidores.show();
	  };
	  
	  this.cerrarModalSeguidores = function() {
	    $scope.modalSeguidores.hide();
	  };
})