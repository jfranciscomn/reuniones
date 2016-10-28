angular
  .module('FLOKsports')
  .controller('NuevoAcuerdoCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		
		this.acuerdoId = $stateParams.acuerdoId;
		this.acuerdo = Acuerdos.findOne(this.acuerdoId)
		
		this.helpers({
			categorias() {
				return Categorias.find();
			}
		});


	this.save = function(){
		console.log(this.acuerdoId);
		if(this.acuerdoId){
			delete this.acuerdo._id
			Acuerdos.update({_id:this.acuerdoId},{$set:this.acuerdo});
		}
		else
			Acuerdos.insert(this.acuerdo);
		$ionicHistory.goBack();
		
	}
})