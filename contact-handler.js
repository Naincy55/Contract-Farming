const form = document.getElementById("contact-form");
const toast = document.getElementById("toast");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from reloading the page

  const data = new FormData(form);
  const action = "https://formspree.io/f/mrbkolnq";

  try {
    const response = await fetch(action, {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showToast("Thank you! Your message has been sent.");
      form.reset();
    } else {
      showToast("Oops! There was a problem submitting your form.");
    }
  } catch (error) {
    showToast("Network error. Please try again later.");
  }
});

function showToast(message) {
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}
