angular
  .module('FLOKsports')
  .controller('AcuerdosCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
	$reactive(this).attach($scope, $ionicPopup);
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
	  
	 	this.eliminar = function(acuerdo){

			var confirmPopup = $ionicPopup.confirm({
				title: categoria.nombre,
				template: 'Estás seguro que quiere eliminarla?'
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					
				}
			});

			Categorias.update(acuerdo._id, { $set : {estatus : false}});		
		}
		
		this.doRefresh(){
			alert("refresh");
		}  

});