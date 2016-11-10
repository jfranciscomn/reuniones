angular
  .module('FLOKsports')
  .controller('CategoriasCtrl', function CategoriasCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
	$reactive(this).attach($scope);
  	this.shouldShowDelete = false;
		this.shouldShowReorder = false;
		this.listCanSwipe = true;
		this.helpers({
			categorias() {
				console.log(Categorias.find({estatus : true}).fetch())
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
					Categorias.update(categoria_id, { $set : {estatus : false}});		
				}
			});
			
		}
		
		this.doRefresh = function(){
			alert("refresh");
		}  
});