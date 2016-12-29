Meteor.publish("usuarios", function(options){
	return  Meteor.users.find(options);
});