Acuerdos = new Mongo.Collection("acuerdos");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Acuerdos.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
