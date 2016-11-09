PreferenciasReunion = new Mongo.Collection("preferenciasReunion");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
PreferenciasReunion.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
