angular
  .module('FLOKsports')
  .controller('CategoriasCtrl', function CategoriasCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
  		this.shouldShowDelete = false;
  		this.subscribe('AllCategorias',()=>{
			return [{}]
		});
		this.shouldShowReorder = false;
		this.listCanSwipe = true;
		this.helpers({
			categorias() {
				return Categorias.find({estatus : true});
			}
		});
	  
	 	this.eliminar = function(categoria){
			var confirmPopup = $ionicPopup.confirm({
				title: categoria.nombre,
				template: 'Estás seguro que quiere eliminarl la categoría?' 
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					Categorias.update(categoria._id, { $set : {estatus : false}});		
				}
			});
			
		}
		
		
		this.doRefresh = function(){
			alert("refresh");
		}  
});