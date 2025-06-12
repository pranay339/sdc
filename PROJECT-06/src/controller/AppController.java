package controller;
@WebServlet("/AppController")
public class AppController extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Load database driver and create connection
    public void init() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // or your driver
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        
        switch (action) {
            case "register":
                registerUser(request, response);
                break;
            case "login":
                loginUser(request, response);
                break;
            case "addToCart":
                addToCart(request, response);
                break;
            case "viewCatalog":
                viewCatalog(request, response);
                break;
            case "viewCart":
                viewCart(request, response);
                break;
            default:
                response.sendRedirect("error.jsp");
        }
    }

    private void registerUser(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String name = req.getParameter("name");
        String email = req.getParameter("email");
        String pass = req.getParameter("password");

        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "password")) {
            PreparedStatement ps = con.prepareStatement("INSERT INTO users(name, email, password) VALUES (?, ?, ?)");
            ps.setString(1, name);
            ps.setString(2, email);
            ps.setString(3, pass);
            ps.executeUpdate();
            res.sendRedirect("login.html");
        } catch (Exception e) {
            e.printStackTrace();
            res.sendRedirect("error.jsp");
        }
    }

    private void loginUser(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String email = req.getParameter("email");
        String pass = req.getParameter("password");

        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "password")) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE email=? AND password=?");
            ps.setString(1, email);
            ps.setString(2, pass);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                res.sendRedirect("catalog.html");
            } else {
                res.sendRedirect("login.html?error=1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.sendRedirect("error.jsp");
        }
    }

    private void addToCart(HttpServletRequest req, HttpServletResponse res) throws IOException {
        int userId = Integer.parseInt(req.getParameter("userId"));
        int productId = Integer.parseInt(req.getParameter("productId"));

        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "password")) {
            PreparedStatement ps = con.prepareStatement("INSERT INTO cart(user_id, product_id) VALUES (?, ?)");
            ps.setInt(1, userId);
            ps.setInt(2, productId);
            ps.executeUpdate();
            res.sendRedirect("catalog.html");
        } catch (Exception e) {
            e.printStackTrace();
            res.sendRedirect("error.jsp");
        }
    }

    private void viewCatalog(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "password")) {
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM products");
            req.setAttribute("products", rs);
            RequestDispatcher dispatcher = req.getRequestDispatcher("catalog.jsp");
            dispatcher.forward(req, res);
        } catch (Exception e) {
            e.printStackTrace();
            res.sendRedirect("error.jsp");
        }
    }

    private void viewCart(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        int userId = Integer.parseInt(req.getParameter("userId"));

        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop", "root", "password")) {
            PreparedStatement ps = con.prepareStatement(
                "SELECT p.name, p.price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?");
            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();
            req.setAttribute("cartItems", rs);
            RequestDispatcher dispatcher = req.getRequestDispatcher("cart.jsp");
            dispatcher.forward(req, res);
        } catch (Exception e) {
            e.printStackTrace();
            res.sendRedirect("error.jsp");
        }
    }
}
