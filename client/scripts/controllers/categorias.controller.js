angular
  .module('FLOKsports')
  .controller('CategoriasCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
	$reactive(this).attach($scope);
  	this.shouldShowDelete = false;
		this.shouldShowReorder = false;
		this.listCanSwipe = true;
		this.helpers({
			categorias() {
				console.log(Categorias.find().fetch())
				return Categorias.find();
			}
		});
	  
	 	eliminar(categoria){
			var confirmPopup = $ionicPopup.confirm({
				title: categoria.nombre,
				template: 'Estás seguro que quiere eliminarla?'
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					Categorias.update(categoria_id, { $set : {estatus : false}});		
				}
			});
			
		}
		
		this.doRefresh(){
			alert("refresh");
		}  
});