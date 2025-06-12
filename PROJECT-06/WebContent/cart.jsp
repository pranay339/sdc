<%@ page import="java.sql.*" %>
<h2>Your Cart</h2>
<table border="1">
<tr><th>Product</th><th>Price</th></tr>
<%
  ResultSet rs = (ResultSet) request.getAttribute("cartItems");
  while(rs.next()) {
%>
<tr>
  <td><%= rs.getString("name") %></td>
  <td><%= rs.getDouble("price") %></td>
</tr>
<% } %>
</table>
