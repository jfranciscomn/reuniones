Meteor.publish("AllCategorias", function(){
	return Categorias.find({owner:this.userId})
});