Meteor.publish("preferenciasReunion", function(options){
	return  PreferenciasReunion.find(options);
});