angular
  .module('FLOKsports')
  .controller('NuevaReunionCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
		
		this.reunionId = $stateParams.reunionId;
		this.reunion = Reuniones.findOne(this.reunionId)
		this.$ionicHistory = $ionicHistory;
		this.helpers({
			
		});


	this.save  = function(){
		console.log(this.reunionId);
		if(this.reunionId){
			delete this.reunion._id
			Reuniones.update({_id:this.reunionId},{$set:this.reunion});
		}
		else{
			
			this.reunion.createdAt = new Date();
      this.reunion.owner = Meteor.userId();
      this.reunion.username = Meteor.user().username;
      Reuniones.insert(this.reunion);
      
		}
			
		this.$ionicHistory.goBack();
		
	}
});