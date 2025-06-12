##JavaScript Code Theory##
🧩 Overview
This project implements a Book Management System using HTML, CSS, and JavaScript. It supports functionalities like user registration, login, 
logout, adding books, viewing all or available books, borrowing, returning, searching, and deleting books. Data is stored in the browser using 
Local Storage, ensuring persistence even after the page is reloaded.
👤 User Authentication System
Registration:

Users enter a username and password.
The data is saved to localStorage under the key "user" as a JSON string.
After successful registration, the user is prompted to log in.

Login:

Takes input from the login form.
Compares entered credentials with stored user data.
If valid, stores the username in localStorage as "loggedInUser" and displays the main application interface.

Logout:

Clears the "loggedInUser" value from localStorage.
Hides the main app and displays the login/register options.

📚 Book Management Features

Adding Books:

A form collects title, author, year, and an image file.
The image is read using FileReader and saved as a base64 string.
Each book object is assigned a unique id, and a default status of "Available".

Storing Books:

Books are stored in a JavaScript array books[].
This array is saved in localStorage as "books".

Deleting Books:

A book can be removed from the list by clicking the "Delete" button.
The book is identified by its unique id.

🔁 Application Navigation

Dynamic Section Display:

The showSection(id) function hides all sections and displays the requested one.
The main app is only shown after a successful login.

Auth Flow:

If a user is logged in ("loggedInUser" exists in localStorage), the app loads the book list.
Otherwise, the authentication menu is displayed.

📘 Additional Functionalities

View All Books:

Displays the entire book list using displayBooks().

Filter Available Books:

Filters and shows books where status === "Available".

Borrow a Book:

Prompts the user to enter a book title.
If available, changes the book's status to "Borrowed".

Return a Book:

Prompts the user to enter a book title.
If the book is borrowed, updates the status back to "Available".

Search Books:

Users can search by title, author, or year.
The results are dynamically displayed in the book table.

🛡️ Security Considerations

User data is stored in localStorage as plain text.
No encryption or password hashing is used.
This is acceptable for educational/demo purposes but not safe for real-world applications.

==============================================================================================================================================================

🎨 CSS Code - Theoretical Explanation
🌐 1. Body Styling
css
Copy
Edit
body {
  font-family: Arial, sans-serif;
  background: url('image.png') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
}
Font: Sets the global font to Arial, a clean and readable sans-serif typeface.

Background Image: Applies a centered background image (image.png) that doesn't repeat and remains fixed while scrolling.

Full-Screen Cover: The image is scaled to cover the entire background of the page.

Padding: Adds space inside the body for layout breathing room.

🧾 2. Headings (h1, h2)
css
Copy
Edit
h1, h2 {
  text-align: center;
  color: #2c3e50;
}
Text Alignment: Centers all top-level (h1, h2) headings.

Color: Uses a dark bluish-gray shade (#2c3e50) for a modern and clean appearance.

🔐 3. Authentication Button Section
css
Copy
Edit
.auth-buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
  justify-content: center;
}
Centering: Absolutely positions the buttons in the exact center of the screen (both vertically and horizontally).

Flex Layout: Uses flexbox for horizontal alignment and spacing.

Gap: Adds 20px space between the buttons.

css
Copy
Edit
.auth-buttons button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #34495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.auth-buttons button:hover {
  background-color: #2c3e50;
}
Button Style: Medium-sized buttons with rounded corners, dark background, and white text.

Hover Effect: Slight color darkening on hover for interactivity.

Transition: Smooth effect on hover due to transition duration.

📚 4. Navigation Menu (Menu Bar)
css
Copy
Edit
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
Flexbox Layout: Aligns all menu buttons in the center and wraps them if needed.

Gap: Ensures spacing between buttons.

Margin: Adds space below the menu.

css
Copy
Edit
.menu button {
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  background-color: #0097fc;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.menu button:hover {
  background-color: #2980b9;
}
Button Design: Bright blue buttons with a clean modern look.

Hover State: Slightly darker shade of blue for interaction feedback.

🧾 5. Form Styling
css
Copy
Edit
form {
  max-width: 500px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}
Centered Form: Limits width and centers it on the page.

White Card Look: White background with padding and rounded corners.

Shadow: Soft drop shadow adds depth and modern appeal.

css
Copy
Edit
input[type="text"], input[type="file"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}
Inputs: Full-width text and file inputs with padding and subtle borders.

Spacing: Margins create vertical spacing between fields.

