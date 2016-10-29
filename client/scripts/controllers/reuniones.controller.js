angular
  .module('FLOKsports')
  .controller('ReunionesCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
		this.contacts = [];
		this.deviceWidth = window.screen.width;
		this.helpers({
			reuniones() {
				return Reuniones.find({users:{ $elemMatch: {user:Meteor.userId()} }});
			}
		});
});