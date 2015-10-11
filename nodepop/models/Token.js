"use strict";

//requerir mongoose
var mongoose= require('mongoose');


//Define esquema de Token
var tokenSchema = mongoose.Schema({

    plataforma:{type:String,enum:['ios','android']},
    token:String,
    usuario:String

});

//Método estático para almacenar Pushtoken
tokenSchema.statics.save = function(datos, cb) {

    var token = new Token(datos);

    token.save(function (err) {
        if (err){
            return cb(err);
        }
        console.log('Se almacena Token: ',token.token);
        return cb(null);
    });
};




//exportar modelo
var Token = mongoose.model('Token',tokenSchema);

module.exports = Token;
