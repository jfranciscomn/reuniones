angular
  .module('FLOKsports')
  .controller('AcuerdoCtrl', function AcuerdoCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.verResponsables = false;
		this.verSeguidores = false;
		this.subscribe('acuerdo',()=>{
			return [{acuerdoId:$stateParams.acuerdoId}]
		});
		this.subscribe('usuarios',()=>{
			return [{}]
		});
		this.helpers({
			acuerdo : function() {
				var acuerdo = Acuerdos.findOne($stateParams.acuerdoId);
				
				if(acuerdo.responsables.length > 0){
					_.each(acuerdo.responsables, function(invitado){
						invitado.invitado = Meteor.users.findOne(invitado.user);
					})
				}
				
				if(acuerdo.seguidores.length > 0){
					_.each(acuerdo.seguidores, function(invitado){
						invitado.invitado = Meteor.users.findOne(invitado.user);
					})
				}
				
				if(acuerdo.temas){
					acuerdo.temasSeparados = acuerdo.temas.split(', ');
				}
				
				if(acuerdo){
					acuerdo.createdBy = Meteor.users.findOne(acuerdo.owner);
					acuerdo.categoria = Categorias.findOne(acuerdo.categoria_id)
				}
				console.log(acuerdo);
				return acuerdo;
			}
		});
		
});