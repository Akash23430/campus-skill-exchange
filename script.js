const users = JSON.parse(localStorage.getItem("users")) || []; // Store users in localStorage
let currentUser = null;

// Check if there's a logged-in user
if (localStorage.getItem("loggedInUser")) {
    currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    showUserDetails();
}

document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("register-btn").addEventListener("click", register);
document.getElementById("logout-btn").addEventListener("click", logout);

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        showUserDetails();
    } else {
        alert("Invalid credentials.");
    }
}

function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (users.find(u => u.username === username)) {
        alert("Username already taken.");
        return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
}

function showUserDetails() {
    document.getElementById("user-details").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";

    document.getElementById("user-info").innerText = `Welcome, ${currentUser.username}`;
}

function logout() {
    currentUser = null;
    localStorage.removeItem("loggedInUser");
    document.getElementById("user-details").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "block";
}
