angular
  .module('FLOKsports')
  .controller('NuevoAcuerdoCtrl', function NuevoAcuerdoCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, $cordovaCalendar, $cordovaDatePicker) {

		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.acuerdoId = $stateParams.acuerdoId;
		this.acuerdo = Acuerdos.findOne(this.acuerdoId)
		console.log($stateParams)
		this.subscribe('usuarios',()=>{
			return [{}]
		});
		this.subscribe('AllCategorias',()=>{
			return [{}]
		});
		this.subscribe('AllAcuerdos',()=>{
			return [{}]
		});
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
			this.acuerdo.seguidores = [];
			this.acuerdo.prioridad = 0;
			this.acuerdo.createdAt = new Date();
  		this.acuerdo.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
  		this.acuerdo.username = (Meteor.userId() != undefined) ? Meteor.user().username : "";
  		this.acuerdo.estatus = 1;
  		this.acuerdo.fechaInicio = new Date();
  		this.acuerdo.bitacora = [];
  		
		}else{
			this.fechaLimite = this.acuerdo.fechaLimite; 
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
		
		if($stateParams.reunionId){
			this.acuerdo.reunion_id = $stateParams.reunionId;
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
		
		this.cambiarEstatus = function(acuerdo, estatus){
			console.log(estatus, acuerdo);
			if(estatus == 2){
				rc.fechaCierre = true;
			}else{
				rc.fechaCierre = false;
			}
		}

		this.seleccionarFechaInicio=function(){
			//this.acuerdo.fechaInicio = !this.acuerdo.fechaInicio? this.acuerdo.fechaInicio : new Date();
			var options = {
			    date: rc.acuerdo.fechaInicio,
			    mode: 'datetime'
			};

			console.log("date");
			alert("date");
			

			 $cordovaDatePicker.show(options, function (date) {
			 	 alert(date);
				console.log(date);
			    rc.acuerdo.fechaInicio = date;
			}, function (error) { // Android only
			    alert('Error: ' + error);
			});

		}

		this.saveDate=function(){
			$cordovaCalendar.createEvent({
			    title: 'hola mundo',
			    location: 'The Moon',
			    notes: 'Bring sandwiches',
			    startDate: new Date(2016, 10, 12, 18, 30, 0, 0, 0),
			    endDate:  new Date(2016, 10, 12, 19, 30, 0, 0, 0)
			  }).then(function (result) {
			  	console.log(" // success",result);
			  }, function (err) {
			    console.log(" // Error",err);
			  });

		}
		this.sendNotification =function (meeting) {
			var participans =[]
			_.each(meeting.seguidores, function(participan){
				if(participan.user!=meeting.owner)
					participans.push(participan.user)
			});
			console.log(participans);
			Push.send({
				from: 'Mis Reuniones',
				title: meeting.titulo,
				text: 'Acuerdo \nTitulo: '+meeting.titulo+'\nFecha Inicio: '+meeting.fechaInicio+"\nFecha Limite: "+meeting.fechaLimite,
				badge: 1,
				sound: 'default',
				query: {userId:{$in:participans}}
			});
		}
		this.validarAcuerdo = function () {
			if(!this.acuerdo || !this.acuerdo.titulo || this.acuerdo.titulo.trim().length==0){
				return 1;
			}

			if(!this.acuerdo.categoria_id)
				this.acuerdo.categoria_id = "";
			if(!this.acuerdo.fechaInicio)
				this.acuerdo.fechaInicio = new Date();
			if(!this.acuerdo.fechaLimite)
				this.acuerdo.fechaLimite = new Date();
			if(!this.acuerdo.descripcion)
				this.acuerdo.descripcion = "";
			if(!this.acuerdo.prioridad)
				this.acuerdo.prioridad = 0;
			if(!this.acuerdo.estatus)
				this.acuerdo.estatus = 1;
			if(!this.acuerdo.temas)
				this.acuerdo.temas = [];

			return 0;
		}
		this.valido = function (atributo) {
			// body...
			
			if(!this.acuerdo || !this.acuerdo.titulo || this.acuerdo.titulo.trim().length==0)
				return "has-errors";
			return "";
		}
		
		this.save  = function(){
			this.quitarhk(this.acuerdo);
			
			if(this.validarAcuerdo()==1){

				var alertPopup = $ionicPopup.alert({
     				title: 'Error',
     				template: 'Titulo Invalido'
   				});
   				return;
			}
			
			if(this.acuerdoId){
				delete this.acuerdo._id
				if(this.acuerdo.fechaLimite != this.fechaLimite){
					if(this.acuerdo.bitacora.length < 2){
						rc.acuerdo.bitacora.push({nombre : "modificación", fecha : new Date(), fechaAnterior : rc.fechaLimite});					
					}else{
						var alertPopup = $ionicPopup.alert({
					     title: 'Aviso!',
					     template: 'No puede '
					   });
					}
					
				}
				Acuerdos.update({_id:this.acuerdoId},{$set:this.acuerdo});
			}
			else{
				
				rc.acuerdo.createdAt = new Date();
  				rc.acuerdo.owner = Meteor.userId();
  				rc.acuerdo.username = Meteor.user().username;

  				Acuerdos.insert(rc.acuerdo);
  				if(rc.acuerdo.calendario)
      				this.saveDate()
			}

			Categorias.update({_id:this.acuerdo.categoria_id},{$set:{temas:this.acuerdo.temas}})
			
			this.sendNotification(rc.acuerdo);
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

		this.cambioCategoria = function(){
			console.log("Cambio Categoria")
			var cat = Categorias.findOne(this.acuerdo.categoria_id);
			console.log(this.acuerdo.categoria_id)
			console.log(cat )
			//console.log(cat);
			//if(!this.reunion.temas)
			this.acuerdo.temas = cat.temas;
		}

		this.agregarCategoria = function(){
			this.categoria ={};
			console.log("agregarCategoria");
			var popupCategoria = $ionicPopup.show({
				template:'<ul class="list list-inset"><label class="item item-input"><span class="input-label">Nombre</span><input type="text" ng-model="nac.categoria.nombre"></label></ul>',
				title: 'Nueva Categoria',
				scope: $scope,
				buttons: [
			      { text: 'Cancel' },
			      {
			        text: '<b>Save</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			        	console.log(rc.categoria)
			        	//if(!rc.reunion.temas)
			          		rc.categoria.temas=[]
			          	//else 
			          	//	rc.categoria.temas=rc.reunion.temas

			          	rc.categoria.owner=Meteor.userId();
			          	var x = Categorias.insert(rc.categoria)
			          	rc.acuerdo.categoria_id=x;
			          	rc.cambioCategoria();
			          	//console.log(x)
			        }
			      }
			    ]
			});
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
	    $scope.modal = modal;
	  });
	  
	  this.selSeguidores = function() {
	    $scope.modal.show();
	  };
	  
	  this.cerrarModalSeguidores = function() {
	    $scope.modal.hide();
	  };

	  this.aumentarFin = function (fechaInicio) {
	  	if(this.acuerdo.fechaLimite && fechaInicio>this.acuerdo.fechaLimite)
	  			this.reunion.fechaLimite = new Date(fechaInicio.getTime());
	  };

	  this.disminuirIncio = function (fechaLimite) {
	  	if(this.reunion.fechaInicio>fechaLimite)
	  			this.reunion.fechaInicio = new Date(fechaLimite.getTime());
	  };


});