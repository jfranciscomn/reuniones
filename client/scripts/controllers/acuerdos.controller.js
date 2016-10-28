angular
  .module('FLOKsports')
  .controller('AcuerdosCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams,$ionicPopup) {
	$reactive(this).attach($scope);
  	this.shouldShowDelete = false;
	this.listCanSwipe = true;
	
	this.helpers({
		acuerdos() {
			var acuerdos = Acuerdos.find().fetch();
			if(acuerdos != undefined)
				_.each(acuerdos, function(acuerdo){
					acuerdo.categoria = Categorias.findOne(acuerdo.categoria_id);
				})
			return acuerdos;
		},
		categorias() {
			return Categorias.find({estatus : true});
		}
	});
  
 	this.eliminar=function(acuerdo){

		Categorias.update(acuerdo._id, { $set : {estatus : false}});		
	}
	
	this.doRefresh=function(){
		alert("refresh");
	}
  
});

