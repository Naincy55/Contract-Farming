
const roleText = document.getElementById("role-text");
const body = document.getElementById("page-body");
const loginButton = document.getElementById("login-button");

// Initial background
body.style.backgroundImage = 'url("https://images.pexels.com/photos/25033570/pexels-photo-25033570.jpeg")';


body.style.backgroundSize = "cover";
body.style.backgroundPosition = "center";
body.style.backgroundRepeat = "no-repeat";



async function loginbuyer() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;
  const errorMsg = document.getElementById("error");

  errorMsg.style.display = "none"; // Clear any previous error

  if (!email || !password) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "⚠️ Please fill in all fields.";
    return;
  }

  // ✅ Check if "Remember me" is not checked
  if (!remember) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "⚠️ Please check 'Remember me' to proceed.";
    return;
  }

  try {
    const res = await fetch("/auth/loginbuyer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // ✅ Set a flag in sessionStorage before redirecting
      sessionStorage.setItem("loginSuccess", "true");

      // ✅ Redirect to dashboard
      window.location.href = "/dashboardbuyer";

     
    } else {
      const text = await res.text();
      errorMsg.style.display = "block";
      errorMsg.textContent = text || "❌ Invalid email or password.";
    }
  } catch (err) {
    console.error("Login error:", err);
    errorMsg.style.display = "block";
    errorMsg.textContent = "❌ Server error. Please try again later.";
  }
}
