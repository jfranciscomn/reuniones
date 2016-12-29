angular
  .module('FLOKsports')
  .controller('ReunionesFiltradasCtrl', function ReunionesFiltradasCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.deviceWidth = $(".menuSuperior").width();
		this.listCanSwipe = true;
		this.filtro = $stateParams.tipo;
		this.isIPad = ionic.Platform.isIPad();
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
			this.hoy = new Date;
			this.fechaInicio = (this.hoy.getMonth()+1) + "/" +this.hoy.getDate() + "/" + this.hoy.getFullYear();
			this.helpers({
				reuniones() {
					console.log(this.fechaInicio);
					console.log(this.fechaFin);
					var reuniones =  Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $lt : new Date(this.fechaInicio) }}).fetch();
					console.log(reuniones);
				}
		});
		}else if($stateParams.tipo == "hoy"){
			this.hoy = new Date;
			this.fechaInicio = (this.hoy.getMonth()+1) + "/" +this.hoy.getDate() + "/" + this.hoy.getFullYear();
			this.fechaFin = (this.hoy.getMonth()+1) + "/" +this.hoy.getDate()  + "/" + this.hoy.getFullYear() + " " + "23:59:59";
			this.helpers({
				reuniones() {
					console.log(this.fechaInicio);
					console.log(this.fechaFin);
					var reuniones = Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(this.fechaInicio), $lt : new Date(this.fechaFin) }}).fetch();
					console.log(reuniones);
				}
			});
		}else if($stateParams.tipo == "semana"){
			this.hoy = new Date();
			this.inicio = this.hoy.getDate() - this.hoy.getDay(); // First day is the day of the month - the day of the week
			this.fin = this.inicio + 6; // last day is the first day + 6
			
			this.primerDia = new Date(this.hoy.setDate(this.inicio));
			this.ultimoDia = new Date(this.hoy.setDate(this.fin));
			
			this.fechaInicio = (this.primerDia.getMonth()+1) + "/" + (this.primerDia.getDate()+1) + "/" +  this.primerDia.getFullYear();
			this.fechaFin = moment(this.fechaInicio,'MM/DD/YYYY').add(5,'d').toDate();
			this.helpers({
			
				reuniones() {
					console.log(this.fechaInicio);
					console.log(this.fechaFin);
					var reuniones = Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(this.fechaInicio), $lt : new Date(this.fechaFin) }}).fetch();
					console.log(reuniones);
				}
			});
		}else if($stateParams.tipo == "mes"){
			this.hoy = new Date;
			this.y =this.hoy.getFullYear(), this.m =this.hoy.getMonth();
			this.primerDia = new Date(this.y, this.m, 1);
			this.ultimoDia = new Date(this.y, this.m + 1, 0);
			
			this.fechaInicio = (this.primerDia.getMonth()+1) + "/" + this.primerDia.getDate() + "/" +  this.primerDia.getFullYear();
			this.fechaFin = (this.ultimoDia.getMonth()+1) + "/" + this.ultimoDia.getDate()  + "/" +  this.ultimoDia.getFullYear() + " " + "23:59:59";
			this.helpers({
			
			reuniones() {
				console.log(this.fechaInicio);
				console.log(this.fechaFin);
				var reuniones = Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},fecha : { $gte: new Date(this.fechaInicio), $lt : new Date(this.fechaFin) }}).fetch();
				console.log(reuniones);
			},
		});
		}else if($stateParams.tipo == "futuras"){
			this.hoy = new Date;
			this.y =this.hoy.getFullYear(), this.m =this.hoy.getMonth();
			this.helpers({
				futuras() {
					console.log(this.fechaInicio);
					console.log(this.fechaFin);
					var reuniones =  Reuniones.find({users:{ $elemMatch: {user:Meteor.userId(), estatus : 2}},
									fecha : { $gt: new Date(this.y, this.m + 1, 0)}}).fetch();
					console.log(reuniones);
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