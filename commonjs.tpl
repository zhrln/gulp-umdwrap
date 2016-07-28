<% dep.forEach(function(n){ %>
require("<%=n%>");
<% }); %>

<%=code%>;

module.exports = <%=exp%>;
