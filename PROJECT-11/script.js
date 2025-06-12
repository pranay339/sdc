let studentList = [];
let currentUser = null;

const routes = {
  home: `
    <div class="text-center py-5">
      <div class="card shadow-lg border-0">
        <div class="card-body p-5">
          <i class="bi bi-mortarboard-fill display-1 text-primary mb-4"></i>
          <h1 class="display-4 mb-4">Welcome to Student Management System</h1>
          <p class="lead text-muted mb-4">Manage student data easily and efficiently.</p>
          <div class="d-flex justify-content-center gap-3">
            <button class="btn btn-primary btn-lg" onclick="navigate('students')">
              <i class="bi bi-people-fill me-2"></i>View Students
            </button>
            <button class="btn btn-outline-primary btn-lg" onclick="navigate('add')">
              <i class="bi bi-person-plus-fill me-2"></i>Add Student
            </button>
          </div>
        </div>
      </div>
    </div>`,

  add: `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
            <h3 class="card-title mb-4">
              <i class="bi bi-person-plus-fill text-primary me-2"></i>Add New Student
            </h3>
            <form onsubmit="addStudent(event)" class="needs-validation" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Student Number</label>
                  <input id="studentNumber" class="form-control" placeholder="Enter student number" required />
                  <div class="invalid-feedback">Please enter a student number.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input id="email" type="email" class="form-control" placeholder="Enter email" required />
                  <div class="invalid-feedback">Please enter a valid email.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input id="firstName" class="form-control" placeholder="Enter first name" required />
                  <div class="invalid-feedback">Please enter first name.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input id="lastName" class="form-control" placeholder="Enter last name" required />
                  <div class="invalid-feedback">Please enter last name.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Field of Study</label>
                  <input id="field" class="form-control" placeholder="Enter field of study" required />
                  <div class="invalid-feedback">Please enter field of study.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">GPA</label>
                  <input id="gpa" class="form-control" type="number" step="0.01" min="0" max="10" placeholder="Enter GPA (0-10)" required />
                  <div class="invalid-feedback">Please enter a valid GPA (0-10).</div>
                </div>
              </div>
              <div class="mt-4">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-person-plus-fill me-2"></i>Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>`,

  students: `
    <div class="card shadow-lg border-0">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="card-title mb-0">
            <i class="bi bi-people-fill text-primary me-2"></i>All Students
          </h3>
          <div class="input-group" style="max-width: 300px;">
            <input type="text" class="form-control" id="searchInput" placeholder="Search students...">
            <button class="btn btn-outline-primary" type="button" onclick="searchStudents()">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Field</th>
                <th>GPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="studentTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>`,

  login: `
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
            <h3 class="card-title mb-4">
              <i class="bi bi-box-arrow-in-right text-primary me-2"></i>Login
            </h3>
            <form onsubmit="login(event)" class="needs-validation" novalidate>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input id="loginEmail" type="email" class="form-control" placeholder="Enter your email" required />
                <div class="invalid-feedback">Please enter a valid email.</div>
              </div>
              <div class="mb-4">
                <label class="form-label">Password</label>
                <input id="loginPassword" type="password" class="form-control" placeholder="Enter your password" required />
                <div class="invalid-feedback">Please enter your password.</div>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                <i class="bi bi-box-arrow-in-right me-2"></i>Login
              </button>
            </form>
            <div class="text-center mt-3">
              <p class="mb-0">Don't have an account? <a href="#" onclick="navigate('register')" class="text-primary">Register here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>`,

  register: `
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
            <h3 class="card-title mb-4">
              <i class="bi bi-person-plus text-primary me-2"></i>Register
            </h3>
            <form onsubmit="register(event)" class="needs-validation" novalidate>
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input id="regName" class="form-control" placeholder="Enter your full name" required />
                <div class="invalid-feedback">Please enter your name.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input id="regEmail" type="email" class="form-control" placeholder="Enter your email" required />
                <div class="invalid-feedback">Please enter a valid email.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Field of Study</label>
                <input id="regField" class="form-control" placeholder="Enter your field of study" required />
                <div class="invalid-feedback">Please enter your field of study.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input id="regPassword" type="password" class="form-control" placeholder="Create a password" required />
                <div class="invalid-feedback">Please enter a valid password.</div>
              </div>
              <div class="mb-4">
                <label class="form-label">Confirm Password</label>
                <input id="regConfirm" type="password" class="form-control" placeholder="Confirm your password" required />
                <div class="invalid-feedback">Passwords do not match.</div>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                <i class="bi bi-person-plus me-2"></i>Register
              </button>
            </form>
            <div class="text-center mt-3">
              <p class="mb-0">Already have an account? <a href="#" onclick="navigate('login')" class="text-primary">Login here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>`,

  contact: `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
            <h3 class="card-title mb-4">
              <i class="bi bi-envelope-fill text-primary me-2"></i>Contact Us
            </h3>
            <div class="row g-4">
              <div class="col-md-6">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-envelope-fill text-primary fs-4 me-3"></i>
                  <div>
                    <h5 class="mb-1">Email</h5>
                    <p class="mb-0">support@studentsystem.com</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-telephone-fill text-primary fs-4 me-3"></i>
                  <div>
                    <h5 class="mb-1">Phone</h5>
                    <p class="mb-0">+123 456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,

  about: `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg border-0">
          <div class="card-body p-4">
            <h3 class="card-title mb-4">
              <i class="bi bi-info-circle-fill text-primary me-2"></i>About
            </h3>
            <p class="lead">This Student Management System is a modern web application built using HTML, CSS, and JavaScript.</p>
            <p>Features include:</p>
            <ul class="list-unstyled">
              <li><i class="bi bi-check-circle-fill text-primary me-2"></i>Student registration and management</li>
              <li><i class="bi bi-check-circle-fill text-primary me-2"></i>Secure login system</li>
              <li><i class="bi bi-check-circle-fill text-primary me-2"></i>Responsive design for all devices</li>
              <li><i class="bi bi-check-circle-fill text-primary me-2"></i>Modern and intuitive user interface</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
};

