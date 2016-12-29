Meteor.publish("AllAcuerdos", function(){
	console.log(this.userId);
	return Acuerdos.find({$or : [
							{responsables	:{ $elemMatch: {user:this.userId}}},
							{seguidores		:{ $elemMatch: {user:this.userId}}}
						]});
});

Meteor.publish("acuerdos", function(options){
	return Acuerdos.find(options);
});


Meteor.publish("acuerdo", function(options){
	console.log(this.userId);
	return Acuerdos.find({$and:[{$or : [
									{responsables	:{ $elemMatch: {user:this.userId}}},
									{seguidores		:{ $elemMatch: {user:this.userId}}}
								]},
								{_id: options.acuerdoId}
						]});
});

