

var express = require('express');
var router = express.Router();

var mongoose= require('mongoose');
var Anuncio = mongoose.model('Anuncio');

//Crea un anuncio /GET/agentes
router.get('/', function(req, res, next) {

    var anuncio = new Anuncio({nombre:'moto',venta:true, precio:200, foto:null, tags:["motor"]});

    anuncio.save(function(err,creado){
        if(err){
            console.log(err);
            return next(err);
        }
        console.log(creado);
    });

    res.send(anuncio);
});


module.exports = router;