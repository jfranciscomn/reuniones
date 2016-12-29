angular
	.module('FLOKsports')
	.controller('IniciarReunionCtrl', function NuevaReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, 
			$ionicHistory, $ionicModal, $ionicActionSheet, $timeout, $cordovaEmailComposer, $cordovaCapture, $cordovaFile) {


		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.reunion = {};
		this.buscar = "";
		this.opcion = {};
		this.opcion.participantes = [];
		this.registrados = "";
		this.miReunion = {};
		this.verResponsables = false;
		this.verGenerales = false;
		this.verTemas = false;
		this.verBarra = true;
		
		this.fotos = [];
		this.audios = [];
		this.videos = [];

		this.subscribe('AllAcuerdos',()=>{
			return [{}]
		});

		this.subscribe('reuniones',()=>{
			return [{reunionId:$stateParams.reunionId}]
		});
		this.subscribe('medios',()=>{
			return [{reunionId:$stateParams.reunionId}]
		});
		this.subscribe('AllCategorias',()=>{
			return [{}]
		});
		this.subscribe('usuarios',()=>{
			return [{}]
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
			categoria : function() {
				return Categorias.findOne(this.getReactively("reunion.categoria_id"));
			},
			miReunion : function() {
				return Reuniones.findOne($stateParams.reunionId);
			},
			medios:function(){
				return Medios.find({reunion_id:$stateParams.reunionId}); 
			},
			reunion : function() {
				if(rc.miReunion.todosTemas == undefined){
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
						
						rc.miReunion.fechaIniciada = (rc.miReunion.fechaIniciada == undefined) ? new Date() : rc.miReunion.fechaIniciada;
						 
						//Poder agregar notas a la reunión						
						if(rc.miReunion.notas == undefined)
							rc.miReunion.notas = "";
						
						//Podeer hacerla favorita
						if(rc.esFavorita == undefined)
							rc.esFavorita = false;
							
						//Ver los temas como un listado con posibilidad de ser seleccionado.
						var todosTemas = rc.miReunion.temas.split(', ');
						rc.miReunion.todosTemas = [];
						_.each(todosTemas, function(tema){
							rc.miReunion.todosTemas.push({
								nombre : tema,
								seleccionado : false
							})
						})
					}
				}
				/*if(rc.miReunion.medios == undefined)
					rc.miReunion.medios = [];
				*/	

				rc.miReunion.categoria = Categorias.findOne(rc.miReunion.categoria_id);
					

				return rc.miReunion;
			},
			acuerdos : function() {
				return Acuerdos.find({reunion_id : $stateParams.reunionId});
			},
			registrados : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			},
		});
		
		if(this.getReactively("reunion")){
			_.each(rc.registrados, function(registrado, index){
				if(registrado._id == rc.reunion.owner){
					rc.registrados.splice(index, 1);
				}
				_.each(rc.reunion.users, function(invitado){
					if(registrado._id == invitado.user){
						registrado.estatus = invitado.estatus;
					}
				})
			});
		}
		
		this.selHoraInicioReal = function(){
			var myPopup = $ionicPopup.show({
		    template: '<div class="item" date ion-datetime-picker ng-model="irc.reunion.fechaIniciada" button-ok="Aceptar" button-cancel="Cancelar" monday-first title="Fecha"></div>',
		    title: 'Hora de Inicio Real',
		    subTitle: 'Por favor indique la hora de inicio de la reunión',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancelar' },
		      {
		        text: '<b>Guardar</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          console.log("fecha Iniciada", rc.reunion.fechaIniciada);
		        }
		      }
		    ]
		  });
		
		  myPopup.then(function(res) {
		    console.log('Tapped!', res);
		  });
		}
		
		this.cerrar = function(){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Salir de la reunión',
				template: 'Está seguro que quiere salir de la reunión?',
				buttons: [
		      { text: 'Cancelar' },
		      {
		        text: '<b>Ok</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          $ionicHistory.goBack();
		        }
		      }
		    ]
			});
		}
		
		this.siguiente = function(reunion){
			
		}
		
		this.atras = function(reunion){
			
		}
			
		//Action Sheet Participantes
		this.mostrarOpcionesParticipantes = function(participante, index) {
	   	var hideSheet = $ionicActionSheet.show({
		    buttons: [
						{ text: 'Agregar Acción' },
						{ text: 'Agregar a Notas' },
						{ text: 'Excluir de la reunión' }
					],
					destructiveText: (participante.asistio == false ) ? 'Asistió' : 'Faltó',
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
						}else if(index == 2){
							//Si excluyes de la reunión
							console.log("index", index);
							console.log("participante", participante);
							_.each(rc.reunion.users, function(parti, index){
								if(participante.user == parti.user){
									rc.reunion.users.splice(index, 1);
								}								
							});
							rc.reunion.users.splice(index, 1);
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
						    var options = { limit: 3, allowEdit: true, quality: 25, height:512, width:512}; 
						
						    $cordovaCapture.captureImage(options).then(function(imageData) {
							    var i, path, len;
							    console.log("foto");
							    
							    for (i = 0, len = imageData.length; i < len; i += 1) {
							        path = imageData[i].fullPath; 
							        var reader  = new FileReader();
							        var archivo=imageData[i];
							        var path=archivo.fullPath.split('/');
							        var filename= path.pop();
							        path = 'file:///'+path.join('/');
							        console.log(path,filename)
							   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
									        console.log('success');
									       
									        Medios.insert({reunion_id : rc.reunion._id,tipo: "foto", data : success });
									      }, function (error) {
									      	console.log(error);
									      });
							   		
							        console.log(imageData);
							    }
							    
						      // Success! Image data is here
						    }, function(err) {
						      // An error occurred. Show a message to the user
						      console.log("error image", err); 
						    });
							
						}else if(index == 1){
							console.log("audio");
							//Si Agrega Audio
						    var options = { limit: 3, duration: 10 };
						
						    $cordovaCapture.captureAudio(options).then(function(audioData) {
						      var i, path, len;
							    for (i = 0, len = audioData.length; i < len; i += 1) {
							        path = audioData[i].fullPath; 
							        var reader  = new FileReader();
							        var archivo=audioData[i];
							        var path=archivo.fullPath.split('/');
							        var filename= path.pop();
							        path = 'file:///'+path.join('/');
							        console.log(path,filename)
							   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
									        console.log('success');

									         Medios.insert({reunion_id : rc.reunion._id,tipo: "audio", data : success });
									      }, function (error) {
									      	console.log(error);
									      });
							   		
							        console.log(audioData);
							    }
						      
						    }, function(err) {
						      // An error occurred. Show a message to the user
						      console.log("error audio", err);
						    });
							
						}else if(index == 2){
							//Si Agrega Video 
						    var options = { limit: 3, duration: 15 };
						
						    $cordovaCapture.captureVideo(options).then(function(videoData) {
							    var i, path, len;
							    for (i = 0, len = videoData.length; i < len; i += 1) {
							        path = videoData[i].fullPath; 
							        var reader  = new FileReader();
							        var archivo=videoData[i];
							        var path=archivo.fullPath.split('/');
							        var filename= path.pop();
							        path = 'file:///'+path.join('/');
							        console.log(path,filename)
							   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
									        console.log('success');

									        Medios.insert({reunion_id : rc.reunion._id,tipo: "video", data : success });
									      }, function (error) {
									      	console.log(error);
									      });
							   		
							        console.log(videoData);
							    }
						    }, function(err) {
						      // An error occurred. Show a message to the user
						      console.log("error video", err);
						    });
						}
						console.log(index);
						return true;
					}
	   	});
		};
		
		//Tomar Asistencia
		this.asistencia = function(participante){
			console.log("asistio", participante);
			if(participante.asistio == false){
				participante.asistio = true;
			}				
			else if(participante.asistio == true){
				participante.asistio = false;
			}
		}
		
		//Expandir TEXTAREA mientras escribe
	 	this.expandText = function(){
			var element = document.getElementById("notas");
			element.style.height =  element.scrollHeight + "px";
		}
		
		//Mostrar la duración de la reunión
		this.tiempoTranscurrido = function(){
			return duration.humanize()
		}
		
		//Agregar participantes a las notas
		this.agregarParticipanteNotas = function(participante){
			rc.reunion.notas += "\n" + participante.invitado.profile.name + " (" + participante.invitado.profile.email + ")\n";
		}
		
		//Agregar temas a las notas
		this.agregarTemaNotas = function(tema){
			rc.reunion.notas += "\n" + tema.nombre + "\n";
			_.each(rc.reunion.todosTemas, function(t){
				t.seleccionado = false;
			})
			tema.seleccionado = true;
		}
		
		//Agregar participante
		this.agregarParticipante = function(participante, $index){
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
				if(Meteor.userId() == registrado._id){
					rc.registrados.splice(index, 1);
				}
			}
		}
		
		//Modal de participantes
		$ionicModal.fromTemplateUrl('client/templates/participantes/modalAgregarParticipantes.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  
	  //Mostrar modal para seleccionar participantes
	  this.selParticipantes = function() {
		  _.each(rc.registrados, function(registrado, index){
				console.log(index, "registrado", registrado);
				_.each(rc.reunion.users, function(invitado, indexInvitado){
					console.log(indexInvitado, "invitado", invitado)
					if(registrado._id == invitado.user){
						registrado.invitado = true;
						registrado.estatus = invitado.estatus;
					}
				})
				if(Meteor.userId() == registrado._id){
					rc.registrados.splice(index, 1);
				}
				$scope.modal.show();
	  	});
	  }
	  
	  //Cerrar modal para participantes
	  this.cerrarModalParticipantes = function() {
	    $scope.modal.hide();
	  };
	  
	  //Hacer la reunión favorita para obtener los temas, participantes, ubicación y convocante
	  this.esFavorita = function() {
		  rc.reunion.esFavorita = !rc.reunion.esFavorita;
	  }
	  
	  this.guardar = function() {
		  var tempId = rc.reunion._id;
			delete rc.reunion._id;
		  this.quitarhk(rc.reunion)
		  Reuniones.update({_id : tempId},{ $set : rc.reunion });
		  rc.reunion._id = tempId;
			//$ionicHistory.goBack();
	  }
	  
	  this.reproducir = function(medio){
		  if(medio.tipo == "foto"){
			  _.each(rc.medios, function(medio){
				  if(medio.tipo == "foto"){
					  rc.fotos.push(medio);
				  }
			  });
			  $scope.modalFoto.show();
		  }else if(medio.tipo == "audio"){
			  _.each(rc.medios, function(medio){
				  if(medio.tipo == "audio"){
					  rc.audios.push(medio);
				  }
			  });
			  $scope.modalAudio.show();
		  }else if(medio.tipo == "video"){
			  _.each(rc.medios, function(medio){
				  if(medio.tipo == "video"){
					  rc.videos.push(medio);
				  }
			  });
			  $scope.modalVideo.show();
		  }
	  }
	  
	  this.finalizar = function() {
		  var tempId = rc.reunion._id;
			delete rc.reunion._id;
			//rc.reunion.estatus = 6;
		  this.quitarhk(rc.reunion)
		  //Reuniones.update({_id : tempId},{ $set : rc.reunion });
		  rc.reunion._id = tempId;
			$cordovaEmailComposer.isAvailable().then(function() {
			   console.log("esta disponible");
			 }, function () {
			   console.log("no está disponible");
			 });
			
			  var email = {
			    to: 'max@mustermann.de',
			    cc: 'erika@mustermann.de',
			    bcc: ['john@doe.com', 'jane@doe.com'],
			    subject: 'Cordova Icons',
			    body: 'How are you? Nice greetings from Leipzig',
			    isHtml: true
			  };
			
			 $cordovaEmailComposer.open(email).then(null, function () {
			   console.log("cancelado")
			 });
			$ionicHistory.goBack();
	  }
	  
	  //Modales para reproducir
	  $ionicModal.fromTemplateUrl('client/templates/reuniones/reproducirFoto.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modalFoto = modal;
		});
		
		$ionicModal.fromTemplateUrl('client/templates/reuniones/reproducirAudio.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modalAudio= modal;
		});
		
		$ionicModal.fromTemplateUrl('client/templates/reuniones/reproducirVideo.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modalVideo = modal;
		});
		
		this.cerrarModalFoto = function() {
	    $scope.modalFoto.hide();
	  };
	  
	  this.cerrarModalAudio = function() {
	    $scope.modalAudio.hide();
	  };
	  
	  this.cerrarModalVideo= function() {
	    $scope.modalVideo.hide();
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

