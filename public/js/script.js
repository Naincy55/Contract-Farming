// Slideshow
let slides = document.querySelectorAll('.slide');
let index = 0;
setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 4000);

// AOS Initialization
AOS.init();

// Typed.js Effect
var typed = new Typed("#typed", {
  strings: ["Welcome to CropSet", "Connecting Farmers & Buyers", "Assured Contract Farming System"],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});
