document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const roleInput = document.getElementById("role");

  // Default role is farmer for this signup page
  roleInput.value = "farmer";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

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
      role: formData.get("role"),
    };

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Match the same key your dashboard uses for the popup
        sessionStorage.setItem("loginSuccess", "true");

        // Make sure redirect is set in backend
        window.location.href = result.redirect;
      } else {
        alert(result.message || "❌ Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  });
});
