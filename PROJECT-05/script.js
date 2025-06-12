let books = [];
let currentUser = null;
window.onload = () => {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) books = JSON.parse(storedBooks);

  const userLoggedIn = localStorage.getItem("loggedInUser");
  if (userLoggedIn) {
    currentUser = userLoggedIn;
    showMainApp();
    displayBooks(books);
  } else {
    document.getElementById("authMenu").style.display = "flex";
  }
};
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  const target = document.getElementById(id);
  if (target) target.style.display = "block";
}
function showMainApp() {
  document.getElementById("mainApp").style.display = "block";
  showSection("bookList");
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("authMenu").style.display = "none";
}
function logout() {
  localStorage.removeItem("loggedInUser");
  currentUser = null;
  document.getElementById("mainApp").style.display = "none";
  document.getElementById("authMenu").style.display = "flex";
  showSection("login");
}
function showAuthForm(formType) {
  document.getElementById("authMenu").style.display = "none";
  showSection(formType);
}
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  if (!username || !password) return;
  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Registration successful! Please login.");
  showSection("login");
});
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    currentUser = username;
    localStorage.setItem("loggedInUser", username);
    showMainApp();
    displayBooks(books);
  } else {
    alert("Invalid password/user name. Try again!");
  }
});
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const year = document.getElementById("year").value.trim();
  const imageInput = document.getElementById("image");
  if (!title || !author || !year || imageInput.files.length === 0) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    const newBook = {
      id: Date.now(),
      title,
      author,
      year,
      cover: event.target.result,
      status: "Available",
    };
    books.push(newBook);
    saveBooks();
    displayBooks(books);
    document.getElementById("bookForm").reset();
    showSection("bookList");
  };
  reader.readAsDataURL(imageInput.files[0]);
});
function displayBooks(bookList) {
  const tableBody = document.getElementById("bookTableBody");
  tableBody.innerHTML = "";
  bookList.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${book.cover}" alt="Cover"></td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.status}</td>
      <td><button onclick="deleteBook(${book.id})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  saveBooks();
  displayBooks(books);
}
function showAllBooks() {
  displayBooks(books);
  showSection("bookList");
}
function showAvailableBooks() {
  const available = books.filter((book) => book.status === "Available");
  displayBooks(available);
  showSection("bookList");
}
function promptBorrow() {
  const title = prompt("Enter the title of the book to borrow:");
  const book = books.find((b) => b.title.toLowerCase() === title.toLowerCase() && b.status === "Available");
  if (book) {
    book.status = "Borrowed";
    alert("Book borrowed!");
    saveBooks();
  } else {
    alert("Book not available or already borrowed.");
  }
  displayBooks(books);
}
function promptReturn() {
  const title = prompt("Enter the title of the book to return:");
  const book = books.find((b) => b.title.toLowerCase() === title.toLowerCase() && b.status === "Borrowed");
  if (book) {
    book.status = "Available";
    alert("Book returned!");
    saveBooks();
  } else {
    alert("Book not found or wasn't borrowed.");
  }
  displayBooks(books);
}
function promptSearch(type) {
  const keyword = prompt(`Enter ${type} to search:`);
  if (!keyword) return;
  const result = books.filter((book) =>
    book[type].toLowerCase().includes(keyword.toLowerCase())
  );
  displayBooks(result);
  showSection("bookList");
}
