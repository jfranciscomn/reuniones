angular
  .module('FLOKsports')
  .controller('NuevaCategoriaCtrl', function NuevaCategoriaCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		window.rc = this;
		console.log($stateParams,$ionicHistory);
		this.categoriaId = $stateParams.categoriaId;
		if ($stateParams.categoriaId) 
			this.categoria = Categorias.findOne(this.categoriaId);
		else
			this.categoria = {color:"#0ff"};
		if(!this.categoria || !this.categoria.temas)
			this.categoria.temas =[];
		this.$ionicHistory = $ionicHistory;
		this.subscribe('AllCategorias',()=>{
			return [{}]
		});
		this.helpers({
			
		});

		this.save = function(){
			this.categoria.owner=Meteor.userId();
			if(this.categoriaId){
				delete this.categoria._id
				Categorias.update({_id:this.categoriaId},{$set:this.categoria});
			}
			else{
				this.categoria.estatus = true;
				Categorias.insert(this.categoria);
			}
				
			this.$ionicHistory.goBack();
			
		}
		
});
