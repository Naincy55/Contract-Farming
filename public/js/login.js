const toggle = document.getElementById('role-toggle');
const roleText = document.getElementById('role-text');
const body = document.getElementById('page-body');
const loginButton = document.getElementById('login-button');

// Initial background
body.style.backgroundImage = 'url("https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600")';

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    roleText.textContent = 'Login as Farmer';
    body.style.backgroundImage = 'url("https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
    loginButton.classList.remove('buyer');
    loginButton.classList.add('farmer');
  } else {
    roleText.textContent = 'Login as Buyer';
    body.style.backgroundImage = 'url("https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
    loginButton.classList.remove('farmer');
    loginButton.classList.add('buyer');
  }
});

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const error = document.getElementById('error');

  if (email === "" || password === "") {
    error.style.display = "block";
    error.textContent = "Please fill in all fields.";
    return;
  }

  if (email === "test@example.com" && password === "1234") {
    alert("Login successful!");
    error.style.display = "none";
  } else {
    error.style.display = "block";
    error.textContent = "Invalid email or password.";
  }
}
