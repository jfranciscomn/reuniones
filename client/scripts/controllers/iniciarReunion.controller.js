angular
	.module('FLOKsports')
	.controller('IniciarReunionCtrl', function NuevaReunionCtrl($scope, $sce, $reactive, $state, $stateParams, $ionicPopup, 
			$ionicHistory, $ionicModal, $ionicActionSheet, $timeout, $cordovaEmailComposer, $cordovaCapture, $cordovaFile, $interval) {

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
		this.verBarraInformacion = true;
		this.verTitulo = true;
		this.time = Date.now();
		this.timeStopr = false;
        //chronoService.addTimer('myTimer', { interval: 500 });
        //chronoService.start();
		
		this.fotos = [];
		this.audios = [];
		this.videos = [];
		this.links =[];

		this.subscribe('acuerdos',()=>{
			return [{categoria_id : this.getReactively("reunion.categoria_id"), estatus : 1}]
		});

		this.subscribe('AllReuniones',()=>{
			return [{}]
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

		rc.autoSave= $interval(function(){
			console.log("autoSave")
			rc.guardar()
		},30000)
		
 
		$scope.$on("$ionicView.leave", function(event, data){
		   // handle event
		   $interval.cancel(rc.segundero);
		   $interval.cancel(rc.autoSave);
		   //console.log("ya me sali");
		});
		this.formatoStr=function(s){
			var segundos = s%60;
			var minutos = Math.floor(s/60)%60
			var horas = Math.floor(s/3600)

			if(segundos<10)
				segundos ='0'+segundos;
			if(minutos<10)
				minutos = '0'+ minutos;
			if (horas<10)
				horas = '0'+horas;

			return horas+':'+minutos+':'+segundos;
		}
		this.stopTimerr=function(){
			if(this.timeStopr){
				//$scope.$broadcast('timer-stop');
				rc.segundero = $interval(function(){rc.reunion.segundos=rc.reunion.segundos+1; rc.segundos++; console.log("a",rc.reunion.segundos)}, 1000);
				this.timeStopr =false;
			}
			else{
				$interval.cancel(rc.segundero);
				this.timeStopr= true;

			}
			
			
		}
		this.helpers({
			registrados : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			},
			categoria : function() {
				return Categorias.findOne(this.getReactively("reunion.categoria_id"));
			},
			miReunion : function() {
				console.log(Reuniones.findOne($stateParams.reunionId))
				return Reuniones.findOne($stateParams.reunionId);
			},
			reuniones : function () {
				return Reuniones.find({owner:Meteor.userId()},{sort: {horaInicio: 1}})
			},
			medios:function(){
				return Medios.find({reunion_id:$stateParams.reunionId}); 
			},
			reunion : function() {
				//myVar = setInterval(function, milliseconds);
				if(!rc.miReunion.segundos){
					rc.miReunion.segundos = 0;
					rc.segundos=0;
				}
				else{
					rc.segundos=rc.miReunion.segundos;
				}
				if(rc.segundero)
				{
					console.log("borre");
					$interval.cancel(rc.segundero);
					rc.segundero= undefined;
				}
				if(!rc.segundero && rc.timeStopr==false)
					rc.segundero = $interval(function(){rc.reunion.segundos=rc.reunion.segundos+1; rc.segundos++; console.log("a",rc.reunion.segundos)}, 1000);
				

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
						//console.log(rc.miReunion.temas);
						if(rc.miReunion.temas != undefined){
						//	var todosTemas = rc.miReunion.temas.split(', ');
							rc.miReunion.todosTemas = [];
							_.each(rc.miReunion.temas, function(tema){
								rc.miReunion.todosTemas.push({
									nombre : tema.text,
									seleccionado : false
								})
							})
						}						
					}
				}
				rc.miReunion.categoria = Categorias.findOne(rc.miReunion.categoria_id);
					
				return rc.miReunion;
			},
			acuerdosRetrasados : function() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				return Acuerdos.find({fechaInicio : { $lt : new Date(fechaInicio) }});
			},
			acuerdos : function() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				return Acuerdos.find({fechaInicio : { $gte : new Date(fechaInicio)}});
			},
			registrados : function() {
				return Meteor.users.find({},{},{ sort : { "profile.name" : 1 }}).fetch();
			}
		});
		
		this.getAnterior= function(){
			var anterior = null;
			var x=null;


			_.each(rc.reuniones, function(reun, index){
				//console.log(reun._id,rc.reunion._id)
				if(reun._id===rc.reunion._id){
					x = anterior;
					//console.log("uno",x)
				}
				anterior=reun;
			});
			return x;
		}

		this.getSiguiente= function(){
			var anterior = {};
			var x=null;


			_.each(rc.reuniones, function(reun, index){
				//console.log(reun._id,rc.reunion._id)
				if(anterior._id===rc.reunion._id){
					x = reun;
					//console.log("uno",x)
				}
				anterior=reun;
			});
			return x;
		}
		this.reunionSiguiente= function () {
			var confirmPopup = $ionicPopup.confirm({
    			title: 'Reunion Siguiente',
    			template: '¿Usted esta seguro que desea ir a la reunion siguiente?',
    			cancelText: 'No',
    			okText: 'Si'
   			});

   			

			confirmPopup.then(function(res) {
				if(res) {
					var siguiente = rc.getSiguiente();

					var confirmSavePopup = $ionicPopup.confirm({
		    			title: 'Guardar',
		    			template: '¿Desea guardar los cambios realizados?',
		    			cancelText: 'No',
		    			okText: 'Si'
		   			});

					confirmSavePopup.then(function(resSave) {
						if(resSave){
							rc.guardar();
						}
						$state.go("app.iniciarReunionIpad", {reunionId : siguiente._id});
					});

					
				} else {
				//console.log('You are not sure');
				}
			});	
		}
		
		this.reunionAnterior= function () {
			var confirmPopup = $ionicPopup.confirm({
  			title: 'Reunion Anterior',
  			template: '¿Usted esta seguro que desea ir a la reunion anterior?',
  			cancelText: 'No',
  			okText: 'Si'
 			});
   			
			confirmPopup.then(function(res) {
				if(res) {
					var anterior = rc.getAnterior();

					var confirmSavePopup = $ionicPopup.confirm({
		    			title: 'Guardar',
		    			template: '¿Desea guardar los cambios realizados?',
		    			cancelText: 'No',
		    			okText: 'Si'
		   			});

					confirmSavePopup.then(function(resSave) {
						if(resSave){
							rc.guardar();
						}
						$state.go("app.iniciarReunionIpad", {reunionId : anterior._id});
					});

					
				} else {
				//console.log('You are not sure');
				}
			});	
		}
		
		this.planearSiguienteReunion = function(reunion) {
			$state.go("app.siguienteReunion", {reunionId : reunion._id, siguiente : true});
		}


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
		this.trustSrc = function(src) {
		    return $sce.trustAsResourceUrl(src);
		  }

		
		this.eliminar = function(reunion){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Eliminar reunión',
				template: 'Está seguro que quiere eliminar de la reunión?',
				buttons: [
		      { text: 'Cancelar' },
		      {
		        text: '<b>Eliminar</b>',
		        type: 'button-positive',
		        onTap: function(e) {
			        Reuniones.update(reunion._id, {$set : {estatus : 5}})
		          $ionicHistory.goBack(-2);
		        }
		      }
		    ]
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
	        	//console.log("canceló");
		      },
					buttonClicked: function(index) {
						if(index == 0){
							//Si Agrega acción
							
						}else if(index == 1){
							//Si Agrega a notas
							rc.reunion.notas += "\n " + participante.invitado.profile.name + " (" + participante.invitado.profile.email + ")";
						}else if(index == 2){
							//Si excluyes de la reunión
							//console.log("index", index);
							//console.log("participante", participante);
							_.each(rc.reunion.users, function(parti, index){
								if(participante.user == parti.user){
									rc.reunion.users.splice(index, 1);
								}								
							});
							rc.reunion.users.splice(index, 1);
						}
						//console.log(index);
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
		this.notaVoz = function(){

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
			       //console.log(path,filename)
			   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
					        console.log('success');

					         Medios.insert({reunion_id : rc.reunion._id,tipo: "audio", data : success });
					      }, function (error) {
					      	console.log(error);
					      });
			   		
			       // console.log(audioData);
			    }
		      
		    }, function(err) {
		      // An error occurred. Show a message to the user
		     //console.log("error audio", err);
		    });
		}
		//Action Sheet Medios
		this.mostrarMedios = function(participante) {
	   	var hideSheet = $ionicActionSheet.show({
		    buttons: [
						{ text: 'Foto' },
						{ text: 'Audio' },
						{ text: 'Video' },
						{ text: 'Links'}
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
							    //console.log("foto");
							    
							    for (i = 0, len = imageData.length; i < len; i += 1) {
							        path = imageData[i].fullPath; 
							        var reader  = new FileReader();
							        var archivo=imageData[i];
							        var path=archivo.fullPath.split('/');
							        var filename= path.pop();
							        path = 'file:///'+path.join('/');
							        //console.log(path,filename)
							   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
									        //console.log('success');
									       
									        Medios.insert({reunion_id : rc.reunion._id,tipo: "foto", data : success });
									      }, function (error) {
									      	//console.log(error);
									      });
							   		
							        //console.log(imageData);
							    }
							    
						      // Success! Image data is here
						    }, function(err) {
						      // An error occurred. Show a message to the user
						      //console.log("error image", err); 
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
							       //console.log(path,filename)
							   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
									        console.log('success');

									         Medios.insert({reunion_id : rc.reunion._id,tipo: "audio", data : success });
									      }, function (error) {
									      	console.log(error);
									      });
							   		
							       // console.log(audioData);
							    }
						      
						    }, function(err) {
						      // An error occurred. Show a message to the user
						     //console.log("error audio", err);
						    });
							
						}else if(index == 2){
							//Si Agrega Video 
						    var options = { limit: 3, type:'video/3gpp'};
						
						    $cordovaCapture.captureVideo(options).then(function(videoData) {
							    var i, path, len;
							    for (i = 0, len = videoData.length; i < len; i += 1) {
							        path = videoData[i].fullPath; 
							        var reader  = new FileReader();
							        var archivo=videoData[i];
							        var path=archivo.fullPath.split('/');
							        var filename= path.pop();
							        path = 'file:///'+path.join('/');
							        //console.log(path,filename)
							   		$cordovaFile.readAsDataURL(path,filename).then(function (success) {
									       // console.log('success');

									        Medios.insert({reunion_id : rc.reunion._id,tipo: "video", data : success });
									      }, function (error) {
									      	console.log(error);
									      });
							   		
							      //  console.log(videoData);
							    }
						    }, function(err) {
						      // An error occurred. Show a message to the user
						      console.log("error video", err);
						    });
						}
						else if(index == 3){
							var popupCategoria = $ionicPopup.show({
								template:'<ul class="list list-inset"><label class="item item-input"><span class="input-label">link</span><input type="text" ng-model="irc.link"></label></ul>',
								title: 'Agregar',
								scope: $scope,
								buttons: [
							      { text: 'Cancel' },
							      {
							        text: '<b>Save</b>',
							        type: 'button-positive',
							        onTap: function(e) {
							        	console.log(rc.link)
							        	Medios.insert({reunion_id : rc.reunion._id,tipo: "link", data : rc.link });
							          	
							        }
							      }
							    ]
							});
						}
						//console.log(index);
						return true;
					}
					
	   	});
		};
		
		//Tomar Asistencia
		this.asistencia = function(participante){
			//console.log("asistio", participante);
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
						//console.log("index", index);
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
				//console.log(index, "registrado", registrado);
				_.each(rc.reunion.users, function(invitado, indexInvitado){
					//console.log(indexInvitado, "invitado", invitado)
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
		  }else if(medio.tipo == "link"){
			  _.each(rc.medios, function(medio){
				  if(medio.tipo == "link"){
					  rc.links.push(medio);
				  }
			  });
			  $scope.modalVideo.show();
		  }
	  }
	  
	  this.enviarEmail = function(){
	  		var correos = [];
	  		var nombrePaticipantes =[];
	  		console.log("enviar Email")
	  		for (userid in  this.reunion.users){
	  			var participante = this.reunion.users[userid];
	  			correos.push(participante.invitado.profile.email);
	  			nombrePaticipantes.push(participante.invitado.profile.nombre);
	  		}
	  		var temas = _.reduce( this.reunion.temas, function(memo, num){ return memo + ';' + num.text; }, "");

	  		var acuerdos = "";

	  		var tabla=`

				        <table order="1" cellspacing="0" cellpadding="0" width="100%" style="background-color:rgb(251,236,181);border-collapse:collapse;border:none;background-position:initial initial;background-repeat:initial initial">
					      <tbody>
					        <tr>
					          <td colspan="4" style="text-align:center;font-size:24pt;border:1.5pt solid black;padding:0.75pt" >
					            Minuta de reunión
					          </td>
					        </tr>
					        <tr>
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Reunion
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					            `+this.reunion.titulo+`
					          </td >
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Fecha
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					          	 `+this.reunion.fecha+`
					          </td >
					        </tr>
					        <tr>
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Lugar
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					            `+this.reunion.ubicacion+`
					          </td >
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Organizador
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					            `+this.reunion.owner+`
					          </td >
					        </tr>
					        <tr>
					          <td rowspan="3" width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Participantes
					          </td>
					          <td rowspan="3" width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					            
					          </td >
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Duracion
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					           
					          </td >
					        </tr>
					        <tr>
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Categoria
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					          </td >
					        </tr>
					        <tr>
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Tema
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					          </td >
					        </tr>
					        <tr>
					          <td width="10%" style="border:1.5pt solid black;padding:0.75pt">
					            Siguiente Reunion
					          </td>
					          <td width="40%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					            
					          </td >
					          <td colspan="2"  width="50%" style="border:1.5pt solid black;padding:0.75pt">
					           
					          </td>
					        </tr>
					        <tr>
					          <td colspan="4" width="100%" style="border:1.5pt solid black;padding:0.75pt">
					            Notas
					          </td>
					        </tr>
					        <tr>
					          <td colspan="4" width="100%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
					          asd
					          </td >
					        </tr>
					        <tr>
					          <td colspan="4" width="100%" style="border:1.5pt solid black;padding:0.75pt;text-align:center">
					            Seguimiento de acuerdos de la reunión anterior
					          </td>
					        </tr>
				        <tr>
				          <td colspan="4" width="100%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
				            <table width="100%"  style="background-color:rgb(251,236,181);border-collapse:collapse;border:none;background-position:initial initial;background-repeat:initial initial">
				              <tr>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Tema
				                </td>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Acuerdo
				                </td>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Descripcion
				                </td>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Responsable
				                </td>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Fecha Limite
				                </td>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Estatus
				                </td>
				                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				                  Nota
				                </td>
				              </tr>`;		

			_.each(rc.acuerdosRetrasados,function(_acuerdo){
				var trAcuerdo =`<tr>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_.reduce(_acuerdo.temas,function(memo,tema){return memo+tema.text+";"},"")+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.titulo+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.descripcion+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  Responsable
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.fechaLimite+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.estatus+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  
			                </td>
			              </tr>`
			   tabla = tabla + trAcuerdo

			});
			tabla = tabla + `</table>
						          </td>
						        </tr>
						        <tr>
						          <td colspan="4" width="100%" style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						            Acuerdos
						          </td>
						        </tr>
						        <tr>
						          <td colspan="4" width="100%" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
						            <table width="100%"  style="background-color:rgb(251,236,181);border-collapse:collapse;border:none;background-position:initial initial;background-repeat:initial initial">
						              <tr>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Tema
						                </td>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Acuerdo
						                </td>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Descripcion
						                </td>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Responsable
						                </td>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Fecha Limite
						                </td>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Estatus
						                </td>
						                <td   style="border:1.5pt solid black;padding:0.75pt;text-align:center">
						                  Nota
						                </td>
						              </tr>`;
			_.each(rc.acuerdos,function(_acuerdo){
				var trAcuerdo =`<tr>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_.reduce(_acuerdo.temas,function(memo,tema){return memo+tema.text+";"},"")+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.titulo+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.descripcion+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  Responsable
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.fechaLimite+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  `+_acuerdo.estatus+`
			                </td>
			                <td   style="border:1.5pt solid black;padding:0.75pt;background-color:white">
			                  
			                </td>
			              </tr>`
			   tabla = tabla + trAcuerdo

			});

			tabla = tabla +`</table>
				          </td>
				        </tr>
				        <tr>
				          <td colspan="2" style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				            Participantes
				          </td>
				          <td colspan="2" style="border:1.5pt solid black;padding:0.75pt;text-align:center">
				            Firmas
				          </td>
				        </tr>
				        <tr>
				          <td colspan="2" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
				            Participantes
				          </td>
				          <td colspan="2" style="border:1.5pt solid black;padding:0.75pt;background-color:white">
				            Firmas
				          </td>
				        </tr>
				      </tbody>
				    </table>
				  `;
		

	  		console.log(tabla)

	  		/*$cordovaEmailComposer.isAvailable().then(function() {
			   console.log("esta disponible");
			 }, function () {
			   console.log("no está disponible");
			 });
			
			  var email = {
			    to: correos,
			    subject: 'Reunion: '+this.reunion.titulo,
			    body: tabla,
			    isHtml: true
			  };
			
			 $cordovaEmailComposer.open(email).then(null, function () {
			   console.log("cancelado")
			 });*/
	  }
	  this.finalizar = function() {
		  var tempId = rc.reunion._id;
			delete rc.reunion._id;
			//rc.reunion.estatus = 6;
		  this.quitarhk(rc.reunion)
		  //Reuniones.update({_id : tempId},{ $set : rc.reunion });
		  rc.reunion._id = tempId;
			this.enviarEmail()
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

