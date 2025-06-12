async function loadBooks() {
  const res = await fetch("http://localhost:3000/books");
  books = await res.json();
  displayBooks(books);
}

async function saveBook(book) {
  const res = await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  const data = await res.json();
  book.id = data.id;
  books.push(book);
  displayBooks(books);
}
