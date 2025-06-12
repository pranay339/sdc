const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // handle base64 images

const db = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "book_management"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/books", (req, res) => {
  const { title, author, year, cover, status } = req.body;
  db.query(
    "INSERT INTO books (title, author, year, cover, status) VALUES (?, ?, ?, ?, ?)",
    [title, author, year, cover, status],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId });
    }
  );
});

app.delete("/books/:id", (req, res) => {
  db.query("DELETE FROM books WHERE id = ?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
