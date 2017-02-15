angular
  .module('FLOKsports')
  .controller('ReunionesFiltradasCtrl', function ReunionesFiltradasCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.deviceWidth = $(".menuSuperior").width();
		this.listCanSwipe = true;
		window.rc = rc;
		this.filtro = $stateParams.tipo;
		this.isIPad = ionic.Platform.isIPad();
		this.tipo = $stateParams.tipo;
		this.subscribe('usuarios',()=>{
			return [{}]
		});
		this.subscribe('AllCategorias',()=>{
			return [{}]
		});
		this.subscribe('AllReuniones',()=>{
			return [{}]
		});
		if($stateParams.tipo == "vencidas"){
			console.log("vencidas", $stateParams.tipo);
			rc.hoy = new Date;
			rc.fechaInicio = (rc.hoy.getMonth()+1) + "/" +rc.hoy.getDate() + "/" + rc.hoy.getFullYear();
			rc.helpers({
				reuniones() {
					console.log(rc.fechaInicio);
					console.log(rc.fechaFin);
					var reuniones =  Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $lt : new Date(rc.fechaInicio) }}).fetch();
					console.log(reuniones);
					return reuniones;
				}
		});
		}else if($stateParams.tipo == "hoy"){
			console.log("hoy", $stateParams.tipo);
			rc.hoy = new Date;
			rc.fechaInicio = (rc.hoy.getMonth()+1) + "/" +rc.hoy.getDate() + "/" + rc.hoy.getFullYear();
			rc.fechaFin = (rc.hoy.getMonth()+1) + "/" +rc.hoy.getDate()  + "/" + rc.hoy.getFullYear() + " " + "23:59:59";
			rc.helpers({
				reuniones () {
					console.log(rc.fechaInicio);
					console.log(rc.fechaFin);
					var reuniones = Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(rc.fechaInicio), $lt : new Date(rc.fechaFin) }}).fetch();
					console.log(reuniones);
					return reuniones;
				}
			});
		}else if($stateParams.tipo == "semana"){
			console.log("semana", $stateParams.tipo);
			rc.hoy = new Date();
			rc.inicio = rc.hoy.getDate() - rc.hoy.getDay(); // First day is the day of the month - the day of the week
			rc.fin = rc.inicio + 6; // last day is the first day + 6
			
			rc.primerDia = new Date(rc.hoy.setDate(rc.inicio));
			rc.ultimoDia = new Date(rc.hoy.setDate(rc.fin));
			
			rc.fechaInicio = (rc.primerDia.getMonth()+1) + "/" + (rc.primerDia.getDate()+1) + "/" +  rc.primerDia.getFullYear();
			rc.fechaFin = moment(rc.fechaInicio,'MM/DD/YYYY').add(5,'d').toDate();
			rc.helpers({
			
				reuniones() {
					console.log(rc.fechaInicio);
					console.log(rc.fechaFin);
					var reuniones = Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(rc.fechaInicio), $lt : new Date(rc.fechaFin) }}).fetch();
					console.log(reuniones);
					return reuniones;
				}
			});
		}else if($stateParams.tipo == "mes"){
			console.log("mes", $stateParams.tipo);
			rc.hoy = new Date;
			rc.y =rc.hoy.getFullYear(), rc.m =rc.hoy.getMonth();
			rc.primerDia = new Date(rc.y, rc.m, 1);
			rc.ultimoDia = new Date(rc.y, rc.m + 1, 0);
			
			rc.fechaInicio = (rc.primerDia.getMonth()+1) + "/" + rc.primerDia.getDate() + "/" +  rc.primerDia.getFullYear();
			rc.fechaFin = (rc.ultimoDia.getMonth()+1) + "/" + rc.ultimoDia.getDate()  + "/" +  rc.ultimoDia.getFullYear() + " " + "23:59:59";
			rc.helpers({
			
			reuniones() {
				console.log(rc.fechaInicio);
				console.log(rc.fechaFin);
				var reuniones = Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(rc.fechaInicio), $lt : new Date(rc.fechaFin) }}).fetch();
				console.log(reuniones);
				return reuniones;
			},
		});
		}else if($stateParams.tipo == "futuro"){
			console.log("futuro", $stateParams.tipo);
			rc.hoy = new Date;
			rc.y =rc.hoy.getFullYear(), rc.m =rc.hoy.getMonth();
			rc.helpers({
				reuniones() {
					console.log(rc.fechaInicio);
					console.log(rc.fechaFin);
					var reuniones =  Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},
									fecha : { $gt: new Date(rc.y, rc.m + 1, 0)}}).fetch();
					console.log(reuniones);
					return reuniones;
				}
			});
		}
		
		
				
		this.detalleReunion = function(reunion){
			if(reunion.owner == Meteor.userId()){
				$state.go("app.editarReunion", {reunionId : reunion._id});
			}else{
				$state.go("app.verReunion", {reunionId : reunion._id});
			}
		}
});