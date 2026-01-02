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
  const heroElement = document.querySelector('.hero');
  if (heroElement) {
    heroElement.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Modal controls
const modal = document.getElementById("loginModal");
const loginBtn = document.querySelector(".btn-login");

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });
}

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

// Google Login function
function loginWithGoogle() {
  if (typeof google !== 'undefined') {
    // Render button with Google styling
    google.accounts.id.renderButton(
      document.querySelector('.google-login-btn'),
      { 
        theme: 'outline', 
        size: 'large',
        text: 'signin_with'
      }
    );
  } else {
    alert('Google Sign-In is loading. Please try again.');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("loginModal");
  const loginBtn = document.querySelector(".btn-login");
  const form = document.getElementById("loginForm");
  const successMessage = document.getElementById("successMessage");
  const modalTitle = document.getElementById("modalTitle");

  // Open modal
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block";
    });
  }

  // Close modal
  window.closeModal = function () {
    modal.style.display = "none";
    modalTitle.textContent = "Login";
    form.style.display = "block";
    successMessage.style.display = "none";
    form.reset();
  };

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle form submit
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show success immediately
      document.getElementById("modalTitle").textContent = "Login Successful";
      form.style.display = "none";
      document.getElementById("successMessage").style.display = "block";

      // Prepare data to send
      const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        remember: document.querySelector('input[name="remember"]').checked
      };

      // Send data asynchronously (placeholder for login API)
      console.log("Login attempt:", formData);
      // fetch("/api/login", {
      //   method: "POST",
      //   body: JSON.stringify(formData)
      // })
      // .then(res => console.log("Login successful"))
      // .catch(err => console.error("Error during login:", err));
    });
  }
});

// Dropdown functionality
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

// ========== IMPROVED HAMBURGER NAVIGATION ==========
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  // Toggle menu on hamburger click
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });

  // Close menu when a link is clicked (mobile)
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  });
}
// ========== END HAMBURGER NAVIGATION ==========

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

if (openDemo) {
  // Open modal
  openDemo.addEventListener("click", () => demoModal.style.display = "flex");
}

if (closeDemo) {
  // Close modal
  closeDemo.addEventListener("click", () => demoModal.style.display = "none");
}

window.addEventListener("click", e => {
  if (e.target === demoModal) demoModal.style.display = "none";
});

// Handle form submit
if (demoForm) {
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
}

// Tab switching for contact slider
const tabButtons = document.querySelectorAll('.tab');
const slideElements = document.querySelectorAll('.slide');

tabButtons.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and slides
    tabButtons.forEach(t => t.classList.remove('active'));
    slideElements.forEach(s => s.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Show corresponding slide
    const tabName = tab.getAttribute('data-tab');
    const activeSlide = document.getElementById(tabName);
    if (activeSlide) {
      activeSlide.classList.add('active');
    }
  });
});

// PDF Download Function
function downloadPDF(filename) {
  const link = document.createElement('a');
  link.href = '/' + filename;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Chat functionality for Why Choose Us section
let chatMessages = [
  {
    icon: 'fa-solid fa-user',
    name: 'Alex Johnson',
    message: 'Just completed the Web Development course! The projects were amazing.',
    time: '2m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'Sarah Chen',
    message: 'The AI/ML course exceeded my expectations. Highly recommend!',
    time: '5m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'Mike Rodriguez',
    message: 'Got my first job offer thanks to the internship program!',
    time: '10m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'Emma Davis',
    message: 'The mentors are incredibly knowledgeable and supportive.',
    time: '15m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'James Wilson',
    message: 'Best investment in my career. The skills I learned are invaluable.',
    time: '20m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'Lisa Park',
    message: 'The community here is so active and helpful!',
    time: '25m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'David Kim',
    message: 'The data science course helped me land a great job!',
    time: 'just now'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'Maria Garcia',
    message: 'Amazing support from the instructors. Highly recommended!',
    time: '1m ago'
  },
  {
    icon: 'fa-solid fa-user',
    name: 'Tom Anderson',
    message: 'Just enrolled in the Cloud Computing course. Excited!',
    time: '3m ago'
  }
];

let currentChatIndex = 0;
let chatInterval;

function addChatMessage() { 
  const chatList = document.getElementById('chatList');
  if (!chatList) return;

  // Get next message
  const chat = chatMessages[currentChatIndex % chatMessages.length];
  currentChatIndex++;

  // Create chat item
  const chatItem = document.createElement('div');
  chatItem.className = 'chat-item';

  chatItem.innerHTML = `
    <div class="avatar"><i class="${chat.icon}"></i></div>
    <div class="chat-content">
      <div class="chat-text">${chat.message}</div>
      <div class="chat-time">${chat.time}</div>
    </div>
    <div class="chat-indicator"></div>
  `;

  // Add message inside container
  chatList.appendChild(chatItem);

  // ✅ Auto-scroll INSIDE the fixed 14vh area
  chatList.scrollTop = chatList.scrollHeight;

  // ✅ Limit messages to fit 14vh
  const chatItems = chatList.querySelectorAll('.chat-item');
  if (chatItems.length > 4) {
    chatItems[0].remove();
  }

  // Keep timestamps working
  updateChatTimes();
}

function updateChatTimes() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;

  const chatItems = chatList.querySelectorAll('.chat-item');
  chatItems.forEach((item, index) => {
    const timeElement = item.querySelector('.chat-time');
    if (timeElement && index < chatItems.length - 1) {
      const currentTime = timeElement.textContent;
      if (currentTime.includes('m ago')) {
        const minutes = parseInt(currentTime.replace('m ago', ''));
        timeElement.textContent = `${minutes + 1}m ago`;
      }
    }
  });
}

function startContinuousChat() {
  // Add initial messages
  for (let i = 0; i < 4; i++) {
    setTimeout(() => addChatMessage(), i * 500);
  }

  // Start continuous addition
  chatInterval = setInterval(() => {
    addChatMessage();
  }, 3000); // Add new message every 3 seconds
}

function stopContinuousChat() {
  if (chatInterval) {
    clearInterval(chatInterval);
  }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', () => {
  startContinuousChat();
});

// Also start when the section becomes visible
const whyChooseUsSection = document.getElementById('why-choose-us');
if (whyChooseUsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startContinuousChat();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(whyChooseUsSection);
}

const realityCards = document.querySelectorAll(".reality-card");

const realityObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      realityCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 200);
      });
      realityObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

realityObserver.observe(document.getElementById("career-reality"));