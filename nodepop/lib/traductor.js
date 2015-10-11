'use strict';

var fs = require('fs');
var path = require('path');

var fichero = path.join('./', 'errores.json');

module.exports = function(mensaje, idiom, cb) {

    fs.readFile(fichero, function(err, resp){
        if (err) {
            cb(err);
        }

        if(typeof idiom == 'undefined' || idiom !== 'en') {

            idiom = 'es'; // español por defecto en caso de no ser especificado
        }

        console.log(JSON.parse(resp)[idiom][mensaje]);
        return cb(null, JSON.parse(resp)[idiom][mensaje]);
    });
};
