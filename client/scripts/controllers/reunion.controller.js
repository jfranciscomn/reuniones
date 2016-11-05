angular
  .module('FLOKsports')
  .controller('ReunionCtrl', function ReunionCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.verReunion = "";
		this.helpers({
			reunion : function() {
				var reunion = Reuniones.findOne($stateParams.reunionId);
				
				if(reunion.users.length > 0){
					_.each(reunion.users, function(invitado){
						invitado.invitado = Meteor.users.findOne(invitado.user);
					})
					reunion.createdBy = Meteor.users.findOne(reunion.owner);
				}
				console.log(reunion);
				return reunion;
			}
		});
});