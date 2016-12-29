angular
  .module('FLOKsports')
  .controller('SeleccionarParticipantesCtrl', function SeleccionarParticipantesCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.reunion = $stateParams.reunion;
		console.log($stateParams)
		this.participantesSel = {};
		this.subscribe('usuarios',()=>{
			return [{}]
		});
		this.helpers({
			participantes() {
				return Meteor.users.find({});
			}
		});
		
		this.ver = function(){
			console.log(this.participantes);
			this.reunion.users = [];
			_.each(this.participantesSel, function(participante){
				if(participante.estatus == true)
				rc.reunion.users.push({
					user : participante._id,
					estatus : true
				})
			})
			
			console.log(this.reunion);
		}
});