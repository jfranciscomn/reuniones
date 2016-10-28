angular
  .module('FLOKsports')
  .controller('NuevaReunionCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		
	this.reunionId = $stateParams.reunionId;
	this.reunion = Reuniones.findOne(this.reunionId)
	this.quitarhk=function(obj){
		if(Array.isArray(obj)){
			for (var i = 0; i < obj.length; i++) {
				obj[i] =this.quitarhk(obj[i]);
			}
		}
		else if(obj !== null && typeof obj === 'object')
		{
			delete obj.$$hashKey;
			for (var name in obj) {
	  			obj[name] = this.quitarhk(obj[name]);
			}

		}
		return obj;
	}


	if(!this.reunion){
		this.reunion={users:[{user:Meteor.userId()}]};
	}
	this.helpers({
			registrados() {
				console.log("registrados", Meteor.users.find({}).fetch());
				return Meteor.users.find({});
			}
		});

	this.agregarParticipante = function(){
		
		this.reunion.users.push({user:null});
		console.log(this.reunion.users)
	}
	this.save  = function(){
		console.log(this.reunionId);
		this.quitarhk(this.reunion);
		console.log(this.reunion)

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