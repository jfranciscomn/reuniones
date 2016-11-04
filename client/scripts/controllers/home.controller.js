angular
  .module('FLOKsports')
  .controller('HomeCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
		
		this.helpers({
			acuerdos() {
				return Acuerdos.find();
			},
			acuerdosVencidos() {
				return Acuerdos.find({users:{ $elemMatch: {user:Meteor.userId()}},fecha : {$lt : new Date() }}).count();
			},
			acuerdosHoy() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				var fechaFin = (hoy.getMonth()+1) + "/" + hoy.getDate()  + "/" +  hoy.getFullYear() + " " + "23:59:59";
				return Acuerdos.find({users:{ $elemMatch: {user:Meteor.userId()}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }}).count();
			},
			acuerdosSemana() {
				var hoy = new Date;
				var inicio = hoy.getDate() - hoy.getDay();
				var fin = inicio + 6;
				
				var primerDia = new Date(hoy.setDate(inicio));
				var ultimoDia = new Date(hoy.setDate(fin));
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + primerDia.getDate() + "/" +  primerDia.getFullYear();
				var fechaFin = (ultimoDia.getMonth()+1) + "/" + ultimoDia.getDate()  + "/" +  ultimoDia.getFullYear() + " " + "23:59:59";
				
				return Acuerdos.find({users:{ $elemMatch: {user:Meteor.userId()}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }}).count();
			},
			acuerdosMes() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				var primerDia = new Date(y, m, 1);
				var ultimoDia = new Date(y, m + 1, 0);
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + primerDia.getDate() + "/" +  primerDia.getFullYear();
				var fechaFin = (ultimoDia.getMonth()+1) + "/" + ultimoDia.getDate()  + "/" +  ultimoDia.getFullYear() + " " + "23:59:59";
				
				return Acuerdos.find({users:{ $elemMatch: {user:Meteor.userId()}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }}).count();
			},
			acuerdosFuturos() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				return Acuerdos.find({users:{ $elemMatch: {user:Meteor.userId()}},fecha : { $gt: new Date(y,m + 1, 0)}}).count();
			},
			
			reuniones() {
				return Reuniones.find();
			},
			reunionesVencidos() {
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : {$lt : new Date() }}).count();
			},
			reunionesHoy() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				var fechaFin = (hoy.getMonth()+1) + "/" + hoy.getDate()  + "/" +  hoy.getFullYear() + " " + "23:59:59";
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }}).count();
			},
			reunionesSemana() {
				var hoy = new Date;
				var inicio = hoy.getDate() - hoy.getDay();
				var fin = inicio + 6;
				
				var primerDia = new Date(hoy.setDate(inicio));
				var ultimoDia = new Date(hoy.setDate(fin));
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + primerDia.getDate() + "/" +  primerDia.getFullYear();
				var fechaFin = (ultimoDia.getMonth()+1) + "/" + ultimoDia.getDate()  + "/" +  ultimoDia.getFullYear() + " " + "23:59:59";
				
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }}).count();
			},
			reunionesMes() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				var primerDia = new Date(y, m, 1);
				var ultimoDia = new Date(y, m + 1, 0);
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + primerDia.getDate() + "/" +  primerDia.getFullYear();
				var fechaFin = (ultimoDia.getMonth()+1) + "/" + ultimoDia.getDate()  + "/" +  ultimoDia.getFullYear() + " " + "23:59:59";
				
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }}).count();
			},
			reunionesFuturos() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gt: new Date(y,m + 1, 0)}}).count();
			},
			reunionesPorConfirmar() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 1}}}).count();
			}
			
		});
	
		this.doRefresh = function(){
			alert("hola");
		}
});