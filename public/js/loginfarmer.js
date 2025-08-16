
async function loginfarmer() {
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

  if (!remember) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "⚠️ Please check 'Remember me' to proceed.";
    return;
  }

  try {
    const res = await fetch("/auth/loginfarmer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        // ✅ Store login flag
        sessionStorage.setItem("loginSuccess", "true");

        // ✅ Store farmer dbName from backend
        sessionStorage.setItem("dbName", data.dbName); // example: "farmer1"

        // ✅ Redirect to dashboard
        window.location.href = "/dashboardfarmer";
      } else {
        errorMsg.style.display = "block";
        errorMsg.textContent = data.message || "❌ Invalid email or password.";
      }
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
