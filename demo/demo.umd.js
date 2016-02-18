;(function(name, definition){
    if(typeof define === 'function'){
        define(["mtb/lib-env","mtb/lib-env2"],definition);
    }else if(typeof module !== 'undefined' && module.exports){

        require("mtb/lib-env");

        require("mtb/lib-env2");

        module.exports = definition();
    }else{
        this[name] = definition();
    }
})('demo', function(){
/**
 * Created by zhangrui on 1/28/16.
 */
console.log('message');
});