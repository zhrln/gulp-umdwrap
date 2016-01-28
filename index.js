/**
 * Created by zhangrui on 1/20/16.
 */
var fs = require('fs');
var path = require('path');
var util = require('util');
var PluginError = require('gulp-util').PluginError;
var through = require('through2');

// consts
var PLUGIN_NAME = 'gulp-ngm-umdwrap';

function process(ctn){
    var wrapFile = fs.readFileSync('wrap.tpl').toString();
    return util.format(wrapFile, 'umdwrap', ctn);
}

module.exports = function(options) {
    return through.obj(function(file, encoding, callback) {
        if(file.isNull()){
            return callback(null, file);
        }
        if(file.isStream()){
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }else if(file.isBuffer()){
            var data = Buffer.concat([file.contents]).toString();
            data = process(data);
            file.contents = new Buffer(data);
            return callback(null, file);
        }
    });
};