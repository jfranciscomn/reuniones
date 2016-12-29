Medios = new Mongo.Collection("medios");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Medios.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
