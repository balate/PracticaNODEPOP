"use strict";

//requerir mongoose
var mongoose= require('mongoose');


//Define esquema de Anuncio
var anuncioSchema = mongoose.Schema({

    nombre:String,
    venta: Boolean,
    precio:Number,
    foto:String,
    tags:[String]

});

anuncioSchema.statics.tagsList = function() {
    return ['work', 'lifestyle', 'motor', 'mobile'];
};


//Método estático que muestra la lista de anuncios
anuncioSchema.statics.lista=function(req, cb){

    //filtros
    var filtros = {};

    if ( typeof req.query.venta !== 'undefined'){

        filtros.venta = req.query.venta;

    }

    if ( typeof req.query.tags !== 'undefined'){

        filtros.tags = req.query.tags;

    }

    if ( typeof req.query.nombre !== 'undefined'){

        filtros.nombre = new RegExp('^'+ req.query.nombre, "i");

    }

    if ( typeof req.query.precio !== 'undefined'){

        //separar el precio a partir del -
        var p = req.query.precio.split('-');

        if (p.length === 1){

            //Precio exacto
            filtros.precio = p[0];

        } else if (p[0] && p[1]) {

            //Con 2 registros, uno mayor y otro menor
            console.log("mayor menor");
            filtros.precio={'$gte': p[0], '$lte': p[1]};

        } else if ( p[0] ){

            // un registro mayor que
            filtros.precio={'$gte': p[0]};

        } else {

            // Segundo registro menor que
            filtros.precio={'$lte': p[1]};
        }

    };



    //Definir limites
    var paginacion = 4;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || paginacion;


    //Lo recibe paginado
    var query=Anuncio.find(filtros);
    query.skip(start);
    query.limit(limit);
    query.sort({ nombre:-1});



    //Ejecutar busqueda
    query.exec(function(err, rows){
        if ( err ) {
            return cb(err);
        }
        return cb(null,rows);
    });


};

//exportar modelo
var Anuncio = mongoose.model('Anuncio',anuncioSchema);

module.exports = Anuncio;