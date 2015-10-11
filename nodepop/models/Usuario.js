'use strict';

var mongoose = require('mongoose');

//Definir esquema del usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String

});


//Método estático para listar usuarios
usuarioSchema.statics.lista = function(cb){

    var query = Usuario.find();

    query.exec(function(err,rows){

        if(err){

            return cb(err);
        }

        return cb(null, rows);
    });
};


//Crear indice por email
usuarioSchema.index({'email':1},{ unique: true });


//Exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
