'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var jwt = require('jsonwebtoken');
var sha256 = require ('sha256');

var config = require ('../../lib/local_config');
var error=  require ('../../lib/intErr');



//Trata la peticion y verificar el token que nos da es valido
router.get('/',function(req,res,next){

    //token que nos da el usuario por la cabecera x-access-token
    var token = req.body.token ||
        req.query.token||
        req.headers['x-access-token'];

    if(token){
        jwt.verify(token,config.jwt.secret, function(err,decoded){
            if(err)
            {
                return error({code:401, message: 'INVALID_TOKEN'}, req.body.lang, res);
            }

            req.decoded=decoded;

            //Usuario autenticado y puede continuar
            next();
        });
    } else{

        return error({code:401, message: 'NO_TOKEN'}, req.body.lang, res);

    }
});


// Auntentificar usuario
router.post('/authenticate', function(req, res) {

    if (!req.body.email || !req.body.clave) {

        return error({code:401, message: 'AUTHENTICATE_FAIL'}, req.body.lang, res);

    }

    Usuario.findOne({

            'email': req.body.email,
            'clave': sha256(req.body.clave)

        },
        function(err, usuario) {
            if (err) {

                return error(err, req.lang).json(res);

            }
            if (!usuario) {

                return error({code: 401, message: 'USER_NOT_FOUND'}, req.body.lang, res);

            }


            var token = jwt.sign(usuario, config.jwt.secret, {
                expireInMinutes: config.jwt.expiresInMinutes
            });

            res.json({ok:true, token: token});

        });
});


//Registro de usuarios nuevos
router.post ('/register', function (req, res){

    var nombre = req.body.nombre;
    var email = req.body.email;
    var clave = req.body.clave;

    // crea un usuario y encriptar clave con sha256
    var usuario = new Usuario({nombre:nombre,email:email,clave:sha256(clave)});

    usuario.save ( function(err, creado) {
        if (err) {

            return error({code: 401, message: 'USER_NO_CREATE'}, req.body.lang, res);
        }

        req.usuario=usuario.nombre;
        res.json({ok:true, usuario: creado});

    });

});

/*
//Lista de Usuarios
router.get ('/lista', function (req,res){

    Usuario.lista(function(err, usuarios) {

        if (err) {

             return error({code: 401, message: 'UNKNOW'}, req.body.lang, res);
        }

        res.json({ok:true, data: usuarios});

    });


});
*/
module.exports = router;



