;(function(name, definition){
    if(typeof define === 'function'){
        define(definition);
    }else if(typeof module !== 'undefined' && module.exports){
        module.exports = definition();
    }else{
        this[name] = definition();
    }
})('%s', function(){
%s
});