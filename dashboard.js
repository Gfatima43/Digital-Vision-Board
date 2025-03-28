document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".toggle");
    const home = document.querySelector(".home");
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      home.classList.toggle("close");
      h.classList.toggle("close");
    });
  });

  const taskInput = document.getElementById('taskInput');
  const todoList = document.getElementById('todoList');

  taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `
        <input type="checkbox">
        <span>${this.value}</span>
        <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
      `;
      todoList.appendChild(li);
      this.value = '';
    }
  });

  // Goal Progress Chart
  function updateDashboardChart() {
    const savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
    const statusCounts = {
      completed: savedGoals.filter(g => g.status === "Completed").length,
      inprogress: savedGoals.filter(g => g.status === "In Progress").length,
      notstarted: savedGoals.filter(g => g.status === "Not Started").length
    };

    const ctx = document.getElementById('progressChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          data: [statusCounts.completed, statusCounts.inprogress, statusCounts.notstarted],
          backgroundColor: ['#A58D79', '#FFB347', '#D2CBC4'],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { enabled: true }
        }
      }
    });
  }

  // Load Goals Functionality
  function loadDashboardGoals() {
    const savedGoals = JSON.parse(localStorage.getItem("savedGoals")) || [];
    const activeGoalsContainer = document.getElementById('activeGoals');
    const completedGoalsContainer = document.getElementById('completedGoals');

    activeGoalsContainer.innerHTML = '';
    completedGoalsContainer.innerHTML = '';

    savedGoals.forEach(goal => {
      const card = document.createElement('div');
      card.className = 'goal-card';
      card.innerHTML = `
        <div class="status-indicator status-${goal.status.toLowerCase().replace(' ', '')}"></div>
        <h4>${goal.text}</h4>
        ${goal.deadline ? `<div class="goal-deadline">📅 ${goal.deadline}</div>` : ''}
        <div class="goal-actions">
          <span class="status-badge">${goal.status}</span>
        </div>
      `;

      if (goal.status === 'Completed') {
        completedGoalsContainer.appendChild(card);
      } else {
        activeGoalsContainer.appendChild(card);
      }
    });
  }

  // Initialize Dashboard
  document.addEventListener("DOMContentLoaded", () => {
    updateDashboardChart();
    loadDashboardGoals();
  });

  // Update on storage changes
  window.addEventListener('storage', () => {
    updateDashboardChart();
    loadDashboardGoals();
  });

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
