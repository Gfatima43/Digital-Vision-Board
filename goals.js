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
});
const goals = {
   all: [
      "Start a side business",
      "Run 5km in 20 minutes",
      "Improve communication skills",
      "Read 12 books this year"
   ],
   career: [
      "Apply for a dream job",
      "Learn a new Programming Language",
      "Start a blog in your industry",
      "Build a strong LinkedIn profile"
   ],
   health: [
      "Drink 8 glasses of water daily",
      "Follow a workout plan for 30 days",
      "Eat home-cooked meals for a month",
      "Get 7+ hours of sleep every night"
   ],
   relationships: [
      "Call an old friend this week",
      "Plan a surprise for a loved one",
      "Make new friends this month",
      "Practice active listening"
   ],
   personal: [
      "Learn a new skill this month",
      "Start journaling every night",
      "Meditate for 10 minutes daily",
      "Reduce screen time by 30 minutes"
   ]
};

function generateGoal() {
   const category = document.getElementById("goalCategory").value;
   const goalList = category === "all" ? [...goals.career, ...goals.health, ...goals.relationships, ...goals.personal] : goals[category];
   const randomGoal = goalList[Math.floor(Math.random() * goalList.length)];
   document.getElementById("goalDisplay").innerText = randomGoal;
}

function saveGoal() {
   const goalText = document.getElementById("goalDisplay").innerText;
   if (!goalText || goalText.includes("Click")) return alert("Generate a goal first!");

   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   savedGoals.push({ text: goalText, status: "Not Started", deadline: "" });
   localStorage.setItem("savedGoals", JSON.stringify(savedGoals));

   displaySavedGoals();
}

function addCustomGoal() {
   const customGoalText = document.getElementById("customGoal").value;
   const deadline = document.getElementById("goalDeadline").value;

   if (!customGoalText) return alert("Enter a goal before adding!");

   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   savedGoals.push({ text: customGoalText, status: "Not Started", deadline });
   localStorage.setItem("savedGoals", JSON.stringify(savedGoals));

   document.getElementById("customGoal").value = "";
   document.getElementById("goalDeadline").value = "";
   displaySavedGoals();
}

function displaySavedGoals() {
   const savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   const goalList = document.getElementById("savedGoals");
   goalList.innerHTML = "";

   savedGoals.forEach((goal, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
         ${goal.text} - <strong>${goal.status}</strong>
         ${goal.deadline ? `(Deadline: ${goal.deadline})` : ""}
         <button onclick="updateStatus(${index}, 'In Progress')">⏳ In Progress</button>
         <button onclick="updateStatus(${index}, 'Completed')">✅ Completed</button>
         <button onclick="removeGoal(${index})">❌ Delete</button>
      `;
      goalList.appendChild(li);
   });
}

function updateStatus(index, newStatus) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   savedGoals[index].status = newStatus;
   localStorage.setItem("savedGoals", JSON.stringify(savedGoals));
   displaySavedGoals();
}

function removeGoal(index) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   savedGoals.splice(index, 1);
   localStorage.setItem("savedGoals", JSON.stringify(savedGoals));
   displaySavedGoals();
}

document.addEventListener("DOMContentLoaded", displaySavedGoals);

function addToGoogleCalendar(index) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   let goal = savedGoals[index];

   if (!goal.deadline) {
      alert("Please set a deadline for this goal before adding to Google Calendar!");
      return;
   }

   const eventTitle = encodeURIComponent(goal.text);
   const eventDate = goal.deadline.replace(/-/g, "");
   const googleCalendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDate}&details=Goal+from+Vision+Board`;

   window.open(googleCalendarURL, "_blank");
}

function updateChart() {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   let totalGoals = savedGoals.length;
   let completedGoals = savedGoals.filter(g => g.status === "Completed").length;

   let ctx = document.getElementById("progressChart").getContext("2d");
   if (window.myChart) window.myChart.destroy(); // Clear previous chart

   window.myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
         labels: ["Completed", "Not Completed"],
         datasets: [{
            data: [completedGoals, totalGoals - completedGoals],
            backgroundColor: ["#4caf50", "#ff3300"]
         }]
      },
      options: { responsive: true }
   });
}

document.addEventListener("DOMContentLoaded", updateChart);

function deleteGoal(index) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   let goalList = document.getElementById("goalList").children[index];
   goalList.style.opacity = "0";

   setTimeout(() => {
      savedGoals.splice(index, 1);
      localStorage.setItem("savedGoals", JSON.stringify(savedGoals));
      loadGoals();
   }, 300);
}

function loadGoals() {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   let goalList = document.getElementById("goalList");
   goalList.innerHTML = "";

   savedGoals.forEach((goal, index) => {
      let listItem = document.createElement("li");
      listItem.classList.add("goal-item");
      listItem.innerHTML = `
         <span class="goal-text">${goal.text}</span>
         <button class="delete-btn" onclick="deleteGoal(${index})">🗑️</button>
      `;

      listItem.querySelector(".goal-text").addEventListener("click", () => deleteGoal(index));
      goalList.appendChild(listItem);
   });
}

document.addEventListener("DOMContentLoaded", loadGoals);

// In dashboard.html's script section
function loadDashboardGoals() {
   const savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   const activeGoalsContainer = document.getElementById('activeGoals');
   const completedGoalsContainer = document.getElementById('completedGoals');
 
   activeGoalsContainer.innerHTML = '';
   completedGoalsContainer.innerHTML = '';
 
   savedGoals.forEach((goal, index) => {
     const card = document.createElement('div');
     card.className = 'goal-card';
     card.innerHTML = `
       <div class="status-indicator status-${goal.status.toLowerCase().replace(' ', '')}"></div>
       <h4>${goal.text}</h4>
       ${goal.deadline ? `<div class="goal-deadline">📅 ${goal.deadline}</div>` : ''}
       <div class="goal-actions">
         <button onclick="handleStatusUpdate(${index}, 'In Progress')">⏳</button>
         <button onclick="handleStatusUpdate(${index}, 'Completed')">✅</button>
         <button onclick="handleGoalDeletion(${index})">❌</button>
         ${goal.deadline ? `<button onclick="addToCalendar(${index})">📅</button>` : ''}
       </div>
     `;
     
     if (goal.status === 'Completed') {
       completedGoalsContainer.appendChild(card);
     } else {
       activeGoalsContainer.appendChild(card);
     }
   });
 }
 
 // Add these functions to dashboard's script
 function handleStatusUpdate(index, newStatus) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   savedGoals[index].status = newStatus;
   localStorage.setItem("savedGoals", JSON.stringify(savedGoals));
   updateDashboard();
 }
 
 function handleGoalDeletion(index) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   savedGoals.splice(index, 1);
   localStorage.setItem("savedGoals", JSON.stringify(savedGoals));
   updateDashboard();
 }
 
 function addToCalendar(index) {
   let savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
   let goal = savedGoals[index];
   // Existing calendar integration code
 }
 
 function updateDashboard() {
   updateDashboardChart();
   loadDashboardGoals();
 }
 
 // Update initialization
 document.addEventListener("DOMContentLoaded", () => {
   updateDashboard();
   window.addEventListener('storage', updateDashboard);
 });