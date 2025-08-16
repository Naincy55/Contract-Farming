document.addEventListener("DOMContentLoaded", () => {
  const loginSuccess = sessionStorage.getItem("loginSuccess");

  if (loginSuccess === "true") {
    showLoginSuccess();
    // ✅ Clear the flag so it doesn't show every time
    sessionStorage.removeItem("loginSuccess");
  }
});

// ✅ Function to show success message
function showLoginSuccess() {
  const successBox = document.createElement("div");
  successBox.textContent = "✅ Login Successful!";
  successBox.style.position = "fixed";
  successBox.style.top = "40%";
  successBox.style.left = "50%";
  successBox.style.transform = "translate(-50%, -50%)";
  successBox.style.background = "#fff";
  successBox.style.color = "green";
  successBox.style.padding = "20px 30px";
  successBox.style.borderRadius = "12px";
  successBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  successBox.style.fontSize = "18px";
  successBox.style.zIndex = "999";

  document.body.appendChild(successBox);

  // Remove after 3 seconds
  setTimeout(() => {
    successBox.remove();
  }, 3000);
}
