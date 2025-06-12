✅ Student Management System – Code Summary
##HTML Structure (index.html)##
Defines the basic layout: a top Bootstrap navbar and a dynamic content <div id="app"> where pages load.
Uses CDN links for Bootstrap and icons.

##Routing (Single Page Navigation)##
The routes object in script.js holds HTML templates for each page: Home, Add Student, and All Students.
The navigate(page) function swaps content in #app without reloading the page.

##Adding a Student##
addStudent() collects form values from the "Add Student" page.
Pushes them into the studentList array and saves to localStorage.
Redirects to the "All Students" page automatically.

##Displaying Students##
renderStudentTable() generates rows in an HTML table from the studentList array.
It runs every time you view the student list to show the latest data.

##Deleting a Student##
deleteStudent(index) removes the student at the given index from the array.
Calls saveToStorage() to update localStorage and re-renders the table.

##Local Storage Integration##
saveToStorage() serializes studentList to JSON and stores it in the browser.
loadFromStorage() loads the data back on page reload and populates studentList.

##Bootstrap for Styling##
Uses Bootstrap 5 for layout, colors, forms, buttons, and table styling.
Ensures responsive design and a clean UI without writing much CSS.

##Page Load Handling##
On window.onload, the app:
Loads saved student data from localStorage.
Loads the Home page by default.
##Client-Side Only##
There is no backend (like Django or PHP).
All data storage and logic are handled in the browser using JavaScript and localStorage.

##Reusable + Extendable##
Easy to add features like edit, search, or sort.
Works offline and doesn't require server deployment for basic use.