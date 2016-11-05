angular
  .module('FLOKsports')
  .controller('ReunionesCtrl', function ReunionesCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.deviceWidth = $(".menuSuperior").width();
		this.listCanSwipe = true;
		this.fhoy = true;
		this.fsemana = true;
		this.fmes = true;
		this.ffuturo = true;
		this.fvencidas = true;
		this.helpers({
			reuniones() {
				return Reuniones.find({users:{ $elemMatch: {user : Meteor.userId(), estatus : 2} }});
			},
			vencidas() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $lt : new Date(fechaInicio) }});
			},
			hoy() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				var fechaFin = (hoy.getMonth()+1) + "/" + hoy.getDate()  + "/" +  hoy.getFullYear() + " " + "23:59:59";
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }});
			},
			semana() {
				var hoy = new Date;
				var inicio = hoy.getDate() - hoy.getDay(); // First day is the day of the month - the day of the week
				var fin = inicio + 6; // last day is the first day + 6
				
				var primerDia = new Date(hoy.setDate(inicio));
				var ultimoDia = new Date(hoy.setDate(fin));
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + (primerDia.getDate()+1) + "/" +  primerDia.getFullYear();
				var fechaFin = moment(fechaInicio).add(5,'d').toDate();

				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }});
			},
			mes() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				var primerDia = new Date(y, m, 1);
				var ultimoDia = new Date(y, m + 1, 0);
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + primerDia.getDate() + "/" +  primerDia.getFullYear();
				var fechaFin = (ultimoDia.getMonth()+1) + "/" + ultimoDia.getDate()  + "/" +  ultimoDia.getFullYear() + " " + "23:59:59";
				
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }});
			},
			futuro() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gt: new Date(y,m + 1, 0)}});
			}
		});
		
		this.cambiarFiltro = function(tipo){
			if(tipo == "hoy"){
				rc.fhoy = true;
				rc.fsemana = false;
				rc.fmes = false;
				rc.ffuturo = false;
			}else if(tipo == "semana"){
				rc.fhoy = false;
				rc.fsemana = true;
				rc.fmes = false;
				rc.ffuturo = false;
			}else if(tipo == "mes"){
				rc.fhoy = false;
				rc.fsemana = false;
				rc.fmes = true;
				rc.ffuturo = false;
			}else if(tipo == "futuro"){
				rc.fhoy = false;
				rc.fsemana = false;
				rc.fmes = false;
				rc.ffuturo = true;
			}else if(tipo == "todas"){
				rc.fhoy = true;
				rc.fsemana = true;
				rc.fmes = true;
				rc.ffuturo = true;
			}
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
		
		this.detalleReunion = function(reunion){
			if(reunion.owner == Meteor.userId()){
				$state.go("app.editarReunion", {reunionId : reunion._id});
			}else{
				$state.go("app.verReunion", {reunionId : reunion._id});
			}
		}
});