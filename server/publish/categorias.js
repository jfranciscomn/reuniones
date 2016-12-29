Meteor.publish("AllCategorias", function(){
	return Categorias.find({})
});