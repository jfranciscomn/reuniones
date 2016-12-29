Meteor.publish("AllReuniones", function(){
	console.log(this.userId);
	return Reuniones.find({users:{ $elemMatch: { user: this.userId } } });
});

Meteor.publish("reuniones", function(options){

	return Reuniones.find({users:{ $elemMatch: { user: this.userId } }, _id: options.reunionId });
});
