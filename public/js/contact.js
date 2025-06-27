

function showToast() {
    event.preventDefault(); // Prevent form from submitting immediately
    document.getElementById('toast').style.display = 'block';
    setTimeout(function() {
        document.getElementById('toast').style.display = 'none';
        document.getElementById('contact-form').submit(); // Now submit the form
    }, 2000); // Show toast for 2 seconds
}