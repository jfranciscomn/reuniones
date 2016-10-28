angular
  .module('FLOKsports')
  .controller('NuevaReunionCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		
	this.reunionId = $stateParams.reunionId;
	this.reunion = Reuniones.findOne(this.reunionId)

	if(!this.reunion){
		this.reunion={users:[{user:Meteor.userId()}]};
	}
	this.helpers({
			registrados() {
				console.log("registrados");
				return Meteor.users.find({});
			}
		});

	this.agregarParticipante = function(){
		
		this.reunion.users.push({user:null});
		console.log(this.reunion.users)
	}
	this.save  = function(){
		console.log(this.reunionId);

		if(this.reunionId){
			delete this.reunion._id
			Reuniones.update({_id:this.reunionId},{$set:this.reunion});
		}
		else{
			
			this.reunion.createdAt = new Date();
      		this.reunion.owner = Meteor.userId();
      		//this.reunion.users =[{user:Meteor.userId()}];
      		this.reunion.username = Meteor.user().username;
      		Reuniones.insert(this.reunion);
      
		}
		console.log($ionicHistory)	
		$ionicHistory.goBack();
		
	}
});