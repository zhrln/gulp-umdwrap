/**
 * Created by zhangrui on 1/20/16.
 */
var fs = require('fs');
var path = require('path');
var util = require('util');
var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var template = require('lodash.template');

/** global
 * options:{
 *  name: 'name',
 *  dep:[xx, yy, zz],
 *  exports:'window.lib._libname_'
 * }
 */

// consts
var PLUGIN_NAME = 'gulp-ngm-umdwrap';

function camelCase(name){
    return name.replace(/-([\da-z])/gi,function(all, letter){
        return letter.toUpperCase();
    })
}

function action(options,type){

    var actionObj = {};

    switch(type){
        case 'amd':
            actionObj.namePrefix = 'amd_';
            actionObj.tpl = 'amd.tpl';
            actionObj.type = 'amd';
            break;
        case 'commonjs':
            actionObj.namePrefix = 'commonjs_';
            actionObj.tpl = 'commonjs.tpl';
            actionObj.type = 'commonjs';
            break;
        default:
            actionObj.namePrefix = 'umd_';
            actionObj.tpl = 'umd.tpl';
            actionObj.type = 'umd';
            break;
    }

    function process(data, options){

        if(actionObj.type == 'amd' || actionObj.type == 'common'){
            if(!options.exp){
                throw 'options.exp is required!';
            }
        }else if(actionObj.type == 'umd'){
            if(!options.name){
                throw 'options.name is required!';
            }
        }

        var wrapFile = fs.readFileSync(path.join(__dirname, actionObj.tpl)).toString();
        var fn = template(wrapFile);
        return fn({
            name: options.name || '',
            dep: options.dep || [],
            exp: options.exp,
            code: data
        });
    }

    return through.obj(function(file, encoding, callback) {
        if(file.isNull()){
            return callback(null, file);
        }
        if(file.isStream()){
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }else if(file.isBuffer()){
            var data = Buffer.concat([file.contents]).toString();
            try {
                data = process(data, options);
            } catch (e){
                this.emit('error', new PluginError(PLUGIN_NAME, e));
            }
            file.contents = new Buffer(data);
            return callback(null, file);
        }
    });
}

module.exports = action;
