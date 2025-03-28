document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".toggle");
    const h = document.querySelector(".h");
    const home = document.querySelector("main");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        home.classList.toggle("close");
        h.classList.toggle("close");
    });

    loadReminders();
    loadTodos();
});

const notificationSound = new Audio("mixkit-happy-bells-notification-937.wav");
function scheduleNotification(reminder) {
    const reminderTime = new Date(reminder.time).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = reminderTime - currentTime;

    if (timeDifference > 0) {
        setTimeout(() => {
            showAnimatedNotification(reminder.text);
        }, timeDifference);
    }
}



function setReminder() {
    const date = document.getElementById("reminderDate").value;
    const time = document.getElementById("reminderTime").value;
    const text = document.getElementById("reminderText").value;
    
    if (!date || !time || !text) {
        alert("Please enter a valid date, time, and reminder message.");
        return;
    }
    console.log("Saving Reminder:", { date, time, text });
    console.log("Stored Reminders:", JSON.parse(localStorage.getItem("reminders")));

    const reminder = { time: new Date(`${date}T${time}`).toISOString(), text };
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    scheduleNotification(reminder);
    loadReminders();
}

function loadReminders() {
    const reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = "<h3>Upcoming Reminders</h3>";
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.forEach((reminder, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${new Date(reminder.time).toLocaleString()}</strong>: ${reminder.text} <button onclick="deleteReminder(${index})">X</button></p>`;
        reminderList.appendChild(div);
    });
}

function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    loadReminders();
}

function addTodo() {
    const text = document.getElementById("todoText").value;
    if (!text) return;
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(text);
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
}

function loadTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "<h3>Tasks</h3>";
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${todo} <button onclick="deleteTodo(${index})">X</button>`;
        todoList.appendChild(li);
    });
}

function deleteTodo(index) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
}

function showAnimatedNotification(message) {
    notificationSound.play().catch(error => console.log("Audio play error:", error));
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}