css
Copy
Edit
button[type="submit"] {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #1e874b;
}
Submit Button: Green with rounded corners and white text.

Hover Effect: Darker green for interactivity.

🧱 6. Section Visibility Control
css
Copy
Edit
.section {
  display: none;
}
Default State: All app sections are hidden by default.

Shown Programmatically: JavaScript makes the required section visible when needed.

📊 7. Table Styling
css
Copy
Edit
table {
  width: 90%;
  margin: 20px auto;
  background: white;
  border-collapse: collapse;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
}
Layout: Centered, wide table with clean white background and shadow.

Border Radius: Soft, rounded corners give a card-like feel.

Collapse: Borders between cells are merged.

css
Copy
Edit
th, td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
Cell Formatting: Consistent padding and centered text.

Row Separation: Light gray border between rows.

📷 8. Table Images & Buttons
css
Copy
Edit
td img {
  width: 70px;
  height: auto;
  border-radius: 5px;
}
Images: Resized thumbnails with rounded edges for a polished look.

css
Copy
Edit
td button {
  padding: 6px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

td button:hover {
  background-color: #c0392b;
}
Delete Button: Styled in red to indicate danger or removal.

Hover Effect: Darker red for visual feedback.

==============================================================================================================================================================

📘 HTML Code

🧱 1. Basic Structure
html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Book Management System</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<!DOCTYPE html>: Declares the document as HTML5.

<html lang="en">: Specifies the language as English.

<head>: Contains metadata like character encoding and page title.

<link>: Connects the external stylesheet style.css for page styling.

🔐 2. Authentication Menu
html
Copy
Edit
<div id="authMenu" class="center-screen">
  <button onclick="showAuthForm('register')">Register</button>
  <button onclick="showAuthForm('login')">Login</button>
</div>
Purpose: Displays two central buttons—Register and Login—when no user is logged in.

onclick functions: Trigger JS functions to show respective forms.

class="center-screen": Likely used to center the menu on the screen using CSS.

📝 3. Register Form
html
Copy
Edit
<div id="register" class="section center-box">
  <h2>Register</h2>
  <form id="registerForm">
    <input type="text" id="regUsername" placeholder="Username" required>
    <input type="password" id="regPassword" placeholder="Password" required>
    <button type="submit">Register</button>
  </form>
</div>
Purpose: Hidden by default, this form allows new users to sign up.

Fields: Username and password.

Validation: required ensures inputs must be filled before submission.

Handled by: JavaScript code via registerForm's event listener.

🔐 4. Login Form
html
Copy
Edit
<div id="login" class="section center-box">
  <h2>Login</h2>
  <form id="loginForm">
    <input type="text" id="loginUsername" placeholder="Username" required>
    <input type="password" id="loginPassword" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</div>
Purpose: Also hidden by default, this lets existing users log in.

Similar structure to the register form.

JavaScript: Validates credentials against stored data in localStorage.

📚 5. Main App Interface
html
Copy
Edit
<div id="mainApp" style="display: none;">
  <h1>📚 Book Management System</h1>
Hidden initially: Only visible once a user is logged in.

Contains all book management features.

🔘 6. Menu Buttons
html
Copy
Edit
<div class="menu">
  <button onclick="showSection('add')">1. Add Book</button>
  <button onclick="showAllBooks()">2. Show All Books</button>
  ...
</div>
Navigation: Allows users to access different features:

Add a book

View all books

View available books

Borrow book

Return book

Search by title

Search by author

Logout

Each button is linked to a function in script.js.

📥 7. Add Book Form
html
Copy
Edit
<div id="add" class="section">
  <h2>Add a New Book</h2>
  <form id="bookForm">
    ...
  </form>
</div>
Form Fields:

Title

Author

Year

Book cover image

Form ID: bookForm, used in JavaScript to handle form submission.

Result: Adds a new book object to the system, with an uploaded cover image.

📄 8. Book List Table
html
Copy
Edit
<div class="section" id="bookList">
  <h2>Books List</h2>
  <table>
    <thead>...</thead>
    <tbody id="bookTableBody"></tbody>
  </table>
</div>
Purpose: Displays all books in a structured table format.

thead: Table headers like cover, title, author, year, status, and actions.

tbody: Populated dynamically via JavaScript using displayBooks() function.

Each row: Represents one book with a delete button.

🧠 9. Script Link
html
Copy
Edit
<script src="script.js"></script>
</body>
</html>
Connects the logic: Links the JavaScript file that handles registration, login, book actions, and UI updates.