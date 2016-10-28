Categorias = new Mongo.Collection("categorias");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Categorias.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
