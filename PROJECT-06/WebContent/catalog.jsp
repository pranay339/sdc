<%@ page import="java.sql.*" %>
<h2>Product Catalog</h2>
<table border="1">
<tr><th>ID</th><th>Name</th><th>Price</th><th>Add</th></tr>
<%
  ResultSet rs = (ResultSet) request.getAttribute("products");
  while(rs.next()) {
%>
<tr>
  <td><%= rs.getInt("id") %></td>
  <td><%= rs.getString("name") %></td>
  <td><%= rs.getDouble("price") %></td>
  <td>
    <form action="AppController" method="post">
      <input type="hidden" name="action" value="addToCart">
      <input type="hidden" name="userId" value="1"><!-- hardcoded user ID -->
      <input type="hidden" name="productId" value="<%= rs.getInt("id") %>">
      <input type="submit" value="Add to Cart">
    </form>
  </td>
</tr>
<% } %>
</table>
