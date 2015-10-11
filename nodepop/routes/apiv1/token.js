'use strict';

var express = require('express');
var router = express.Router();
var Token = require ('../../models/Token');



//POST obtener
router.post ('/', function (req,res){

    //Obtenemos los datos email y clave
    var plataforma = req.body.plataforma;
    var token = req.body.token;


    var token = new Token ({   plataforma:plataforma, token:token});

    //Tratamos el token y la palataforma obtenida
    Token.save(token, function (err, result){
        if (err) {

            return res.json({code:401, mensaje: 'Datos no Validos'}, req, res);
        }

        res.json({ok:true,  data: result});

        console.log(result)
    });
});

module.exports = router;
