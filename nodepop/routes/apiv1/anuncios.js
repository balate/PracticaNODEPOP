"use strict";

var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Anuncio = mongoose.model('Anuncio');


// Listar anuncios
router.get('/', function(req,res){

    //En la request se añade completa para mostrar los filtros del modelo
    Anuncio.lista(req,function(err, lista){
        if ( err )
        {
            //console.log(err);
            return res.json({ok:false,error:err});
        }

        return res.json({ok:true, data:lista});

    });

});


//Listar tags
router.get('/tags', function(req, res) {

    res.json({ok: true, tagsList: Anuncio.tagsList()});

});



module.exports = router;

