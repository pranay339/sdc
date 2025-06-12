const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const User = mongoose.model('User', {
  username: String,
  password: String,
});

const Book = mongoose.model('Book', {
  title: String,
  author: String,
  year: String,
  image: String, // You can use a URL or base64
  available: Boolean,
});

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.send({ message: 'User registered' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Add Book
app.post('/books', async (req, res) => {
  const { title, author, year, image } = req.body;
  const book = new Book({ title, author, year, image, available: true });
  await book.save();
  res.send(book);
});

// Get Books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
