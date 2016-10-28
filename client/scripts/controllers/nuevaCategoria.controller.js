angular
  .module('FLOKsports')
  .controller('NuevaCategoriaCtrl', function AcuerdosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		$reactive(this).attach($scope);
		
		console.log($stateParams,$ionicHistory);
		this.categoriaId = $stateParams.categoriaId
		this.categoria = Categorias.findOne(this.categoriaId)
		this.$ionicHistory = $ionicHistory;
		this.helpers({
			
		});

		this.save = function(){
			if(this.categoriaId){
				delete this.categoria._id
				Categorias.update({_id:this.categoriaId},{$set:this.categoria});
			}
			else
				Categorias.insert(this.categoria);
			this.$ionicHistory.goBack();
			
		}
});
