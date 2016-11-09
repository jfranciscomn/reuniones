angular
  .module('FLOKsports')
  .controller('PreferenciasReunionCtrl', function PreferenciasReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		let rc = $reactive(this).attach($scope);
		
		this.preferencia = PreferenciasReunion.findOne({owner : Meteor.userId()});
		
		this.helpers({
			
		});
		
		this.guardar = function(){
			if(this.preferencia._id == undefined){
				rc.preferencia.owner = Meteor.userId();
				PreferenciasReunion.insert(rc.preferencia);
			}else{
				var tempId = rc.preferencia._id;
				delete rc.preferencia._id
				PreferenciasReunion.update(tempId, { $set : rc.preferencia } );
			}
			$ionicHistory.goBack();
		}
		
		
});