function showLoading() {
  document.getElementById('loadingSpinner').classList.remove('d-none');
}

function hideLoading() {
  document.getElementById('loadingSpinner').classList.add('d-none');
}

function navigate(page) {
  showLoading();
  setTimeout(() => {
    document.getElementById("app").innerHTML = routes[page] || "<p>Page not found</p>";
    if (page === "students") renderStudentTable();
    hideLoading();
  }, 300);
}

function addStudent(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const student = {
    number: document.getElementById("studentNumber").value,
    first: document.getElementById("firstName").value,
    last: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    field: document.getElementById("field").value,
    gpa: document.getElementById("gpa").value,
  };

  studentList.push(student);
  saveToStorage();
  showModalMessage("Student added successfully!");
  navigate("students");
}

function renderStudentTable() {
  const tbody = document.getElementById("studentTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  
  studentList.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.number}</td>
        <td>${s.first} ${s.last}</td>
        <td>${s.email}</td>
        <td>${s.field}</td>
        <td>${s.gpa}</td>
        <td>
          <div class="btn-group">
            <button onclick="editStudent(${i})" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button onclick="deleteStudent(${i})" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </td>
      </tr>`;
  });
}

function searchStudents() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredStudents = studentList.filter(student => 
    student.first.toLowerCase().includes(searchTerm) ||
    student.last.toLowerCase().includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm) ||
    student.number.toLowerCase().includes(searchTerm)
  );
  
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";
  
  filteredStudents.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.number}</td>
        <td>${s.first} ${s.last}</td>
        <td>${s.email}</td>
        <td>${s.field}</td>
        <td>${s.gpa}</td>
        <td>
          <div class="btn-group">
            <button onclick="editStudent(${i})" class="btn btn-sm btn-outline-primary">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button onclick="deleteStudent(${i})" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </td>
      </tr>`;
  });
}

function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    studentList.splice(index, 1);
    saveToStorage();
    renderStudentTable();
    showModalMessage("Student deleted successfully!");
  }
}

function editStudent(index) {
  const student = studentList[index];
  // Implement edit functionality
  showModalMessage("Edit functionality coming soon!");
}

function register(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const field = document.getElementById("regField").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;

  if (password !== confirm) {
    showModalMessage("Passwords do not match!");
    return;
  }

  const passwordValid = validatePassword(password);
  if (!passwordValid.valid) {
    showModalMessage(passwordValid.message);
    return;
  }

  showModalMessage(`Registration successful for ${name}!`);
  navigate("login");
}

function login(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const passwordValid = validatePassword(password);
  if (!passwordValid.valid) {
    showModalMessage(passwordValid.message);
    return;
  }

  currentUser = email;
  showModalMessage(`Welcome back, ${email}!`);
  navigate("home");
}

function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must include at least one uppercase letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must include at least one number." };
  }
  return { valid: true };
}

function showModalMessage(msg, title = "Notification") {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = msg;
  new bootstrap.Modal(document.getElementById("msgModal")).show();
}

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(studentList));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function loadFromStorage() {
  const data = localStorage.getItem("students");
  if (data) studentList = JSON.parse(data);
  
  const userData = localStorage.getItem("currentUser");
  if (userData) currentUser = JSON.parse(userData);
}

window.onload = function () {
  loadFromStorage();
  navigate("home");
};
