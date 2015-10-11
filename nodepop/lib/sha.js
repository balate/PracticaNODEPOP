"use strict";


var crypto=require("crypto");
var sha1={
    convert:function(pass){
        return crypto.createHash('sha1').update(pass).digest('hex');
    }
};
module.exports=sha1;