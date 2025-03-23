loadReminders();
const notificationSound = new Audio("mixkit-happy-bells-notification-937.wav");

function setReminder() {
    const date = document.getElementById("reminderDate").value;
    const time = document.getElementById("reminderTime").value;
    const text = document.getElementById("reminderText").value;
    
    if (!date || !time || !text) {
        alert("Please enter a valid date, time, and reminder message.");
        return;
    }
    
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    const reminderDate = new Date(year, month - 1, day, hour, minute);

    if (isNaN(reminderDate.getTime())) {
        alert("Invalid date or time. Please check your input.");
        return;
    }

    const reminder = { time: reminderDate.toISOString(), text };

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
        const reminderDate = new Date(reminder.time);
        const formattedTime = reminderDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
        const formattedDate = reminderDate.toLocaleDateString();

        const div = document.createElement("div");
        div.innerHTML = `
            <p>
                <strong>${formattedDate} ${formattedTime}</strong>: ${reminder.text}
                <button onclick="deleteReminder(${index})" class="delete-btn">
                    <img src="letter-x.png" alt="Delete" class="delete-icon">
                </button>
            </p>
        `;
        reminderList.appendChild(div);
    });
}


function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    loadReminders();
}

function scheduleNotification(reminder) {
    const reminderTime = new Date(reminder.time).getTime();
    const now = Date.now();
    const delay = reminderTime - now;
    
    if (delay > 0) {
        setTimeout(() => {
            showAnimatedNotification(reminder.text);
        }, delay);
    }
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
