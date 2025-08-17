function handleSignup(e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  if (password !== confirmPassword) {
    alert("❌ Passwords do not match!");
    return false;
  }

  // Optionally reset the form
  document.getElementById('signupForm').reset();
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const roleInput = document.getElementById("role");

  // 🔁 Set default role here (farmer or buyer)
  roleInput.value = "farmer"; // Change to "buyer" if needed

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // ⛔ Prevent default form submission

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      role: formData.get("role"), // ✅ Add this line
    };

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Set sessionStorage flag for popup on dashboard
        sessionStorage.setItem("signupSuccess", "true");
        // ✅ Store dbName from backend
  sessionStorage.setItem("dbName", result.dbName);


        // ✅ Redirect to dashboard
        window.location.href = '/loginfarmer';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  });
});

