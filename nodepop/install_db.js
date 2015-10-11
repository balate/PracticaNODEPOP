//datos de carga por defecto para la coleccion Anuncios y usuario
var anuDatos = [
    {
        "nombre"   : "Bicicleta",
        "venta" : true,
        "precio"     : 230,
        "foto"     : "bici.jpg",
        "tags"      : [ "lifestyle", "motor"]
    },
    {
        "nombre": "iPhone 3GS",
        "venta" : false,
        "price" : 50.00,
        "foto"  : "iphone.png",
        "tags"  : [ "lifestyle", "mobile"]
    }

];

var usuDatos = [
    {
        "nombre": "balate",
        "email" : "javi@javi.es",
        "clave" : "1234"
    }
];

var async   = require('async');
var db = require('./lib/db');
var mongoose= require('mongoose');

require('./models/Anuncio')(mongoose);
require('./models/Usuario')(mongoose);


function initDB() {

    async.series([

            function (cb) {
                creaCollection("Usuario",usuDatos,cb)
            },

            function (cb) {
                creaCollection("Anuncio",anuDatos,cb)
            }

        ], function (err, results) {
            if (err) {
                console.error('Hubo un error: ', err);

                return process.exit(1);
            }
            return process.exit(0);
        }
    );
}

//Insertar datos en coleciones
function creaCollection(collection,inserta,cb){

    console.log('Comienza la carga de : '+ collection ,'....');

    var Collection  = mongoose.model(collection);

    //Se eliminan datos para volver a cargar
    Collection.remove({}, function(err,data){

        if (err)

            cb(err);

        // inserta datos
        Collection.create(inserta,function(err,r) {

            if (err)

                return (err);

            console.log('Se han insertado en la tabla '+collection, r.length,"registro/s ");
            return cb(null);

        });

    });

}


initDB();
