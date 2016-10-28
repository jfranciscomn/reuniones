angular
  .module('FLOKsports')
  .controller('ReunionesCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
		this.contacts = [];
		this.helpers({
			reuniones() {
				return Reuniones.find();
			}
		});
});