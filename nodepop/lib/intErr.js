'use strict';

var traductor = require('./traductor');

module.exports = function(error, idiom, res) {

    traductor(error.message, idiom, function(err, mensaje) {
        if(err){
            return res.json({ ok: false, error: {code: 500, message: 'TRADUCTION ERROR'}});
        }
        return res.json({ ok: false, error: {code: error.code, message: mensaje}});
    });

};
