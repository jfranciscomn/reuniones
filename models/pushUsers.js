PushUsers = new Mongo.Collection("pushUsers");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
PushUsers.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
