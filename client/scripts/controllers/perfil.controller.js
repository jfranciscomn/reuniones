angular
  .module('FLOKsports')
  .controller('PerfilCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
	
		this.updatePicture = function () {
	    MeteorCameraUI.getPicture({ width: 60, height: 60 }, (err, data) => {
	      if (err) return this.handleError(err);
	 
	      this.$ionicLoading.show({
	        template: 'Updating picture...'
	      });
	 
	      this.callMethod('updatePicture', data, (err) => {
	        this.$ionicLoading.hide();
	        this.handleError(err);
	      });
	    });
	  }
});