function handleSignup(e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  if (password !== confirmPassword) {
    alert("❌ Passwords do not match!");
    return false;
  }

  // Show success toast
  const toast = document.getElementById('toast');
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);

  // Optionally reset the form
  document.getElementById('signupForm').reset();
  return true;
}
