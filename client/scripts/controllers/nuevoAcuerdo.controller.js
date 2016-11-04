angular
  .module('FLOKsports')
  .controller('NuevoAcuerdoCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		
		this.acuerdoId = $stateParams.acuerdoId;
		this.acuerdo = Acuerdos.findOne(this.acuerdoId)
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
	
	if(!this.acuerdo){
		this.acuerdo={users:[{user:Meteor.userId()}]};
	}
		
		this.helpers({
			categorias() {
				return Categorias.find();
			},
			registrados() {
				console.log("registrados", Meteor.users.find({}).fetch());
				return Meteor.users.find({});
			}
		});
		
		this.agregarParticipante = function(){
		
			this.acuerdo.users.push({user:null, estatus : false});
			console.log(this.acuerdo.users)
		}


		this.save  = function(){
		this.quitarhk(this.acuerdo);

		if(this.acuerdoId){
			delete this.acuerdo._id
			Acuerdos.update({_id:this.acuerdoId},{$set:this.acuerdo});
		}
		else{
			
			this.acuerdo.createdAt = new Date();
      		this.acuerdo.owner = Meteor.userId();
      		//this.acuerdo.users =[{user:Meteor.userId()}];
      		this.acuerdo.username = Meteor.user().username;
      		Acuerdos.insert(this.acuerdo);
      
		}
		console.log($ionicHistory)	
		$ionicHistory.goBack();
		
	}
})