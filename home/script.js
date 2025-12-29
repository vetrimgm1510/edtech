

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 150) {
      element.classList.add('visible');
    }
  });
}

// Smooth scrolling
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute('href'));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = counter.textContent;
    const number = parseInt(target.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= number) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        if (target.includes('k')) counter.textContent = Math.floor(current / 1000) + 'k+';
        else if (target.includes('%')) counter.textContent = Math.floor(current) + '%';
        else counter.textContent = Math.floor(current) + '+';
      }
    }, 16);
  });
}

// Init
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
  createParticles();
  smoothScroll();
  animateOnScroll();
  const statsSection = document.querySelector('.stats');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(statsSection);
});

// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelector('.hero').style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Modal controls
const modal = document.getElementById("getStartedModal");
const getStartedBtn = document.querySelector(".btn-get-started");

getStartedBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

// Close modal
function closeModal() {
  modal.style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("getStartedModal");
  const getStartedBtn = document.querySelector(".btn-get-started");
  const form = document.getElementById("getStartedForm");
  const successMessage = document.getElementById("successMessage");
  const modalTitle = document.getElementById("modalTitle");

  // Open modal
  getStartedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Close modal
  window.closeModal = function () {
    modal.style.display = "none";
    modalTitle.textContent = "Get Started";
    form.style.display = "block";
    successMessage.style.display = "none";
    form.reset();
  };

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
// Handle form submit
  
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show success immediately
  document.getElementById("modalTitle").textContent = "Thank You";
  form.style.display = "none";
  document.getElementById("successMessage").style.display = "block";

  // Prepare data to send
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    program: document.getElementById("program").value
  };

  // Send data asynchronously
  fetch("https://script.google.com/macros/s/AKfycbyvJazFEYi_zz620wwG5h621Xftiieka6wo71I_O--TgySWYYBnsMrMcAwmWtpwj-MjrQ/exec", {  // Replace with your Apps Script Web App URL
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(res => console.log("Form data sent successfully"))
  .catch(err => console.error("Error sending form data:", err));
});


});

document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();

    const parent = this.closest('.dropdown');
    const isOpen = parent.classList.contains('open');

    // Close all dropdowns
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));

    // Toggle this one
    if (!isOpen) {
      parent.classList.add('open');
    }
  });
});

// Close dropdowns when clicking outside
window.addEventListener('click', () => {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
});





const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});


function autoScrollGallery() {
  const galleryScroll = document.querySelector('.gallery-scroll');
  if (!galleryScroll) return;

  // Only activate on mobile/tablet
  if (window.innerWidth > 900) return;

  let scrollAmount = 0;
  const maxScrollLeft = galleryScroll.scrollWidth - galleryScroll.clientWidth;

  function step() {
    scrollAmount += 1; // scroll speed in pixels per frame
    if(scrollAmount >= maxScrollLeft) {
      scrollAmount = 0; // Reset scroll to start for infinite effect
    }
    galleryScroll.scrollLeft = scrollAmount;
    requestAnimationFrame(step);
  }
  step();
}







// demo modal
const demoModal = document.getElementById("demoModal");
const openDemo = document.getElementById("openDemo");
const closeDemo = document.getElementById("closeDemo");
const demoForm = document.getElementById("demoForm");
const thankYou = document.getElementById("demoThankYou");

// Open modal
openDemo.addEventListener("click", () => demoModal.style.display = "flex");

// Close modal
closeDemo.addEventListener("click", () => demoModal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === demoModal) demoModal.style.display = "none";
});

// Handle form submit
demoForm.addEventListener("submit", e => {
  e.preventDefault();

  demoModal.style.display = "none";
  thankYou.classList.add("show");

  setTimeout(() => thankYou.classList.remove("show"), 3000);

  // Send to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycbzBFpP4jD6luExm0X7TbXzBpMOvySKD572nbOTUhokcCtbluSfOs96OxKRVYQrp49qg3w/exec", {
    method: "POST",
    mode: "no-cors",
    body: new FormData(demoForm)
  }).catch(err => console.error("Error:", err));

  demoForm.reset();
});
