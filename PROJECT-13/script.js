const defaultUserName = "Pranavika";
window.onload = () => {
loadUser();
loadTasks();
startReminderChecker();
requestNotificationPermission();
};
function loadUser() {
let user = localStorage.getItem("userName");
if (!user) {
    user = defaultUserName;
    localStorage.setItem("userName", user);
}
document.getElementById("welcomeMsg").innerText = `Welcome, ${user}!`;
}
document.getElementById("changeUserBtn").onclick = () => {
const newUser = prompt("Enter new name:");
if (newUser && newUser.trim() !== "") {
    localStorage.setItem("userName", newUser.trim());
    loadUser();
}
};
function loadTasks() {
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => createTaskElement(task.text, task.dueDate, task.dueTime, task.notified));
}
function addTask() {
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const dueTimeInput = document.getElementById('dueTime');
const taskText = taskInput.value.trim();
const dueDate = dueDateInput.value;
const dueTime = dueTimeInput.value;
if (!taskText || !dueDate || !dueTime) {
    alert("Please enter task, date and time.");
    return;
}
createTaskElement(taskText, dueDate, dueTime);
saveTask(taskText, dueDate, dueTime);
taskInput.value = "";
dueDateInput.value = "";
dueTimeInput.value = "";
}
function createTaskElement(text, dueDate, dueTime, notified = false) {
const li = document.createElement('li');
li.dataset.text = text;
li.dataset.date = dueDate;
li.dataset.time = dueTime;
const due = new Date(`${dueDate}T${dueTime}`);
const now = new Date();
if (due < now) {
    li.classList.add("overdue");
} else {
    const today = new Date();
    if (due.toDateString() === today.toDateString()) {
    li.classList.add("today");
    }
}
const span = document.createElement('span');
span.innerHTML = `<strong>${text}</strong><br><small>Due: ${dueDate} at ${dueTime}</small>`;
span.onclick = () => {
    li.classList.add("completed");
    setTimeout(() => {
    li.remove();
    deleteTask(text, dueDate, dueTime);
    }, 800);
};
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';
deleteBtn.onclick = () => {
    li.remove();
    deleteTask(text, dueDate, dueTime);
};
li.appendChild(span);
li.appendChild(deleteBtn);
document.getElementById('taskList').appendChild(li);
}
function saveTask(text, dueDate, dueTime) {
const existing = JSON.parse(localStorage.getItem('tasks')) || [];
existing.push({ text, dueDate, dueTime, notified: false });
localStorage.setItem('tasks', JSON.stringify(existing));
}
function deleteTask(text, dueDate, dueTime) {
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks = tasks.filter(task => !(task.text === text && task.dueDate === dueDate && task.dueTime === dueTime));
localStorage.setItem('tasks', JSON.stringify(tasks));
}
function startReminderChecker() {
setInterval(() => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const now = new Date();
    const updatedTasks = [];
    tasks.forEach((task) => {
const taskTime = new Date(`${task.dueDate}T${task.dueTime}`);
    const diff = taskTime - now;
if (!task.notified && Math.abs(diff) < 30000) {
        notifyUser(task.text);
        playReminderSound();
        task.notified = true;
}
    if (diff < -60000) {
        const allListItems = document.querySelectorAll("#taskList li");
        allListItems.forEach(li => {
        if (
            li.dataset.text === task.text &&
            li.dataset.date === task.dueDate &&
            li.dataset.time === task.dueTime
        ) {
            li.remove();
        }
        });
        return; // skip pushing this task (removes it)
    }
    updatedTasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}, 30000);
}
function notifyUser(taskText) {
if (Notification.permission === "granted") {
    new Notification("Task Reminder", {
    body: `Task due: ${taskText}`,
    icon: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
    });
}
}
function requestNotificationPermission() {
if ("Notification" in window) {
    if (Notification.permission !== "granted") {
    Notification.requestPermission();
    }
}
}
function playReminderSound() {
const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
audio.play();
}