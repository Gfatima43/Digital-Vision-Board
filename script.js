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
    } else {
        alert('Invalid credentials.');
    }
}