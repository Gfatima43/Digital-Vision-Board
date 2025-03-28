function toggleForms() {
    document.getElementById('signup').classList.toggle('hidden');
    document.getElementById('login').classList.toggle('hidden');
}

function signup() {
    let username = document.getElementById('signupUsername').value;
    let password = document.getElementById('signupPassword').value;
    if (username && password) {
        localStorage.setItem(username, password);
        alert('Signup successful! You can now login.');
        toggleForms();
    } else {
        alert('Please enter valid details.');
    }
}

function login() {
    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;
    let storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        alert('Login successful!');
        window.location.href = "index.html";
    } else {
        alert('Invalid credentials.');
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".toggle");
    const h = document.querySelector(".h");
    const home = document.querySelector(".home");
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      home.classList.toggle("close");
      h.classList.toggle("close");
    });
  });
  function logout() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
  }