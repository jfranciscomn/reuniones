Reuniones = new Mongo.Collection("reuniones");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Reuniones.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
