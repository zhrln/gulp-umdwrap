;(function(name, definition){
    if(typeof define === 'function'){
        define(<%=JSON.stringify(dep)%>,definition);
    }else if(typeof module !== 'undefined' && module.exports){
<% dep.forEach(function(n){ %>
        require("<%=n%>");
<% }); %>
        module.exports = definition();
    }else{
        this[name] = definition();
    }
})('<%=name%>', function(){
<%=code%>
});