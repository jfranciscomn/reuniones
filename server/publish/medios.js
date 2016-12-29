Meteor.publish("medios", function(options){

	return Medios.find({reunion_id: options.reunionId });
});
