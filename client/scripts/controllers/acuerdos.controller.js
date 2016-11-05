angular
  .module('FLOKsports')
  .controller('AcuerdosCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.deviceWidth = $(".menuSuperior").width();
		this.listCanSwipe = true;
		this.fhoy = true;
		this.fsemana = true;
		this.fmes = true;
		this.ffuturo = true;
		this.fvencidos = true;		
		this.helpers({
			acuerdos() {
				var acuerdos = Acuerdos.find({responsables:{ $elemMatch: {user:Meteor.userId()}}}).fetch();
				if(acuerdos != undefined)
					_.each(acuerdos, function(acuerdo){
						acuerdo.categoria = Categorias.findOne(acuerdo.categoria_id);
					})
				return acuerdos;
			},
			vencidos() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				return Acuerdos.find({responsables:{ $elemMatch: {user:Meteor.userId()}},fechaInicio : { $lt : new Date(fechaInicio) }});
			},
			hoy() {
				var hoy = new Date;
				var fechaInicio = (hoy.getMonth()+1) + "/" + hoy.getDate() + "/" +  hoy.getFullYear();
				var fechaFin = (hoy.getMonth()+1) + "/" + hoy.getDate()  + "/" +  hoy.getFullYear() + " " + "23:59:59";
				return Acuerdos.find({responsables:{ $elemMatch: {user:Meteor.userId()}},fechaInicio : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }});
			},
			semana() {
				var hoy = new Date;
				var inicio = hoy.getDate() - hoy.getDay(); // First day is the day of the month - the day of the week
				var fin = inicio + 6; // last day is the first day + 6
				
				var primerDia = new Date(hoy.setDate(inicio));
				var ultimoDia = new Date(hoy.setDate(fin));
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + (primerDia.getDate()+1) + "/" +  primerDia.getFullYear();
				var fechaFin = moment(fechaInicio).add(5,'d').toDate();
				
				return Acuerdos.find({responsables:{ $elemMatch: {user:Meteor.userId()}},fechaInicio : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }});
			},
			mes() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				var primerDia = new Date(y, m, 1);
				var ultimoDia = new Date(y, m + 1, 0);
				
				var fechaInicio = (primerDia.getMonth()+1) + "/" + primerDia.getDate() + "/" +  primerDia.getFullYear();
				var fechaFin = (ultimoDia.getMonth()+1) + "/" + ultimoDia.getDate()  + "/" +  ultimoDia.getFullYear() + " " + "23:59:59";
				
				return Acuerdos.find({responsables:{ $elemMatch: {user:Meteor.userId()}},fechaInicio : { $gte: new Date(fechaInicio), $lt : new Date(fechaFin) }});
			},
			futuro() {
				var hoy = new Date;
				var y = hoy.getFullYear(), m = hoy.getMonth();
				return Acuerdos.find({responsables:{ $elemMatch: {user:Meteor.userId()}},fechaInicio : { $gt: new Date(y,m + 1, 0)}});
			},
			categorias() {
				return Categorias.find({estatus : true});
			}
		});
	  
	 	this.eliminar = function(acuerdo){

			var confirmPopup = $ionicPopup.confirm({
				title: categoria.nombre,
				template: 'Estás seguro que quiere eliminarla?'
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					
				}
			});

			Categorias.update(acuerdo._id, { $set : {estatus : false}});		
		}
		
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
});